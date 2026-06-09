// src/features/auth/api/session.api.ts

// This file defines the sessionApi object, which provides methods for handling user authentication-related API calls, 
// such as logging in, fetching the current user's information, and logging out.

import { api } from '@/shared/api/axios';
import { endpoints } from '@/shared/api/endpoints';

// Types
import { User } from '@/entities/user/model/user.types';

export const sessionApi = {
    // login
    login: async (data: User): Promise<void> => {
        await api.post(endpoints.auth.login, data);
    },

    // me
    getMe: async (): Promise<User> => {
        const response = await api.get<User>(endpoints.auth.me);
        return response.data;
    },

    // logout
    logout: async (): Promise<void> => {
        await api.post(endpoints.auth.logout);
    },
}