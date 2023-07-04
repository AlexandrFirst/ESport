import { ICategoryWithRounds } from './category.interface';

export interface ICompetition {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: string[];
}

export interface ICompetitionWithCategories {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: ICategoryWithRounds[];
}
