import {
  ICategory,
  ICompetition,
  IDominEvent,
} from '@esport.monorepo/interfaces';

export class CompetitionEntity implements ICompetition {
  _id?: string;
  categories: ICategory[];
  dateStart: Date;
  dateEnd?: Date;
  organizationId: number;
  title: string;
  events: IDominEvent[] = [];

  constructor(c: ICompetition) {
    this._id = c._id;
    this.categories = c.categories;
    this.dateStart = c.dateStart;
    this.dateEnd = c.dateEnd;
    this.organizationId = c.organizationId;
    this.title = c.title;
  }

  public setCategoties(categories: ICategory[]) {
    this.categories = categories;
    // this.events.push()
    return this;
  }

  public addEvent(event: IDominEvent) {
    this.events.push(event);
    return this;
  }
}
