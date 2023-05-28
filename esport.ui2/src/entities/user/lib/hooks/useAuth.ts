import { UserRole } from "@/shared/constants";
import { useMappedRoles } from "@/shared/lib";

import { useSelectUser } from "../../model/selectors/selectUser/selectUser";
import { useSelectRoles } from "../../model/selectors/selectRoles/selectRoles";

export const useAuth = () => {
  const user = useSelectUser();
  const roles = useSelectRoles();

  const mappedRoles = useMappedRoles();

  const getCurrentRoleTranslation = (currentRole: Maybe<UserRole>) => {
    if (!currentRole) return "";
    return mappedRoles[currentRole];
  };

  return {
    user,
    isAuth: !!user,
    roles: roles ?? [],
    translatedRole: getCurrentRoleTranslation(UserRole.OrganisationAdmin),

    isOrgAdmin: roles?.includes(UserRole.OrganisationAdmin) ?? false,
    isPupil: roles?.includes(UserRole.Trainee) ?? false,
    isLocalAdmin: roles?.includes(UserRole.GymAdmin) ?? false,
  };
};
