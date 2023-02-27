import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";

import { RootState } from "@app/store/store";
import { error } from "@features/SportSnackbar";

export const updateSnackError = (
  store: ToolkitStore<CombinedState<RootState>>,
  message: string
) => {
  const { dispatch } = store;
  dispatch(error({ message }));
};
