
// import BaseController from '../../.BaseController';
// import UsersHandler from './Handler';
// import UsersResponse from './Response';
// import { ChangePasswordAttributeAttributeBody, changePasswordattributeValidation, CreateRoleUserAttributeBody, createRoleUserAttributeValidation, CreateUserAttributeBody, createUserAttributeValidation, UpdateUserStatusAttributeBody, updateUserStatusAttributeValidation, UsersAllType, usersAllValidation, UsersPaginationType, usersPaginationValidation } from './Request';
// import { TokenPayload } from '../../../middleware/Authentication';

import express from 'express';
import BaseController from '../../.BaseController';
import UsersResponse from './Response';
import UsersHandler from './Handler';
import { ChangeCompanyAttributeBody, changeCompanyAttributeValidation, ChangePasswordAttributeAttributeBody, changePasswordattributeValidation, ChangeTokenGcpAttributeAttributeBody, changeTokenGcpattributeValidation, CreateRoleUserAttributeBody, createRoleUserAttributeValidation, CreateUserAttributeBody, createUserAttributeValidation, UpdateUserAttributeBody, updateUserAttributeValidation, UpdateUserStatusAttributeBody, updateUserStatusAttributeValidation, UsersAllType, usersAllValidation, UsersPaginationType, usersPaginationValidation } from './Request';
import { TokenPayload } from '../../../middleware/Authentication';
const app = express.Router();

class UsersController extends BaseController {

    private readonly response = new UsersResponse();
    private readonly handler = new UsersHandler();

    router() {

        app.get(
            '/users/views/select-option',
            usersAllValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.filter) req.query.filter = "{}";
                    if (!req.query.search) req.query.search = "";

                    const query: UsersAllType = {
                        search: req.query.search as any,
                        filter: req.query.filter as any,
                    };
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetUsersSelect(identity, query);
                    return this.response.OKWithData(
                        res,
                        'Success get users selected !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            }
        );

        app.get(
            '/users/views',
            usersPaginationValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.filter) req.query.filter = "{}";
                    if (!req.query.page) req.query.page = '1';
                    if (!req.query.page_size) req.query.page_size = '10';
                    if (!req.query.search) req.query.search = "";

                    const query: UsersPaginationType = {
                        page: parseInt(req.query.page as string),
                        pageSize: parseInt(req.query.page_size as string),
                        search: req.query.search as any,
                        filter: req.query.filter as any,
                    };
                    query.softDeleted = false;
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetUsers(identity, query);

                    return this.response.OKWithDataPagination(
                        res,
                        'Success get users !',
                        result.rows,
                        query,
                        result.total,
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/users/view/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleGetUserById(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success get user by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/users/create',
            createUserAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateUserAttributeBody = { ...req.body };
                    const result = await this.handler.handleCreateUser(identity, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success created users',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/users/update/:id',
            updateUserAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateUserAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateUser(identity, id, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update users',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/users/update/status/:id',
            updateUserStatusAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateUserStatusAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateUserStatus(identity, id, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update users status',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.delete(
            '/users/delete/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleDeleteUserById(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success delete user by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );


        app.post(
            '/users/set/role/:id',
            createRoleUserAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateRoleUserAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleSetRoleUser(identity, id, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success set users role',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/users/change-password',
            changePasswordattributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: ChangePasswordAttributeAttributeBody = { ...req.body };

                    const result = await this.handler.handleChangePassword(identity, body);
                    return this.response.OK(
                        res,
                        'Success change password !'
                    );

                } catch (error) {
                    next(error);
                }
            });


        app.post(
            '/users/change-token-gcp',
            changeTokenGcpattributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: ChangeTokenGcpAttributeAttributeBody = { ...req.body };

                    const result = await this.handler.handleChangeTokenGcp(identity, body);
                    return this.response.OK(
                        res,
                        'Success change token gcp !'
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/users/change-company-selected',
            changeCompanyAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {
                    super.validateRequest(req);

                    const identity = req.user as TokenPayload;
                    const body: ChangeCompanyAttributeBody = { ...req.body };

                    const result = await this.handler.changeCompany(identity, body);
                    return this.response.OK(res, 'Success change company', result);
                } catch (error) {
                    next(error);
                }
            },
        );

        return app;
    }
}

export default new UsersController().router();

