import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { EventEmitter } from '../database/event-emitter';

import { CompetitionEntity } from './competition.entity';

@Injectable()
export class CompetitionEventEmitter extends EventEmitter<CompetitionEntity> {
  constructor(protected readonly rmqService: RMQService) {
    super(rmqService);
  }
}
