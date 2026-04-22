import {Transaction} from 'sequelize';
import BaseRepository from '../.BaseRepository';
import EmailTransaction, { EmailTransactionAttributes, EmailTransactionCreationAttributes } from '../../entity/transaction/EmailTransaction';

class EmailTransactionRepository extends BaseRepository<
  EmailTransaction,
  EmailTransactionAttributes,
  EmailTransactionCreationAttributes
> {
  
}

export default new EmailTransactionRepository( EmailTransaction as any);
