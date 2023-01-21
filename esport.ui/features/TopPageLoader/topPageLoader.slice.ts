import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";

interface TopPageLoaderState {
  isLoading: boolean;
}

const initialState: TopPageLoaderState = {
  isLoading: false,
};

const topPageLoaderSlice = createSlice({
  name: "loadingIndicator",
  initialState,
  reducers: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { showLoading, hideLoading } = topPageLoaderSlice.actions;
export const loadingIndicatorReducer = topPageLoaderSlice.reducer;
export const selectLoadingIndicator = (state: RootState) =>
  state.loadingIndicator;
