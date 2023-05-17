import { useMemo } from "react";

import { UserRole } from "@/shared/constants";

export const useMappedRoles = (): Record<UserRole, string> => {
  //TODO: add translations
  return useMemo(
    () => ({
      [UserRole.GymAdmin]: "Administrator of the gym",
      [UserRole.Trainee]: "Trainee",
      [UserRole.OrganisationAdmin]: "Organisation administrator",
      [UserRole.Trainer]: "Trainer",
    }),
    []
  );
};
