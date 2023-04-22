import { StateSchema } from "@/_app/Providers";

export const selectCurrentRole = (state: StateSchema) => state.user.currentRole;
