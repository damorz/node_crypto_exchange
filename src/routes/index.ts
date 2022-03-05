import { Router, Request, Response } from 'express';
import UserRoutes from './user.route';

const router = Router();

router.get('', (req: Request, res: Response) => {
  res.send('Main path API');
});

router.use('/user', UserRoutes);

export default router;
