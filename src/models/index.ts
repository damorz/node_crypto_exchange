import { Sequelize } from 'sequelize';
import { sequelize } from '../instances/sequelize';
import User from './user.model';
import Currency from './currency.model';
import CurrencyRate from './currency-rate.model';
import Wallet from './wallet.model';

Wallet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Wallet, { foreignKey: 'userId' });

Wallet.belongsTo(Currency, { foreignKey: 'currencySlug' });
Currency.hasMany(Wallet, { foreignKey: 'currencySlug' });

CurrencyRate.belongsTo(Currency, { foreignKey: 'targetCurrency' });
CurrencyRate.belongsTo(Currency, { foreignKey: 'sourceCurrency' });
Currency.hasMany(CurrencyRate, { foreignKey: 'sourceCurrency' });

export const db = {
  // sequelize part
  sequelize,
  Sequelize,

  // models
  User,
  Currency,
  CurrencyRate,
  Wallet,
};
