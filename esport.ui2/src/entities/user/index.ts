export { User } from "./ui/User/User";

export { userReducer, userActions } from "./model/slices/userSlice";
export type { UserSchema } from "./model/types/userSchema";
export type { IUser } from "./model/types/user";

export { selectIsAuth } from "./model/selectors/selectIsAuth/selectIsAuth";
export { selectUser } from "./model/selectors/selectUser/selectUser";

export { authService } from "./api/auth-api";
