import config from '../config/config';
import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  logging: false,
  pool: config.database.pool,
});

sequelize.authenticate();
