import { ICategory } from "@entities/competition";

export interface ICompetition {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: ICategory[];
}
