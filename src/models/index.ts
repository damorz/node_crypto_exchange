import { Sequelize } from 'sequelize';
import { sequelize } from '../instances/sequelize';
import { User } from './user.model';

export const db = {
  // sequelize part
  sequelize,
  Sequelize,

  // models
  User,
};
