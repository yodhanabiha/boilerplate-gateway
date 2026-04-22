import express from 'express';
import GeneralConfig from '../config/GeneralConfig';
import jwt from 'jsonwebtoken';
import SessionUtility from '../utility/SessionUtility';
import StringUtility from '../utility/StringUtility';
import { Op } from 'sequelize';
import { UsersStatusList, UsersTypeList } from '../const';

export interface TokenPayload {
  id: string;
  email: string;
  role: {
    id: number;
    name: string;
  }[];
  employee?: {
    id: string,
    name: string,
  } | null,
  companyAllow?: {
    id: string;
    code: string;
    label: string;
  }[];
  companySelected?: {
    id: string;
    code: string;
    label: string;
  };
  userType: typeof UsersTypeList[number],
  status: typeof UsersStatusList[number],
  lang: string;
  exp?: number;
  iat?: number;
}

export interface RefreshToken {
  id: string;
  email: string;
  role: {
    id: number;
    name: string;
  }[];
  employee?: {
    id: string,
    nik: string,
    name: string,
  } | null,
  companyAllow?: {
    id: string;
    code: string;
    label: string;
  }[];
  companySelected?: {
    id: string;
    code: string;
    label: string;
  };
  userType: typeof UsersTypeList[number],
  status: typeof UsersStatusList[number],
  lang: string;
  refresh: boolean;
  refreshId: string;
  accessToken: string;
  exp?: number;
  iat?: number;
}

export function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    const apiToken = req.headers['x-api-key'] as string;
    if (!apiToken) return res.sendStatus(401);
    if (GeneralConfig.API_TOKEN !== apiToken) {
      return res.sendStatus(401);
    }
    const userObject = { username: GeneralConfig.SUPER_USERNAME };
    req.user = userObject;
    next();

  } else {
    const token = authHeader?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, GeneralConfig.JWT_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: err.message });
      const verifyToken = await SessionUtility.checkTokenPayload(user as TokenPayload);

      if (!verifyToken) return res.sendStatus(401);

      if (!GeneralConfig.REFRESH_TOKEN) {
        const blocked = await SessionUtility.getBlockedToken(user as TokenPayload);
        if (blocked != null)
          return res.status(401).json({ message: 'jwt expired' });
      }
      req.user = user;
      next();

    });
  }
}

export async function formAuthenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const apiToken = req.headers['x-api-key'] as string;
  if (!apiToken) return res.status(403).json({ message: 'user not permitted !' });
  if (GeneralConfig.API_TOKEN !== apiToken) {
    return res.sendStatus(401);
  }

  if (!req.formToken)
    return res.status(401).json({ message: 'form token invalid' });

  next();
}

export function refresh(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, GeneralConfig.JWT_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: err.message });
    if (!GeneralConfig.REFRESH_TOKEN) return res.sendStatus(501);

    req.user = user;
    next();
  });
}
