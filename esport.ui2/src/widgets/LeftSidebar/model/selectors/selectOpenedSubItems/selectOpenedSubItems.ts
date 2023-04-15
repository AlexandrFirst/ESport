import { StateSchema } from "@/_app/Providers";
import { createSelector } from "reselect";

export const selectOpenedSubItems = createSelector(
  (state: StateSchema) => state.leftSidebar,
  ({ openedSubItems }) => openedSubItems
);
