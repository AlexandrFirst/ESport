import { ICategory } from "./category.interface";

export interface ICompetition {
  _id?: string;
  title: string;
  dateStart: Date;
  dateEnd?: Date;
  organizationId: number;
  categories: ICategory[];
}