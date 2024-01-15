import { IRound, IRoundWithFightsOld } from "./round";
import { ICompetition } from "./competiton";

export interface ICategoryOld {
  _id?: string;
  title: string;
  rounds: string[];
}

export interface ICategoryWithRoundsOld {
  _id?: string;
  title: string;
  rounds: IRoundWithFightsOld[];
}

export interface ICategory {
  id: number;
  title: string;
  competitionId: number;
  competition?: ICompetition;
  createdAt: string;
  updatedAt: string;
  rounds?: IRound[];
  minAge?: number;
  maxAge?: number;
  minWeight?: number;
  maxWeight?: number;
  minHeight?: number;
  maxHeight?: number;
}
