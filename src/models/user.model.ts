import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    middlename: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    phonenumber: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default User;
