import { useCallback } from "react";
import { ToastProps } from "@/shared/ui";

import { useSnackbarActions } from "@/features/Snackbar";
import { getApiError } from "..";

export const useSnackbar = () => {
  const { addSnack } = useSnackbarActions();

  const showSuccess = useCallback(
    (
      message: string,
      config?: Pick<Partial<ToastProps>, "position" | "duration">
    ) => {
      const { duration = 3000, position = "bottomLeft" } = config || {};
      addSnack({
        message,
        position,
        duration,
        type: "success",
      });
    },
    [addSnack]
  );

  const showError = useCallback(
    (
      message: string,
      config?: Pick<Partial<ToastProps>, "position" | "duration">
    ) => {
      const { duration = 3000, position = "bottomLeft" } = config || {};

      addSnack({
        message,
        position,
        duration,
        type: "error",
      });
    },
    [addSnack]
  );

  const showApiError = useCallback(
    (e: any, config?: Pick<Partial<ToastProps>, "position" | "duration">) => {
      const { duration = 3000, position = "bottomLeft" } = config || {};

      addSnack({
        message: getApiError(e),
        position,
        duration,
        type: "error",
      });
    },
    [addSnack]
  );
  return { showSuccess, showError, showApiError };
};
