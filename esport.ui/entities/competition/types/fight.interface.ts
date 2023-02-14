import { ICompetitor } from "@entities/competition";

export interface IFight {
  _id?: string;
  isProcessed: boolean;
  winnerId?: string;
  accNumber: number;
  competitors: ICompetitor[];
}