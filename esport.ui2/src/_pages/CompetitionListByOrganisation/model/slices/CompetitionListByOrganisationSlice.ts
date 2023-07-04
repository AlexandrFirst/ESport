import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompetitionListByOrganisationSchema } from '../types/CompetitionListByOrganisationSchema';

const initialState: CompetitionListByOrganisationSchema = {
    
};

export const CompetitionListByOrganisationSlice = createSlice({
    name: 'CompetitionListByOrganisation',
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

export const { actions: CompetitionListByOrganisationActions } = CompetitionListByOrganisationSlice;
export const { reducer: CompetitionListByOrganisationReducer } = CompetitionListByOrganisationSlice;