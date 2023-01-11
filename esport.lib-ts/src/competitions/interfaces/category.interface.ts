import { IFight } from "./fight.interface";

export interface ICategory {
  _id?: string;
  title: string;
  fights: IFight[];
}
