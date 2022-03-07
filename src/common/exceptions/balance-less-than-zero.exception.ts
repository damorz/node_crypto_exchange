export class BalanceLessThanZeroException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BAD REQUEST';
    this.message = message || 'Balance cannot less than zero.';
    this.statusCode = 400;
  }
}
