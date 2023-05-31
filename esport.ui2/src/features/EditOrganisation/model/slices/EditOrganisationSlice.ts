import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditOrganisationSchema } from "../types/EditOrganisationSchema";

const initialState: EditOrganisationSchema = {};

export const EditOrganisationSlice = createSlice({
    name: 'EditOrganisation',
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

export const { actions: EditOrganisationActions } = EditOrganisationSlice;
export const { reducer: EditOrganisationReducer } = EditOrganisationSlice;
