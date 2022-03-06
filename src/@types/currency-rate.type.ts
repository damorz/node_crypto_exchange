import * as Sequelize from 'sequelize/types';
export type CreateCurrencyRatePayload = {
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
};

export type UpdateCurrencyRatePayload = {
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
};

export interface CurrencyRateModel extends Sequelize.Model<CurrencyRateModel, CreateCurrencyRatePayload> {
  id: number;
  sourceCurrency: string;
  targetCurrency: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CurrencyRateArgs = {
  sourceCurrency: string;
  targetCurrency: string;
};
