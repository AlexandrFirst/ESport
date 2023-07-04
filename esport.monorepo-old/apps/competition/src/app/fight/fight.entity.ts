import { ICompetitor, IFight } from '@esport.monorepo/interfaces';

export class FightEntity implements IFight {
  _id: string;
  competitors: ICompetitor[];
  fightNumber: number;
  isProcessed: boolean;
  winnerId: string;

  constructor(fight: IFight) {
    this._id = fight._id;
    this.competitors = fight.competitors;
    this.fightNumber = fight.fightNumber;
    this.isProcessed = fight.isProcessed;
    this.winnerId = fight.winnerId;
  }
}
