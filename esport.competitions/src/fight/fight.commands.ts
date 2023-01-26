import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

import { FightCreate } from 'esport-lib-ts/lib/competitions';

import { FightService } from './fight.service';

@Controller()
export class FightCommands {
  constructor(private readonly fightService: FightService) {}

  @RMQValidate()
  @RMQRoute(FightCreate.topic)
  async createFight(req: FightCreate.Request): Promise<FightCreate.Response> {
    const { id } = await this.fightService.create({
      ...req,
      competitors: [],
    });
    return { id };
  }
}
