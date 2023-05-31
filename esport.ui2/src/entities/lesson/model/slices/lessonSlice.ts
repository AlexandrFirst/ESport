import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonSchema } from "../types/lessonSchema";

const initialState: LessonSchema = {};

export const lessonSlice = createSlice({
    name: 'lesson',
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

export const { actions: lessonActions } = lessonSlice;
export const { reducer: lessonReducer } = lessonSlice;
