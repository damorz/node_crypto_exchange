import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';
import Currency from './currency.model';

const CurrencyRate = sequelize.define(
  'currency_rate',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    sourceCurrency: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    targetCurrency: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
export default CurrencyRate;
