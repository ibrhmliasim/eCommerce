// src/features/auth/model/auth.store.ts

// The auth.store.ts file defines a Zustand store for managing authentication state of Users on the frontend.
// It keeps track of the current authenticated user, whether the user is authenticated, and whether the authentication state has been initialized.

import { create } from 'zustand';
import { User } from '@/entities/user/model/user.types';

// AuthState defines the shape of our authentication state in the Zustand store. It includes:
interface AuthState {

    user: User | null;
    
    // Status of authentication (similar to Auth::check())
    isAuthenticated: boolean;
    
    // Flag for initialization. Needed so that Next.js understands:
    // have we already checked the cookies via the /me request or has the application just loaded?
    isInitialized: boolean;

    // Mutator methods (similar to Auth::login() and Auth::logout() actions)
    setAuth: (user: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    // Начальное состояние (Initial State) — при первой загрузке вкладки мы ничего не знаем о юзере
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    /**
     * Записать пользователя в сессию фронтенда.
     * Вызывается при успешном Login или когда роут /me подтвердил, что кука валидна.
     */
    setAuth: (user) => 
        set({ 
            user, 
            isAuthenticated: true, 
            isInitialized: true 
        }),

    /**
     * Очистить сессию на фронтенде.
     * Вызывается при Logout или если бэкенд вернул 401 Unauthorized (сессия протухла).
     */
    clearAuth: () => 
        set({ 
            user: null, 
            isAuthenticated: false, 
            isInitialized: true 
        }),
}));