import { CombinedState } from "redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { StateSchema } from "@/_app/Providers";

export const updateSidebarState = (
  store: ToolkitStore<CombinedState<StateSchema>>
) => {
  const { dispatch } = store;
  const { leftSidebar } = store.getState();
  // dispatch(
  //   leftSidebarActions.updateSidebarOpened(leftSidebar.isSidebarOpened ?? false)
  // );
  // dispatch(
  //   leftSidebarActions.setOpenedSubItems(leftSidebar.openedSubItems ?? [])
  // );
};
