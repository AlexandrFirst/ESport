import { IRoundWithFights } from "./round";

export interface ICategory {
  _id?: string;
  title: string;
  rounds: string[];
}

export interface ICategoryWithRounds {
  _id?: string;
  title: string;
  rounds: IRoundWithFights[];
}
