import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { CompetitionEntity } from './competition.entity';
import { EventEmitter } from '../database/event-emitter';

@Injectable()
export class CompetitionEventEmitter extends EventEmitter<CompetitionEntity> {
  constructor(protected readonly rmqService: RMQService) {
    super(rmqService);
  }
}
