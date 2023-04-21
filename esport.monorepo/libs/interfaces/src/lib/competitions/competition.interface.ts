export interface ICompetition {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: string[];
}
