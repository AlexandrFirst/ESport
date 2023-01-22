import { useCallback } from "react";

import { useAppDispatch } from "@shared/lib/hooks/useStore";
import {
  hideLoading,
  showLoading,
} from "@features/TopPageLoader/model/topPageLoader.slice";

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
