import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TraumaSchema } from "../types/traumaSchema";

const initialState: TraumaSchema = {};

export const traumaSlice = createSlice({
  name: "trauma",
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

export const { actions: traumaActions } = traumaSlice;
export const { reducer: traumaReducer } = traumaSlice;
