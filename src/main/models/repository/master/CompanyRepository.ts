import Company, { CompanyAttributes, CompanyCreationAttributes } from '../../entity/master/Company';
import BaseRepository from '../.BaseRepository';

class CompanyRepository extends BaseRepository<
    Company,
    CompanyAttributes,
    CompanyCreationAttributes
> { }

export default new CompanyRepository(Company as any);
