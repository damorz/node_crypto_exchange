import { Router } from 'express';
import WalletController from '../controllers/wallet.controller';
import { adminGuard, userGuard } from '../middlewares/token-guard.middleware';

const router = Router();
router.get('', userGuard, WalletController.validate('GetWallet'), WalletController.GetWallet);
router.get('/total', adminGuard, WalletController.getTotalBalance);
router.post('', adminGuard, WalletController.validate('AlterWalletBalance'), WalletController.AlterWalletBalance);

export default router;
