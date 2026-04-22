import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import MasterMenuItemsRepository from "../../../models/repository/master/MasterMenuItemsRepository";
import { CreateMenuItemsAttributeBody, MenuItemsPathType, MenuItemsSearchType, StatusAttributeBody, UpdateMenuItemsAttributeBody, UpdateRoleMenuActionAttributeBody } from "./Request";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import RoleMenusRepository from "../../../models/repository/credentials/RoleMenusRepository";
import MasterMenuItems from "../../../models/entity/master/MasterMenuItems";
import MasterRoleRepository from "../../../models/repository/master/MasterRoleRepository";
var arrayToTree = require('array-to-tree');

class MenuItemsHandler {

    private masterMenuItemsRepo = MasterMenuItemsRepository;
    private roleMenusRepo = RoleMenusRepository;
    private masterRoleRepo = MasterRoleRepository;

    async handleGetMenuItemsByUser(identity: TokenPayload, pagination: MenuItemsSearchType): Promise<any> {

        let roleAllow: Array<number>; roleAllow = [];
        for (let rawRole of identity.role) {
            roleAllow.push(rawRole.id);
        }


        const roleMenuItemsUpdated = await this.roleMenusRepo.getAllData({
            where: { roleId: { [Op.in]: roleAllow } }, include: [
                { model: MasterMenuItems, required: true }
            ]
        });

        // let menuItemInfo
        let MenuRole: Array<number>; MenuRole = [];
        let MenuActionRole: any; MenuActionRole = {};
        for (let rawMenuItems of roleMenuItemsUpdated) {
            if (MenuRole.indexOf(rawMenuItems.menusId) == -1) {
                MenuRole.push(rawMenuItems.menusId);
            }
            if (MenuActionRole[Number(rawMenuItems.menusId)] == undefined) {
                MenuActionRole[Number(rawMenuItems.menusId)] = {
                    actViews: rawMenuItems.act_views,
                    actReads: rawMenuItems.act_reads,
                    actCreate: rawMenuItems.act_create,
                    actUpdate: rawMenuItems.act_update,
                    actDelete: rawMenuItems.act_delete,
                    actDenied: rawMenuItems.act_denied
                }
            } else {

                if (rawMenuItems.act_views == true) MenuActionRole[Number(rawMenuItems.menusId)]["actViews"] = true;
                if (rawMenuItems.act_reads == true) MenuActionRole[Number(rawMenuItems.menusId)]["actReads"] = true;
                if (rawMenuItems.act_create == true) MenuActionRole[Number(rawMenuItems.menusId)]["actCreate"] = true;
                if (rawMenuItems.act_update == true) MenuActionRole[Number(rawMenuItems.menusId)]["actUpdate"] = true;
                if (rawMenuItems.act_delete == true) MenuActionRole[Number(rawMenuItems.menusId)]["actDelete"] = true;
                if (rawMenuItems.act_denied == false) MenuActionRole[Number(rawMenuItems.menusId)]["actDenied"] = false;
            }

        }

        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { id: { [Op.in]: MenuRole } },
                        {
                            [Op.or]: [
                                { label_key: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }

        JSON_FILTER["order"] = [["indexed", "ASC"]];

        const menuItemsInfo = await this.masterMenuItemsRepo.getAllData(JSON_FILTER);
        let menus: Array<Object> = [];
        for (let rawMenu of menuItemsInfo) {
            if (MenuActionRole[Number(rawMenu.id)] == undefined) {
                continue;
            }

            if (MenuActionRole[Number(rawMenu.id)]["actDenied"] == true) {
                continue;
            }

            menus.push({
                "id": Number(rawMenu.id),
                "icon": rawMenu.icon,
                "labelKey": rawMenu.labelKey,
                "label": rawMenu.label,
                "urlPath": rawMenu.urlPath,
                "parent_id": Number(rawMenu.parentId),
                "indexed": rawMenu.indexed,
                "flag": rawMenu.flag,
                "createdBy": rawMenu.createdBy,
                "createdAt": rawMenu.createdAt,
                "updatedBy": rawMenu.updatedBy,
                "updatedAt": rawMenu.updatedAt,
                "deletedAt": rawMenu.deletedAt,
                "allow": MenuActionRole[Number(rawMenu.id)]
            })
        }
        return arrayToTree(menus);

    }

    async handleGetMenuItems(identity: TokenPayload, pagination: MenuItemsSearchType): Promise<any> {


        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { label_key: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { label: { [Op.iLike]: "%" + pagination.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }
        JSON_FILTER["order"] = [["indexed", "ASC"]];
        const menuItemsInfo = await this.masterMenuItemsRepo.getAllData(JSON_FILTER);
        let menus: Array<Object> = [];
        for (let rawMenu of menuItemsInfo) {
            menus.push({
                "id": Number(rawMenu.id),
                "icon": rawMenu.icon,
                "labelKey": rawMenu.labelKey,
                "label": rawMenu.label,
                "urlPath": rawMenu.urlPath,
                "parent_id": Number(rawMenu.parentId),
                "indexed": rawMenu.indexed,
                "flag": rawMenu.flag,
                "createdBy": rawMenu.createdBy,
                "createdAt": rawMenu.createdAt,
                "updatedBy": rawMenu.updatedBy,
                "updatedAt": rawMenu.updatedAt,
                "deletedAt": rawMenu.deletedAt
            })
        }
        return arrayToTree(menus);

    }

    async handleGetMenuItemsById(identity: TokenPayload, id: string): Promise<any> {
        let infoMenuItems = await this.masterMenuItemsRepo.getSingleData({
            where: { id: id }
        });
        if (!infoMenuItems) throw new ErrorHandler(400, 'Menu items not found !');
        return infoMenuItems;
    }

    async handleCreateMenuItems(
        identity: TokenPayload,
        body: CreateMenuItemsAttributeBody
    ): Promise<any> {

        let menuItemInfo = await this.masterMenuItemsRepo.getSingleData({
            where: {
                [Op.or]: [
                    // {label : body.label},
                    { labelKey: body.label_key }
                ]
            }
        });

        if (menuItemInfo) throw new ErrorHandler(400, 'Role label or label key already exities !');

        const t = await mainDb.transaction();
        try {

            await this.masterMenuItemsRepo.insertNewData({
                createdBy: identity.id,
                label: body.label,
                icon: body.icon,
                labelKey: body.label_key,
                urlPath: body.url_path,
                parentId: body.parent_id ? body.parent_id : 0,
                indexed: body.indexed
            }, { transaction: t });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  menu items !');
        }
    }

    async handleUpdateMenuItems(
        identity: TokenPayload,
        id: number,
        body: UpdateMenuItemsAttributeBody
    ): Promise<any> {
        const infoMenuItems = await this.masterMenuItemsRepo.getSingleData({
            where: { id: id }
        });
        if (!infoMenuItems) throw new ErrorHandler(400, 'Menu Items not found !');

        const infoMenuItemsName = await this.masterMenuItemsRepo.getSingleData({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: {
                            // label : body.label,
                            labelKey: body.label_key
                        }
                    },
                    { id: { [Op.ne]: id } }
                ]
            }
        })

        if (infoMenuItemsName) throw new ErrorHandler(400, 'Menu items label or label key already exities !');


        const t = await mainDb.transaction();
        try {

            await this.masterMenuItemsRepo.updateData({
                label: body.label,
                icon: body.icon,
                labelKey: body.label_key,
                urlPath: body.url_path,
                parentId: body.parent_id ? body.parent_id : 0,
                indexed: body.indexed,
                flag: body.flag ? body.flag : 1,
                updatedBy: identity.id
            }, { where: { id: infoMenuItems.id }, transaction: t });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  menu items !');
        }
    }

    async handleDeleteMenuItems(
        identity: TokenPayload,
        id: number
    ): Promise<any> {
        let infoMenuItems = await this.masterMenuItemsRepo.getSingleData({
            where: { id: id }
        });
        if (!infoMenuItems) throw new ErrorHandler(400, 'Menu Items not found !');

        const t = await mainDb.transaction();
        try {
            await this.masterMenuItemsRepo.deleteData({ where: { id: id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  menu items !');
        }
    }



    async handleGetMenuItemsByRole(
        identity: TokenPayload,
        query: MenuItemsSearchType,
        id: number
    ): Promise<any> {
        const infoRole = await this.masterRoleRepo.getSingleData({ where: { id: id } });
        if (!infoRole) throw new ErrorHandler(400, 'Error role notfound !');

        const roleMenuItems = await this.roleMenusRepo.getAllData({
            where: { roleId: infoRole.id }, include: [
                { model: MasterMenuItems }
            ]
        });

        let avaliableMenu: Array<number>; avaliableMenu = [];
        for (let rawMenuItem of roleMenuItems) {
            if (avaliableMenu.indexOf(rawMenuItem.menusId) == -1) {
                avaliableMenu.push(rawMenuItem.menusId);
            }
        }

        const menuNotAvaliable = await this.masterMenuItemsRepo.getAllData({ where: { id: { [Op.notIn]: avaliableMenu } } });
        let newRoleMenu: Array<any>; newRoleMenu = []
        for (let rawMenuNotAva of menuNotAvaliable) {
            newRoleMenu.push({
                createdBy: identity.id,
                menusId: rawMenuNotAva.id,
                roleId: infoRole.id,
                act_create: false,
                act_reads: false,
                act_views: false,
                act_delete: false,
                act_update: false,
                act_denied: true
            })
        }

        if (newRoleMenu.length > 0) {
            const t = await mainDb.transaction();
            try {
                await this.roleMenusRepo.insertBulkData(newRoleMenu, { transaction: t })
                await t.commit();
            } catch (errorCreateRoleMenu) {
                console.log(errorCreateRoleMenu)
                await t.rollback();
                throw new ErrorHandler(400, 'Error when create  new role menus !');
            }
        }

        const roleMenuItemsUpdated = await this.roleMenusRepo.getAllData({
            where: { roleId: infoRole.id }, include: [
                { model: MasterMenuItems, required: true }
            ]
        });

        // let menuItemInfo
        let MenuRole: Array<number>; MenuRole = [];
        let MenuActionRole: any; MenuActionRole = {};
        for (let rawMenuItems of roleMenuItemsUpdated) {
            if (MenuRole.indexOf(rawMenuItems.menusId) == -1) {
                MenuRole.push(rawMenuItems.menusId);
                MenuActionRole[Number(rawMenuItems.menusId)] = {
                    roleMenuId: rawMenuItems.id,
                    actViews: rawMenuItems.act_views,
                    actReads: rawMenuItems.act_reads,
                    actCreate: rawMenuItems.act_create,
                    actUpdate: rawMenuItems.act_update,
                    actDelete: rawMenuItems.act_delete,
                    actDenied: rawMenuItems.act_denied
                }
            }
        }

        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (query.search != null && query.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { id: { [Op.in]: MenuRole } },
                        {
                            [Op.or]: [
                                { label_key: { [Op.iLike]: "%" + query.search + "%" } },
                                { label: { [Op.iLike]: "%" + query.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }

        JSON_FILTER["order"] = [["indexed", "ASC"]];

        const menuItemsInfo = await this.masterMenuItemsRepo.getAllData(JSON_FILTER);
        let menus: Array<Object> = [];
        for (let rawMenu of menuItemsInfo) {
            menus.push({
                "id": Number(rawMenu.id),
                "icon": rawMenu.id,
                "labelKey": rawMenu.labelKey,
                "label": rawMenu.label,
                "urlPath": rawMenu.urlPath,
                "parent_id": Number(rawMenu.parentId),
                "indexed": rawMenu.indexed,
                "flag": rawMenu.flag,
                "createdBy": rawMenu.createdBy,
                "createdAt": rawMenu.createdAt,
                "updatedBy": rawMenu.updatedBy,
                "updatedAt": rawMenu.updatedAt,
                "deletedAt": rawMenu.deletedAt,
                "allow": MenuActionRole[Number(rawMenu.id)]
            })
        }
        return arrayToTree(menus);
    }

    async handleUpdateMenuItemsByRole(
        identity: TokenPayload,
        id: number,
        body: UpdateRoleMenuActionAttributeBody
    ): Promise<any> {
        const infoRoleMenu = await this.roleMenusRepo.getSingleData({ where: { id: id } });
        if (!infoRoleMenu) throw new ErrorHandler(400, 'Error role menu items not found !');

        const t = await mainDb.transaction();
        try {
            await this.roleMenusRepo.updateData({ ...body }, { where: { id: infoRoleMenu.id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  action role menu items !');
        }
    }

    async handleGetDetailMenuItemsByUser(identity: TokenPayload, pagination: MenuItemsPathType): Promise<any> {

        let roleAllow: Array<number>; roleAllow = [];
        for (let rawRole of identity.role) {
            roleAllow.push(rawRole.id);
        }


        const roleMenuItemsUpdated = await this.roleMenusRepo.getAllData({
            where: { roleId: { [Op.in]: roleAllow } }, include: [
                { model: MasterMenuItems, required: true }
            ]
        });

        // let menuItemInfo
        let MenuRole: Array<number>; MenuRole = [];
        let MenuActionRole: any; MenuActionRole = {};
        for (let rawMenuItems of roleMenuItemsUpdated) {
            if (MenuRole.indexOf(rawMenuItems.menusId) == -1) {
                MenuRole.push(rawMenuItems.menusId);
            }
            if (MenuActionRole[Number(rawMenuItems.menusId)] == undefined) {
                MenuActionRole[Number(rawMenuItems.menusId)] = {
                    actViews: rawMenuItems.act_views,
                    actReads: rawMenuItems.act_reads,
                    actCreate: rawMenuItems.act_create,
                    actUpdate: rawMenuItems.act_update,
                    actDelete: rawMenuItems.act_delete,
                    actDenied: rawMenuItems.act_denied
                }
            } else {

                if (rawMenuItems.act_views == true) MenuActionRole[Number(rawMenuItems.menusId)]["actViews"] = true;
                if (rawMenuItems.act_reads == true) MenuActionRole[Number(rawMenuItems.menusId)]["actReads"] = true;
                if (rawMenuItems.act_create == true) MenuActionRole[Number(rawMenuItems.menusId)]["actCreate"] = true;
                if (rawMenuItems.act_update == true) MenuActionRole[Number(rawMenuItems.menusId)]["actUpdate"] = true;
                if (rawMenuItems.act_delete == true) MenuActionRole[Number(rawMenuItems.menusId)]["actDelete"] = true;
                if (rawMenuItems.act_denied == false) MenuActionRole[Number(rawMenuItems.menusId)]["actDenied"] = false;
            }
        }

        const foundMenu = await this.masterMenuItemsRepo.getSingleData({ where: { urlPath: pagination.path_name } });
        if (!foundMenu) throw new ErrorHandler(400, 'Error menu not found !');
        if (MenuActionRole[Number(foundMenu.id)] == undefined) throw new ErrorHandler(400, 'Error Menu not found !');

        return {
            "id": foundMenu.id,
            "label": foundMenu.label,
            "urlPath": foundMenu.urlPath,
            "flag": foundMenu.flag,
            "allow": MenuActionRole[Number(foundMenu.id)]
        }

    }


    async handleUpdateMenuItemsStatus(
        identity: TokenPayload,
        id: number,
        body: StatusAttributeBody
    ): Promise<any> {
        const infoMenuItems = await this.masterMenuItemsRepo.getSingleData({
            where: { id: id }
        });
        if (!infoMenuItems) throw new ErrorHandler(400, 'Menu Items not found !');

        const t = await mainDb.transaction();
        try {

            await this.masterMenuItemsRepo.updateData({
                flag: body.active == 1 ? 1 : 0,
                updatedBy: identity.id
            }, { where: { id: infoMenuItems.id }, transaction: t });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  menu items status !');
        }
    }

}
export default MenuItemsHandler;