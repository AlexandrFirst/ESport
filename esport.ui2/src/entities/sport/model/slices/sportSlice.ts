import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SportSchema } from "../types/sportSchema";

const initialState: SportSchema = {};

export const sportSlice = createSlice({
    name: 'sport',
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

export const { actions: sportActions } = sportSlice;
export const { reducer: sportReducer } = sportSlice;
