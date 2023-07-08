import { IFight, IFightOld } from "./fight";
import { ICategory } from "./category";

export interface IRoundOld {
  _id?: string;
  roundNumber: number;
  fights: string[];
}

export interface IRoundWithFightsOld {
  _id?: string;
  roundNumber: number;
  fights: IFightOld[];
}

export interface IRound {
  id: number;
  title: string;
  roundNum: number;
  category?: ICategory;
  categoryId?: string;
  fights?: IFight[];
  createdAt: string;
  updatedAt: string;
}
