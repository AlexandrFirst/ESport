import { UserRole } from "@/shared/constants";

export interface IUser {
  id: string;
  name: string;
  email: string;
  roles?: UserRole[];
}
