import { CombinedState } from "redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { updateSidebarOpened } from "@layouts/MainLayout";

export const makeSidebar = (store: ToolkitStore<CombinedState<any>>) => {
  const { layout } = store.getState();
  store.dispatch(updateSidebarOpened(layout.isSidebarOpened ?? true));
};
