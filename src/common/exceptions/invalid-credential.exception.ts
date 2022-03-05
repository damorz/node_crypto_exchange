export class InvalidCredentialException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'FORBIDDEN';
    this.message = message || 'Invalid credential';
    this.statusCode = 403;
  }
}
