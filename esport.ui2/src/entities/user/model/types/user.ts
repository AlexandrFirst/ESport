import { UserRole } from "@/shared/constants";

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles?: UserRole[];
}
