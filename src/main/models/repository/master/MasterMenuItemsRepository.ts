
import MasterMenuItems, { MasterMenuItemsAttributes, MasterMenuItemsCreationAttributes } from '../../entity/master/MasterMenuItems';
import BaseRepository from '../.BaseRepository';

class MasterMenuItemsRepository extends BaseRepository<
  MasterMenuItems,
  MasterMenuItemsAttributes,
  MasterMenuItemsCreationAttributes
> {}

export default new MasterMenuItemsRepository(MasterMenuItems as any);
