import { IFight } from './fight.interface';

export interface IRound {
  _id?: string;
  roundNumber: number;
  fights: string[];
}

export interface IRoundWithFights {
  _id?: string;
  roundNumber: number;
  fights: IFight[];
}
