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
    // Initial state of the auth store. By default, we assume that the user is not authenticated and we have not yet initialized the authentication state (e.g. by checking cookies on app load).
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    // Setting session on the frontend. Called after successful login or when we check the session on app initialization (e.g. in _app.tsx).
    setAuth: (user) => 
        set({ 
            user, 
            isAuthenticated: true, 
            isInitialized: true 
        }),

    // Clearing session on the frontend. Called after logout or when we check the session on app initialization and find out that the user is not authenticated.    
    clearAuth: () => 
        set({ 
            user: null, 
            isAuthenticated: false, 
            isInitialized: true 
        }),
}));