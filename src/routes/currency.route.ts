import { Router, Request, Response } from 'express';
import CurrencyController from '../controllers/currency.controller';
import { adminGuard, userGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.post('', CurrencyController.validate('CreateCurrency'), CurrencyController.CreateCurrency);
router.put('', CurrencyController.validate('UpdateCurrency'), CurrencyController.UpdateCurrency);
router.get('/:slug', userGuard, CurrencyController.GetCurrency);

export default router;
