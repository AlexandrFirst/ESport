import React, { FC, ReactNode } from "react";
import { Store } from "@reduxjs/toolkit";
import { CombinedState } from "redux";
import { Provider } from "react-redux";

import { StateSchema } from "../config/store/StateSchema";

interface StoreProviderProps {
  store: Store<CombinedState<StateSchema>>;
  children?: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ store, children }) => {
  return <Provider store={store}>{children}</Provider>;
};
