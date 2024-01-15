import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateCompetitionStepsSchema } from '../types/CreateCompetitionStepsSchema';

const initialState: CreateCompetitionStepsSchema = {
    
};

export const CreateCompetitionStepsSlice = createSlice({
    name: 'CreateCompetitionSteps',
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

export const { actions: CreateCompetitionStepsActions } = CreateCompetitionStepsSlice;
export const { reducer: CreateCompetitionStepsReducer } = CreateCompetitionStepsSlice;