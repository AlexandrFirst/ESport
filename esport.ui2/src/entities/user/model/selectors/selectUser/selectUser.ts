import { StateSchema } from "@/_app/Providers";

export const selectUser = (state: StateSchema) => state.user.user;
