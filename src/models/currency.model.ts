import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';
import CurrencyRate from './currency-rate.model';

const Currency = sequelize.define(
  'currency',
  {
    slug: {
      type: Sequelize.STRING(12),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    publicBalance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Currency;
