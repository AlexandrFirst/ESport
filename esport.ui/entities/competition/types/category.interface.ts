import { IFight } from "@entities/competition/types/fight.interface";

export interface ICategory {
  _id?: string;
  title: string;
  fights: IFight[];
}
