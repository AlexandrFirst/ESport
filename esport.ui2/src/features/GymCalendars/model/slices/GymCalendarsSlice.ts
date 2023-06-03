import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GymCalendarsSchema } from "../types/GymCalendarsSchema";

const initialState: GymCalendarsSchema = {};

export const GymCalendarsSlice = createSlice({
    name: 'GymCalendars',
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

export const { actions: GymCalendarsActions } = GymCalendarsSlice;
export const { reducer: GymCalendarsReducer } = GymCalendarsSlice;
