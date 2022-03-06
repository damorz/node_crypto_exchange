import { Router } from 'express';
import CurrencyRateController from '../controllers/currency-rate.controller';
import { adminGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.post(
  '',
  adminGuard,
  CurrencyRateController.validate('CreateOrUpdateCurrencyRate'),
  CurrencyRateController.CreateOrUpdateCurrencyRate
);

router.get('', CurrencyRateController.validate('GetCurrencyRate'), CurrencyRateController.GetCurrencyRate);

export default router;
