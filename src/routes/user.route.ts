import UserController from '../controllers/user.controller';
import { Router } from 'express';
import { userGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.post('/register', UserController.validate('Register'), UserController.Register);
router.post('/login', UserController.validate('Login'), UserController.Login);
router.get('', userGuard, UserController.GetUser);

export default router;
