import { Request, Response } from 'express';
import { ResHelper } from '../common/helpers/resHelper';
import { query, check, validationResult } from 'express-validator';
import { AlterWalletBalancePayload, WalletArgs, WalletModel } from '../@types/wallet.type';
import { WalletService } from '../services/wallet.service';

const WalletController = {
  getTotalBalance: async (req: Request, res: Response) => {
    const slug = req.query?.slug as string | undefined;

    try {
      const response: any[] = await WalletService.getTotalBalance(slug);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  AlterWalletBalance: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const payload: AlterWalletBalancePayload = req.body;

    try {
      const response: WalletModel = await WalletService.updateOrCreateWalletBalance(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  GetWallet: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }
    const args: WalletArgs = {
      userId: Number(req.query.userId),
      currencySlug: req.query.currencySlug as string,
    };

    try {
      const response: WalletModel = await WalletService.getWallet(args);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'AlterWalletBalance': {
        return [
          check('userId', "userId doesn't exists").exists(),
          check('currencySlug', "currencySlug doesn't exists").exists(),
          check('value', 'Invalid value').exists().isNumeric(),
        ];
      }
      case 'GetWallet': {
        return [
          query('userId', "userId doesn't exists").exists().isNumeric(),
          query('currencySlug', "currencySlug doesn't exists").exists(),
        ];
      }
      default: {
        return [];
      }
    }
  },
};

export default WalletController;
