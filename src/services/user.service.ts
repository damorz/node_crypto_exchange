import config from '../config/config';
import { genSalt, hash, compare } from 'bcryptjs';
import { db } from '../models';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { CreateUserPayload, LoginPayload, TokenResponse, UserModel, UserResponse } from '../@types/user.type';
import { Nullable } from '../@types/common.type';
import { InvalidCredentialException } from '../common/exceptions/invalid-credential.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { DuplicatedEmailException } from '../common/exceptions/duplicated-email.exception';

const userModel = db.User;

export const UserService = {
  getUserById: async (id: number): Promise<Nullable<UserResponse>> => {
    const response = (await userModel.findByPk(id))?.toJSON();
    delete response.password;
    return response || null;
  },

  getUserByEmail: async (email: string): Promise<Nullable<UserModel>> => {
    const response = (await userModel.findOne({ where: { email } }))?.toJSON();
    return response || null;
  },

  register: async (payload: CreateUserPayload): Promise<UserResponse> => {
    const { round } = config.bcrypt;
    const salt = await genSalt(round);

    const existUser = await UserService.getUserByEmail(payload.email);
    if (existUser) throw new DuplicatedEmailException();

    const userPayload: CreateUserPayload = {
      ...payload,
      password: await hash(payload.password, salt),
    };

    const user = (await userModel.create({ ...userPayload })).toJSON();
    delete user.password;
    return user;
  },

  login: async (payload: LoginPayload): Promise<TokenResponse> => {
    const { email, password } = payload;
    const { secretKey, expiresIn } = config.jwt;

    const user = (await userModel.findOne({ where: { email } }))?.toJSON();
    if (!user) throw new NotFoundException('User not found.');

    const valid = await compare(password, user.password);
    if (!valid) throw new InvalidCredentialException();

    return {
      token: jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn }),
      expiresIn,
    };
  },
};
