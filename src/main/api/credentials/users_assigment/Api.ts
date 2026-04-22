import BaseController from "../../.BaseController";
import express from 'express';
import UsersAssigmentResponse from "./Response";
import UsersAssigmentHandler from "./Handler";
import { CreateUserAssigmentAttributeBody, createUserAssigmentAttributeValidation, UsersAssigmentAllType, usersAssigmentAllValidation, UsersAssigmentPaginationType, usersAssigmentPaginationValidation } from "./Request";
import { TokenPayload } from "../../../middleware/Authentication";

const app = express.Router();

class UsersAssigmentController extends BaseController {

  private readonly response = new UsersAssigmentResponse();
  private readonly handler = new UsersAssigmentHandler();

  router() {

    app.get(
        '/users-assigment/views/all',
        usersAssigmentAllValidation,
        async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        ) => {
        try {
                            
            super.validateRequest(req);
            if (!req.query.filter) req.query.filter = "{}";
            if (!req.query.search) req.query.search = "";

            const query: UsersAssigmentAllType = {
                search: req.query.search as any,
                filter: req.query.filter as any,
            };
            const identity = req.user as TokenPayload;

            const result = await this.handler.handleGetUsersAssigmentAll(identity, query);
            return this.response.OKWithData(
                res,
                'Success get users assigment all !',
                result
            );
            
        } catch (error) {
            next(error);
        }
        },
    );
    
    
    app.get(
        '/users-assigment/views',
        usersAssigmentPaginationValidation,
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
    
                const query: UsersAssigmentPaginationType = {
                    page: parseInt(req.query.page as string),
                    pageSize: parseInt(req.query.page_size as string),
                    search: req.query.search as any,
                    filter: req.query.filter as any,
                };
                query.softDeleted = false;
                const identity = req.user as TokenPayload;

                const result = await this.handler.handleGetUsersAssigment(identity, query);

                return this.response.OKWithDataPagination(
                    res,
                    'Success get users assigment!',
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
        '/users-assigment/view/:id',
        async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        ) => {
            try {
                
                super.validateRequest(req);
                const identity = req.user as TokenPayload;
                const {id} = req.params;

                const result = await this.handler.handleGetUserAssigmentById(identity, id);

                return this.response.OKWithData(
                    res,
                    'Success get user assigment by id !',
                    result
                );
                
            } catch (error) {
                next(error);
            }
        },
    );
    
    app.post(
        '/users-assigment/create',
        createUserAssigmentAttributeValidation,
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
            try {

                super.validateRequest(req);
                const identity = req.user as TokenPayload;
                const body: CreateUserAssigmentAttributeBody = {...req.body};
                const result = await this.handler.handleCreateUserAssigment(identity,body);
                return this.response.CreatedNewData(
                    res,
                    'Success created users assigment',
                    result,
                );

            } catch (error) {
                next(error);
            }
    });
    
    app.post(
        '/users-assigment/update/:id',
        createUserAssigmentAttributeValidation,
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {

            super.validateRequest(req);
            const identity = req.user as TokenPayload;
            const body: CreateUserAssigmentAttributeBody = {...req.body};
            const {id} = req.params;
            const result = await this.handler.handleUpdateUserAssigment(identity,body,id);
            return this.response.CreatedNewData(
                res,
                'Success update users assigment',
                result,
            );

        } catch (error) {
            next(error);
        }
    });
    
   
    
    app.delete(
        '/users-assigment/delete/:id',
        async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        ) => {
            try {
                
                super.validateRequest(req);
                const identity = req.user as TokenPayload;
                const {id} = req.params;

                const result = await this.handler.handleDeleteUsersAssigment(identity, id);

                return this.response.OKWithData(
                    res,
                    'Success delete user assigment by id !',
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

export default new UsersAssigmentController().router();