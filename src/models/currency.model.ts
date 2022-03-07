import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

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
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default Currency;
