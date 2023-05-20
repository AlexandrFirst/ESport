import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { StateSchema } from "@/_app/Providers";

import { LeftSidebarSliceState } from "../types/schema";
import { buildSlice } from "@/shared/lib";

const initialState: LeftSidebarSliceState = {
  isSidebarOpened: null,
  openedSubItems: [],
};

const leftSidebarSlice = buildSlice({
  name: "leftSidebar",
  initialState,
  reducers: {
    updateSidebarOpened(state, action: PayloadAction<boolean>) {
      state.isSidebarOpened = action.payload;
    },
    setOpenedSubItems(state, action: PayloadAction<string[]>) {
      state.openedSubItems = action.payload;
    },
    pushOpenedSubItem(state, action: PayloadAction<string>) {
      console.log(
        "===client -> pushOpenedSubItem -> action.payload===",
        action.payload
      );
      state.openedSubItems.push(action.payload);
    },
    removeOpenedSubItem(state, action: PayloadAction<string>) {
      state.openedSubItems = state.openedSubItems.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => {
      return {
        ...state,
        ...action.payload.leftSidebar,
      };
    },
  },
});

export const {
  useActions: useLeftSidebarActions,
  actions: leftSidebarActions,
  reducer: leftSidebarReducer,
} = leftSidebarSlice;
