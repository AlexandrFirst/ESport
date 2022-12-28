import { ICompatitor } from "./compatitor.interface";

export interface ICategory {
  _id?: string;
  title: string;
  competitors: ICompatitor[];
}
