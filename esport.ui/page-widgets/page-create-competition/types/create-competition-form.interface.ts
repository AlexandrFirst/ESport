export interface ICreateCompetitionForm {
  title: string;
  dateStart: string;
  dateEnd?: string;
  // organizationId
  categories?: string[];
}
