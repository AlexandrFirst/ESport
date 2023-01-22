import { useCallback } from "react";

import { useAppDispatch } from "@shared/lib/hooks/useStore";

import {
  error,
  informational,
  success,
  warning,
} from "@features/SportSnackbar";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback(
    (message: string) => dispatch(success(message)),
    [dispatch]
  );

  const showError = useCallback(
    (message: string) => dispatch(error(message)),
    [dispatch]
  );

  const showWarning = useCallback(
    (message: string) => dispatch(warning(message)),
    [dispatch]
  );

  const showInfo = useCallback(
    (message: string) => dispatch(informational(message)),
    [dispatch]
  );

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
  };
};
