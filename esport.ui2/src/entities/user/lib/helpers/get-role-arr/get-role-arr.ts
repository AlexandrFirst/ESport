import { UserRole } from "@/shared/constants";

export const getRoleArr = (roles: string): UserRole[] => {
  return roles.split(",").map((role) => role.trim()) as UserRole[];
};
