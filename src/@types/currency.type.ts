import * as Sequelize from 'sequelize/types';
export type CreateCurrencyPayload = {
  slug: string;
  name: string;
};

export type UpdateCurrencyPayload = {
  slug: string;
  name?: string;
};

export type AlterPublicBalancePayload = {
  slug: string;
  value: number;
};

export interface CurrencyModel extends Sequelize.Model<CurrencyModel, CreateCurrencyPayload> {
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
