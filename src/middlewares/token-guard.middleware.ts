import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResHelper } from '../common/helpers/resHelper';
import config from '../config/config';

const extractToken = (headers: IncomingHttpHeaders) => {
  const { authorization } = headers;

  if (!authorization) return authorization;

  return authorization.split(' ')[1];
};

export const userGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req.headers) || '';
  const { secretKey } = config.jwt;

  if (!token) return ResHelper(res, 401, null, 'Unauthorized');

  try {
    const decoded = await jwt.verify(token, secretKey);
    if (typeof decoded !== 'string' && decoded.role !== 'user' && decoded.role !== 'admin') {
      return ResHelper(res, 401, null, 'Unauthorized');
    }
  } catch (error) {
    return ResHelper(res, 403, null, 'Forbidden');
  }
  next();
};

export const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req.headers) || '';
  const { secretKey } = config.jwt;

  if (!token) return ResHelper(res, 401, null, 'Unauthorized');

  try {
    const decoded = await jwt.verify(token, secretKey);
    if (typeof decoded !== 'string' && decoded.role !== 'admin') {
      return ResHelper(res, 401, null, 'Unauthorized');
    }
  } catch (error) {
    return ResHelper(res, 403, null, 'Forbidden');
  }
  next();
};
