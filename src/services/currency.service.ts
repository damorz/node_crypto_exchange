import { db } from '../models';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CreateCurrencyPayload, CurrencyModel, UpdateCurrencyPayload } from '../@types/currency.type';
import { DuplicatedException } from '../common/exceptions/duplicated.exception';

const currencyModel = db.Currency;

export const CurrencyService = {
  getCurrencyBySlug: async (slug: string): Promise<CurrencyModel> => {
    const response = (await currencyModel.findByPk(slug))?.toJSON();
    if (!response) throw new NotFoundException("Currency doesn't exist.");
    return response as CurrencyModel;
  },

  createCurrency: async (payload: CreateCurrencyPayload): Promise<CurrencyModel> => {
    const existCurrency = (await currencyModel.findOne({ where: { slug: payload.slug } }))?.toJSON();
    if (existCurrency) throw new DuplicatedException('Currency already exist.');

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
};
