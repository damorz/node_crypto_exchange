import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResHelper } from '../common/helpers/resHelper';
import { CreateUserPayload, TokenResponse, UserResponse } from '../@types/user.type';
import { Nullable } from '../@types/common.type';

const UserController = {
  Register: async (req: Request, res: Response) => {
    const payload: CreateUserPayload = req.body;

    if (Object.keys(payload).length === 0) {
      return ResHelper(res, 400, null, 'Request body cannot be empty.');
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

    if (Object.keys(payload).length === 0) {
      return ResHelper(res, 400, null, 'Request body cannot be empty.');
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
      const response: Nullable<UserResponse> = await UserService.getUserById(id);

      return ResHelper(res, 200, response);
    } catch (err: any) {
      return ResHelper(res, err.statusCode, null, err.message);
    }
  },
};

export default UserController;
