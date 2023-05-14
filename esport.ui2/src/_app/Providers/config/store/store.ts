import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { StateSchema } from "./StateSchema";
import { reducer } from "./reducer";

export const makeStore = (preloadedState?: StateSchema) =>
  configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;

export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

// @ts-ignore
export const wrapper = createWrapper<RootStore>(makeStore);
