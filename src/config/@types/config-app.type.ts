export type AppConfigProviderType = {
  hostName: string;
  port: number;
  database: {
    host: string;
    user: string;
    password: string;
    name: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };
  node_env: 'production' | 'development';
};
