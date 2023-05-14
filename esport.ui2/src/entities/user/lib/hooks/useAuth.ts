import { UserRole } from "@/shared/constants";

import { useSelectUser } from "../../model/selectors/selectUser/selectUser";

import { useSelectRoles } from "../../model/selectors/selectRoles/selectRoles";
import { useMappedRoles } from "./useMappedRoles";

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
    role: UserRole.OrgAdmin,
    translatedRole: getCurrentRoleTranslation(UserRole.OrgAdmin),

    isOrgAdmin: roles?.includes(UserRole.Admin) ?? false,
    isPupil: roles?.includes(UserRole.Pupil) ?? false,
    isLocalAdmin: roles?.includes(UserRole.LocalAdmin) ?? false,
  };
};
