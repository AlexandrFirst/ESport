import { PayloadAction } from "@reduxjs/toolkit";

import { SnackbarSchema } from "../types/SnackbarSchema";

import { SnackbarToastProps } from "../../ui/SnackbarToast/SnackbarToast";
import { HYDRATE } from "next-redux-wrapper";
import { StateSchema } from "@/_app/Providers";
import { buildSlice } from "@/shared/lib";

const initialState: SnackbarSchema = {
  toasts: [],
  position: "topRight",
};

export const SnackbarSlice = buildSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    addSnack(
      state,
      action: PayloadAction<Omit<SnackbarToastProps, "id" | "remove">>
    ) {
      const { payload: toast } = action;

      if (toast.position && toast.position !== state.position) {
        // setPosition(toast.position);
        state.position = toast.position;
      }

      // add it to the list
      state.toasts.push({ ...toast, id: Math.random() * 10000 });
      // setToasts((toasts) => [
      //   ...toasts,
      //   { ...toast, id: Math.random() * 10000 },
      // ]);
    },
    removeSnack(state, action: PayloadAction<{ toastId: number }>) {
      const { toastId } = action.payload;
      // ref?.current?.classList.add("animate-toastOut");
      if (state?.toasts) {
        state.toasts = state.toasts.filter((toast) => toast.id !== toastId);
      }

      //remove element after animation is done
      // ref?.current?.addEventListener("animationend", () => {
      //   // lets remove it
      //   // setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
      // });
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => {
      return {
        ...state,
        ...action.payload.snackbar,
      };
    },
  },
});

export const {
  actions: snackbarActions,
  reducer: snackbarReducer,
  useActions: useSnackbarActions,
} = SnackbarSlice;
