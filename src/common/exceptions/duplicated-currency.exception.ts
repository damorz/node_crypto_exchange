export class DuplicatedCurrencyException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BAD REQUEST';
    this.message = message || 'Currency already exist.';
    this.statusCode = 400;
  }
}
