import { Dialect } from 'sequelize/types';

export type AppConfigProviderType = {
  hostName: string;
  port: number;
  node_env: 'production' | 'development';
  database: {
    host: string;
    user: string;
    password: string;
    name: string;
    dialect: Dialect;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };
  bcrypt: {
    round: number;
  };
  jwt: {
    secretKey: string;
    expiresIn: number;
  };
};
