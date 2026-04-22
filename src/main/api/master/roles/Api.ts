import express from 'express';
import BaseController from '../../.BaseController';
import RolesResponse from './Response';
import RolesHandler from './Handler';
import { CreateRoleAttributeBody, createRoleAttributeValidation, RolesPaginationType, rolesPaginationValidation } from './Request';
import { TokenPayload } from '../../../middleware/Authentication';

const app = express.Router();

class RolesController extends BaseController {

    private readonly response = new RolesResponse();
    private readonly handler = new RolesHandler();

    router() {
        app.get(
            '/roles/select-option',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetRolesOption(identity);

                    return this.response.OKWithData(
                        res,
                        'Success get roles option !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/roles/views',
            rolesPaginationValidation,
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

                    const query: RolesPaginationType = {
                        page: parseInt(req.query.page as string),
                        pageSize: parseInt(req.query.page_size as string),
                        search: req.query.search as any,
                        filter: req.query.filter as any,
                    };
                    query.softDeleted = false;
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetRoles(identity, query);

                    return this.response.OKWithDataPagination(
                        res,
                        'Success get roles !',
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
            '/roles/view/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleGetRoleById(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success get role by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/roles/create',
            createRoleAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateRoleAttributeBody = { ...req.body };
                    const result = await this.handler.handleCreateRole(identity, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success created role',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/roles/update/:id',
            createRoleAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateRoleAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateRole(identity, id, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update role',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.delete(
            '/roles/delete/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleDeleteRole(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success delete role by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );



        return app;
    }
}

export default new RolesController().router();