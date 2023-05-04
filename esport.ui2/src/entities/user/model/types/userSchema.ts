import { IUser } from "./user";
import { UserRole } from "../../constants/user-role";

export interface UserSchema {
  isAuth: boolean;
  currentRole: UserRole | null;
  data: IUser | null;
}
