import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CompetitionEntity } from './competition.entity';

@Injectable()
export class CompetitionEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle(competition: CompetitionEntity) {
    for (const { data, topic } of competition.events) {
      await this.rmqService.notify(topic, data, {
        persistent: true,
      });
    }
  }
}
