import { IUser } from '@esport.monorepo/interfaces';

export class UserEntity implements IUser {
  id: number;
  name: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
  }
}
