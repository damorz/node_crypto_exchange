import * as Sequelize from 'sequelize/types';
export type CreateTransactionPayload = {
  token: string;
  targetEmail: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
};

export type CreateTransactionInput = Omit<CreateTransactionPayload, 'token'>;

export interface TransactionModel extends Sequelize.Model<TransactionModel, CreateTransactionPayload> {
  id: number;
  from: number;
  to: number;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
