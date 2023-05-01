import { buildSelector } from "@/shared/lib";

export const [useSelectCurrentRole, selectCurrentRole] = buildSelector(
  (state) => state.user.currentRole
);
