

import Employee, { EmployeeAttributes, EmployeeCreationAttributes } from '../../entity/master/Employee';
import BaseRepository from '../.BaseRepository';

class EmployeeRepository extends BaseRepository<
  Employee,
  EmployeeAttributes,
  EmployeeCreationAttributes
> {}

export default new EmployeeRepository(Employee as any);
