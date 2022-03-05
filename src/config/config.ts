import '../lib/env';
import { Dialect } from 'sequelize/types';
import { AppConfigProviderType } from './@types/config-app.type';
import { ConfigEnvType } from './@types/config-env.type';

const { HOST_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT, NODE_ENV } = process.env as ConfigEnvType;

// const dialect: Dialect = "mysql";

const config: AppConfigProviderType = {
  hostName: HOST_NAME || 'localhost',
  port: Number(PORT) || 5000,
  node_env: (NODE_ENV as AppConfigProviderType['node_env']) || 'development',
  database: {
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASSWORD || '',
    name: DB_NAME || 'crypto_exchange',
    pool: {
      max: 2000,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

export default config;
