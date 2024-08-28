import Exception from './Exception';

export class BadRequestException extends Exception {
  constructor(message: string, error?: any) {
    super(message, 400, error);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message: string, error?: any) {
    super(message, 401, error);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string, error?: any) {
    super(message, 403, error);
  }
}

export class NotFoundException extends Exception {
  constructor(message: string, error?: any) {
    super(message, 404, error);
  }
}

export class InternalServerErrorException extends Exception {
  constructor(message: string, error?: any) {
    super(message, 500, error);
  }
}

export class CustomException extends Exception {
  constructor(message: string, statusCode: number, error?: any) {
    super(message, statusCode, error);
  }
}
