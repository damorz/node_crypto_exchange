import { Router, Request, Response } from 'express';
import UserRoutes from './user.route';
import CurrencyRoutes from './currency.route';

const router = Router();

router.get('', (req: Request, res: Response) => {
  res.send('Main path API');
});

router.use('/user', UserRoutes);
router.use('/currency', CurrencyRoutes);

export default router;
