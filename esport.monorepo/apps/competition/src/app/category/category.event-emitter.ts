import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { EventEmitter } from '../database/event-emitter';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryEventEmitter extends EventEmitter<CategoryEntity> {
  constructor(protected readonly rmqService: RMQService) {
    super(rmqService);
  }
}
