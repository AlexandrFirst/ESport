import { UserRole } from "../../constants/user-role";

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  roles: UserRole[];
}
