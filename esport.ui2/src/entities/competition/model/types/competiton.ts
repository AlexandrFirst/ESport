import { ICategoryWithRounds } from "./category";

export interface ICompetiton {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: string[];
}

export interface ICompetitonWithCategories {
  _id?: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  organizationId: number;
  categories: ICategoryWithRounds[];
}
