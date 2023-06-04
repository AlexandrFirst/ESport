import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainerSchema } from "../types/trainerSchema";

const initialState: TrainerSchema = {};

export const trainerSlice = createSlice({
  name: "trainer",
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

export const { actions: trainerActions } = trainerSlice;
export const { reducer: trainerReducer } = trainerSlice;
