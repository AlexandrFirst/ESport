import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainerRequestsTableSchema } from "../types/TrainerRequestsTableSchema";

const initialState: TrainerRequestsTableSchema = {};

export const TrainerRequestsTableSlice = createSlice({
    name: 'TrainerRequestsTable',
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

export const { actions: TrainerRequestsTableActions } = TrainerRequestsTableSlice;
export const { reducer: TrainerRequestsTableReducer } = TrainerRequestsTableSlice;
