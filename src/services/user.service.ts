import config from '../config/config';
import * as jwt from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcryptjs';
import { db } from '../models';
import { CreateUserPayload, LoginPayload, TokenResponse, UserModel, UserResponse } from '../@types/user.type';
import { InvalidCredentialException } from '../common/exceptions/invalid-credential.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { DuplicatedException } from '../common/exceptions/duplicated.exception';
import { Nullable } from '../@types/common.type';

const userModel = db.User;

export const UserService = {
  getUserById: async (id: number): Promise<UserResponse> => {
    const response = (await userModel.findByPk(id))?.toJSON();
    if (!response) throw new NotFoundException("User doesn't exist");
    if (response) {
      delete response.password;
    }

    return response as UserResponse;
  },

  getUserByEmail: async (email: string): Promise<Nullable<UserModel>> => {
    const response = (await userModel.findOne({ where: { email } }))?.toJSON();
    return response || null;
  },

  register: async (payload: CreateUserPayload): Promise<UserResponse> => {
    const { round } = config.bcrypt;
    const salt = await genSalt(round);

    const existUser = await UserService.getUserByEmail(payload.email);
    if (existUser) throw new DuplicatedException('Email already exist');

    const userPayload: CreateUserPayload = {
      ...payload,
      password: await hash(payload.password, salt),
    };

    const user = (await userModel.create({ ...userPayload })).toJSON();
    if (user) {
      delete user.password;
    }
    return user;
  },

  login: async (payload: LoginPayload): Promise<TokenResponse> => {
    const { email, password } = payload;
    const { secretKey, expiresIn } = config.jwt;

    const user = await UserService.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found.');

    const valid = await compare(password, user.password);
    if (!valid) throw new InvalidCredentialException();

    const signPayload: Partial<UserModel> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      token: jwt.sign({ signPayload }, secretKey, { expiresIn }),
      expiresIn,
    };
  },
};
