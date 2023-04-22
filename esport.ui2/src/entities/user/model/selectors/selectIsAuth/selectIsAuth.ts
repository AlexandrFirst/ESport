import { StateSchema } from "@/_app/Providers";

export const selectIsAuth = (state: StateSchema) => state.user.isAuth;
