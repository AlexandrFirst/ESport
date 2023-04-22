import { useAppDispatch } from "@/shared/lib";
import { ToastPositionType, ToastProps } from "@/shared/ui";

import { snackbarActions } from "../../model/slices/SnackbarSlice";
import { useCallback } from "react";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback(
    (
      message: string,
      config?: Pick<Partial<ToastProps>, "position" | "duration">
    ) => {
      const { duration = 3000, position = "bottomLeft" } = config || {};
      dispatch(
        snackbarActions.add({
          message,
          position,
          duration,
          type: "success",
        })
      );
    },
    [dispatch]
  );

  const showError = useCallback(
    (
      message: string,
      config?: Pick<Partial<ToastProps>, "position" | "duration">
    ) => {
      const { duration = 3000, position = "bottomLeft" } = config || {};
      dispatch(
        snackbarActions.add({
          message,
          position,
          duration,
          type: "error",
        })
      );
    },
    [dispatch]
  );

  return { showSuccess, showError };
};
