import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@storage/store";

interface LayoutState {
  isSidebarOpened: boolean;
}

const initialState: LayoutState = {
  isSidebarOpened: false,
};

const layoutSlice = createSlice({
  name: "layout",
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

export const { updateSidebarOpened } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
export const selectLayout = (state: RootState) => state.layout;
// export const selectIsSidebarOpened = createSelector(
//   selectLayout,
//   ({ isSidebarOpened }) => isSidebarOpened
// );
