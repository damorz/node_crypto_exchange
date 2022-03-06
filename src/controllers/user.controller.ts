import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResHelper } from '../common/helpers/resHelper';
import { CreateUserPayload, TokenResponse, UserResponse } from '../@types/user.type';
import { Nullable } from '../@types/common.type';
import { check, validationResult } from 'express-validator';

const UserController = {
  Register: async (req: Request, res: Response) => {
    const payload: CreateUserPayload = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    try {
      const response: UserResponse = await UserService.register(payload);
      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  Login: async (req: Request, res: Response) => {
    const payload: CreateUserPayload = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResHelper(res, 400, errors, 'Invalid request body.');
    }

    try {
      const response: TokenResponse = await UserService.login(payload);

      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  GetUser: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const response: UserResponse = await UserService.getUserById(id);

      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },

  validate: (method: string) => {
    switch (method) {
      case 'Register': {
        return [
          check('email', 'Invalid email').exists().isEmail(),
          check('password', "password doesn't exists").exists(),
          check('firstname', "firstname doesn't exists").exists(),
          check('lastname', "lastname doesn't exists").exists(),
          check('phonenumber', "phonenumber doesn't exists").exists(),
        ];
      }
      case 'Login': {
        return [check('email', 'Invalid email').exists().isEmail(), check('password', "password doesn't exists").exists()];
      }
      default: {
        return [];
      }
    }
  },
};

export default UserController;
