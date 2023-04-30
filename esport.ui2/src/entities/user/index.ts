export { User } from "./ui/User/User";
export { default as UserNameRoleHolder } from "./ui/UserNameRoleHolder/UserNameRoleHolder";

export {
  userReducer,
  userActions,
  useUserActions,
} from "./model/slices/userSlice";
export { updateStoreUser } from "./lib/helpers/update-store-user";
export type { UserSchema } from "./model/types/userSchema";
export type { IUser } from "./model/types/user";

export { selectIsAuth } from "./model/selectors/selectIsAuth/selectIsAuth";
export {
  selectUser,
  useSelectUser,
} from "./model/selectors/selectUser/selectUser";
export {
  selectCurrentRole,
  useSelectCurrentRole,
} from "./model/selectors/selectCurrentRole/selectCurrentRole";
export {
  useSelectRole,
  selectRole,
} from "./model/selectors/selectRole/selectRole";

export { UserRole } from "./constants/user-role";

export { authService } from "./api/auth-api";

export { useAuth } from "./lib/hooks/useAuth";
export { useMappedRoles } from "./lib/hooks/useMappedRoles";
