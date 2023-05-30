import { UserRole } from "@/shared/constants";

import { useSelectUser } from "../../model/selectors/selectUser/selectUser";
import { useSelectRoles } from "../../model/selectors/selectRoles/selectRoles";

export const useAuth = () => {
  const user = useSelectUser();
  const roles = useSelectRoles();

  const hasRole = (role: UserRole) => roles?.includes(role) ?? false;

  return {
    user,
    isAuth: !!user,
    roles: roles ?? [],

    isTrainee: hasRole(UserRole.Trainee),
    isTrainer: hasRole(UserRole.Trainer),
    isGymAdmin: hasRole(UserRole.GymAdmin),
    isOrganisationAdmin: hasRole(UserRole.OrganisationAdmin),
  };
};
