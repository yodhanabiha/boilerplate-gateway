import { body, checkExact, query } from "express-validator";

export const menuItemsPaginationValidation = [
    checkExact([
        query('page').optional().isInt(),
        query('page_size').optional().isInt(),
        query('search').optional(),
        query('filter').optional(),
    ]),
];

export type MenuItemsPaginationType = {
    page: number;
    pageSize: number;
    softDeleted?: boolean;
    search?: string;
    filter: string;
};

export const menuItemsSearchValidation = [
    checkExact([
        query('search').optional()
    ]),
];

export type MenuItemsSearchType = {
    search?: string;
};

export const menuItemsPathValidation = [
    checkExact([
        query('path_name').optional()
    ]),
];

export type MenuItemsPathType = {
    path_name?: string;
};



export const createMenuItemsAttributeValidation = [
    body('icon').trim().optional().isString(),
    body('label_key').trim().notEmpty().isString(),
    body('label').trim().notEmpty().isString(),
    body('url_path').trim().optional({ nullable: true }).isString(),
    body('parent_id').trim().notEmpty().isNumeric(),
    body('indexed').trim().optional().isNumeric(),
];


export interface CreateMenuItemsAttributeBody {
    icon: string;
    label_key: string;
    label: string;
    url_path: string;
    parent_id: number;
    indexed: number;
    flag?: number;
}


export const updateMenuItemsAttributeValidation = [
    body('icon').trim().optional().isString(),
    body('label_key').trim().optional().isString(),
    body('label').trim().optional().isString(),
    body('url_path').trim().optional({ nullable: true }).isString(),
    body('parent_id').trim().optional().isNumeric(),
    body('indexed').trim().optional().isNumeric(),
    body('flag').trim().optional().isNumeric(),
];


export interface UpdateMenuItemsAttributeBody {
    icon: string;
    label_key: string;
    label: string;
    url_path: string;
    parent_id: number;
    indexed: number;
    flag?: number;
}


export const updateRoleMenuActionAttributeValidation = [
    body('act_views').trim().optional().isBoolean(),
    body('act_reads').trim().optional().isBoolean(),
    body('act_create').trim().optional().isBoolean(),
    body('act_update').trim().optional().isBoolean(),
    body('act_delete').trim().optional().isBoolean(),
    body('act_denied').trim().optional().isBoolean(),
];


export interface UpdateRoleMenuActionAttributeBody {
    act_views?: boolean;
    act_reads?: boolean;
    act_create?: boolean;
    act_update?: boolean;
    act_delete?: boolean;
    act_denied?: boolean;
}

export const statusAttributeValidation = [
    body('active').trim().notEmpty().isNumeric(),
];


export interface StatusAttributeBody {
    active: number;
}