import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@app/store/store";

interface LayoutState {
  isSidebarOpened: boolean | null;
}

const initialState: LayoutState = {
  isSidebarOpened: null,
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    updateSidebarOpened(state, action: PayloadAction<boolean>) {
      state.isSidebarOpened = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.layout,
    }),
  },
});

export const { updateSidebarOpened } = mainLayoutSlice.actions;
export const layoutReducer = mainLayoutSlice.reducer;
export const selectLayout = (state: RootState) => state.layout;

export const selectIsSidebarOpened = createSelector(
  selectLayout,
  ({ isSidebarOpened }) => isSidebarOpened
);
