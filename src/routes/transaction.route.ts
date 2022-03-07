import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import { userGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.get('', userGuard, TransactionController.validate('GetTransaction'), TransactionController.getTransaction);
router.post('', TransactionController.validate('CreateTransaction'), TransactionController.CreateTransaction);

export default router;
