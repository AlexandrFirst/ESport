import { ICompetition } from '../../../../esport.contracts-ts/src/interfaces/competition/competition.interface';
import { ICategory } from '../../../../esport.contracts-ts/src/interfaces/competition/category.interface';

export class CompetitionEntity implements ICompetition {
  _id?: string;
  categories: ICategory[];
  dateStart: Date;
  dateEnd?: Date;
  organizationId: number;
  title: string;

  constructor(c: ICompetition) {
    this._id = c._id;
    this.categories = c.categories;
    this.dateStart = c.dateStart;
    this.dateEnd = c.dateEnd;
    this.organizationId = c.organizationId;
    this.title = c.title;
  }
}
