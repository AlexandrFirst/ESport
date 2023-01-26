import { INSTEAD_STRING } from "../../../../shared/consts/app";
import { IUser } from "../../../../shared/types/app-user";

export const getDisplayName = (
  user: Partial<IUser> | null,
  instead = INSTEAD_STRING
) => {
  if (!user || (!user.name && !user.lastName)) return instead;
  return `${user.name ?? ""} ${user.lastName ?? ""}`.trim();
};
