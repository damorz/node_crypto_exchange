import { db } from '../models';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { AlterWalletBalancePayload, WalletArgs, WalletModel } from '../@types/wallet.type';
import { CurrencyService } from './currency.service';
import { Sequelize } from 'sequelize';
import sequelize from 'sequelize';
import { BalanceLessThanZeroException } from '../common/exceptions/balance-less-than-zero.exception';

const walletModel = db.Wallet;

export const WalletService = {
  getTotalBalance: async (currencySlug?: string): Promise<any[]> => {
    const condition = currencySlug ? { currencySlug } : undefined;

    const totalBalance = await walletModel.findAll({
      where: condition,
      attributes: ['currencySlug', [sequelize.fn('sum', sequelize.col('balance')), 'totalBalance']],
      group: ['currencySlug'],
    });
    return totalBalance;
  },

  getWallet: async (payload: WalletArgs): Promise<WalletModel> => {
    const response = await walletModel.findOne({ where: { ...payload } });
    if (!response) throw new NotFoundException("Wallet doesn't exist.");
    return response as WalletModel;
  },

  updateOrCreateWalletBalance: async (payload: AlterWalletBalancePayload): Promise<WalletModel> => {
    const { userId, currencySlug, value } = payload;
    const operation: string = value < 0 ? `balance ${value}` : `balance + ${value}`;

    const currency = await CurrencyService.getCurrencyBySlug(currencySlug);
    if (!currency) throw new NotFoundException("Currency doesn't exist.");

    const wallet = (await walletModel.findOne({ where: { userId, currencySlug } }))?.toJSON() as WalletModel;
    if (!wallet) {
      const newWallet: WalletModel = (await walletModel.create({ userId, currencySlug, balance: Math.max(value, 0) })).toJSON();
      if (!newWallet) throw new Error('Something went wrong!');

      return newWallet;
    }

    if (wallet.balance + value < 0) throw new BalanceLessThanZeroException('Total wallet balance cannot less than zero.');

    const updatedWallet = await walletModel.update(
      {
        userId,
        currencySlug,
        balance: Sequelize.literal(operation),
      },
      {
        where: { userId, currencySlug },
      }
    );
    if (!updatedWallet) {
      throw new NotFoundException("Wallet doesn't exist.");
    }

    return await WalletService.getWallet({ userId, currencySlug });
  },
};
