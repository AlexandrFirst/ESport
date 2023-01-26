import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../../app/store/store";

interface LayoutState {
  isSidebarOpened: boolean;
}

const initialState: LayoutState = {
  isSidebarOpened: false,
};

const mainLayoutSlice = createSlice({
  name: "mainLayoutSlice",
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
// export const selectIsSidebarOpened = createSelector(
//   selectLayout,
//   ({ isSidebarOpened }) => isSidebarOpened
// );
