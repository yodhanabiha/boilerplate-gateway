import express from 'express';
import BaseController from '../../.BaseController';
import RolesResponse from './Response';
import RolesHandler from './Handler';
import { TokenPayload } from '../../../middleware/Authentication';
import MenuItemsResponse from './Response';
import MenuItemsHandler from './Handler';
import { CreateMenuItemsAttributeBody, createMenuItemsAttributeValidation, MenuItemsPaginationType, menuItemsPaginationValidation, MenuItemsPathType, menuItemsPathValidation, MenuItemsSearchType, menuItemsSearchValidation, StatusAttributeBody, statusAttributeValidation, UpdateMenuItemsAttributeBody, updateMenuItemsAttributeValidation, UpdateRoleMenuActionAttributeBody, updateRoleMenuActionAttributeValidation } from './Request';

const app = express.Router();

class MenuItemsController extends BaseController {

    private readonly response = new MenuItemsResponse();
    private readonly handler = new MenuItemsHandler();

    router() {

        app.get(
            '/menu-items/views',
            menuItemsSearchValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.search) req.query.search = "";

                    const query: MenuItemsSearchType = {
                        search: req.query.search as any,
                    };
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetMenuItems(identity, query);

                    return this.response.OKWithData(
                        res,
                        'Success get menu items !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/menu-items/view/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleGetMenuItemsById(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success get menuitems by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/menu-items/create',
            createMenuItemsAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateMenuItemsAttributeBody = { ...req.body };
                    const result = await this.handler.handleCreateMenuItems(identity, body);
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
            '/menu-items/update/:id',
            updateMenuItemsAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateMenuItemsAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateMenuItems(identity, Number(id), body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update menu items',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.post(
            '/menu-items/update-active/:id',
            statusAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: StatusAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateMenuItemsStatus(identity, Number(id), body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update menu items active',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });


        app.delete(
            '/menu-items/delete/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleDeleteMenuItems(identity, Number(id));

                    return this.response.OKWithData(
                        res,
                        'Success delete menu items by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/menu-items/view-by-role/:id',
            menuItemsSearchValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const { id } = req.params;
                    if (!req.query.search) req.query.search = "";

                    const query: MenuItemsSearchType = {
                        search: req.query.search as any,
                    };
                    const identity = req.user as TokenPayload;


                    const result = await this.handler.handleGetMenuItemsByRole(identity, query, Number(id));

                    return this.response.OKWithData(
                        res,
                        'Success get menuitems by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/menu-items/view-by-role/update/:id',
            updateRoleMenuActionAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateRoleMenuActionAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleUpdateMenuItemsByRole(identity, Number(id), body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update menu role items',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.get(
            '/menu-items/view-menu-user',
            menuItemsSearchValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.search) req.query.search = "";

                    const query: MenuItemsSearchType = {
                        search: req.query.search as any,
                    };
                    const identity = req.user as TokenPayload;


                    const result = await this.handler.handleGetMenuItemsByUser(identity, query);

                    return this.response.OKWithData(
                        res,
                        'Success get menu items user !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/menu-items/view-menu-detail-user',
            menuItemsPathValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.search) req.query.search = "";

                    const query: MenuItemsPathType = {
                        path_name: req.query.path_name as any,
                    };
                    const identity = req.user as TokenPayload;


                    const result = await this.handler.handleGetDetailMenuItemsByUser(identity, query);

                    return this.response.OKWithData(
                        res,
                        'Success get menu items detail user !',
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

export default new MenuItemsController().router();