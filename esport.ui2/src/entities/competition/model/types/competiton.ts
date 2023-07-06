import { ICategoryWithRounds } from "./category";

export interface ICompetitonCommon {
  id?: number;
  title: string;
  dateStart: string;
  dateEnd?: string;
  registrationCloseDate: string;
  isRegistrationOpen: boolean;
}

export interface ICompetiton extends ICompetitonCommon {
  categories: string[];
}

export interface ICompetitonWithCategories extends ICompetitonCommon {
  categories: ICategoryWithRounds[];
}
