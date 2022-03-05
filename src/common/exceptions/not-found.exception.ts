export class NotFoundException extends Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;

  constructor(message?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NOT FOUND';
    this.message = message || 'not found';
    this.statusCode = 404;
  }
}
