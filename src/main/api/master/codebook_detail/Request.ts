import { body, checkExact, query } from "express-validator";

export const codebookDetailPaginationValidation = [
    checkExact([
      query('page').optional().isInt(),
      query('page_size').optional().isInt(),
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type CodebookDetailPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};


export const codebookDetailAllValidation = [
    checkExact([
      query('search').optional(),
      query('filter').optional(),
    ]),
];
  
export type CodebookDetailAllType = {
    search?: string;
    filter: string;
};


export const createCodebookDetailAttributeValidation = [
    checkExact([
        body('text_code').trim().notEmpty().isString(),
        body('text_value').trim().notEmpty().isString(),
        body('text_other').trim().notEmpty().isString(),
        body('description').trim().notEmpty().isString(),
        body('parent_id').trim().notEmpty().isNumeric(),
    ])
];
  
  
export interface CreateCodebookDetailAttributeBody {
    text_code: string;
    text_value: string;
    text_other: string;
    description: string;
    parent_id: number;
}