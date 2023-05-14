import { buildSelector } from "@/shared/lib";

export const [useSelectRoles, selectRoles] = buildSelector(
  (state) => state.user.data?.roles
);
