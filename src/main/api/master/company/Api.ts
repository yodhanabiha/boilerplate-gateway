import express from 'express';
import BaseController from '../../.BaseController';
import { TokenPayload } from '../../../middleware/Authentication';
import CompanyResponse from './Response';
import CompanyHandler from './Handler';

const app = express.Router();

class CompanyController extends BaseController {

    private readonly response = new CompanyResponse();
    private readonly handler = new CompanyHandler();

    router() {
        return app;
    }
}

export default new CompanyController().router();