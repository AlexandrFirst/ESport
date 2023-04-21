import { IUser } from "./user";
import { UserRole } from "../../constants/user-role";

export interface UserSchema {
  isAuth: boolean;
  currentRole: UserRole | null;
  user: IUser | null;
}
