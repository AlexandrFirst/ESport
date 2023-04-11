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
    await this.fightRepo.update(fightEntity);
    return fightEntity;
  }

  async updateMany(fights: Partial<IFight>[]) {
    return Promise.all(fights.map((f) => this.update(f)));
  }

  async updateOrCreateMany(fights: Partial<IFight>[]) {
    const newFights: IFight[] = [];
    await Promise.all(
      fights.map(async (fight) => {
        if (fight._id) {
          const f = await this.update(fight);
          //TODO: fix this => only for compile
          newFights.push(f as any);
        } else {
          const f = await this.create(fight as IFight);
          //TODO: fix this => only for compile
          newFights.push(f as any);
        }
      }),
    );
    return newFights;
  }
}
