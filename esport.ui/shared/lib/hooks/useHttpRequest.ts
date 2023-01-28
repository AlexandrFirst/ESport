import { useState } from "react";

export interface HttpRequestConfig<T> {
  clearErrorTime: number;
  shouldShowLoading: boolean;
  // action?: ActionCreatorWithPayload<Awaited<T>>;
}

export const defaultHttpRequestConfig: HttpRequestConfig<any> = {
  clearErrorTime: 3000,
  shouldShowLoading: true,
};

export function useHttpRequest<Args, Res>(
  request: (...arg: Args[]) => Promise<Res>,
  httpRequestConfig?: Partial<HttpRequestConfig<Res>>
): [(...args: Args[]) => Promise<Res>, boolean, string] {
  const config: HttpRequestConfig<Res> = {
    ...defaultHttpRequestConfig,
    ...httpRequestConfig,
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const method = async (...args: Args[]): Promise<Res> => {
    try {
      config.shouldShowLoading && setLoading(true);
      return request(...args);
    } catch (err: any) {
      let message = err?.response?.data?.message;

      setError(message);
      config.clearErrorTime &&
        setTimeout(() => {
          setError("");
        }, config.clearErrorTime);

      throw err;
    } finally {
      config.shouldShowLoading && setLoading(false);
    }
  };

  return [method, loading, error];
}
