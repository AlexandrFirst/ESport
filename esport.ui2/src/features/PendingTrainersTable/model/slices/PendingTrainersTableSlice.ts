import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PendingTrainersTableSchema } from "../types/PendingTrainersTableSchema";

const initialState: PendingTrainersTableSchema = {};

export const PendingTrainersTableSlice = createSlice({
    name: 'PendingTrainersTable',
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

export const { actions: PendingTrainersTableActions } = PendingTrainersTableSlice;
export const { reducer: PendingTrainersTableReducer } = PendingTrainersTableSlice;
