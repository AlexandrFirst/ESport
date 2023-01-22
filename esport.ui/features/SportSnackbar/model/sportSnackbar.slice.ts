import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export enum SnackBarType {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

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
}

const initialState: SportSnackbarState = {
  open: false,
  type: SnackBarType.SUCCESS,
  message: "",
};

const sportSnackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      openSnackBar(state, {
        message: action.payload,
        type: SnackBarType.SUCCESS,
      });
    },
    error: (state, action: PayloadAction<string>) => {
      openSnackBar(state, {
        message: action.payload,
        type: SnackBarType.ERROR,
      });
    },
    warning: (state, action: PayloadAction<string>) => {
      openSnackBar(state, {
        message: action.payload,
        type: SnackBarType.WARNING,
      });
    },
    informational: (state, action: PayloadAction<string>) => {
      openSnackBar(state, {
        message: action.payload,
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
      ...state.snackbar,
      ...action.payload.snackbar,
    }),
  },
});

export const { success, informational, warning, error, clearError } =
  sportSnackbar.actions;
export const sportSnackbarReducer = sportSnackbar.reducer;
