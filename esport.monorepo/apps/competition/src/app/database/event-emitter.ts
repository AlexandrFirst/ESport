import { IDominEvent } from '@esport.monorepo/interfaces';
import { RMQService } from 'nestjs-rmq';

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
