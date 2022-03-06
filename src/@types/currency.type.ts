import * as Sequelize from 'sequelize/types';
export type CreateCurrencyPayload = {
  slug: string;
  name: string;
  publicBalance: number;
};

export type UpdateCurrencyPayload = {
  slug: string;
  name?: string;
  publicBalance?: number;
};

export interface CurrencyModel extends Sequelize.Model<CurrencyModel, CreateCurrencyPayload> {
  slug: string;
  name: string;
  publicBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
