import { Request, Response } from 'express';
import { ResHelper } from '../common/helpers/resHelper';
import { query, check, validationResult } from 'express-validator';
import { CreateCurrencyRatePayload, CurrencyRateArgs, CurrencyRateModel } from '../@types/currency-rate.type';
import { CurrencyRateService } from '../services/currency-rate.service';

const CurrencyRateController = {
  CreateOrUpdateCurrencyRate: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const payload: CreateCurrencyRatePayload = req.body;

    try {
      const response: CurrencyRateModel[] = await CurrencyRateService.createOrUpdateCurrencyRate(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  GetCurrencyRate: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid query params.');
    }

    const args = req.query as CurrencyRateArgs;

    try {
      const response: CurrencyRateModel = await CurrencyRateService.getRateBySlugPair(args);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'CreateOrUpdateCurrencyRate': {
        return [
          check('sourceCurrency', "sourceCurrency doesn't exists").exists(),
          check('targetCurrency', "targetCurrency doesn't exists").exists(),
          check('rate', 'Invalid rate').exists().isNumeric(),
        ];
      }
      case 'GetCurrencyRate': {
        return [
          query('sourceCurrency', "sourceCurrency doesn't exists").exists(),
          query('targetCurrency', "targetCurrency doesn't exists").exists(),
        ];
      }
      default: {
        return [];
      }
    }
  },
};

export default CurrencyRateController;
