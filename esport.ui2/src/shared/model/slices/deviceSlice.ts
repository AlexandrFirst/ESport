import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { StateSchema } from "@/_app/Providers";

export interface DeviceSliceState {
  isMobile: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIos: boolean;
  isSSR: boolean;
}

const initialState: DeviceSliceState = {
  isMobile: false,
  isDesktop: false,
  isAndroid: false,
  isIos: false,
  isSSR: false,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceSliceState>) => {
      state.isMobile = action.payload.isMobile;
      state.isDesktop = action.payload.isDesktop;
      state.isAndroid = action.payload.isAndroid;
      state.isIos = action.payload.isIos;
      state.isSSR = action.payload.isSSR;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => {
      return {
        ...state,
        ...action.payload.device,
      };
    },
  },
});

export const { actions: deviceActions } = deviceSlice;
export const { reducer: deviceReducer } = deviceSlice;
