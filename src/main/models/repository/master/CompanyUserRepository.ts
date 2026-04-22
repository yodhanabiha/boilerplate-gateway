import CompanyUser, { CompanyUserAttributes, CompanyUserCreationAttributes } from '../../entity/master/CompanyUser';
import BaseRepository from '../.BaseRepository';

class CompanyUserRepository extends BaseRepository<
    CompanyUser,
    CompanyUserAttributes,
    CompanyUserCreationAttributes
> { }

export default new CompanyUserRepository(CompanyUser as any);
