interface WrapApiConfigParams {
  onSuccess?: () => void;
  onError?: (e: any) => void;
  onFinally?: () => void;
}

export const useWrapApi = () => {
  // const { showLoader, hideLoader } = useLoader();

  return async <R, P>(
    api: (params: P) => Promise<R>,
    params: P,
    config?: WrapApiConfigParams
  ) => {
    try {
      // showLoader();
      await api(params);
      config?.onSuccess?.();
    } catch (e) {
      config?.onError?.(e);
      throw e;
      //TODO: handle error
    } finally {
      config?.onFinally?.();
      // hideLoader();
    }
  };
};
