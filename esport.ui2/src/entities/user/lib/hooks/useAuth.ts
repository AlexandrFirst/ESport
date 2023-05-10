import { useSelectUser } from "../../model/selectors/selectUser/selectUser";
import { useSelectCurrentRole } from "../../model/selectors/selectCurrentRole/selectCurrentRole";
import { useSelectRole } from "../../model/selectors/selectRole/selectRole";

import { useMappedRoles } from "./useMappedRoles";
import { UserRole } from "@/shared/constants";

export const useAuth = () => {
  const user = useSelectUser();
  //TODO: check if current role is correct
  const currentRole = useSelectCurrentRole();
  const role = useSelectRole();

  const mappedRoles = useMappedRoles();

  const getCurrentRoleTranslation = (currentRole: Maybe<UserRole>) => {
    if (!currentRole) return "";
    return mappedRoles[currentRole];
  };

  return {
    user,
    isAuth: !!user,
    role: currentRole,
    translatedRole: getCurrentRoleTranslation(role),
    // isAdmin: user?.roles.includes(UserRole.Admin),
    // isPupil: user?.roles.includes(UserRole.Pupil),
    // isLocalAdmin: user?.roles.includes(UserRole.LocalAdmin),
  };
};
