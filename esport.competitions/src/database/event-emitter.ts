import { RMQService } from 'nestjs-rmq';
import { IDominEvent } from 'esport-lib-ts/lib';

export abstract class EventEmitter<TEntity extends { events: IDominEvent[] }> {
  protected constructor(protected readonly rmqService: RMQService) {}

  async handle(event: TEntity) {
    for (const { data, topic } of event.events) {
      await this.rmqService.notify(topic, data, {
        persistent: true,
      });
    }
  }
}
