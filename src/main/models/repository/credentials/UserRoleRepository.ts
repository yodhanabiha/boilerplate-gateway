
import UserRoles, { UserRolesAttributes, UserRolesCreationAttributes } from '../../entity/credentials/UserRole';
import BaseRepository from '../.BaseRepository';

class UserRolesRepository extends BaseRepository<
  UserRoles,
  UserRolesAttributes,
  UserRolesCreationAttributes
> {}

export default new UserRolesRepository(UserRoles as any);
