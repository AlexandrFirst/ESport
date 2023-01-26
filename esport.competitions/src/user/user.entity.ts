import { IDominEvent } from 'esport-lib-ts/lib';
import { IUser } from 'esport-lib-ts/lib/competitions/interfaces/user.interface';

export class UserEntity implements IUser {
  _id: string;
  name: string;
  surname: string;
  userId: number;
  events: IDominEvent[] = [];

  constructor(u: IUser) {
    this._id = u._id;
    this.name = u.name;
    this.surname = u.surname;
    this.userId = u.userId;
  }
}
