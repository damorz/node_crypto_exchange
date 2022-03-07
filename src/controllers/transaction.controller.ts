import { Request, Response } from 'express';
import { ResHelper } from '../common/helpers/resHelper';
import { query, check, validationResult } from 'express-validator';
import { CreateTransactionInput, TransactionModel } from '../@types/transaction.type';
import { TransactionService } from '../services/transaction.service';
import { extractToken } from '../middlewares/token-guard.middleware';

const WalletController = {
  getTransaction: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const id: number = Number(req.query.id);

    try {
      const response: TransactionModel = await TransactionService.getTransactionById(id);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },
  CreateTransaction: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const payload: CreateTransactionInput = req.body;
    const token = extractToken(req.headers);

    try {
      const response: TransactionModel = await TransactionService.createTransaction({ ...payload, token });
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'CreateTransaction': {
        return [
          check('targetEmail', 'Invalid targetEmail').exists().isEmail(),
          check('sourceCurrency', "sourceCurrency doesn't exists").exists(),
          check('targetCurrency', "targetCurrency doesn't exists").exists(),
          check('sourceAmount', 'Invalid sourceAmount').exists().isNumeric(),
        ];
      }
      case 'GetTransaction': {
        return [query('id', 'Invalid d').exists().isNumeric()];
      }
      default: {
        return [];
      }
    }
  },
};

export default WalletController;
