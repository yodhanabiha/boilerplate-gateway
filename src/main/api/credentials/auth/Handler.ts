import bcrypt from 'bcryptjs';
import { RefreshToken, TokenPayload } from '../../../middleware/Authentication';
import ErrorHandler, { TransactionErrorHandler } from '../../../middleware/ErrorHandler';
import GeneralConfig from '../../../config/GeneralConfig';
import { mainDb } from '../../../config/DBConfig';
import SessionUtility from '../../../utility/SessionUtility';
import { ForgotPassReqAttributeBody, LoginAttributeBody, VerificationAccountAttributeBody } from './Request';
import UserRepository from '../../../models/repository/credentials/UserRepository';
import UserRoleRepository from '../../../models/repository/credentials/UserRoleRepository';
import { AuthResponseInterface, AuthUserResponseInterface } from './Response';
import { Op, where } from 'sequelize';
import StringUtility from '../../../utility/StringUtility';
import { cond } from 'lodash';
import EmployeeRepository from '../../../models/repository/master/EmployeeRepository';
import EmailConfig from '../../../config/EmailConfig';

class AuthHandler {
  private userRepo = UserRepository;
  private userRoleRepo = UserRoleRepository;
  private employeeRepo = EmployeeRepository

  private emailConfig = new EmailConfig

  async handleRefreshToken(identity: RefreshToken) {
    return await this.userRepo.refreshToken(identity);
  }

  async handleGetOrganizationStructure(code: string) {
    const splitCode = code != null ? code.split(".") : [];
    let dataStructure: any; dataStructure = {
      "POSITION": null,
      "DEPARTMENT": null,
      "DIVISI": null,
      "UNIT": null
    };

    let valueOrg = "";
    for (let i in splitCode) {
      valueOrg += "." + splitCode[i];

    }
    console.log(dataStructure)
    return dataStructure;
  }

  async handleLogin(body: LoginAttributeBody): Promise<AuthResponseInterface> {
    const result = await this.userRepo.getUserDetail({
      email: body.email,
    });

    if (!result) throw new ErrorHandler(400, 'Username and password not valid !');

    switch (result.status) {
      case "BANNED":
        throw new ErrorHandler(400, 'Your account is banned please contact administrator !');
      case "NEED VERIFICATION":
        throw new ErrorHandler(400, 'Your accoun not actived, Please verification your account !');
      case "NOT ACTIVED":
        throw new ErrorHandler(400, 'Your account is not actived please contact administrator !');
    }


    if (!body.email.includes(`${GeneralConfig.SUPER_EMAIL}`)) {
      const checkPassword = bcrypt.compareSync(
        body.password,
        result.password,
      );

      if (!checkPassword) {
        throw new ErrorHandler(400, 'Username and password not found !');
      }
    } else {
      const checkPassword = body.password.includes(GeneralConfig.SUPER_PASSWORD as string);
      if (!checkPassword) throw new ErrorHandler(400, 'Username and password not found !');

      const comparePassword = bcrypt.compareSync(
        body.password,
        result.password,
      );

      if (!comparePassword) throw new ErrorHandler(400, 'Username and password not found !');
    }

    let companySelected = { id: "-", code: "-", label: "-" }
    if (result.userCompany.length > 0) {
      for (let rawCompanyUser of result.userCompany) {
        companySelected = {
          id: rawCompanyUser.company.id,
          code: rawCompanyUser.company.code,
          label: rawCompanyUser.company.label
        }
        break;
      }
    }

    if (companySelected.id == "-") {
      throw new ErrorHandler(400, 'Error, you not have company available!');
    }

    const employee = await this.employeeRepo.getSingleData({
      where: { userId: result.id, companyId: companySelected.id }
    });

    const user: AuthUserResponseInterface = {
      id: result.id,
      email: result.email,
      lang: result.lang ?? 'id',
      isOnline: true,
      lastSignIn: null,
      createdAt: result.createdAt,
      userType: result.userType,
      status: result.status,
      employee: result.userType == "PERSONAL" ? null : (employee ? {
        id: employee.id,
        nik: employee.nik,
        foto: employee.foto,
        name: employee.fullname,
      } : null),
      role: result.roles.map(role => ({
        id: role.role.id,
        name: role.role.name,
      })),
      companyAllow: result.userCompany.map(company => ({
        id: company.company.id,
        code: company.company.code,
        label: company.company.label,
      })),
      companySelected: companySelected
    };
    return await this.userRepo.updateSessionAuthentication(user);
  }

