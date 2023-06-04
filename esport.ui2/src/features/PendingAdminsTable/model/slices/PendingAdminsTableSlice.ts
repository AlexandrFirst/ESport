import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PendingAdminsTableSchema } from "../types/PendingAdminsTableSchema";

const initialState: PendingAdminsTableSchema = {};

export const PendingAdminsTableSlice = createSlice({
  name: "PendingAdminsTable",
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

export const { actions: PendingAdminsTableActions } = PendingAdminsTableSlice;
export const { reducer: PendingAdminsTableReducer } = PendingAdminsTableSlice;
