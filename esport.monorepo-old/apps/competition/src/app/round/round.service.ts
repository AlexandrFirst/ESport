import { Injectable } from '@nestjs/common';

import { RoundRepository } from './round.repository';
import { IFight, IRoundWithFights } from '@esport.monorepo/interfaces';
import { FightService } from '../fight/fight.service';
import { RoundEntity } from './round.entity';

@Injectable()
export class RoundService {
  constructor(
    private readonly roundRepo: RoundRepository,
    private readonly fightService: FightService
  ) {}

  async createWithFights(r: IRoundWithFights) {
    const fights: IFight[] = [];
    for (const fight of r.fights) {
      const newFight = await this.fightService.create(fight);
      fights.push(newFight);
    }
    // console.log('===fights===', fights);

    return this.roundRepo.create(
      new RoundEntity({
        ...r,
        fights: fights.map((f) => f._id),
      })
    );
  }
}