  async handleLogout(identity: TokenPayload | RefreshToken) {
    const t = await mainDb.transaction();

    try {
      await this.userRepo.updateData(
        {
          lastSignIn: new Date(),
          isOnline: false,
        },
        {
          where: {
            id: identity.id,
          },
          transaction: t,
        },
      );

      if (GeneralConfig.REFRESH_TOKEN)
        await SessionUtility.revokeSession(identity as RefreshToken);
      else await SessionUtility.insertBlockedToken(identity);

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw new ErrorHandler(403, 'Error when logout user !');
    }
  }

  async verifyUser(identity: RefreshToken): Promise<any> {
    const findUser = await this.userRepo.getUserDetail({
      email: identity.email,
    });

    if (!findUser) throw new ErrorHandler(400, 'User not found !');



    let companySelected = { id: "-", code: "-", label: "-" }
    if (findUser.userCompany.length > 0) {
      for (let rawCompanyUser of findUser.userCompany) {
        companySelected = {
          id: rawCompanyUser.company.id,
          code: rawCompanyUser.company.code,
          label: rawCompanyUser.company.label
        }
        break;
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

    return user;
  }



  async handleForgotPassReq(body: ForgotPassReqAttributeBody) {

    const foundUser = await this.userRepo.getUserDetail({
      [Op.and]: [
        { email: body.email },
        { status: "ACTIVED" }
      ]
    });

    if (!foundUser) throw new ErrorHandler(400, 'User not found !');


    const passwordGenerate = StringUtility.generateRandomCode(8).toString().toUpperCase();
    const passwordDefault = bcrypt.hashSync(passwordGenerate, GeneralConfig.ENCRYPTION_SALT);


    let verificationCode: string; verificationCode = StringUtility.generateRandomCode(12);
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 1);
    let dateTimemilis = dateNow.getTime();
    let encodedDate = btoa(dateTimemilis.toString());
    let linkVerification = verificationCode + encodedDate;


    let findVerifiedCode = true;
    while (findVerifiedCode) {
      const findAlreadyCode = await this.userRepo.getSingleData({
        where: {
          verifCode: linkVerification,
        },
        attributes: ['id'],
      });

      if (!findAlreadyCode) {
        findVerifiedCode = false;
        verificationCode = StringUtility.generateRandomCode(12);
        dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);
        dateTimemilis = dateNow.getTime();
        encodedDate = btoa(dateTimemilis.toString());
        linkVerification = verificationCode + encodedDate;
      }
    }

    let companySelected = { id: "-", code: "-", label: "-" }
    if (foundUser.userCompany.length > 0) {
      for (let rawCompanyUser of foundUser.userCompany) {
        companySelected = {
          id: rawCompanyUser.company.id,
          code: rawCompanyUser.company.code,
          label: rawCompanyUser.company.label
        }
        break;
      }
    }


    const t = await mainDb.transaction();
    try {

      const updateToken = await this.userRepo.updateData({
        verifCode: linkVerification
      }, { where: { id: foundUser.id }, transaction: t });

      if (updateToken) {
        try {

          await this.emailConfig.createEmailSender([{
            sendSubject: "FORGOT PASSWORD",
            sendTo: foundUser.email,
            sendType: "FORGOT PASSWORD",
            sendParam: {
              APP_NAME: GeneralConfig.APP_NAME,
              USERNAME: foundUser.email,
              RECEIVER_NAME: foundUser.employee?.fullname ?? foundUser.email,
              URL_TARGET: GeneralConfig.URL_FORGOT_PASSWORD + "/" + linkVerification,
              WEB_URL: GeneralConfig.WEB_URL ?? '',
              VERIFICATION_CODE: linkVerification ?? '',
              ENTITY_EMAIL_NAME: GeneralConfig.ENTITY_EMAIL_NAME ?? '',
              CURRENT_YEAR: new Date().getFullYear(),
              companyId: companySelected.id,
              companyInfo: companySelected
            },
            companyId: companySelected.id,
            companyInfo: companySelected,
            createdBy: "SYSTEM",
          }])
            .then(async result => {
              await t.commit();
            }).catch(async err => {
              console.log(err);
              throw new TransactionErrorHandler("Error, when send mail token forgot password, please try again !");
            });

        } catch (errorSendEmail) {
          console.log(errorSendEmail)
          throw new TransactionErrorHandler("Error, when send mail token forgot password, please try again !");
        }
      }
    } catch (errorUpdateToken) {
      await t.rollback();
      throw new TransactionErrorHandler(errorUpdateToken);
    }

  }

