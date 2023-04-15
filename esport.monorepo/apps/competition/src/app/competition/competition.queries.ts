import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { CompetitionsGetAll } from '@esport.monorepo/contracts';

@Controller()
export class CompetitionQueries {
  @RMQRoute(CompetitionsGetAll.topic)
  async getAll() {
    return [{ name: 'test' }];
  }
}
