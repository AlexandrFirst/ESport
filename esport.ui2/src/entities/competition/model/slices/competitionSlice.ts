import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompetitionSchema } from "../types/competitionSchema";

const initialState: CompetitionSchema = {};

export const competitionSlice = createSlice({
    name: 'competition',
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

export const { actions: competitionActions } = competitionSlice;
export const { reducer: competitionReducer } = competitionSlice;
