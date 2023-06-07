import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseSchema } from "../types/exerciseSchema";

const initialState: ExerciseSchema = {};

export const exerciseSlice = createSlice({
  name: "exercise",
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

export const { actions: exerciseActions } = exerciseSlice;
export const { reducer: exerciseReducer } = exerciseSlice;
