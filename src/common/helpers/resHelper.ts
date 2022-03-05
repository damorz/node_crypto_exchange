import { Response } from 'express';

export const ResHelper = (res: Response, status = 500, payload: any, message = 'success') => {
  res.status(status).json({
    status,
    message,
    payload,
  });
};
