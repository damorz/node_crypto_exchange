import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

const Transaction = sequelize.define(
  'transaction',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    from: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    to: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    sourceCurrency: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    targetCurrency: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    sourceAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Transaction;
