export enum ConfigEnvEnum {
  HOST_NAME = 'HOST_NAME',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_HOST = 'DB_HOST',
  DB_NAME = 'DB_NAME',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  BCRYPT_SECRET_ROUND = 'BCRYPT_SECRET_ROUND',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_EXPIRES = 'JWT_EXPIRES',
}

export type ConfigEnvType = {
  [key in ConfigEnvEnum]: string;
};
