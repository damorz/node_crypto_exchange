import * as Sequelize from 'sequelize/types';
export type CreateWalletPayload = {
  userId: number;
  currencySlug: string;
  balance: number;
};

export type AlterWalletBalancePayload = {
  userId: number;
  currencySlug: string;
  value: number;
};

export type WalletArgs = {
  userId: number;
  currencySlug: string;
};

export type TotalBalanceResponse = {
  currencySlug: string;
  totalBalance: number;
};

export interface WalletModel extends Sequelize.Model<WalletModel, CreateWalletPayload> {
  id: number;
  userId: number;
  currencySlug: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
