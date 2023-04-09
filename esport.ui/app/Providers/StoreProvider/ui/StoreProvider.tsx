import React, { FC, PropsWithChildren } from "react";
import { DeepPartial } from "redux";
import { Provider } from "react-redux";
import {
  makeStore,
  RootStore,
} from "@app/Providers/StoreProvider/config/store";

interface StoreProviderProps extends PropsWithChildren {
  store?: RootStore;
  initialState?: DeepPartial<RootStore>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  store,
  initialState,
  children,
}) => {
  // if (!store && !initialState) {
  //   throw new Error(
  //     "StoreProvider: You must provide either a store or an initialState."
  //   );
  // }

  const storeInstance = store ?? makeStore(initialState);
  return <Provider store={storeInstance}>{children}</Provider>;
};
