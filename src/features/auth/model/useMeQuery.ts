// @/features/auth/model/useMeQuery.ts

// The useMeQuery hook is responsible for fetching the authenticated user's data from the backend. 
// It uses React Query's useQuery to perform the API call to the /me endpoint and returns the user data.

import { useQuery } from '@tanstack/react-query';

import { sessionApi } from '@/features/auth/api/session.api';
import { queryKeys } from '@/shared/api/queryKeys';

import { User } from '@/entities/user/model/user.types';

export const useMeQuery = () => {
    return useQuery<User>({
        queryKey: queryKeys.user.me,
        queryFn: sessionApi.getMe,
        retry: false, 
        staleTime: Infinity,
    });
};