// src/features/auth/model/useLoginMutation.ts

// The useLoginMutation hook is responsible for handling the login process. 
// It uses React Query's useMutation to perform the login API call, updates the auth state with the logged-in user, and handles navigation after a successful login.

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sessionApi } from '@/features/auth/api/session.api';
import { useAuthStore } from '@/features/auth/model/auth.store';

import { LoginPayload } from '@/features/auth/model/auth.types';

export const useLoginMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        // Инициализируем функцию запроса из нашей коробки sessionApi
        mutationFn: (data: LoginPayload) => sessionApi.login(data),
        
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ['auth', 'me'] });
            // 1. Request the authenticated user's data from the backend (/v1/auth/me)
            // We invalidate the cache for ['auth', 'me'] to ensure useMeQuery fetches the latest data
            const user = await queryClient.ensureQueryData({
                queryKey: ['auth', 'me'],
                queryFn: sessionApi.getMe,
            });

            // 2. We save the authenticated user in our Zustand store.
            setAuth(user);

            // 3. After successful login, we redirect the user to the homepage.
            router.push('/');
        },
        
        onError: (error: Error) => {
            // Laravel Validation Error(Request folder) (422) or unauthorized (401).
            // Our LoginForm component will be able to read these errors through the mutation.
            console.error('Ошибка авторизации на фронтенде:', error);
        }
    });
}