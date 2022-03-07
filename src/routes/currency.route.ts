import { Router } from 'express';
import CurrencyController from '../controllers/currency.controller';
import { adminGuard, userGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.post('', adminGuard, CurrencyController.validate('CreateCurrency'), CurrencyController.CreateCurrency);
router.put('', adminGuard, CurrencyController.validate('UpdateCurrency'), CurrencyController.UpdateCurrency);
router.get('', CurrencyController.validate('GetCurrency'), CurrencyController.GetCurrency);

export default router;
