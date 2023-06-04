import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainerTimetableSchema } from "../types/TrainerTimetableSchema";

const initialState: TrainerTimetableSchema = {};

export const TrainerTimetableSlice = createSlice({
    name: 'TrainerTimetable',
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

export const { actions: TrainerTimetableActions } = TrainerTimetableSlice;
export const { reducer: TrainerTimetableReducer } = TrainerTimetableSlice;
