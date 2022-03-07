import { Router, Request, Response } from 'express';
import UserRoutes from './user.route';
import CurrencyRoutes from './currency.route';
import CurrencyRateRoutes from './currency-rate.route';
import WalletRoutes from './wallet.route';
import TransactionRoutes from './transaction.route';

const router = Router();

router.get('', (req: Request, res: Response) => {
  res.send('Main path API');
});

router.use('/user', UserRoutes);
router.use('/currency', CurrencyRoutes);
router.use('/rate', CurrencyRateRoutes);
router.use('/wallet', WalletRoutes);
router.use('/transaction', TransactionRoutes);

export default router;
