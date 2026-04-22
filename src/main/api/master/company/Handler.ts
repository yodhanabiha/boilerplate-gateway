import { Op } from "sequelize";
import { TokenPayload } from "../../../middleware/Authentication";
import ErrorHandler from "../../../middleware/ErrorHandler";
import { mainDb } from "../../../config/DBConfig";
import CompanyRepository from "../../../models/repository/master/CompanyRepository";
import UserRepository from "../../../models/repository/credentials/UserRepository";
import CompanyUserRepository from "../../../models/repository/master/CompanyUserRepository";
import { CompanyAllType } from "./Request";
import CompanyUser from "../../../models/entity/master/CompanyUser";

class CompanyHandler {

    private companyRepo = CompanyRepository;
    private userRepo = UserRepository;
    private companyUserRepo = CompanyUserRepository;



}

export default CompanyHandler;