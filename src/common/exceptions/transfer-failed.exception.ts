export class TransferFailedException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BAD REQUEST';
    this.message = message || 'Transfet currency failed.';
    this.statusCode = 400;
  }
}
