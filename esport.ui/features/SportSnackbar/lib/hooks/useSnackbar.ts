import { useCallback } from "react";

import { useAppDispatch } from "@shared/lib/hooks/useStore";

import {
  error,
  informational,
  SnackbarPosition,
  success,
  warning,
} from "@features/SportSnackbar";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback(
    (message: string, position?: SnackbarPosition) =>
      dispatch(success({ message, position })),
    [dispatch]
  );

  const showError = useCallback(
    (message: string, position?: SnackbarPosition) =>
      dispatch(error({ message, position })),
    [dispatch]
  );

  const showWarning = useCallback(
    (message: string, position?: SnackbarPosition) =>
      dispatch(warning({ message, position })),
    [dispatch]
  );

  const showInfo = useCallback(
    (message: string, position?: SnackbarPosition) =>
      dispatch(informational({ message, position })),
    [dispatch]
  );

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
  };
};
