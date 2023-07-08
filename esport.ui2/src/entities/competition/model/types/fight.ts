import { ICompetitor, ICompetitorOld } from "./competitor";
import { IRound } from "./round";

export interface IFightOld {
  _id?: string;
  isProcessed: boolean;
  winnerId?: string;
  fightNumber: number;
  competitors: ICompetitorOld[]; //sub doc
}

export interface IFight {
  id: number;
  isProceed: boolean;
  fightNumber: number;
  competitors?: ICompetitor[];
  round?: IRound;
  roundId?: number;
  createdAt: string;
  updatedAt: string;
}
