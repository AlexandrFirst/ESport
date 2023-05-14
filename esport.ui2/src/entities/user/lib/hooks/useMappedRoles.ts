import { useMemo } from "react";

import { UserRole } from "@/shared/constants";

export const useMappedRoles = (): Record<UserRole, string> => {
  //TODO: add translations
  return useMemo(
    () => ({
      [UserRole.GymAdmin]: "",
      [UserRole.Trainee]: "",
      [UserRole.OrganisationAdmin]: "",
      [UserRole.Trainer]: "",
    }),
    []
  );
};
