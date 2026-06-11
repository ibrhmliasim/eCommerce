// @/features/auth/model/useLogoutMutation.ts

// The useLogoutMutation hook is responsible for handling the logout process. 
// It uses React Query's useMutation to perform the logout API call, clears the auth state, and handles navigation after a successful logout.

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionApi } from '@/features/auth/api/session.api';
import { queryKeys } from '@/shared/api/queryKeys';

export const useLogoutMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sessionApi.logout,

        onSuccess: () => {
            queryClient.removeQueries({ queryKey: queryKeys.user.all });
            
            // homepage
            router.replace('/');
        },

        onError: (error: Error) => {
            console.error('Logout Error:', error);
        },
    });
}