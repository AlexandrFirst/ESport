import { IDominEvent } from 'esport-lib-ts/lib';
import { ICompetitor, IFight } from 'esport-lib-ts/lib/competitions';

export class FightEntity implements IFight {
  _id: string;
  accNumber: number;
  competitors: ICompetitor[];
  isProcessed: boolean;
  winnerId: string;
  events: IDominEvent[] = [];
  fightNumber: number;

  constructor(c: Partial<IFight>) {
    this._id = c._id;
    //TODO: fix this => only for compile
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.accNumber = c.accNumber ?? 0;
    this.competitors = c.competitors ?? [];
    this.isProcessed = c.isProcessed ?? false;
    this.winnerId = c.winnerId;
  }

  updateCompetitors(competitors: ICompetitor[]) {
    function checkType(c: ICompetitor[]) {
      const currentType = c[0].type;
      if (!currentType) return currentType;
      c.forEach((competitor) => {
        if (competitor.type !== currentType) {
          throw new Error('New competitors must have the same type');
        }
      });
      return currentType;
    }

    const newCompetitorsType = checkType(competitors);
    if (this.competitors.length === 0) {
      this.competitors = competitors;
      return;
    }

    const currentCompetitorsType = checkType(this.competitors);
    if (newCompetitorsType !== currentCompetitorsType) {
      throw new Error('existing and new competitors must have the same type');
    }
    this.competitors = competitors;
    return this;
  }

  partialUpdate(c: Partial<IFight>) {
    //TODO: fix this => only for compile
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.accNumber = c.accNumber ?? this.accNumber;
    this.isProcessed = c.isProcessed ?? this.isProcessed;
    this.winnerId = c.winnerId ?? this.winnerId;

    c.competitors && this.updateCompetitors(c.competitors);

    return this;
  }
}
