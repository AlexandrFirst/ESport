import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@app/store/store";

interface LayoutState {
  isSidebarOpened: boolean | null;
  openedSubItems: string[];
}

const initialState: LayoutState = {
  isSidebarOpened: null,
  openedSubItems: [],
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
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
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.layout,
      };
    },
  },
});

export const {
  updateSidebarOpened,
  removeOpenedSubItem,
  pushOpenedSubItem,
  setOpenedSubItems,
} = mainLayoutSlice.actions;
export const layoutReducer = mainLayoutSlice.reducer;
export const selectLayout = (state: RootState) => state.layout;

export const selectIsSidebarOpened = createSelector(
  selectLayout,
  ({ isSidebarOpened }) => isSidebarOpened
);

export const selectOpenedSubItems = createSelector(
  selectLayout,
  ({ openedSubItems }) => openedSubItems
);
