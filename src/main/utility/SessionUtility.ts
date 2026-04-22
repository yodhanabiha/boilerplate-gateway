import jwt from 'jsonwebtoken';
import GeneralConfig from '../config/GeneralConfig';
import {RefreshToken, TokenPayload} from '../middleware/Authentication';
import RedisUtility from './RedisUtility';
import {v7} from 'uuid';
import ErrorHandler from '../middleware/ErrorHandler';

type RefreshTokenSession = {
  refreshId: string;
  exp: number;
};

type FormatKeyType = {
  val: string;
  count?: string;
  refreshId?: string;
};

const __formatKeyAuth = (key: FormatKeyType) => {
  if (key.refreshId) {
    return `key_auth${key.val}=>${key.count}=>${key.refreshId}`;
  } else {
    return `key_auth${key.val}=>${key.count ?? '*'}`;
  }
};

class SessionUtility {
  static async insertRefreshLoginToken(
    refreshToken: string,
    accessToken: string,
  ) {
    const refreshTokenObject = jwt.verify(
      refreshToken,
      GeneralConfig.JWT_SECRET,
    );
    const accessTokenObject = jwt.verify(accessToken, GeneralConfig.JWT_SECRET);

    let tokenNumber: number[] = [];
    const identity = refreshTokenObject as RefreshToken;

    // Only allow certain amount of sessions
    const keys = await RedisUtility.GetKeysFromPattern(
      __formatKeyAuth({
        val: identity.id,
        refreshId:identity.refreshId
      }),
    );
    if (keys) {
      tokenNumber = keys.map(value => parseInt(value.split('=>')[1]));

      if (keys.length >= GeneralConfig.NUMBER_OF_ALLOWED_SESSIONS) {
        const min = Math.min(...tokenNumber);
        const key = keys.find(value =>
          value.includes(
            __formatKeyAuth({
              val: identity.id,
              count: min.toString(),
            }),
          ),
        )!;
        const lastTokenSession = (await RedisUtility.Get(key)) as string;
        const lastTokenSessionObject = JSON.parse(
          lastTokenSession,
        ) as RefreshTokenSession;

        RedisUtility.Delete(key);
        RedisUtility.Delete('valid' + lastTokenSessionObject.refreshId);
      }

      let max = 0;
      if (tokenNumber.length > 0) max = Math.max(...tokenNumber);

      RedisUtility.SetExpiredAt({
        key: __formatKeyAuth({
          val: identity.id,
          count: (max + 1).toString(),
          refreshId: identity.refreshId,
        }),
        value: JSON.stringify({
          refreshId: identity.refreshId,
          exp: identity.exp,
        } as RefreshTokenSession),
        expiredAt: identity.exp!,
      });

      RedisUtility.SetExpiredAt({
        key: 'valid' + identity.refreshId,
        value: JSON.stringify(accessTokenObject),
        expiredAt: identity.exp!,
      });
    }
  }

  static async renewAccessToken(refreshTokenObject: RefreshToken) {
    const newRefreshTokenObject = {
      id: refreshTokenObject.id,
      email: refreshTokenObject.email,
      refresh: refreshTokenObject.refresh,
      refreshId: v7(),
    };

    const newAccessTokenObject = {
      id: refreshTokenObject.id,
      email: refreshTokenObject.email,
      role: refreshTokenObject.role,
    };

    const accessToken = jwt.sign(
      newAccessTokenObject,
      GeneralConfig.JWT_SECRET,
      {
        expiresIn: GeneralConfig.JWT_EXPIRATION,
      },
    );
    const refreshToken = jwt.sign(
      newRefreshTokenObject,
      GeneralConfig.JWT_SECRET,
      { expiresIn: GeneralConfig.JWT_REFRESH_EXPIRATION },
    );

    const newRefreshTokenObjectWithExp = jwt.verify(
      refreshToken,
      GeneralConfig.JWT_SECRET,
    ) as RefreshToken;

    const currentSessionKey = (await RedisUtility.GetKeysFromPattern(
      __formatKeyAuth({
        val: refreshTokenObject.id,
        count: '*',
        refreshId: refreshTokenObject.refreshId,
      }),
    )) as string[];
    if (currentSessionKey) {
      const sessionNumber = currentSessionKey[0].split('=>')[1];

      RedisUtility.SetExpiredAt({
        key: 'blocked' + refreshTokenObject.refreshId,
        value: 'X',
        expiredAt: refreshTokenObject.exp!,
      });
      RedisUtility.SetExpiredAt({
        key: 'valid' + newRefreshTokenObject.refreshId,
        value: JSON.stringify(newAccessTokenObject),
        expiredAt: newRefreshTokenObjectWithExp.exp!,
      });
      RedisUtility.SetExpiredAt({
        key: __formatKeyAuth({
          val: newRefreshTokenObjectWithExp.id,
          count: sessionNumber.toString(),
          refreshId: newRefreshTokenObjectWithExp.refreshId,
        }),
        value: JSON.stringify({
          refreshId: newRefreshTokenObjectWithExp.refreshId,
          exp: newRefreshTokenObjectWithExp.exp,
        } as RefreshTokenSession),
        expiredAt: newRefreshTokenObjectWithExp.exp!,
      });
      RedisUtility.Delete('valid' + refreshTokenObject.refreshId);
      RedisUtility.Delete(currentSessionKey[0]);
    }

    return { accessToken, refreshToken };
  }

