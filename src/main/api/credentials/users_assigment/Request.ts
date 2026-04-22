import { body, checkExact, query } from "express-validator";


export const usersAssigmentAllValidation = [
    checkExact([
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type UsersAssigmentAllType = {
    search?: string;
    filter: string;
};


export const usersAssigmentPaginationValidation = [
    checkExact([
      query('page').optional().isInt(),
      query('page_size').optional().isInt(),
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type UsersAssigmentPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};

export const createUserAssigmentAttributeValidation = [
    body('userId').trim().notEmpty().isString(),
    body('organizationId').trim().notEmpty().isNumeric(),
];

export interface CreateUserAssigmentAttributeBody {
    userId: string;
    organizationId: number;
}