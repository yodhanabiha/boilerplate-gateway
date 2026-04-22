
import CodebookDetail, { CodebookDetailAttributes, CodebookDetailCreationAttributes } from '../../entity/master/CodebookDetail';
import BaseRepository from '../.BaseRepository';

class CodebookDetailRepository extends BaseRepository<
  CodebookDetail,
  CodebookDetailAttributes,
  CodebookDetailCreationAttributes
> {}

export default new CodebookDetailRepository(CodebookDetail as any);
