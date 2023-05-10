import { IAccount } from "./user";

import { UserRole } from "@/shared/constants";

export interface UserSchema {
  isAuth: boolean;
  currentRole: UserRole | null;
  account: IAccount | null;
}
