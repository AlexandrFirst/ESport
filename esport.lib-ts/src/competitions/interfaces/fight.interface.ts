import { ICompetitor } from "./competitor.interface";

export interface IFight {
  _id?: string;
  isProcessed: boolean;
  winnerId?: string;
  fightNumber: number;
  competitors: ICompetitor[];
}
