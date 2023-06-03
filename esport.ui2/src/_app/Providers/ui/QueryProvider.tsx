import { FC, ReactNode, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
  pageProps: any;
}

export const QueryProvider: FC<QueryProviderProps> = ({
  children,
  pageProps,
}) => {
  const [clientQuery] = useState(() => queryClient);

  return (
    <QueryClientProvider client={clientQuery}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