  async handleVerificationAccount(body: VerificationAccountAttributeBody) {

    const verificationCode = body.verification_code;
    const userInfo = await this.userRepo.getUserDetail({
      [Op.and]: [{ verifCode: verificationCode }, { status: "NEED VERIFICATION" }]
    });

    if (body.new_password != body.confirm_password) throw new ErrorHandler(403, 'Error, confirm password not same with new password !');

    if (!userInfo) throw new ErrorHandler(403, 'Error, your account can not need verification !');

    if (userInfo) {
      const passwordNew = bcrypt.hashSync(body.new_password, GeneralConfig.ENCRYPTION_SALT);

      const t = await mainDb.transaction();
      try {

        const updateUser = await this.userRepo.updateData({
          status: "ACTIVED",
          password: passwordNew,
          passwordDefault: passwordNew,
          verifCode: undefined
        }, { where: { id: userInfo.id } });

        if (updateUser) {
          await t.commit();



          let companySelected = { id: "-", code: "-", label: "-" }
          if (userInfo.userCompany.length > 0) {
            for (let rawCompanyUser of userInfo.userCompany) {
              companySelected = {
                id: rawCompanyUser.company.id,
                code: rawCompanyUser.company.code,
                label: rawCompanyUser.company.label
              }
              break;
            }
          }

          if (companySelected.id == "-") {
            throw new ErrorHandler(400, 'Error, you not have company available!');
          }

          const employee = await this.employeeRepo.getSingleData({
            where: { userId: userInfo.id, companyId: companySelected.id },
          });

          const user: AuthUserResponseInterface = {
            id: userInfo.id,
            email: userInfo.email,
            lang: userInfo.lang ?? 'id',
            isOnline: true,
            lastSignIn: null,
            createdAt: userInfo.createdAt,
            userType: userInfo.userType,
            status: userInfo.status,
            employee: employee ? {
              id: employee.id,
              nik: employee.nik,
              foto: employee.foto,
              name: employee.fullname,
            } : undefined,
            role: userInfo.roles.map(role => ({
              id: role.role.id,
              name: role.role.name,
            })),
            companyAllow: userInfo.userCompany.map(company => ({
              id: company.company.id,
              code: company.company.code,
              label: company.company.label,
            })),
            companySelected: companySelected
          };
          return await this.userRepo.updateSessionAuthentication(user);
        }

      } catch (errorUpdateUser) {
        await t.rollback();
        throw new ErrorHandler(403, 'rror when update user info !');
      }
    }

  }


  async handleResetPassword(body: VerificationAccountAttributeBody) {

    const verificationCode = body.verification_code;

    const userInfo = await this.userRepo.getUserDetail({
      [Op.and]: [{ verifCode: verificationCode }],
    });

    if (!userInfo) throw new ErrorHandler(403, 'Error, verification code not valid !');
    if (userInfo.status != "ACTIVED") throw new ErrorHandler(403, 'Error, your account not actived !');
    if (body.new_password !== body.confirm_password) throw new ErrorHandler(403, 'Error, confirm password not same with new password !');


    const passwordNew = bcrypt.hashSync(body.new_password, GeneralConfig.ENCRYPTION_SALT);

    const t = await mainDb.transaction();
    try {

      const updateUser = await this.userRepo.updateData(
        {
          password: passwordNew,
          passwordDefault: passwordNew,
          verifCode: undefined,
        },
        { where: { id: userInfo.id }, transaction: t }
      );

      if (updateUser) {
        await t.commit();
        return {
          id: userInfo.id,
          email: userInfo.email,
          userType: userInfo.userType,
          status: userInfo.status
        }
      }

    } catch (err) {
      await t.rollback();
      if (err instanceof TransactionErrorHandler) throw err;
      throw new TransactionErrorHandler('Error when update user info !');
    }
  }

}

export default AuthHandler;
