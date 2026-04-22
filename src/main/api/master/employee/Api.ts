import express from 'express';
import BaseController from '../../.BaseController';
import { TokenPayload } from '../../../middleware/Authentication';
import EmployeeResponse from './Response';
import EmployeeHandler from './Handler';
import { CreateEmployeeAttributeBody, createEmployeeAttributeValidation, EmployeePaginationType, employeePaginationValidation, EmployeeSearchType, employeeSearchValidation, UpdateEmployeeAttributeBody, updateEmployeeAttributeValidation, UpdateEmployeeByEmployeeAttributeBody, updateEmployeeByEmployeeAttributeValidation, UserReferanceAttributeBody, userReferanceAttributeValidation } from './Request';
import { uploadMiddleware, uploadSingleImageMiddleware } from '../../../utility/UploadUtility';

const app = express.Router();

class EmployeeController extends BaseController {

    private readonly response = new EmployeeResponse();
    private readonly handler = new EmployeeHandler();

    router() {

        //===============================================PUBLIC====================================
        app.get(
            '/employee/view/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleGetEmployeeByIdEmployee(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success get employee by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/employee/update/:id',
            updateEmployeeByEmployeeAttributeValidation,
            uploadSingleImageMiddleware,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateEmployeeByEmployeeAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const file = req.file as Express.Multer.File;
                    const result = await this.handler.handleUpdateEmployeeByEmloyee(identity, id, body, file);
                    return this.response.CreatedNewData(
                        res,
                        'Success update employee',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });




        //===============================================ADMIN====================================
        app.get(
            '/employee/admin/views/all',
            employeeSearchValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    if (!req.query.search) req.query.search = "";

                    const query: EmployeeSearchType = {
                        search: req.query.search as any,
                        filter: req.query.filter as any,
                    };
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetEmployeeAll(identity, query);
                    return this.response.OKWithData(
                        res,
                        'Success get employee !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.get(
            '/employee/admin/views',
            employeePaginationValidation,
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

                    const query: EmployeePaginationType = {
                        page: parseInt(req.query.page as string),
                        pageSize: parseInt(req.query.page_size as string),
                        search: req.query.search as any,
                        filter: req.query.filter as any,
                    };
                    query.softDeleted = false;
                    const identity = req.user as TokenPayload;

                    const result = await this.handler.handleGetEmployee(identity, query);
                    return this.response.OKWithDataPagination(
                        res,
                        'Success get employee !',
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
            '/employee/admin/view/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleGetEmployeeById(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success get employee by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/employee/admin/create',
            uploadSingleImageMiddleware,
            createEmployeeAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: CreateEmployeeAttributeBody = { ...req.body };
                    const file = req.file as Express.Multer.File;
                    const result = await this.handler.handleCreateEmployee(identity, body, file);
                    return this.response.OKWithData(
                        res,
                        'Success create employee !',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            }
        );


        app.post(
            '/employee/admin/update/:id',
            updateEmployeeAttributeValidation,
            uploadSingleImageMiddleware,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UpdateEmployeeAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const file = req.file as Express.Multer.File;
                    const result = await this.handler.handleUpdateEmployee(identity, id, body, file);
                    return this.response.CreatedNewData(
                        res,
                        'Success update employee',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        app.delete(
            '/employee/admin/delete/:id',
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const { id } = req.params;

                    const result = await this.handler.handleDeleteEmployee(identity, id);

                    return this.response.OKWithData(
                        res,
                        'Success delete employee by id !',
                        result
                    );

                } catch (error) {
                    next(error);
                }
            },
        );

        app.post(
            '/employee/admin/update/user-reference/:id',
            userReferanceAttributeValidation,
            async (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                try {

                    super.validateRequest(req);
                    const identity = req.user as TokenPayload;
                    const body: UserReferanceAttributeBody = { ...req.body };
                    const { id } = req.params;
                    const result = await this.handler.handleSetEmployeeUser(identity, id, body);
                    return this.response.CreatedNewData(
                        res,
                        'Success update employee user reference',
                        result,
                    );

                } catch (error) {
                    next(error);
                }
            });

        return app;
    }
}

export default new EmployeeController().router();