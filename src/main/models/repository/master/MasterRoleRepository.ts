import Roles, {
  RolesAttributes,
  RolesCreationAttributes,
} from '../../entity/master/MasterRole';

import BaseRepository from '../.BaseRepository';

class RolesRepository extends BaseRepository<
  Roles,
  RolesAttributes,
  RolesCreationAttributes
> {}

export default new RolesRepository(Roles as any);
