import { useCallback } from "react";

import { useAppDispatch } from "@storage/hooks/useStore";
import { hideLoading, showLoading } from "@storage/slices/loadingIndicator";

export const useLoader = () => {
  const dispatch = useAppDispatch();

  const showLoader = useCallback(() => {
    dispatch(showLoading());
  }, [dispatch]);

  const hideLoader = useCallback(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return { showLoader, hideLoader };
};
