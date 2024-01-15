import { ICompetitor } from "./competitor";

export interface IFight {
  _id?: string;
  isProcessed: boolean;
  winnerId?: string;
  fightNumber: number;
  competitors: ICompetitor[]; //sub doc
}
