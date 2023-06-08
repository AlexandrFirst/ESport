import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TraineeSchema } from "../types/traineeSchema";

const initialState: TraineeSchema = {};

export const traineeSlice = createSlice({
  name: "trainee",
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

export const { actions: traineeActions } = traineeSlice;
export const { reducer: traineeReducer } = traineeSlice;
