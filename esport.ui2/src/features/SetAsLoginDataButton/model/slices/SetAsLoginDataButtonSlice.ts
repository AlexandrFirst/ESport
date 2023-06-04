import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetAsLoginDataButtonSchema } from "../types/SetAsLoginDataButtonSchema";

const initialState: SetAsLoginDataButtonSchema = {};

export const SetAsLoginDataButtonSlice = createSlice({
  name: "SetAsLoginDataButton",
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

export const { actions: SetAsLoginDataButtonActions } =
  SetAsLoginDataButtonSlice;
export const { reducer: SetAsLoginDataButtonReducer } =
  SetAsLoginDataButtonSlice;
