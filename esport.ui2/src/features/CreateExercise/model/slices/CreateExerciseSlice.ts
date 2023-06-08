import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateExerciseSchema } from "../types/CreateExerciseSchema";

const initialState: CreateExerciseSchema = {};

export const CreateExerciseSlice = createSlice({
  name: "CreateExercise",
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

export const { actions: CreateExerciseActions } = CreateExerciseSlice;
export const { reducer: CreateExerciseReducer } = CreateExerciseSlice;
