import express from 'express';
import BaseController from '../../.BaseController';
import {
  ForgotPassReqAttributeBody,
  forgotPassReqAttributeValidation,
  LoginAttributeBody,
  loginAttributeValidation,
  VerificationAccountAttributeBody,
  verifikasiAccountAttributeValidation,
} from './Request';
import AuthHandler from './Handler';
import {
  RefreshToken,
  TokenPayload,
  authenticate,
  refresh,
} from '../../../middleware/Authentication';
import AuthResponse from './Response';

const app = express.Router();

class AuthController extends BaseController {
  private readonly response = new AuthResponse();
  private readonly handler = new AuthHandler();

  router() {

    app.post(
      '/login',
      loginAttributeValidation,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          super.validateRequest(req);
          const body: LoginAttributeBody = { ...req.body };

          const result = await this.handler.handleLogin(body);
          return this.response.OK(res, 'Success login', result);
        } catch (error) {
          next(error);
        }
      },
    );

    app.post(
      '/logout',
      authenticate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          const identity: TokenPayload | RefreshToken = req.user;

          await this.handler.handleLogout(identity);
          return this.response.OK(res, 'Success');
        } catch (error) {
          next(error);
        }
      },
    );

    app.post(
      '/refresh',
      refresh,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          const identity: RefreshToken = req.user;

          const data = await this.handler.handleRefreshToken(identity);
          return this.response.OK(res, 'Success', data);
        } catch (error) {
          next(error);
        }
      },
    );

    app.get(
      '/verify-token',
      authenticate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          const identity: RefreshToken = req.user;
          const result = await this.handler.verifyUser(identity);

          return this.response.OK(res, 'Success', result);
        } catch (error) {
          next(error);
        }
      },
    );

    app.post(
      '/forgot-password',
      forgotPassReqAttributeValidation,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          super.validateRequest(req);

          const body: ForgotPassReqAttributeBody = { ...req.body };
          const file = req.file as Express.Multer.File;
          const result = await this.handler.handleForgotPassReq(body);

          return this.response.OK(
            res,
            'Success, Please check your email and reset your password, thanks you !',
            result,
          );
        } catch (error) {
          next(error);
        }
      },
    );

    app.post(
      '/reset-password',
      verifikasiAccountAttributeValidation,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          super.validateRequest(req);

          const body: VerificationAccountAttributeBody = { ...req.body };

          const result = await this.handler.handleResetPassword(body);
          return this.response.OK(res, 'Success reset password', result);
        } catch (error) {
          next(error);
        }
      },
    );

    app.post(
      '/verification-account',
      verifikasiAccountAttributeValidation,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          super.validateRequest(req);

          const body: VerificationAccountAttributeBody = { ...req.body };

          const result = await this.handler.handleVerificationAccount(body);
          return this.response.OK(res, 'Success verification', result);
        } catch (error) {
          next(error);
        }
      },
    );







    return app;
  }
}

export default new AuthController().router();
