import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplyToCompetitionSchema } from '../types/ApplyToCompetitionSchema';

const initialState: ApplyToCompetitionSchema = {
    
};

export const ApplyToCompetitionSlice = createSlice({
    name: 'ApplyToCompetition',
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

export const { actions: ApplyToCompetitionActions } = ApplyToCompetitionSlice;
export const { reducer: ApplyToCompetitionReducer } = ApplyToCompetitionSlice;