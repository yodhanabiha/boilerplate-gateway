import { WhereOptions } from 'sequelize';
import BaseRepository from '../.BaseRepository';
import { v7 } from 'uuid';
import jwt from 'jsonwebtoken';
// import Users, {UsersAttributes, UsersCreationAttributes} from '../entity/Users';
import GeneralConfig from '../../../config/GeneralConfig';
import ErrorHandler from '../../../middleware/ErrorHandler';
import SessionUtility from '../../../utility/SessionUtility';
import Roles from '../../entity/master/MasterRole';
import { RefreshToken, TokenPayload } from '../../../middleware/Authentication';
import {
  AuthResponseInterface,
  AuthUserResponseInterface,
} from '../../../api/credentials/auth/Response';
import Users, { UsersAttributes, UsersCreationAttributes } from '../../entity/credentials/Users';
import UserRoles from '../../entity/credentials/UserRole';
import Employee from '../../entity/master/Employee';
import CompanyUser from '../../entity/master/CompanyUser';
import Company from '../../entity/master/Company';

class UsersRepository extends BaseRepository<
  Users,
  UsersAttributes,
  UsersCreationAttributes
> {
  async updateSessionAuthentication(
    user: AuthUserResponseInterface,
  ): Promise<AuthResponseInterface> {
    const accessTokenObject: TokenPayload = {
      id: user.id,
      email: user.email,
      lang: user.lang,
      employee: user.employee,
      role: user.role ?? [],
      companyAllow: user.companyAllow ?? [],
      companySelected: user.companySelected,
      status: user.status,
      userType: user.userType
    };

    const accessToken = jwt.sign(accessTokenObject, GeneralConfig.JWT_SECRET, {
      expiresIn: GeneralConfig.JWT_EXPIRATION,
    });
    if (GeneralConfig.REFRESH_TOKEN) {
      const refreshTokenObject: RefreshToken = {
        id: user.id,
        email: user.email,
        employee: user.employee,
        role: user.role ?? [],
        lang: user.lang,
        accessToken: '',
        refresh: true,
        refreshId: v7(),
        status: user.status,
        userType: user.userType
      };
      const refreshToken = jwt.sign(
        refreshTokenObject,
        GeneralConfig.JWT_SECRET,
        {
          expiresIn: GeneralConfig.JWT_REFRESH_EXPIRATION,
        },
      );

      SessionUtility.insertRefreshLoginToken(refreshToken, accessToken);
      return {
        user,
        accessToken,
        refreshToken,
      };
    } else SessionUtility.insertLoginToken(accessToken);

    return {
      user,
      accessToken: accessToken,
    };
  }

  async getUserDetail(query: WhereOptions<UsersAttributes>) {

    return await Users.findOne({
      where: query,
      include: [
        {
          model: UserRoles,
          attributes: ['id', 'roleId', 'userId'],
          include: [
            {
              model: Roles,
              paranoid: true,
              attributes: ['id', 'name']
            },
            // {
            //   model: UsersAssigment,
            //   attributes: ['id', 'userId', 'organizationCode'],
            //   include: [
            //     {
            //       model: Organization,
            //       paranoid: true,
            //       attributes: ['id', 'name']
            //     }
            //   ],
            // }
          ],
        },
        {
          model: CompanyUser,
          attributes: ['id', 'userId', 'companyId'],
          include: [
            {
              model: Company,
              attributes: ['id', 'code', 'label']
            }
          ]
        },
        {
          model: Employee,
          attributes: ['id', "foto", 'nik', 'fullname'],
        }
      ],
    });
  }

  async refreshToken(identity: RefreshToken) {
    const check = await SessionUtility.checkBeforeRenewAccessToken(identity);
    if (!check.valid) throw new ErrorHandler(401, check.message);

    return await SessionUtility.renewAccessToken(identity);
  }
}

export default new UsersRepository(Users as any);
