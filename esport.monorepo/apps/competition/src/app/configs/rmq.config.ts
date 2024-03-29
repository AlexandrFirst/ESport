import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions, IRMQServiceOptions } from 'nestjs-rmq';
import { Logger } from '@nestjs/common';

export const getRmqConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: getRmqFactory,
});

const getRmqFactory = async (
  configService: ConfigService
): Promise<IRMQServiceOptions> => ({
  exchangeName: configService.get('AMQP_EXCHANGE'),
  queueOptions: {
    autoDelete: false,
    exclusive: false,
    durable: true,
  },
  connections: [
    {
      login: configService.get('AMQP_LOGIN') ?? '',
      password: configService.get('AMQP_PASSWORD') ?? '',
      host: configService.get('AMQP_HOSTNAME') ?? '',
    },
  ],
  queueName: configService.get('AMQP_QUEUE') ?? '',
  prefetchCount: parseInt(configService.get('AMQP_PREFETCH_COUNT')) ?? 32,
  serviceName: 'eSport-competitions',
  logger: Logger,
});
