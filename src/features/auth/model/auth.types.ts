// features/auth/model/auth.types.ts

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string; // Laravel 'confirmed' ルールではこのフィールドが必要です
    phone?: string;
}

export interface RegisterResponse {
    data: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        email_verified_at: string | null;
        phone: string | null;
        role: string;
        created_at: string;
    };
}