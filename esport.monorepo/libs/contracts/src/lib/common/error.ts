import { RMQError } from 'nestjs-rmq';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';

export class AppError extends RMQError {
  constructor(message: string, code = 500) {
    super(message, ERROR_TYPE.TRANSPORT, code);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
