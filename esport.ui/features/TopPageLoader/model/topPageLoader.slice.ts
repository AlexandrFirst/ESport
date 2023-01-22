import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@app/store/store";

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
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state.loadingIndicator,
      ...action.payload.loadingIndicator,
    }),
  },
});

export const { showLoading, hideLoading } = topPageLoaderSlice.actions;
export const loadingIndicatorReducer = topPageLoaderSlice.reducer;
export const selectLoadingIndicator = (state: RootState) =>
  state.loadingIndicator;
