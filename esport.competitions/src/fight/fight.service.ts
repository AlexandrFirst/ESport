import { Injectable } from '@nestjs/common';
import { IFight } from 'esport-lib-ts/lib/competitions';

import { FightRepository } from './fight.repository';
import { FightEntity } from './fight.entity';

@Injectable()
export class FightService {
  constructor(private readonly fightRepo: FightRepository) {}

  async getAll() {
    return this.fightRepo.findWithPopulate();
  }

  async create(fight: IFight) {
    return this.fightRepo.create(new FightEntity(fight));
  }

  async update(f: Partial<IFight>) {
    const fight = await this.fightRepo.findById(f._id);
    const fightEntity = new FightEntity(fight).partialUpdate(f);
    return this.fightRepo.update(fightEntity);
  }
}
