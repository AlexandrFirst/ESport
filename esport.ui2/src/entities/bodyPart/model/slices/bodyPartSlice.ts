import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyPartSchema } from "../types/bodyPartSchema";

const initialState: BodyPartSchema = {};

export const bodyPartSlice = createSlice({
    name: 'bodyPart',
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

export const { actions: bodyPartActions } = bodyPartSlice;
export const { reducer: bodyPartReducer } = bodyPartSlice;
