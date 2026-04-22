import RoleMenus, { RoleMenusAttributes, RoleMenusCreationAttributes } from '../../entity/credentials/RoleMenus';
import BaseRepository from '../.BaseRepository';

class RoleMenusRepository extends BaseRepository<
  RoleMenus,
  RoleMenusAttributes,
  RoleMenusCreationAttributes
> {

}

export default new RoleMenusRepository(RoleMenus as any);
