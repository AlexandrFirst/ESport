import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplyToCompetitionFormSchema } from "../types/ApplyToCompetitionFormSchema";

const initialState: ApplyToCompetitionFormSchema = {};

export const ApplyToCompetitionFormSlice = createSlice({
  name: "ApplyToCompetitionForm",
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

export const { actions: ApplyToCompetitionFormActions } =
  ApplyToCompetitionFormSlice;
export const { reducer: ApplyToCompetitionFormReducer } =
  ApplyToCompetitionFormSlice;
