import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
    
};

export const userSlice = createSlice({
    name: 'user',
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

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;