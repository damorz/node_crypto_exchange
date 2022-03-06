import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResHelper } from '../common/helpers/resHelper';
import { CreateUserPayload, TokenResponse, UserResponse } from '../@types/user.type';
import { Nullable } from '../@types/common.type';
import { check, validationResult } from 'express-validator';
import { CreateCurrencyPayload, CurrencyModel, UpdateCurrencyPayload } from '../@types/currency.type';
import { CurrencyService } from '../services/currency.service';

const CurrencyController = {
  CreateCurrency: async (req: Request, res: Response) => {
    const payload: CreateCurrencyPayload = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    try {
      const response: CurrencyModel = await CurrencyService.createCurrency(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  UpdateCurrency: async (req: Request, res: Response) => {
    const payload: UpdateCurrencyPayload = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    try {
      const response: Nullable<CurrencyModel> = await CurrencyService.updateCurrency(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  GetCurrency: async (req: Request, res: Response) => {
    const slug = req.params.slug;

    try {
      const response: Nullable<CurrencyModel> = await CurrencyService.getUserBySlug(slug);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'CreateCurrency': {
        return [
          check('slug', "slug doesn't exists").exists(),
          check('name', "name doesn't exists").exists(),
          check('publicBalance', "publicBalance doesn't exists").exists(),
        ];
      }
      case 'UpdateCurrency': {
        return [check('slug', "slug doesn't exists").exists()];
      }
      default: {
        return [];
      }
    }
  },
};

export default CurrencyController;
