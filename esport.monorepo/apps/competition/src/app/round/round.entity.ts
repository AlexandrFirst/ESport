import { IRound } from '@esport.monorepo/interfaces';

export class RoundEntity implements IRound {
  _id: string;
  roundNumber: number;
  fights: string[];

  constructor(r: IRound) {
    this._id = r._id;
    this.roundNumber = r.roundNumber;
    this.fights = r.fights;
  }
}
