

import Codebook, { CodebookAttributes, CodebookCreationAttributes } from '../../entity/master/Codebook';
import BaseRepository from '../.BaseRepository';

class CodebookRepository extends BaseRepository<
  Codebook,
  CodebookAttributes,
  CodebookCreationAttributes
> {}

export default new CodebookRepository(Codebook as any);
