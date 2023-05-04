import { useCallback } from "react";
import { ToastProps } from "@/shared/ui";

import { useSnackbarActions } from "@/features/Snackbar";

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

  return { showSuccess, showError };
};
