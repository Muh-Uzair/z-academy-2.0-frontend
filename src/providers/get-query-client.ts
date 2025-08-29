import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache settings
        staleTime: 60 * 1000, // 1 min fresh

        // Retry failed requests only once (default is 3)
        retry: 1,

        // Avoid extra re-fetches
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false, // optional: avoids extra mount refetch
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
