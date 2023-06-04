import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUserProfileInfoSchema } from "../types/CurrentUserProfileInfoSchema";

const initialState: CurrentUserProfileInfoSchema = {};

export const CurrentUserProfileInfoSlice = createSlice({
  name: "CurrentUserProfileInfo",
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {},
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { actions: CurrentUserProfileInfoActions } =
  CurrentUserProfileInfoSlice;
export const { reducer: CurrentUserProfileInfoReducer } =
  CurrentUserProfileInfoSlice;
