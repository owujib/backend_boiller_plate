export default class Exception extends Error {
  public statusCode: number;
  public status: string;
  public error?: any;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    error?: any,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.error = error;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  public getErrorResponse() {
    return {
      status: this.status,
      message: this.message,
      ...(this.error && { error: this.error }),
    };
  }
}
