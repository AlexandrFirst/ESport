import { UserRole } from "@/shared/constants";
import { useMappedRoles } from "@/shared/lib";

import { useSelectUser } from "../../model/selectors/selectUser/selectUser";

import { useSelectRoles } from "../../model/selectors/selectRoles/selectRoles";

export const useAuth = () => {
  const user = useSelectUser();
  //TODO: check if current role is correct
  // const currentRole = useSelectCurrentRole();
  const roles = useSelectRoles();

  const mappedRoles = useMappedRoles();

  const getCurrentRoleTranslation = (currentRole: Maybe<UserRole>) => {
    if (!currentRole) return "";
    return mappedRoles[currentRole];
  };

  return {
    user,
    isAuth: !!user,
    //TODO: REMOVE OR UPDATE
    role: UserRole.OrganisationAdmin,
    translatedRole: getCurrentRoleTranslation(UserRole.OrganisationAdmin),

    isOrgAdmin: roles?.includes(UserRole.OrganisationAdmin) ?? false,
    isPupil: roles?.includes(UserRole.Trainee) ?? false,
    isLocalAdmin: roles?.includes(UserRole.GymAdmin) ?? false,
  };
};
