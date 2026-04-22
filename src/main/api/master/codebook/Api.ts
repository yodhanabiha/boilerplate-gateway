import express from 'express';
import BaseController from '../../.BaseController';
import { TokenPayload } from '../../../middleware/Authentication';
import CodebookResponse from './Response';
import CodebookHandler from './Handler';
import { CodebookAllType, codebookAllValidation, CodebookPaginationType, codebookPaginationValidation, CreateCodebookAttributeBody, createCodebookAttributeValidation } from './Request';

const app = express.Router();

class CodebookController extends BaseController {

  private readonly response = new CodebookResponse();
  private readonly handler = new CodebookHandler();

  router() {
    app.get(
      '/codebook/views/all',
      codebookAllValidation,
      async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
      ) => {
        try {
                          
            super.validateRequest(req);
            if (!req.query.filter) req.query.filter = "{}";
            if (!req.query.search) req.query.search = "";

            const query: CodebookAllType = {
              search: req.query.search as any,
              filter: req.query.filter as any,
            };
            const identity = req.user as TokenPayload;

            const result = await this.handler.handleGetCodebookAll(identity, query);
            return this.response.OKWithData(
              res,
              'Success get codebook all !',
              result
            );
            
        } catch (error) {
            next(error);
        }
      },
    );

    app.get(
      '/codebook/views',
      codebookPaginationValidation,
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

            const query: CodebookPaginationType = {
                page: parseInt(req.query.page as string),
                pageSize: parseInt(req.query.page_size as string),
                search: req.query.search as any,
                filter: req.query.filter as any,
            };
            query.softDeleted = false;
            const identity = req.user as TokenPayload;

            const result = await this.handler.handleGetCodebook(identity, query);
            return this.response.OKWithDataPagination(
                res,
                'Success get codebook !',
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
      '/codebook/view/:code',
      async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
      ) => {
          try {
              
              super.validateRequest(req);
              const identity = req.user as TokenPayload;
              const {code} = req.params;

              const result = await this.handler.handleGetCodebookById(identity, code);

              return this.response.OKWithData(
                res,
                'Success get codebook  by code !',
                result
              );
              
          } catch (error) {
              next(error);
          }
      },
    );

    app.post(
        '/codebook/create',
        createCodebookAttributeValidation,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
        try {

            super.validateRequest(req);
            const identity = req.user as TokenPayload;
            const body: CreateCodebookAttributeBody = {...req.body};
            const result = await this.handler.handleCreateCodebook(identity,body);
            return this.response.CreatedNewData(
                res,
                'Success created codebook',
                result,
            );

        } catch (error) {
            next(error);
        }
    });
    
    app.post(
        '/codebook/update/:id',
        createCodebookAttributeValidation,
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        try {

            super.validateRequest(req);
            const identity = req.user as TokenPayload;
            const body: CreateCodebookAttributeBody = {...req.body};
            const {id} = req.params;
            const result = await this.handler.handleUpdateCodebook(identity,Number(id),body);
            return this.response.CreatedNewData(
                res,
                'Success update codebook',
                result,
            );

        } catch (error) {
            next(error);
        }
    });

    app.delete(
        '/codebook/delete/:id',
    async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    ) => {
        try {
            
        super.validateRequest(req);
        const identity = req.user as TokenPayload;
        const {id} = req.params;

        const result = await this.handler.handleDeleteCodebook(identity, Number(id));
        return this.response.OKWithData(
            res,
            'Success delete codebook by id !',
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

export default new CodebookController().router();