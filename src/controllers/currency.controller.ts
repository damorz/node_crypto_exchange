import { Request, Response } from 'express';
import { ResHelper } from '../common/helpers/resHelper';
import { Nullable } from '../@types/common.type';
import { query, check, validationResult } from 'express-validator';
import { CreateCurrencyPayload, CurrencyModel, UpdateCurrencyPayload } from '../@types/currency.type';
import { CurrencyService } from '../services/currency.service';

const CurrencyController = {
  CreateCurrency: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const payload: CreateCurrencyPayload = req.body;

    try {
      const response: CurrencyModel = await CurrencyService.createCurrency(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  UpdateCurrency: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const payload: UpdateCurrencyPayload = req.body;

    try {
      const response: Nullable<CurrencyModel> = await CurrencyService.updateCurrency(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  GetCurrency: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    const slug = req.query.slug as string;

    try {
      const response: Nullable<CurrencyModel> = await CurrencyService.getCurrencyBySlug(slug);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'CreateCurrency': {
        return [check('slug', "slug doesn't exists").exists(), check('name', "name doesn't exists").exists()];
      }
      case 'UpdateCurrency': {
        return [check('slug', "slug doesn't exists").exists()];
      }
      case 'GetCurrency': {
        return [query('slug', "slug doesn't exists").exists()];
      }
      default: {
        return [];
      }
    }
  },
};

export default CurrencyController;
