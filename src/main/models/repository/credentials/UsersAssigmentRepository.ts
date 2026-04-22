import BaseRepository from '../.BaseRepository';
import UsersAssigment, { UsersAssigmentAttributes, UsersAssigmentCreationAttributes } from '../../entity/credentials/UsersAssigment';

class UsersAssigmentRepository extends BaseRepository<
  UsersAssigment,
  UsersAssigmentAttributes,
  UsersAssigmentCreationAttributes
> {

}

export default new UsersAssigmentRepository(UsersAssigment as any);
