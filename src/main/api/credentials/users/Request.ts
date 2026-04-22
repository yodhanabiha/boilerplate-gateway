import { body, checkExact, query } from "express-validator";
import { UsersStatusList } from "../../../const";


export const usersAllValidation = [
    checkExact([
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type UsersAllType = {
    search?: string;
    filter: string;
};


export const usersPaginationValidation = [
    checkExact([
        query('page').optional().isInt(),
        query('page_size').optional().isInt(),
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type UsersPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};


export const createUserAttributeValidation = [
    body('fullname').trim().notEmpty().isString(),
    body('address').trim().optional().isString(),
    body('noTelp').trim().optional().isString(),
    body('email').trim().notEmpty().isString(),
    body('password').trim().notEmpty().isString(),
];

export interface CreateUserAttributeBody {
    fullname: string;
    address?: string;
    noTelp?: string;
    email: string;
    password: string;
}

export const updateUserAttributeValidation = [
    body('fullname').trim().optional().isString(),
    body('address').trim().optional().isString(),
    body('noTelp').trim().optional().isString(),
    body('email').trim().optional().isString(),
    body('password').trim().optional().isString(),
];

export interface UpdateUserAttributeBody {
    fullname?: string;
    address?: string;
    noTelp?: string;
    email?: string;
    password?: string;
}


export const updateUserStatusAttributeValidation = [
    body('status').trim().notEmpty().isIn(["NOT ACTIVED", "ACTIVED", "NEED VERIFICATION", "BANNED"]),
];


export interface UpdateUserStatusAttributeBody {
    status: typeof UsersStatusList[number];
}

export const createRoleUserAttributeValidation = [
    body('role_id').isArray().isNumeric(),
    body('role_id.*')
];


export interface CreateRoleUserAttributeBody {
    role_id: Array<number>;
}


export const changePasswordattributeValidation = [
    body('old_password').trim().notEmpty().isString(),
    body('confirm_password').trim().notEmpty().isString(),
    body('new_password').trim().notEmpty().isString(),
];

export type ChangePasswordAttributeAttributeBody = {
    old_password: string;
    new_password: string;
    confirm_password: string;
};


export const changeTokenGcpattributeValidation = [
    body('tokenGcp').trim().notEmpty().isString(),
];

export type ChangeTokenGcpAttributeAttributeBody = {
    tokenGcp: string;
};


export const changeCompanyAttributeValidation = [
    body('companyId').trim().notEmpty().isString()
];

export interface ChangeCompanyAttributeBody {
    companyId: string;
}