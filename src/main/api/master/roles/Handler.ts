import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import MasterRoleRepository from "../../../models/repository/master/MasterRoleRepository";
import { CreateRoleAttributeBody, RolesPaginationType } from "./Request";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import RoleMenusRepository from "../../../models/repository/credentials/RoleMenusRepository";
import MasterMenuItems from "../../../models/entity/master/MasterMenuItems";
import MasterMenuItemsRepository from "../../../models/repository/master/MasterMenuItemsRepository";

class RolesHandler {

    private masterRoleRepo = MasterRoleRepository;
    private roleMenusRepo = RoleMenusRepository;
    private masterMenuItemsRepo = MasterMenuItemsRepository;

    async handleGetRolesOption(identity: TokenPayload): Promise<any> {
        const roles = await this.masterRoleRepo.getAllData({ where: { isHide: false }, attributes: ["id", "name"] });
        return roles;
    }

    async handleGetRoles(identity: TokenPayload, pagination: RolesPaginationType): Promise<any> {


        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { isHide: false },
                        {
                            [Op.or]: [
                                { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                            ]
                        }
                    ]
                }
            };
        }

        try {
            let JSON_FILTER_D = JSON.parse(pagination.filter);
            if (JSON_FILTER_D.where != undefined) {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { isHide: false },
                            {
                                [Op.or]: [
                                    { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            },
                            JSON_FILTER_D.where
                        ]
                    }
                };
            } else {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { isHide: false },
                            {
                                [Op.or]: [
                                    { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        } catch (e) {
            if (pagination.search != null && pagination.search != "") {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            { isHide: false },
                            {
                                [Op.or]: [
                                    { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                                ]
                            }
                        ]
                    }
                };
            }
        }


        const rolesInfo = await this.masterRoleRepo.getPaginationDataSearch(
            JSON_FILTER,
            {
                page: pagination.page,
                pageSize: pagination.pageSize,
                softDeleted: false,
            },
        );

        return {
            rows: rolesInfo.rows,
            total: rolesInfo.count
        };

    }

    async handleGetRoleById(identity: TokenPayload, id: string): Promise<any> {
        let infoRole = await this.masterRoleRepo.getSingleData({
            where: { id: id }
        });
        if (!infoRole) throw new ErrorHandler(400, 'Role not found !');
        return infoRole;
    }

    async handleCreateRole(
        identity: TokenPayload,
        body: CreateRoleAttributeBody
    ): Promise<any> {
        let infoRole = await this.masterRoleRepo.getSingleData({
            where: { name: body.name }
        });
        if (infoRole) throw new ErrorHandler(400, 'Role name already exities !');

        const t = await mainDb.transaction();
        try {

            await this.masterRoleRepo.insertNewData({
                createdBy: identity.id,
                name: body.name
            }, { transaction: t });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  role !');
        }
    }

    async handleUpdateRole(
        identity: TokenPayload,
        id: string,
        body: CreateRoleAttributeBody
    ): Promise<any> {
        const infoRole = await this.masterRoleRepo.getSingleData({
            where: { id: id, isHide: false }
        });
        if (!infoRole) throw new ErrorHandler(400, 'Role not found !');

        const infoRoleName = await this.masterRoleRepo.getSingleData({
            where: {
                [Op.and]: [
                    { name: body.name },
                    { id: { [Op.ne]: id } }
                ]
            }
        })

        if (infoRoleName) throw new ErrorHandler(400, 'Role name already exities !');


        const t = await mainDb.transaction();
        try {

            await this.masterRoleRepo.updateData({
                name: body.name
            }, { where: { id: infoRole.id }, transaction: t });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  role !');
        }
    }

    async handleDeleteRole(
        identity: TokenPayload,
        id: string
    ): Promise<any> {
        let infoRole = await this.masterRoleRepo.getSingleData({
            where: { id: id, isHide: false }
        });
        if (!infoRole) throw new ErrorHandler(400, 'Role not found !');

        const t = await mainDb.transaction();
        try {
            await this.masterRoleRepo.deleteData({ where: { id: id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  role !');
        }
    }



}
export default RolesHandler;