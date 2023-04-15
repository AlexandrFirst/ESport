import { StateSchema } from "@/_app/Providers";

export const selectPosition = (state: StateSchema) => state.snackbar?.position;
