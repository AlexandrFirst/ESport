import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestFiltersSchema } from '../types/RequestFiltersSchema';

const initialState: RequestFiltersSchema = {
    
};

export const RequestFiltersSlice = createSlice({
    name: 'RequestFilters',
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

export const { actions: RequestFiltersActions } = RequestFiltersSlice;
export const { reducer: RequestFiltersReducer } = RequestFiltersSlice;