  static async checkBeforeRenewAccessToken(
    refreshTokenObject: RefreshToken,
  ): Promise<{valid: boolean; message: string}> {
    try {
      let check = await RedisUtility.Get(
        'valid' + refreshTokenObject.refreshId,
      );
      if (!check) {
        check = await RedisUtility.Get(
          'blocked' + refreshTokenObject.refreshId,
        );
        if (!check) return {valid: false, message: 'jwt expired'};

        this.revokeAllSession(refreshTokenObject);
        return {
          valid: false,
          message: 'Your session token has been hijacked by someone else',
        };
      }

      const sessionObject = JSON.parse(check) as TokenPayload;
      if (sessionObject.exp! > new Date().getTime()) {
        this.revokeAllSession(refreshTokenObject);
        return {
          valid: false,
          message: 'Your session token has been hijacked by someone else',
        };
      }
      return {valid: true, message: ''};
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }

  private static async revokeAllSession(refreshTokenObject: RefreshToken) {
    try {
      const allSessionKey = (await RedisUtility.GetKeysFromPattern(
        __formatKeyAuth({
          val: refreshTokenObject.id,
        }),
      )) as string[];
      for (const sessionKey of allSessionKey) {
        const session = (await RedisUtility.Get(sessionKey)) as string;
        const sessionObject = JSON.parse(session) as RefreshTokenSession;

        RedisUtility.Delete(sessionKey);
        RedisUtility.Delete('valid' + sessionObject.refreshId);
      }
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }

  static async revokeSession(refreshTokenObject: RefreshToken) {
    const currentSessionKey = (
      (await RedisUtility.GetKeysFromPattern(
        __formatKeyAuth({
          val: refreshTokenObject.id,
          refreshId: refreshTokenObject.refreshId,
        }),
      )) as string[]
    )[0];
    RedisUtility.Delete(currentSessionKey);
    RedisUtility.Delete('valid' + refreshTokenObject.refreshId);
  }

  static async insertLoginToken(token: string) {
    jwt.verify(token, GeneralConfig.JWT_SECRET, async (err, user) => {
      let tokenNumber: number[] = [];
      const identity = user as TokenPayload;

      // Only allow certain sessions
      const keys = await RedisUtility.GetKeysFromPattern(
        __formatKeyAuth({
          val: identity.id,
        }),
      );
      if (keys) {
        tokenNumber = keys.map(value => parseInt(value.split('=>')[1]));

        if (keys.length >= GeneralConfig.NUMBER_OF_ALLOWED_SESSIONS) {
          const min = Math.min(...tokenNumber);
          const key = keys.find(value =>
            value.includes(
              __formatKeyAuth({
                val: identity.id,
                count: min.toString(),
              }),
            ),
          )!;
          const loginToken = await RedisUtility.Get(key);

          if (!loginToken) return null;
          const loginTokenObject = JSON.parse(loginToken) as TokenPayload;
          this.insertBlockedToken(loginTokenObject);
        }

        let max = 0;
        if (tokenNumber.length > 0) max = Math.max(...tokenNumber);

        RedisUtility.SetExpiredAt({
          key: __formatKeyAuth({
            val: identity.id,
            count: (max + 1).toString(),
            refreshId: identity.iat!.toString(),
          }),
          value: JSON.stringify(identity),
          expiredAt: identity.exp!,
        });
      }
    });
  }

  static async insertBlockedToken(identity: TokenPayload) {
    // Remove cache module user sessions
    const keys = await RedisUtility.GetKeysFromPattern(
      __formatKeyAuth({
        val: identity.id,
        refreshId: identity.iat!.toString(),
      }),
    );
    if (keys) RedisUtility.Delete(keys[0]);

    RedisUtility.SetExpiredAt({
      key: identity.id + identity.iat!.toString(),
      value: JSON.stringify(identity),
      expiredAt: identity.exp!,
    });
  }

  static async removeBlockedToken(identity: TokenPayload) {
    RedisUtility.Delete(identity.id + identity.iat!.toString());
  }

  static async getBlockedToken(identity: TokenPayload) {
    return await RedisUtility.Get(identity.id + identity.iat!.toString());
  }

  static async removeAllSessionKey(userId: string) {
    try {
      const allSessionKey = (await RedisUtility.GetKeysFromPattern(
        __formatKeyAuth({
          val: userId,
        }),
      )) as string[];
      for (const sessionKey of allSessionKey) {
        RedisUtility.Delete(sessionKey);
        RedisUtility.Delete('valid' + userId);
      }
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }

  static async checkTokenPayload(identity: TokenPayload) {
    const keys = (await RedisUtility.GetKeysFromPattern(
      __formatKeyAuth({
        val: identity.id,
      }),
    )) as string[];

    if (keys && keys.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default SessionUtility;
