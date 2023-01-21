import { useLoader } from "@hooks/useLoader";

interface WrapApiConfigParams {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useWrapApi = () => {
  const { showLoader, hideLoader } = useLoader();

  return async <R, P>(
    api: (params: P) => Promise<R>,
    params: P,
    config?: WrapApiConfigParams
  ) => {
    try {
      showLoader();
      await api(params);
      config?.onSuccess?.();
    } catch (e) {
      config?.onError?.();
      throw e;
      //TODO: handle error
    } finally {
      hideLoader();
    }
  };
};
