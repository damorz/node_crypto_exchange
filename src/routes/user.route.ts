import UserController from '../controllers/user.controller';
import { Router, Request, Response } from 'express';
import { adminGuard, userGuard } from '../middlewares/token-guard.middleware';

const router = Router();

router.post('/register', UserController.validate('Register'), UserController.Register);
router.post('/login', UserController.validate('Login'), UserController.Login);
router.get('/:id', userGuard, UserController.GetUser);

export default router;
