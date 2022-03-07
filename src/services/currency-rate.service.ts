import { db } from '../models';
import { Op } from 'sequelize';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CreateCurrencyRatePayload, CurrencyRateArgs, CurrencyRateModel } from '../@types/currency-rate.type';
import { DuplicatedException } from '../common/exceptions/duplicated.exception';

const currencyRateModel = db.CurrencyRate;
const currencyModel = db.Currency;

export const CurrencyRateService = {
  getRateBySlugPair: async (args: CurrencyRateArgs): Promise<CurrencyRateModel> => {
    const { sourceCurrency, targetCurrency } = args;

    const response = (await currencyRateModel.findOne({ where: { sourceCurrency, targetCurrency } }))?.toJSON();
    if (!response) throw new NotFoundException("Currency rate doesn't exist.");

    return response as CurrencyRateModel;
  },

  createOrUpdateCurrencyRate: async (payload: CreateCurrencyRatePayload): Promise<CurrencyRateModel[]> => {
    const { sourceCurrency, targetCurrency, rate } = payload;

    if (sourceCurrency === targetCurrency) throw new DuplicatedException('Duplicated currency input.');

    // Check exist token
    const condition = {
      slug: { [Op.or]: [sourceCurrency, targetCurrency] },
    };
    const currencyCheck = await currencyModel.findAll({ where: condition });
    if (currencyCheck.length !== 2) throw new NotFoundException("Currency doesn't exist.");

    const createPayload = [
      { ...payload },
      {
        sourceCurrency: targetCurrency,
        targetCurrency: sourceCurrency,
        rate: 1 / rate,
      },
    ];
    const currencyRates = await currencyRateModel.bulkCreate(createPayload, {
      updateOnDuplicate: ['rate'],
    });

    return currencyRates as CurrencyRateModel[];
  },
};
