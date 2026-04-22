// import { Op, where } from "sequelize";
// import { TokenPayload } from "../../../middleware/Authentication";
// import UserRepository from "../../../models/repository/credentials/UserRepository";
// import UserRoleRepository from "../../../models/repository/credentials/UserRoleRepository";
// import UsersDetailRepository from "../../../models/repository/credentials/UsersDetailRepository";
// import MasterRoleRepository from "../../../models/repository/master/MasterRoleRepository";
// import { ChangePasswordAttributeAttributeBody, CreateRoleUserAttributeBody, CreateUserAttributeBody, UpdateUserStatusAttributeBody, UsersAllType, UsersPaginationType } from "./Request";
// import Users from "../../../models/entity/credentials/Users";
// import ErrorHandler, { TransactionErrorHandler } from "../../../middleware/ErrorHandler";
// import { mainDb } from '../../../config/DBConfig';
// import { identity } from "lodash";
// import StringUtility from "../../../utility/StringUtility";
// import GeneralConfig from "../../../config/GeneralConfig";
// import EmailTransactionRepository from "../../../models/repository/transaction/EmailTransactionRepository";
// import UserRoles, { UserRolesCreationAttributes } from "../../../models/entity/credentials/UserRole";
// import Roles from "../../../models/entity/master/MasterRole";
// import UsersAssigment from "../../../models/entity/credentials/UsersAssigment";
// import EmailConfig from "../../../config/EmailConfig";

import { Op } from "sequelize";
import { mainDb } from "../../../config/DBConfig";
import EmailConfig from "../../../config/EmailConfig";
import GeneralConfig from "../../../config/GeneralConfig";
import { TokenPayload } from "../../../middleware/Authentication";
import ErrorHandler, { TransactionErrorHandler } from "../../../middleware/ErrorHandler";
import UserRoles, { UserRolesCreationAttributes } from "../../../models/entity/credentials/UserRole";
import Employee from "../../../models/entity/master/Employee";
import Roles from "../../../models/entity/master/MasterRole";
import UserRepository from "../../../models/repository/credentials/UserRepository";
import UserRoleRepository from "../../../models/repository/credentials/UserRoleRepository";
import MasterRoleRepository from "../../../models/repository/master/MasterRoleRepository";
import StringUtility from "../../../utility/StringUtility";
import { ChangeCompanyAttributeBody, ChangePasswordAttributeAttributeBody, ChangeTokenGcpAttributeAttributeBody, CreateRoleUserAttributeBody, CreateUserAttributeBody, UpdateUserAttributeBody, UpdateUserStatusAttributeBody, UsersAllType, UsersPaginationType } from "./Request";
import bcrypt from 'bcryptjs';
import EmployeeRepository from "../../../models/repository/master/EmployeeRepository";
import { AuthUserResponseInterface } from "../auth/Response";
import CompanyUser from "../../../models/entity/master/CompanyUser";
import Users from "../../../models/entity/credentials/Users";
import CompanyUserRepository from "../../../models/repository/master/CompanyUserRepository";

class UsersHandler {

    private usersRepo = UserRepository
    private userRoleRepo = UserRoleRepository;
    private masterRoleRepo = MasterRoleRepository;
    private employeeRepo = EmployeeRepository;
    private companyUserRepo = CompanyUserRepository;
    private emailConfig = new EmailConfig;



