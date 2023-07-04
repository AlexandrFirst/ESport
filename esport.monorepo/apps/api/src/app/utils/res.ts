import { Logger, HttpException } from '@nestjs/common';
import { RMQError } from 'nestjs-rmq';

export async function res<TRes>(cb: () => Promise<TRes>) {
  try {
    return await cb();
  } catch (error) {
    if (error instanceof RMQError) {
      Logger.error(error.message, error.service);
    } else {
      Logger.error(error);
    }
    throw new HttpException(error?.message, error?.code ?? 500);
  }
}
