import { ICategory, IDominEvent, IRound } from '@esport.monorepo/interfaces';

export class CategoryEntity implements ICategory {
  _id: string;
  // fights: IFight[];
  title: string;
  events: IDominEvent[] = [];
  rounds: IRound[] = [];

  constructor(c: ICategory) {
    this._id = c._id;
    this.title = c.title;
    this.rounds = c.rounds;
  }

  updateCategoryData({ title, rounds }: ICategory) {
    title && this.setTitle(title);
    this.rounds && this.setFights(rounds);
    return this;
  }

  setFights(rounds: IRound[]) {
    this.rounds = rounds;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }
}
