export class DuplicatedCurrencyRateException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BAD REQUEST';
    this.message = message || 'Currency rate already exist.';
    this.statusCode = 400;
  }
}
