import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class CompetitionEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle() {
    // for (const { data, topic } of eventEntity.events) {
    //   await this.rmqService.notify(topic, data, {
    //     persistent: true,
    //   });
    // }
  }
}
