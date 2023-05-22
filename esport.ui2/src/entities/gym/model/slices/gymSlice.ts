import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GymSchema } from "../types/gymSchema";

const initialState: GymSchema = {};

export const gymSlice = createSlice({
    name: 'gym',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
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

export const { actions: gymActions } = gymSlice;
export const { reducer: gymReducer } = gymSlice;
