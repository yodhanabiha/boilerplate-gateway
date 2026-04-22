import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import UserRepository from "../../../models/repository/credentials/UserRepository";
import UserRoleRepository from "../../../models/repository/credentials/UserRoleRepository";
import MasterRoleRepository from "../../../models/repository/master/MasterRoleRepository";
import UsersAssigmentRepository from "../../../models/repository/credentials/UsersAssigmentRepository";
import { CreateUserAssigmentAttributeBody, UsersAssigmentAllType, UsersAssigmentPaginationType } from "./Request";
import Users from "../../../models/entity/credentials/Users";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";

class UsersAssigmentHandler {

    private usersRepo = UserRepository;
    private usersAssigmentRepo = UsersAssigmentRepository;
    private userRoleRepo = UserRoleRepository;
    private masterRoleRepo = MasterRoleRepository;

    async handleGetUsersAssigmentAll(identity: TokenPayload, pagination: UsersAssigmentAllType): Promise<any> {
        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    // [Op.and]: [
                    //     {
                    //         [Op.or]: [
                    //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //         ]
                    //     }
                    // ]
                }
            };
        }

        try {
            let JSON_FILTER_D = JSON.parse(pagination.filter);
            if (JSON_FILTER_D.where != undefined) {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            // {
                            //     [Op.or]: [
                            //         { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //     ]
                            // },
                            JSON_FILTER_D.where
                        ]
                    }
                };
            } else {
                JSON_FILTER = {
                    where: {
                        // [Op.and]: [
                        //     {
                        //         [Op.or]: [
                        //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //         ]
                        //     }
                        // ]
                    }
                };
            }
        } catch (e) {
            if (pagination.search != null && pagination.search != "") {
                JSON_FILTER = {
                    where: {
                        // [Op.and]: [
                        //     {
                        //         [Op.or]: [
                        //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //         ]
                        //     }
                        // ]
                    }
                };
            }
        }
        JSON_FILTER["include"] = [
            { model: Users, attributes: ["username", "is_online", "last_sign_in", "flag"] },
        ];

        const usersAssigmentInfo = await this.usersAssigmentRepo.getAllData(JSON_FILTER);
        return usersAssigmentInfo;
    }

    async handleGetUsersAssigment(identity: TokenPayload, pagination: UsersAssigmentPaginationType): Promise<any> {


        let JSON_FILTER: any; JSON_FILTER = { where: {} };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    // [Op.and]: [
                    //     {
                    //         [Op.or]: [
                    //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                    //         ]
                    //     }
                    // ]
                }
            };
        }

        try {
            let JSON_FILTER_D = JSON.parse(pagination.filter);
            if (JSON_FILTER_D.where != undefined) {
                JSON_FILTER = {
                    where: {
                        [Op.and]: [
                            // {
                            //     [Op.or]: [
                            //         { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //         { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                            //     ]
                            // },
                            JSON_FILTER_D.where
                        ]
                    }
                };
            } else {
                JSON_FILTER = {
                    where: {
                        // [Op.and]: [
                        //     {
                        //         [Op.or]: [
                        //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //         ]
                        //     }
                        // ]
                    }
                };
            }
        } catch (e) {
            if (pagination.search != null && pagination.search != "") {
                JSON_FILTER = {
                    where: {
                        // [Op.and]: [
                        //     {
                        //         [Op.or]: [
                        //             { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { name: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { tempatLahir: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { codePos: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //             { alamat: { [Op.iLike]: "%" + pagination.search + "%" } },
                        //         ]
                        //     }
                        // ]
                    }
                };
            }
        }
        JSON_FILTER["include"] = [
            { model: Users, attributes: ["username", "is_online", "last_sign_in", "flag"] },
        ];

        const usersInfo = await this.usersAssigmentRepo.getPaginationDataSearch(
            JSON_FILTER,
            {
                page: pagination.page,
                pageSize: pagination.pageSize,
                softDeleted: false,
            },
        );

        return {
            rows: usersInfo.rows,
            total: usersInfo.count
        };

    }

    async handleGetUserAssigmentById(identity: TokenPayload, id: string): Promise<any> {
        let infoUser = await this.usersAssigmentRepo.getSingleData({
            where: { id: id },
            include: [
                { model: Users, attributes: ["username", "is_online", "last_sign_in", "flag"] },
            ]
        });
        if (!infoUser) throw new ErrorHandler(400, 'Users assigment not found !');
        return infoUser;
    }

    async handleCreateUserAssigment(
        identity: TokenPayload,
        body: CreateUserAssigmentAttributeBody
    ): Promise<any> {

        const foundUser = await this.usersRepo.getSingleData({ where: { id: body.userId } });
        if (!foundUser) throw new ErrorHandler(400, 'User not found !');

        const t = await mainDb.transaction();
        try {

            const userAssigmentCreated = await this.usersAssigmentRepo.insertNewData({
                createdBy: identity.id,
                userId: foundUser.id,
            }, { transaction: t });

            if (userAssigmentCreated) {
                await t.commit();
            }

        } catch (e) {
            console.log(e);
            await t.rollback();
            throw new ErrorHandler(400, 'Error when crate user assigment !');
        }

    }


    async handleUpdateUserAssigment(
        identity: TokenPayload,
        body: CreateUserAssigmentAttributeBody,
        id: string
    ): Promise<any> {

        const foundUser = await this.usersRepo.getSingleData({ where: { id: body.userId } });
        if (!foundUser) throw new ErrorHandler(400, 'User not found !');

        const foundUserAssigment = await this.usersAssigmentRepo.getSingleData({ where: { id: id } });
        if (!foundUserAssigment) throw new ErrorHandler(400, 'User assigment  not found !');


        const t = await mainDb.transaction();
        try {

            const userAssigmentCreated = await this.usersAssigmentRepo.updateData({
                createdBy: identity.id,
                userId: foundUser.id,
            }, { where: { id: foundUserAssigment.id }, transaction: t });

            if (userAssigmentCreated) {
                await t.commit();
            }

        } catch (e) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update user assigment !');
        }

    }

    async handleDeleteUsersAssigment(
        identity: TokenPayload,
        id: string
    ): Promise<any> {

        const foundUserAssigment = await this.usersAssigmentRepo.getSingleData({ where: { id: id } });
        if (!foundUserAssigment) throw new ErrorHandler(400, 'User assigment  not found !');

        const t = await mainDb.transaction();
        try {
            const userAssigment = await this.usersAssigmentRepo.deleteData({ where: { id: foundUserAssigment.id }, transaction: t });
            if (userAssigment) {
                await t.commit();
            }
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete user assigment !');
        }
    }

}

export default UsersAssigmentHandler;
