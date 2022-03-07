import { db } from '../models';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CreateTransactionPayload, TransactionModel } from '../@types/transaction.type';
import { WalletService } from './wallet.service';
import { verifyToken } from '../middlewares/token-guard.middleware';
import { InvalidCredentialException } from '../common/exceptions/invalid-credential.exception';
import { UserService } from './user.service';
import { CurrencyRateService } from './currency-rate.service';
import { TransferFailedException } from '../common/exceptions/transfer-failed.exception';

const transactionModel = db.Transaction;

export const TransactionService = {
  getTransactionById: async (id: number): Promise<TransactionModel> => {
    const response = (await transactionModel.findByPk(id))?.toJSON();
    if (!response) throw new NotFoundException("Transaction doesn't exist.");
    return response as TransactionModel;
  },

  createTransaction: async (payload: CreateTransactionPayload): Promise<TransactionModel> => {
    const { token, targetEmail, sourceCurrency, targetCurrency, sourceAmount } = payload;

    // sourceUser
    const decoded = await verifyToken(token);
    if (typeof decoded === 'string') throw new InvalidCredentialException();
    const sourceUserId: number = decoded.signPayload.id;

    // targetUser
    const targetUser = await UserService.getUserByEmail(targetEmail);
    if (!targetUser) throw new NotFoundException("User doesn't exist.");
    const targetUserId: number = targetUser.id;

    // targetAmount
    let rate: number;
    if (sourceCurrency === targetCurrency) {
      rate = 1;
    } else {
      const currencyRate = await CurrencyRateService.getRateBySlugPair({ sourceCurrency, targetCurrency });
      rate = currencyRate.rate;
    }
    const targetAmount = sourceAmount * rate;

    // transfer
    const fromResponse = await WalletService.updateOrCreateWalletBalance({
      userId: sourceUserId,
      currencySlug: sourceCurrency,
      value: -sourceAmount,
    });
    if (!fromResponse) throw new TransferFailedException();

    const toResponse = await WalletService.updateOrCreateWalletBalance({
      userId: targetUserId,
      currencySlug: targetCurrency,
      value: targetAmount,
    });
    if (!toResponse) throw new TransferFailedException();

    // create transaction
    const transactionPayload = {
      from: sourceUserId,
      to: targetUserId,
      sourceCurrency,
      targetCurrency,
      sourceAmount,
    };
    const transaction: TransactionModel = (await transactionModel.create(transactionPayload)).toJSON();
    return transaction;
  },
};
