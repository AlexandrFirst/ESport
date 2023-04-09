import { IRound } from "./round.interface";

export interface ICategory {
  _id?: string;
  title: string;
  rounds: IRound[];
}
