import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateCompetitionCardSchema } from '../types/CreateCompetitionCardSchema';

const initialState: CreateCompetitionCardSchema = {
    
};

export const CreateCompetitionCardSlice = createSlice({
    name: 'CreateCompetitionCard',
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

export const { actions: CreateCompetitionCardActions } = CreateCompetitionCardSlice;
export const { reducer: CreateCompetitionCardReducer } = CreateCompetitionCardSlice;