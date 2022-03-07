import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

const Wallet = sequelize.define(
  'wallet',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    currencySlug: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Wallet;
