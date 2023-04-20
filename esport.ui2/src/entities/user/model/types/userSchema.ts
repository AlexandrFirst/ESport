import { IUser } from "./user";

export interface UserSchema {
  isAuth: boolean;
  user: IUser | null;
}
