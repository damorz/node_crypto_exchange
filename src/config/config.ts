import { Dialect } from 'sequelize/types';
import { AppConfigProviderType } from './@types/config-app.type';
import { ConfigEnvType } from './@types/config-env.type';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: resolve(__dirname, `../../.env`) });

const { HOST_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT, NODE_ENV, BCRYPT_SECRET_ROUND, JWT_SECRET_KEY, JWT_EXPIRES } =
  process.env as ConfigEnvType;

const config: AppConfigProviderType = {
  hostName: HOST_NAME || 'localhost',
  port: Number(PORT) || 5000,
  node_env: (NODE_ENV as AppConfigProviderType['node_env']) || 'development',
  database: {
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASSWORD || '',
    name: DB_NAME || 'currency_exchange',
    dialect: 'mariadb' as Dialect,
    pool: {
      max: 2000,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  bcrypt: {
    round: Number(BCRYPT_SECRET_ROUND || 10),
  },
  jwt: {
    secretKey: JWT_SECRET_KEY || 'jwt1secret',
    expiresIn: Number(JWT_EXPIRES || 300000),
  },
};

export default config;
