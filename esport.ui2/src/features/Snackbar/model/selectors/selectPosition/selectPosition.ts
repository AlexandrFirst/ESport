import { buildSelector } from "@/shared/lib";

export const [useSnackPosition, selectPosition] = buildSelector(
  (state) => state.snackbar?.position
);
