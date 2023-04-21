import { Injectable } from '@nestjs/common';
import { IFight } from '@esport.monorepo/interfaces';

import { FightEntity } from './fight.entity';
import { FightRepository } from './fight.repository';

@Injectable()
export class FightService {
  constructor(private readonly fightRepo: FightRepository) {}

  async create(fight: IFight) {
    const newFight = new FightEntity(fight);
    return this.fightRepo.create(newFight);
  }
}
