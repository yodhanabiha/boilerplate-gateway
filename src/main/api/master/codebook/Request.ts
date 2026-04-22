import { body, checkExact, query } from "express-validator";

export const codebookPaginationValidation = [
    checkExact([
      query('page').optional().isInt(),
      query('page_size').optional().isInt(),
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type CodebookPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};


export const codebookAllValidation = [
    checkExact([
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type CodebookAllType = {
    search?: string;
    filter: string;
};


export const createCodebookAttributeValidation = [
    checkExact([
        body('code').trim().notEmpty().isString(),
        body('label').trim().notEmpty().isString(),
        body('description').trim().notEmpty().isString(),
    ])
];
  
  
export interface CreateCodebookAttributeBody {
    code: string;
    label: string;
    description: string;
}