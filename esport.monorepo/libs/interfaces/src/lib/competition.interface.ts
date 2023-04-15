export interface ICompetition {
  _id?: string;
  title: string;
  dateStart: Date;
  dateEnd?: Date;
  organizationId: number;
  categories: any[];
}
