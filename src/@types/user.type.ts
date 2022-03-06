import * as Sequelize from 'sequelize/types';
import { RoleEnum } from '../common/enum/role.enum';
export type CreateUserPayload = {
  email: string;
  password: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  phonenumber: string;
  role?: RoleEnum;
};

export type UserResponse = Omit<UserModel, 'password'>;

export interface UserModel extends Sequelize.Model<UserModel, CreateUserPayload> {
  id: number;
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  phonenumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type TokenResponse = {
  token: string;
  expiresIn: number;
};
