import { createSelector } from "reselect";
import { StateSchema } from "@/_app/Providers";

export const selectIsSidebarOpened = createSelector(
  (state: StateSchema) => state.leftSidebar,
  ({ isSidebarOpened }) => isSidebarOpened
);
