export { User } from "./ui/User/User";
export { default as UserNameRoleHolder } from "./ui/UserNameRoleHolder/UserNameRoleHolder";

//slice
export {
  userReducer,
  userActions,
  useUserActions,
} from "./model/slices/userSlice";

//lib
export { updateStoreUser } from "./lib/helpers/update-store-user";
export { useAuth } from "./lib/hooks/useAuth";
export { useMappedRoles } from "./lib/hooks/useMappedRoles";

//types
export type { UserSchema } from "./model/types/userSchema";
export type { IAccount, UserInfo } from "./model/types/user";

//selectors
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

//api
export { AuthService } from "./api/auth-api";
export { useLogout } from "./api/hooks/useLogout";
