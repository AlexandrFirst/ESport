import { IFight } from "./fight.interface";

export interface IRound {
  _id?: string;
  roundNumber: number;
  fights: IFight[];
}
