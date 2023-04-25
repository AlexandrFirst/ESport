import { buildSelector } from "@/shared/lib";

export const [useSnackToasts, selectToasts] = buildSelector(
  (state) => state.snackbar?.toasts
);
