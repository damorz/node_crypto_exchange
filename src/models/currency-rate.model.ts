import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

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
      unique: true,
    },
    targetCurrency: {
      type: Sequelize.STRING(12),
      allowNull: false,
      unique: true,
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
