import { StateSchema } from "@/_app/Providers";

export const selectToasts = (state: StateSchema) => state.snackbar?.toasts;
