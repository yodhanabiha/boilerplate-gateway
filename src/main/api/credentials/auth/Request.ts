import { body } from 'express-validator';

export const loginAttributeValidation = [
  body('email').trim().notEmpty().isString(),
  body('password').trim().notEmpty().isString(),
];

export interface LoginAttributeBody {
  email: string;
  password: string;
}

export const forgotPassReqAttributeValidation = [
  body('email').trim().notEmpty().isEmail(),
];

export interface ForgotPassReqAttributeBody {
  email: string
}

export const verifikasiAccountAttributeValidation = [
  body('verification_code').trim().notEmpty().isString(),
  body('new_password').trim().notEmpty().isString(),
  body('confirm_password').trim().notEmpty().isString(),
];


export interface VerificationAccountAttributeBody {
  verification_code: string
  new_password: string,
  confirm_password: string
}
