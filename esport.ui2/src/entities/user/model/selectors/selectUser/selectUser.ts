import { buildSelector } from "@/shared/lib";

export const [useSelectUser, selectUser] = buildSelector(
  (state) => state.user.account
);
