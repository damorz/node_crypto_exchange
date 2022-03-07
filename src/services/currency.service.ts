import { db } from '../models';
import { Nullable } from '../@types/common.type';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { AlterPublicBalancePayload, CreateCurrencyPayload, CurrencyModel, UpdateCurrencyPayload } from '../@types/currency.type';
import { DuplicatedCurrencyException } from '../common/exceptions/duplicated-currency.exception';
import { Sequelize } from 'sequelize';

const currencyModel = db.Currency;

export const CurrencyService = {
  getCurrencyBySlug: async (slug: string): Promise<CurrencyModel> => {
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

  updateCurrency: async (payload: UpdateCurrencyPayload): Promise<CurrencyModel> => {
    const response = await currencyModel.update({ ...payload }, { where: { slug: payload.slug } });
    if (!response) {
      throw new NotFoundException("Currency doesn't exist.");
    }
    return await CurrencyService.getCurrencyBySlug(payload.slug);
  },

  // alterPublicBalance: async (payload: AlterPublicBalancePayload): Promise<CurrencyModel> => {
  //   const { slug, value } = payload;
  //   const operation: string = value < 0 ? `publicBalance ${value}` : `publicBalance + ${value}`;

  //   const response = await currencyModel.update(
  //     {
  //       publicBalance: Sequelize.literal(operation),
  //     },
  //     { where: { slug } }
  //   );
  //   if (!response) {
  //     throw new NotFoundException("Currency doesn't exist.");
  //   }
  //   return await CurrencyService.getCurrencyBySlug(slug);
  // },
};
