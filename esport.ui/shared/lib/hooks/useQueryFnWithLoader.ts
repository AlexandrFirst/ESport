import { useLoader } from "@features/TopPageLoader";
import { useSnackbar } from "@features/SportSnackbar";

type UseQueryFnWithLoaderParams = {
  isShowLoading?: boolean;
  isShowAlert?: boolean;
};

export const useQueryFnWithLoader = (config?: UseQueryFnWithLoaderParams) => {
  const { isShowAlert = true, isShowLoading = true } = config || {};
  const { showLoader, hideLoader } = useLoader();

  const { error } = useSnackbar();

  return async <P, R>(request: (params: P) => Promise<R>, params: P) => {
    try {
      isShowLoading && showLoader();
      return await request(params);
    } catch (e: any) {
      isShowAlert && error(e.message);
      throw e;
    } finally {
      isShowLoading && hideLoader();
    }
  };
};
