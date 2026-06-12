// src/shared/api/queryClient.ts

// This file sets up a React Query client with default options for queries and mutations. 
// It configures stale time, retry logic, and refetching behavior to optimize API interactions across the application.

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes

            // By default, React Query refetches data when the window regains focus. 
            // In our case, we want to disable this behavior to prevent unnecessary API calls and potential issues with stale data.
            refetchOnWindowFocus: false,

            // On authentication errors (401, 403) or validation errors (422) - 
            // we should not retry the request, as it won't succeed without user intervention (like logging in again or fixing input data). 
            // For other errors (like network issues), we can allow a couple of retries.
            retry: (failureCount, error: unknown) => {
                const status = (error as { response?: { status: number } })?.response?.status;
                if (status === 401 || status === 403 || status === 422) return false;
                return failureCount < 2;
            },
        },
        
        mutations: {
            retry: false,
        },
    },
});