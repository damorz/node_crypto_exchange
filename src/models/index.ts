import { Sequelize } from 'sequelize';
import { sequelize } from '../instances/sequelize';
import User from './user.model';
import Currency from './currency.model';
import CurrencyRate from './currency-rate.model';
import Wallet from './wallet.model';
import Transaction from './transaction.model';

Wallet.belongsTo(User, { foreignKey: 'userId' });

Wallet.belongsTo(Currency, { foreignKey: 'currencySlug' });

CurrencyRate.belongsTo(Currency, { foreignKey: 'targetCurrency' });
CurrencyRate.belongsTo(Currency, { foreignKey: 'sourceCurrency' });

Transaction.belongsTo(Currency, { foreignKey: 'targetCurrency' });
Transaction.belongsTo(Currency, { foreignKey: 'sourceCurrency' });

Transaction.belongsTo(User, { foreignKey: 'from' });
Transaction.belongsTo(User, { foreignKey: 'to' });

export const db = {
  // sequelize part
  sequelize,
  Sequelize,

  // models
  User,
  Currency,
  CurrencyRate,
  Wallet,
  Transaction,
};
