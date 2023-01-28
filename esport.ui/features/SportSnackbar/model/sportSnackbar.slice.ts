import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { SnackbarPosition, SnackBarType } from "@features/SportSnackbar";

const openSnackBar = (
  state: Draft<SportSnackbarState>,
  { message, type }: { message: string; type: SnackBarType }
) => {
  state.open = true;
  state.message = message;
  state.type = type;
};

interface SportSnackbarState {
  open?: boolean;
  type?: SnackBarType;
  message: string;
  position?: SnackbarPosition;
}

const initialState: SportSnackbarState = {
  open: false,
  type: undefined,
  message: "",
};

const sportSnackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<Partial<SportSnackbarState>>) => {
      openSnackBar(state, {
        message: action.payload.message ?? "",
        type: SnackBarType.SUCCESS,
      });
    },
    error: (state, action: PayloadAction<Partial<SportSnackbarState>>) => {
      openSnackBar(state, {
        message: action.payload.message ?? "",
        type: SnackBarType.ERROR,
      });
    },
    warning: (state, action: PayloadAction<Partial<SportSnackbarState>>) => {
      openSnackBar(state, {
        message: action.payload.message ?? "",
        type: SnackBarType.WARNING,
      });
    },
    informational: (
      state,
      action: PayloadAction<Partial<SportSnackbarState>>
    ) => {
      openSnackBar(state, {
        message: action.payload.message ?? "",
        type: SnackBarType.INFO,
      });
    },
    clearError: (state) => {
      state.open = false;
      // state.snackType = undefined
      // state.message = ''
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.snackbar,
    }),
  },
});

export const { success, informational, warning, error, clearError } =
  sportSnackbar.actions;
export const sportSnackbarReducer = sportSnackbar.reducer;
