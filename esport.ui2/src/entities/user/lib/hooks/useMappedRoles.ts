import { useMemo } from "react";

import { UserRole } from "../../constants/user-role";

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
