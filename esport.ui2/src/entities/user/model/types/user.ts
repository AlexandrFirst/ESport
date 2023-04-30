import { UserRole } from "../../constants/user-role";

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  roles?: UserRole[];
}
