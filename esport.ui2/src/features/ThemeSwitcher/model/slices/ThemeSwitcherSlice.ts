import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeSwitcherSchema } from '../types/ThemeSwitcherSchema';

const initialState: ThemeSwitcherSchema = {
    
};

export const ThemeSwitcherSlice = createSlice({
    name: 'ThemeSwitcher',
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

export const { actions: ThemeSwitcherActions } = ThemeSwitcherSlice;
export const { reducer: ThemeSwitcherReducer } = ThemeSwitcherSlice;