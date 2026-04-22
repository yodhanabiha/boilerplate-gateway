import { body, checkExact, query } from "express-validator";

export const employeeSearchValidation = [
    checkExact([
        query('search').optional(),
        query('filter').optional()
    ]),
];

export type EmployeeSearchType = {
    search?: string;
    filter: string;
};

export const employeePaginationValidation = [
    checkExact([
        query('page').optional().isInt(),
        query('page_size').optional().isInt(),
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type EmployeePaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};


export const createEmployeeAttributeValidation = [
    checkExact([
        body('nik').trim().notEmpty().isString(),
        body('fullname').trim().notEmpty().isString(),
        body('noTelp').trim().optional({ nullable: true }).isString(),
        body('noHp').trim().notEmpty().isString(),
        body('email').trim().notEmpty().isString(),
        body('address').trim().notEmpty().isString(),
        body('coachId').trim().optional({ nullable: true }).isString(),
        body('organizationCode').trim().notEmpty().isString(),
        body('flag').trim().optional().isNumeric(),
        body('joinDate').trim().notEmpty().isString(),
        body('bornDate').trim().notEmpty().isString(),
    ])
];

export interface CreateEmployeeAttributeBody {
    nik: string;
    fullname: string;
    noTelp?: string;
    noHp: string;
    email: string;
    address: string;
    coachId?: string;
    organizationCode: string;
    flag?: number;
    joinDate: string;
    bornDate: string;
}



export const updateEmployeeAttributeValidation = [
    checkExact([
        body('nik').trim().optional().isString(),
        body('fullname').trim().optional().isString(),
        body('noTelp').trim().optional({ nullable: true }).isString(),
        body('noHp').trim().optional().isString(),
        body('email').trim().optional().isString(),
        body('address').trim().optional().isString(),
        body('coachId').trim().optional({ nullable: true }).isString(),
        body('organizationCode').trim().optional().isString(),
        body('flag').trim().optional().isNumeric(),
        body('joinDate').trim().optional().isString(),
        body('bornDate').trim().optional().isString(),
    ])
];

export interface UpdateEmployeeAttributeBody {
    nik?: string;
    fullname?: string;
    noTelp?: string;
    noHp?: string;
    email?: string;
    address?: string;
    coachId?: string;
    organizationCode?: string;
    flag?: number;
    joinDate?: string;
    bornDate?: string;
}


export const userReferanceAttributeValidation = [
    checkExact([
        body('user_id').trim().notEmpty().isString()
    ])
];

export interface UserReferanceAttributeBody {
    user_id: string
}


//==========================================EMPLOYEE INFO===================================

export const updateEmployeeByEmployeeAttributeValidation = [
    checkExact([
        body('fullname').trim().optional().isString(),
        body('noTelp').trim().optional({ nullable: true }).isString(),
        body('noHp').trim().optional().isString(),
        body('email').trim().optional().isString(),
        body('address').trim().optional().isString(),
        body('coachId').trim().optional({ nullable: true }).isString(),
        body('bornDate').trim().optional().isString(),
    ])
];

export interface UpdateEmployeeByEmployeeAttributeBody {
    fullname?: string;
    noTelp?: string;
    noHp?: string;
    email?: string;
    address?: string;
    coachId?: string;
    bornDate?: string;
}