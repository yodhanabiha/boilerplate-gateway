import { body, checkExact, query } from "express-validator";

export const rolesPaginationValidation = [
    checkExact([
      query('page').optional().isInt(),
      query('page_size').optional().isInt(),
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type RolesPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};

export const createRoleAttributeValidation = [
    body('name').trim().notEmpty().isString(),
];
  
  
export interface CreateRoleAttributeBody {
    name: string;
}




