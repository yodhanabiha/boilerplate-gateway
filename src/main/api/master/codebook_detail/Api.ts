import express from 'express';
import BaseController from '../../.BaseController';
import { TokenPayload } from '../../../middleware/Authentication';
import CodebookDetailResponse from './Response';
import CodebookDetailHandler from './Handler';
import { CodebookDetailAllType, codebookDetailAllValidation, CodebookDetailPaginationType, codebookDetailPaginationValidation, CreateCodebookDetailAttributeBody, createCodebookDetailAttributeValidation } from './Request';

const app = express.Router();

class CodebookDetailController extends BaseController {

  private readonly response = new CodebookDetailResponse();
  private readonly handler = new CodebookDetailHandler();

  router() {
    app.get(
      '/codebook-detail/views/all/:code',
      codebookDetailAllValidation,
      async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
      ) => {
        try {
                          
            super.validateRequest(req);
            if (!req.query.filter) req.query.filter = "{}";
            if (!req.query.search) req.query.search = "";
            const {code} = req.params;

            const query: CodebookDetailAllType = {
              search: req.query.search as any,
              filter: req.query.filter as any,
            };
            const identity = req.user as TokenPayload;

            const result = await this.handler.handleGetCodebookDetailAll(identity, code, query);
            return this.response.OKWithData(
              res,
              'Success get codebook detail all !',
              result
            );
            
        } catch (error) {
            next(error);
        }
      },
    );

    app.get(
      '/codebook-detail/views/:code',
      codebookDetailPaginationValidation,
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
            const {code} = req.params;

            const query: CodebookDetailPaginationType = {
                page: parseInt(req.query.page as string),
                pageSize: parseInt(req.query.page_size as string),
                search: req.query.search as any,
                filter: req.query.filter as any,
            };
            query.softDeleted = false;
            const identity = req.user as TokenPayload;

            const result = await this.handler.handleGetCodebookDetail(identity,code, query);
            return this.response.OKWithDataPagination(
                res,
                'Success get codebook detail !',
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
      '/codebook-detail/view/:id',
      async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
      ) => {
          try {
              
              super.validateRequest(req);
              const identity = req.user as TokenPayload;
              const {id} = req.params;

              const result = await this.handler.handleGetCodebookDetailById(identity, Number(id));

              return this.response.OKWithData(
                res,
                'Success get codebook detail by id !',
                result
              );
              
          } catch (error) {
              next(error);
          }
      },
    );

    app.post(
        '/codebook-detail/create/:id',
        createCodebookDetailAttributeValidation,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
        try {

            super.validateRequest(req);
            const identity = req.user as TokenPayload;
              const {id} = req.params;
            const body: CreateCodebookDetailAttributeBody = {...req.body};
            const result = await this.handler.handleCreateCodebookDetail(identity,Number(id),body);
            return this.response.CreatedNewData(
                res,
                'Success created codebook detail',
                result,
            );

        } catch (error) {
            next(error);
        }
    });
    
    app.post(
        '/codebook-detail/update/:id',
        createCodebookDetailAttributeValidation,
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {

            super.validateRequest(req);
            const identity = req.user as TokenPayload;
            const body: CreateCodebookDetailAttributeBody = {...req.body};
            const {id} = req.params;
            const result = await this.handler.handleUpdateCodebookDetail(identity,Number(id),body);
            return this.response.CreatedNewData(
                res,
                'Success update codebook detail',
                result,
            );

        } catch (error) {
            next(error);
        }
    });

    app.delete(
        '/codebook-detail/delete/:id',
    async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    ) => {
        try {
            
        super.validateRequest(req);
        const identity = req.user as TokenPayload;
        const {id} = req.params;

        const result = await this.handler.handleDeleteCodebookDetail(identity, Number(id));
        return this.response.OKWithData(
            res,
            'Success delete codebook detail by id !',
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

export default new CodebookDetailController().router();