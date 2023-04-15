import { CombinedState } from "redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { StateSchema } from "@/_app/Providers";

import { leftSidebarActions } from "@/widgets/LeftSidebar";

export const updateSidebarState = (
  store: ToolkitStore<CombinedState<StateSchema>>
) => {
  const { getState, dispatch } = store;
  const { leftSidebar } = getState?.();
  dispatch(
    leftSidebarActions.updateSidebarOpened(leftSidebar.isSidebarOpened ?? true)
  );
  dispatch(
    leftSidebarActions.setOpenedSubItems(leftSidebar.openedSubItems ?? [])
  );
};