    async handleGetUsersSelect(identity: TokenPayload, query: UsersAllType): Promise<any> {
        const usersInfo = await this.usersRepo.getAllData({
            where: {
                [Op.and]: [
                    { isSuper: false }
                ]
            },
            attributes: ["id", "fullname"],
            include: [
                {
                    model: Employee, attributes: ["id", "foto", "email", "fullname"]
                },
                {
                    model: CompanyUser, attributes: ["id", "companyId", "userId"], required: true, where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id }
                        ]
                    }
                }
            ]
        });

        let dataUser: any; dataUser = [];
        for (let rawUser of usersInfo) {
            dataUser.push({
                id: rawUser.id,
                fullname: rawUser.fullname,
                email: rawUser.email,
                employee: rawUser.employee
            });
        }
        return dataUser;
    }


    async handleGetUsers(identity: TokenPayload, pagination: UsersPaginationType): Promise<any> {

        const usersInfo = await this.usersRepo.getPaginationData(pagination,
            {
                where: {
                    [Op.and]: [
                        { isSuper: false }
                    ]
                }, include: [
                    {
                        model: UserRoles, attributes: ["id", "roleId"], include: [
                            { model: Roles, attributes: ["id", "name"] },
                        ]
                    },
                    { model: Employee, attributes: ["id", "foto", "nik", "fullname", "email"] },
                    {
                        model: CompanyUser, attributes: ["id", "companyId", "userId"], required: true, where: {
                            [Op.and]: [
                                { companyId: identity.companySelected?.id }
                            ]
                        }
                    }
                ]
            },
        );
        return {
            rows: usersInfo.rows,
            total: usersInfo.count
        };
    }

    async handleGetUserById(identity: TokenPayload, id: string): Promise<any> {
        let infoUser = await this.usersRepo.getSingleData({
            where: {
                [Op.and]: [
                    { isSuper: false },
                    { id: id }
                ]
            },
            include: [
                {
                    model: UserRoles, attributes: ["id", "roleId"], include: [
                        { model: Roles, attributes: ["id", "name"] },
                    ]
                },
                { model: Employee, attributes: ["id", "foto", "nik", "fullname", "email"] },
                {
                    model: CompanyUser, attributes: ["id", "companyId", "userId"], required: true, where: {
                        [Op.and]: [
                            { companyId: identity.companySelected?.id }
                        ]
                    }
                }
            ]
        });
        if (!infoUser) throw new ErrorHandler(400, 'Users not found !');
        return infoUser;
    }


    async handleCreateUser(
        identity: TokenPayload,
        body: CreateUserAttributeBody
    ): Promise<any> {

        const foundUser = await this.usersRepo.getSingleData({ where: { email: body.email } });
        if (foundUser) throw new ErrorHandler(400, 'User emai already exities !');

        if (body.password == "" || body.password == undefined || body.password.length < 8) {
            throw new ErrorHandler(400, 'Password must be at least 8 characters !');
        }


        if (identity.companySelected == undefined) {
            throw new ErrorHandler(400, 'Please selected company before create user !');
        }

        const t = await mainDb.transaction();
        try {

            const passwordGenerate = body.password;
            const passwordDefault = bcrypt.hashSync(passwordGenerate, GeneralConfig.ENCRYPTION_SALT);
            let verificationCode = StringUtility.generateRandomCode(12);
            let dateNow = new Date();
            dateNow.setDate(dateNow.getDate() + 1);
            let dateTimemilis = dateNow.getTime();
            let encodedDate = btoa(dateTimemilis.toString());
            let linkVerification = verificationCode + encodedDate;

            //generate verification code
            let findVerifiedCode = true;
            while (findVerifiedCode) {
                const findAlreadyCode = await this.usersRepo.getSingleData({
                    where: {
                        verifCode: linkVerification
                    },
                    attributes: ['id'],
                });

                if (!findAlreadyCode) {
                    findVerifiedCode = false;
                    let verificationCode = StringUtility.generateRandomCode(12);
                    dateNow = new Date();
                    dateNow.setDate(dateNow.getDate() + 1);
                    dateTimemilis = dateNow.getTime();
                    encodedDate = btoa(dateTimemilis.toString());
                    linkVerification = verificationCode + encodedDate;
                }
            }


            const userCreated = await this.usersRepo.insertNewData({
                createdBy: identity.id,
                fullname: body.fullname,
                address: body.address,
                noTelp: body.noTelp,
                email: body.email,
                passwordDefault: passwordGenerate,
                password: passwordDefault,
                verifCode: linkVerification,
                userType: "COMPANY",
                status: "NEED VERIFICATION",
            }, { transaction: t });

            if (userCreated) {

                await this.companyUserRepo.insertNewData({
                    companyId: identity.companySelected.id,
                    userId: userCreated.id,
                    createdBy: identity.id,
                }, { transaction: t });

                await this.emailConfig.createEmailSender([{
                    sendSubject: "VERIFICATION ACCOUNT",
                    sendTo: userCreated.email,
                    sendType: "VERIFICATION ACCOUNT",
                    sendParam: {
                        APP_NAME: GeneralConfig.APP_NAME,
                        USERNAME: userCreated.email,
                        RECEIVER_NAME: userCreated.fullname,
                        URL_TARGET: GeneralConfig.URL_VERIFY_ACCOUNT + "/" + linkVerification,
                        WEB_URL: GeneralConfig.WEB_URL ?? '',
                        VERIFICATION_CODE: linkVerification ?? '',
                        ENTITY_EMAIL_NAME: GeneralConfig.ENTITY_EMAIL_NAME ?? '',
                        CURRENT_YEAR: new Date().getFullYear(),
                        companyId: identity.companySelected.id,
                        companyInfo: identity.companySelected
                    },
                    companyId: identity.companySelected.id,
                    companyInfo: identity.companySelected,
                    createdBy: "SYSTEM",
                }])
                    .then(async result => {
                        await t.commit();
                    }).catch(async err => {
                        throw new TransactionErrorHandler("Error, when send mail token verification, please try again !");
                    });
            }
        } catch (e) {
            await t.rollback();
            throw new ErrorHandler(400, "Error, when create user, please try again !");
        }
    }

    async handleUpdateUser(
        identity: TokenPayload,
        id: string,
        body: UpdateUserAttributeBody
    ): Promise<any> {

        const foundUser = await this.usersRepo.getSingleData({ where: { id: id } });
        if (!foundUser) throw new ErrorHandler(400, 'User  not found !');


        const foundUserEmail = await this.usersRepo.getSingleData({ where: { [Op.and]: [{ email: body.email }, { id: { [Op.ne]: foundUser.id } }] } });
        if (foundUserEmail) throw new ErrorHandler(400, 'User emai already exities !');

        const t = await mainDb.transaction();
        try {

            let bodyData: any; bodyData = { ...body }
            if (body.password != "" && body.password != undefined && body.password != null) {
                const newPassword = bcrypt.hashSync(body.password, GeneralConfig.ENCRYPTION_SALT);
                bodyData = { ...bodyData, password: newPassword }
            }

            const userUpdate = await this.usersRepo.updateData({
                updatedBy: identity.id,
                ...bodyData
            }, { where: { id: foundUser.id }, transaction: t });

            if (userUpdate) {
                await t.commit();
                return userUpdate;
            }

        } catch (errorUpdate) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when crate user !');
        }
    }

    async handleUpdateUserStatus(
        identity: TokenPayload,
        id: string,
        body: UpdateUserStatusAttributeBody
    ): Promise<any> {
        const foundUser = await this.usersRepo.getSingleData({ where: { id: id } });
        if (!foundUser) throw new ErrorHandler(400, 'User  not found !');

        const t = await mainDb.transaction();
        try {

            const userUpdate = await this.usersRepo.updateData({
                status: body.status,
                updatedBy: identity.id
            }, { where: { id: foundUser.id }, transaction: t });

            if (userUpdate) {
                await t.commit();
                return userUpdate;
            }

        } catch (error) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update status user !');
        }
    }

    async handleDeleteUserById(identity: TokenPayload, id: string): Promise<any> {

        const infoUserInfo = await this.usersRepo.getSingleData({ where: { id: id } });
        if (!infoUserInfo) throw new ErrorHandler(400, 'Users info not found !');

        const t = await mainDb.transaction();
        try {
            //delete user detail
            const deleteUser = await this.usersRepo.deleteData({ where: { id: infoUserInfo.id }, transaction: t });
            if (deleteUser) {
                const updateEmployeeLink = await this.employeeRepo.updateData({ userId: null as any }, { where: { userId: infoUserInfo.id }, transaction: t });
                if (updateEmployeeLink) {
                    await t.commit();
                }
            }
        } catch (errUserDetail) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when delete  user detail !');
        }
    }


    async handleSetRoleUser(
        identity: TokenPayload,
        id: string,
        body: CreateRoleUserAttributeBody
    ): Promise<any> {
        const foundUser = await this.usersRepo.getSingleData({ where: { id: id } });
        if (!foundUser) throw new ErrorHandler(400, 'User  not found !');

        let userRole = await this.userRoleRepo.getAllData({ where: { userId: foundUser.id } });
        let existRole: Array<string>; existRole = [];
        for (let roleExist of userRole) {
            existRole.push(roleExist.roleId.toString());
        }


        const avaliableRole = await this.masterRoleRepo.getAllData({ where: { id: { [Op.in]: body.role_id } } });
        let roleAllow: Array<number>; roleAllow = [];
        let roleCreate: Array<UserRolesCreationAttributes>; roleCreate = [];
        for (let rawI of avaliableRole) {
            if (roleAllow.indexOf(rawI.id) == -1) {
                roleAllow.push(rawI.id);
                if (existRole.indexOf(rawI.id.toString()) == -1) {
                    roleCreate.push({
                        userId: foundUser.id,
                        roleId: rawI.id
                    });
                }
            }
        }

        if (roleCreate.length > 0 || roleAllow.length > 0) {
            const t = await mainDb.transaction();
            try {
                try {

                    if (roleAllow.length > 0) {
                        const deleteUserRole = await this.userRoleRepo.deleteData({
                            where: {
                                [Op.and]: [
                                    { userId: foundUser.id },
                                    { roleId: { [Op.notIn]: roleAllow } }
                                ]
                            }, force: true, transaction: t
                        });
                    }

                    const creteRoleUser = await this.userRoleRepo.insertBulkData(roleCreate, { transaction: t });
                    if (creteRoleUser || roleAllow.length > 0) {
                        await t.commit();
                    }
                } catch (error) {
                    throw new ErrorHandler(400, 'Error when delete user role not avaliable !');
                }
            } catch (error) {
                await t.rollback();
                throw new ErrorHandler(400, 'Error when update status user !');
            }
        }
    }

    async handleChangePassword(
        identity: TokenPayload,
        body: ChangePasswordAttributeAttributeBody
    ): Promise<any> {

        if (body.new_password != body.confirm_password) throw new ErrorHandler(403, 'Error, confirm password not same with new password !');

        const foundUser = await this.usersRepo.getSingleData({ where: { id: identity.id } });
        if (!foundUser) throw new ErrorHandler(400, 'Error user not found !');
        switch (foundUser.status) {
            case 'NOT ACTIVED':
                throw new ErrorHandler(403, 'User is inactive');
            case 'BANNED':
                throw new ErrorHandler(403, 'User is banned');
            case 'NEED VERIFICATION':
                throw new ErrorHandler(403, 'User is need verification');
            default:
                break;
        }

        const checkPassword = bcrypt.compareSync(body.old_password!, foundUser.password);
        if (!checkPassword) throw new ErrorHandler(400, 'Old password not valid !');

        const t = await mainDb.transaction();
        try {

            const password = bcrypt.hashSync(body.new_password, GeneralConfig.ENCRYPTION_SALT);
            const updateUser = await this.usersRepo.updateData({
                password: password,
                passwordDefault: password
            }, { where: { id: foundUser.id }, transaction: t });

            if (updateUser) {
                await t.commit()
            }

        } catch (errorChangePassword) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update change password user !');
        }
    }

    async handleChangeTokenGcp(
        identity: TokenPayload,
        body: ChangeTokenGcpAttributeAttributeBody
    ): Promise<any> {

        const foundUser = await this.usersRepo.getSingleData({ where: { id: identity.id } });
        if (!foundUser) throw new ErrorHandler(400, 'Error user not found !');
        switch (foundUser.status) {
            case 'NOT ACTIVED':
                throw new ErrorHandler(403, 'User is inactive');
            case 'BANNED':
                throw new ErrorHandler(403, 'User is banned');
            case 'NEED VERIFICATION':
                throw new ErrorHandler(403, 'User is need verification');
            default:
                break;
        }

        const t = await mainDb.transaction();
        try {

            const updateUser = await this.usersRepo.updateData({
                tokenGcp: body.tokenGcp
            }, { where: { id: foundUser.id }, transaction: t });

            if (updateUser) {
                await t.commit()
            }

        } catch (errorChangeTokenGcp) {
            await t.rollback();
            throw new ErrorHandler(400, 'Error when update change token gcp user !');
        }

    }

    async changeCompany(identity: TokenPayload, body: ChangeCompanyAttributeBody): Promise<any> {

        const findUser = await this.usersRepo.getUserDetail({
            email: identity.email,
        });

        if (!findUser) throw new ErrorHandler(400, 'User not found !');



        let companySelected = { id: "-", code: "-", label: "-" }

        if (findUser.userCompany.length > 0) {
            for (let rawCompanyUser of findUser.userCompany) {
                if (body.companyId == rawCompanyUser.company.id) {
                    companySelected = {
                        id: rawCompanyUser.company.id,
                        code: rawCompanyUser.company.code,
                        label: rawCompanyUser.company.label
                    }
                }
            }
        }

        if (companySelected.id == "-") {
            throw new ErrorHandler(400, 'Error, you not have company available!');
        }

        const employee = await this.employeeRepo.getSingleData({
            where: { userId: findUser.id, companyId: companySelected.id },
        });

        const user: AuthUserResponseInterface = {
            id: findUser.id,
            email: findUser.email,
            lang: findUser.lang ?? 'id',
            isOnline: true,
            lastSignIn: undefined,
            createdAt: findUser.createdAt,
            status: findUser.status,
            userType: findUser.userType,
            employee: employee ? {
                id: employee.id,
                nik: employee.nik,
                foto: employee.foto,
                name: employee.fullname,
            } : undefined,
            role: findUser.roles.map(role => ({
                id: role.role.id,
                name: role.role.name,
            })),
            companyAllow: findUser.userCompany.map(company => ({
                id: company.company.id,
                code: company.company.code,
                label: company.company.label,
            })),
            companySelected: companySelected
        };
        return await this.usersRepo.updateSessionAuthentication(user);
    }



}

export default UsersHandler;
