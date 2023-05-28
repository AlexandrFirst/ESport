import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UseRedirectAfterFetchParams {
  initialTimeInSeconds?: number;
  isFetched: boolean;
  isError: boolean;
  redirectPath?: string;
}

export const useRedirectAfterFetch = ({
  isFetched,
  isError,
  initialTimeInSeconds = 3,
  redirectPath = "/",
}: UseRedirectAfterFetchParams) => {
  const router = useRouter();

  const [time, setTime] = useState(initialTimeInSeconds);

  useEffect(() => {
    if (isFetched && !isError) {
      const interval = setInterval(() => {
        setTime((prev) => {
          const newValue = prev - 1;
          if (newValue === 0) {
            router.push(redirectPath);
            clearInterval(interval);
          }
          return newValue;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [initialTimeInSeconds, isError, isFetched, redirectPath, router]);

  return time;
};
