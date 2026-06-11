// src/features/auth/model/useLoginMutation.ts

// The useLoginMutation hook is responsible for handling the login process. 
// It uses React Query's useMutation to perform the login API call, updates the auth state with the logged-in user, and handles navigation after a successful login.

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionApi } from '@/features/auth/api/session.api';
import { queryKeys } from '@/shared/api/queryKeys';

import { LoginPayload } from '@/features/auth/model/auth.types';

export const useLoginMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        // Initialize from the sessionApi.login function, which sends the login request to the backend.
        mutationFn: (data: LoginPayload) => sessionApi.login(data),
        
        onSuccess: async () => {
            // Laravel will return Me endpoint with the logged-in user data after a successful login. 
            await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });

            // After successful login, we redirect the user to the homepage.
            router.replace('/');
        },
        
        onError: (error: Error) => {
            // Laravel Validation Error(Request folder) (422) or unauthorized (401).
            // Our LoginForm component will be able to read these errors through the mutation.
            console.error('Auth Error:', error);
        }
    });
}