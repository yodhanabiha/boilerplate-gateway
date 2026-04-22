import { UsersStatusList, UsersTypeList } from '../../../const';
import BaseResponse from '../../.BaseResponse';

export interface AuthUserResponseInterface {
  id: string;
  email: string;
  lang: string;
  isOnline: boolean;
  lastSignIn?: Date | null;
  createdAt: Date;
  userType: typeof UsersTypeList[number],
  status: typeof UsersStatusList[number]
  employee?: {
    id: string,
    nik: string,
    foto: string,
    name: string,
  } | null;
  role?: {
    id: number;
    name: string;
  }[];
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
}

export interface AuthResponseInterface {
  user: AuthUserResponseInterface;
  accessToken?: string;
  refreshToken?: string;
}

class AuthResponse extends BaseResponse { }

export default AuthResponse;
