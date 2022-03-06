import config from '../config/config';
import { genSalt, hash, compare } from 'bcryptjs';
import { db } from '../models';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { CreateUserPayload, LoginPayload, TokenResponse, UserModel, UserResponse } from '../@types/user.type';
import { Nullable } from '../@types/common.type';
import { InvalidCredentialException } from '../common/exceptions/invalid-credential.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CreateCurrencyPayload, CurrencyModel, UpdateCurrencyPayload } from '../@types/currency.type';
import { DuplicatedCurrencyException } from '../common/exceptions/duplicated-currency.exception';

const currencyModel = db.Currency;

export const CurrencyService = {
  getUserBySlug: async (slug: string): Promise<CurrencyModel> => {
    const response = (await currencyModel.findByPk(slug))?.toJSON();
    if (!response) throw new NotFoundException("Currency doesn't exist.");
    return response as CurrencyModel;
  },

  createCurrency: async (payload: CreateCurrencyPayload): Promise<CurrencyModel> => {
    const existCurrency = (await currencyModel.findOne({ where: { slug: payload.slug } }))?.toJSON();
    if (existCurrency) throw new DuplicatedCurrencyException();

    const currency = (await currencyModel.create({ ...payload })).toJSON();
    return currency;
  },

  updateCurrency: async (payload: UpdateCurrencyPayload): Promise<Nullable<CurrencyModel>> => {
    const response = await currencyModel.update({ ...payload }, { where: { slug: payload.slug } });
    if (!response) {
      throw new NotFoundException("Currency doesn't exist.");
    }
    return await CurrencyService.getUserBySlug(payload.slug);
  },
};
