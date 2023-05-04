interface WrapApiConfigParams<R> {
  onSuccess?: (data?: R) => void;
  onError?: (e: any) => void;
  onFinally?: () => void;
}

export const useWrapApi = () => {
  // const { showLoader, hideLoader } = useLoader();

  return async <R, P>(
    api: (params: P) => Promise<R>,
    params: P,
    config?: WrapApiConfigParams<R>
  ) => {
    try {
      // showLoader();
      const data = await api(params);
      config?.onSuccess?.(data);
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
