import { RMQError } from 'nestjs-rmq';
import { HttpException, Logger } from '@nestjs/common';

export async function res<TRes>(cb: () => Promise<TRes>) {
  try {
    return await cb();
  } catch (error) {
    if (error instanceof RMQError) {
      Logger.error('', error.service);
      Logger.error('', error.host);
    }
    Logger.error(error);
    throw new HttpException(error?.message, error.code ?? 500);
  }
}
