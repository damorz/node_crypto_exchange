export class DuplcatedEmailException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BAD REQUEST';
    this.message = message || 'Email already exist.';
    this.statusCode = 400;
  }
}
