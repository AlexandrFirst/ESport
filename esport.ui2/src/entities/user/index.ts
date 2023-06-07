export { User } from "./ui/User/User";
export { default as UserNameRoleHolder } from "./ui/UserNameRoleHolder/UserNameRoleHolder";

//slice
export {
  userReducer,
  userActions,
  useUserActions,
} from "./model/slices/userSlice";

//lib
export { updateStoreUser } from "./lib/helpers/update-store-user/update-store-user";
export { useAuth } from "./lib/hooks/useAuth";
export { useCurrentUserProfileInfo } from "./lib/hooks/useCurrentUserProfileInfo";

//types
export type { UserSchema } from "./model/types/userSchema";
export type { IUser } from "./model/types/user";

//selectors
export { selectIsAuth } from "./model/selectors/selectIsAuth/selectIsAuth";
export {
  selectUser,
  useSelectUser,
} from "./model/selectors/selectUser/selectUser";

export {
  useSelectRoles,
  selectRoles,
} from "./model/selectors/selectRoles/selectRoles";

//api
export { AuthService } from "./api/auth-api";
export { useLogout } from "./api/hooks/useLogout";
export { useConfirmUser } from "./api/hooks/useConfirmUser";
