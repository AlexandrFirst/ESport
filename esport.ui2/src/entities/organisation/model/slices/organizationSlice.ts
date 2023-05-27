import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrganizationSchema } from "../types/organizationSchema";

const initialState: OrganizationSchema = {};

export const organizationSlice = createSlice({
  name: "organization",
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

export const { actions: organizationActions } = organizationSlice;
export const { reducer: organizationReducer } = organizationSlice;
