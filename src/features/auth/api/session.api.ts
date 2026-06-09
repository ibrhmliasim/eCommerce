// src/features/auth/api/session.api.ts

// The session.api.ts file on the frontend does not solve or process anything. 
// He simply knows the addresses (endpoints) and knows how to send data there.

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