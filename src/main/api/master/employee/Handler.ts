import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import UserRepository from "../../../models/repository/credentials/UserRepository";
import EmployeeRepository from "../../../models/repository/master/EmployeeRepository";
import { CreateEmployeeAttributeBody, EmployeePaginationType, EmployeeSearchType, UpdateEmployeeAttributeBody, UpdateEmployeeByEmployeeAttributeBody, UserReferanceAttributeBody } from "./Request";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import { bucketName, minioClient } from "../../../config/MinioConfig";
import fs from "fs";

class EmployeeHandler {

    private employeeRepo = EmployeeRepository;
    private userRepo = UserRepository;

    async handleGetEmployeeByIdEmployee(identity: TokenPayload, id: string): Promise<any> {
        let infoEmployee = await this.employeeRepo.getSingleData({
            where: {
                [Op.and]: [
                    { id: id },
                    { id: identity.employee?.id },
                    { companyId: identity.companySelected?.id }
                ]
            }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');

        return infoEmployee
    }

    async handleUpdateEmployeeByEmloyee(
        identity: TokenPayload,
        id: string,
        body: UpdateEmployeeByEmployeeAttributeBody,
        file: Express.Multer.File
    ): Promise<any> {

        const infoEmployee = await this.employeeRepo.getSingleData({
            where: {
                [Op.and]: [
                    { id: id },
                    { id: identity.employee?.id },
                    { companyId: identity.companySelected?.id }
                ]
            }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');


        let coachInfo: any; coachInfo = undefined;
        if (body.coachId != undefined && body.coachId != null) {
            const coach = await this.employeeRepo.getSingleData({ where: { id: body.coachId } });
            if (!coach) throw new ErrorHandler(400, 'Coach not found  !');
            coachInfo = coach;
        }

        let dataBody: any; dataBody = body;
        if (file) {
            dataBody = { ...dataBody, foto: "/foto_employee/" + file.filename };
            await minioClient.fPutObject(bucketName, "/foto_employee/" + file.filename, file.path);
            fs.unlinkSync(file.path);
        }

        const t = await mainDb.transaction();
        try {
            let history: any; history = infoEmployee.logHistory == null ? [] : infoEmployee.logHistory;
            history.unshift({
                message: "Employee Updated",
                created_at: new Date(),
                created_by: identity.email,
                data: dataBody
            })


            const updatePph = await this.employeeRepo.updateData({
                ...dataBody,
                logHistory: history,
                updatedBy: identity.id
            }, { where: { id: infoEmployee.id }, transaction: t });

            if (updatePph) {
                await t.commit();
            }

        } catch (error) {
            console.log(error)
            await t.rollback();
            try {
                if (file.filename != undefined) {
                    await minioClient.removeObject(bucketName, "/foto_employee/" + file.filename);
                }
            } catch (errorRmDoc) { }
            throw new ErrorHandler(400, 'Error when update  employee !');
        }
    }

    //==========================================ADMINISTRATOR====================================

    async handleGetEmployeeAll(identity: TokenPayload, pagination: EmployeeSearchType): Promise<any> {

        let JSON_FILTER: any; JSON_FILTER = { where: { companyId: identity.companySelected?.id } };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
                                ]
                            }
                        ]
                    }
                };
            }
        }

        const employeeInfo = await this.employeeRepo.getAllData(JSON_FILTER);
        return employeeInfo;
    }


    async handleGetEmployee(identity: TokenPayload, pagination: EmployeePaginationType): Promise<any> {


        let JSON_FILTER: any; JSON_FILTER = { where: { companyId: identity.companySelected?.id } };
        if (pagination.search != null && pagination.search != "") {
            JSON_FILTER = {
                where: {
                    [Op.and]: [
                        { companyId: identity.companySelected?.id },
                        {
                            [Op.or]: [
                                { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
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
                            { companyId: identity.companySelected?.id },
                            {
                                [Op.or]: [
                                    { nik: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { fullname: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noTelp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { noHp: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { email: { [Op.iLike]: "%" + pagination.search + "%" } },
                                    { address: { [Op.iLike]: "%" + pagination.search + "%" } }
                                ]
                            }
                        ]
                    }
                };
            }
        }

        const employeeInfo = await this.employeeRepo.getPaginationDataSearch(
            JSON_FILTER,
            {
                page: pagination.page,
                pageSize: pagination.pageSize,
                softDeleted: false,
            },
        );

        return {
            rows: employeeInfo.rows,
            total: employeeInfo.count
        };
    }

    async handleGetEmployeeById(identity: TokenPayload, id: string): Promise<any> {
        let infoEmployee = await this.employeeRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');

        return infoEmployee
    }

    async handleCreateEmployee(
        identity: TokenPayload,
        body: CreateEmployeeAttributeBody,
        file: Express.Multer.File
    ): Promise<any> {


        let employeeUniqueInfo = await this.employeeRepo.getSingleData({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { nik: body.nik },
                            { email: body.email }
                        ]
                    },
                    { companyId: identity.companySelected?.id }
                ]
            }
        });
        if (employeeUniqueInfo) throw new ErrorHandler(400, 'Nik or email  already exities !');

        let coachInfo: any; coachInfo = undefined;
        if (body.coachId != undefined && body.coachId != null) {
            const coach = await this.employeeRepo.getSingleData({ where: { id: body.coachId } });
            if (!coach) throw new ErrorHandler(400, 'Coach not found  !');
            coachInfo = coach;
        }

        // let organizationInfo = await this.organizationRepo.getSingleData({
        //     where: {
        //         [Op.and]: [
        //             { companyId: identity.companySelected?.id },
        //             { code: body.organizationCode },
        //             { organizationType: "POSITION" }
        //         ]
        //     }
        // });

        // if (!organizationInfo) throw new ErrorHandler(400, 'Organization Position not found  !');

        let dataBody: any; dataBody = body;
        if (file) {
            dataBody = { ...dataBody, foto: "/foto_employee/" + file.filename };
            await minioClient.fPutObject(bucketName, "/foto_employee/" + file.filename, file.path);
            fs.unlinkSync(file.path);
        }


        const t = await mainDb.transaction();
        try {


            const createEmployee = await this.employeeRepo.insertNewData({
                createdBy: identity.id,
                ...dataBody,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected,
                logHistory: [{
                    message: "Employee Created",
                    created_at: new Date(),
                    created_by: identity.email,
                    data: dataBody
                }],
            }, { transaction: t });

            if (createEmployee) {
                await t.commit();
            }


        } catch (error) {
            console.log(error)
            try {
                if (file.filename != undefined) {
                    await minioClient.removeObject(bucketName, "/foto_employee/" + file.filename);
                }
            } catch (errorRmDoc) { }
            await t.rollback();
            throw new ErrorHandler(400, 'Error when create  employee !');
        }
    }

    async handleUpdateEmployee(
        identity: TokenPayload,
        id: string,
        body: UpdateEmployeeAttributeBody,
        file: Express.Multer.File
    ): Promise<any> {

        const infoEmployee = await this.employeeRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');


        let coachInfo: any; coachInfo = undefined;
        if (body.coachId != undefined && body.coachId != null) {
            const coach = await this.employeeRepo.getSingleData({ where: { id: body.coachId } });
            if (!coach) throw new ErrorHandler(400, 'Coach not found  !');
            coachInfo = coach;
        }



        let dataBody: any; dataBody = body;
        if (file) {
            dataBody = { ...dataBody, foto: "/foto_employee/" + file.filename };
            await minioClient.fPutObject(bucketName, "/foto_employee/" + file.filename, file.path);
            fs.unlinkSync(file.path);
        }

        const t = await mainDb.transaction();
        try {
            let history: any; history = infoEmployee.logHistory == null ? [] : infoEmployee.logHistory;
            history.unshift({
                message: "Employee Updated",
                created_at: new Date(),
                created_by: identity.email,
                data: dataBody
            })


            const updatePph = await this.employeeRepo.updateData({
                ...dataBody,
                companyId: identity.companySelected?.id,
                companyInfo: identity.companySelected,
                logHistory: history,
                updatedBy: identity.id
            }, { where: { id: infoEmployee.id }, transaction: t });

            if (updatePph) {
                await t.commit();
            }

        } catch (error) {
            console.log(error)
            await t.rollback();
            try {
                if (file.filename != undefined) {
                    await minioClient.removeObject(bucketName, "/foto_employee/" + file.filename);
                }
            } catch (errorRmDoc) { }
            throw new ErrorHandler(400, 'Error when update  employee !');
        }
    }

    async handleDeleteEmployee(
        identity: TokenPayload,
        id: string
    ): Promise<any> {
        let infoEmployee = await this.employeeRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');

        const t = await mainDb.transaction();
        try {
            await this.employeeRepo.deleteData({ where: { id: id }, transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  employee !');
        }
    }

    async handleSetEmployeeUser(
        identity: TokenPayload,
        id: string,
        body: UserReferanceAttributeBody
    ): Promise<any> {
        let infoUser = await this.userRepo.getSingleData({
            where: { id: body.user_id }
        });
        if (!infoUser) throw new ErrorHandler(400, 'User not found !');

        let infoEmployee = await this.employeeRepo.getSingleData({
            where: { id: id, companyId: identity.companySelected?.id }
        });
        if (!infoEmployee) throw new ErrorHandler(400, 'Employee not found !');

        const t = await mainDb.transaction();
        try {
            const updateEmployeeUser = await this.employeeRepo.updateData({
                userId: infoUser.id,
                updatedBy: identity.id
            }, { where: { id: id }, transaction: t });

            if (updateEmployeeUser) {
                await t.commit();
            }

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update  employee user reference !');
        }
    }


}
export default EmployeeHandler;