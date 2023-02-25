import { CombinedState } from "redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { setOpenedSubItems, updateSidebarOpened } from "@layouts/MainLayout";
import { RootState } from "@app/store/store";

export const updateSidebarState = (
  store: ToolkitStore<CombinedState<RootState>>
) => {
  const { getState, dispatch } = store;
  const { layout } = getState();
  dispatch(updateSidebarOpened(layout.isSidebarOpened ?? true));
  dispatch(setOpenedSubItems(layout.openedSubItems ?? []));
};
