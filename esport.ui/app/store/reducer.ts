import { combineReducers } from "redux";

import { userReducer } from "@entities/user";

import { loadingIndicatorReducer } from "@features/TopPageLoader";
import { sportSnackbarReducer } from "@features/SportSnackbar";

import { layoutReducer } from "@layouts/MainLayout";

export const reducer = combineReducers({
  user: userReducer,
  loadingIndicator: loadingIndicatorReducer,
  layout: layoutReducer,
  snackbar: sportSnackbarReducer,
});
