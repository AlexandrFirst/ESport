import { buildSelector } from "@/shared/lib";

export const [useSelectRole, selectRole] = buildSelector(
  (state) => state.user.account?.role
);
