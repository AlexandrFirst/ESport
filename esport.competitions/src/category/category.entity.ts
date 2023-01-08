import { ICategory, IDominEvent } from 'esport-lib-ts/lib';
import { IFight } from 'esport-lib-ts/lib/competition';

export class CategoryEntity implements ICategory {
  _id: string;
  fights: IFight[];
  title: string;
  events: IDominEvent[] = [];

  constructor(c: ICategory) {
    this._id = c._id;
    this.title = c.title;
    this.fights = c.fights;
  }

  updateCategory({ title, fights }: ICategory) {
    title && this.setTitle(title);
    fights && this.setFights(fights);
    return this;
  }

  setFights(fights: IFight[]) {
    this.fights = fights;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }
}
