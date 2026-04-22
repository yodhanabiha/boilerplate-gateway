import { body, checkExact, query } from "express-validator";

export const companyPaginationValidation = [
    checkExact([
        query('page').optional().isInt(),
        query('page_size').optional().isInt(),
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type CompanyPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};


export const companyAllValidation = [
    checkExact([
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type CompanyAllType = {
    search?: string;
    filter: string;
};


export const createCompanyValidation = [
    checkExact([
        body('label').trim().notEmpty().isString(),
        body('address').trim().notEmpty().isString(),
        body('email').trim().notEmpty().isString(),
        body('noTelp').trim().notEmpty().isString(),
        body('cost').trim().notEmpty().isNumeric()
    ])
];


export interface CreateCompanyBody {
    label: string;
    address: string;
    email: string;
    noTelp: string;
}