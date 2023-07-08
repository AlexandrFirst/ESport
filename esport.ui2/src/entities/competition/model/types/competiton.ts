import { ICategory } from "./category";

import { CompetitionOrganisation } from "./competition-organisation";
import { CompetitionUser } from "./competition-creator";
import { CompetitionRequest } from "./competition-request";

export interface ICompetition {
  id?: number;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organisationId: number;
  createdBy: number;
  registrationCloseDate: string;
  isRegistrationOpen: boolean;
  address: string;
  organisation?: CompetitionOrganisation;
  categories?: ICategory[];
  creator?: CompetitionUser;
  requests?: CompetitionRequest[];
}

export interface ICompetitonOld extends ICompetition {
  // categories: string[];
}

export interface ICompetitonWithCategories extends ICompetition {
  // categories: ICategoryWithRoundsOld[];
}
