import { useMemo } from "react";

import { UserRole } from "@/shared/constants";

export const useMappedRoles = (): Record<UserRole, string> => {
  //TODO: add translations
  return useMemo(
    () => ({
      [UserRole.Admin]: "Admin",
      [UserRole.LocalAdmin]: "Local Admin",
      [UserRole.Pupil]: "Pupil",
      [UserRole.OrgAdmin]: "Organization Admin",
    }),
    []
  );
};
