import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { FightGetAll } from 'esport-lib-ts/lib/competitions';

import { FightService } from './fight.service';

@Controller()
export class FightQueries {
  constructor(private readonly fightService: FightService) {}

  @RMQValidate()
  @RMQRoute(FightGetAll.topic)
  async getAll(): Promise<FightGetAll.Response> {
    const fights = await this.fightService.getAll();
    return { fights };
  }
}
