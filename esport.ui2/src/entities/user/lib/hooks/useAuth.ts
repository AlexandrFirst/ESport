import { useEffect } from "react";

import { useAppSelector } from "@/shared/lib";

import { UserRole } from "../../constants/user-role";
import { selectUser } from "../../model/selectors/selectUser/selectUser";
import { selectCurrentRole } from "../../model/selectors/selectCurrentRole/selectCurrentRole";

import { useMappedRoles } from "./useMappedRoles";

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const currentRole = useAppSelector(selectCurrentRole);

  const mappedRoles = useMappedRoles();

  useEffect(() => {
    //TODO: add logic of getting current user from server -> maybe
  }, []);

  const getCurrentRoleTranslation = (currentRole: UserRole | null) => {
    if (currentRole === null) return "";
    return mappedRoles[currentRole];
  };

  return {
    user,
    isAuth: !!user,
    currentRole,
    translatedRole: getCurrentRoleTranslation(currentRole),
    isAdmin: user?.roles.includes(UserRole.Admin),
    isPupil: user?.roles.includes(UserRole.Pupil),
    isLocalAdmin: user?.roles.includes(UserRole.LocalAdmin),
  };
};
