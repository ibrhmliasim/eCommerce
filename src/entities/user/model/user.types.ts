// src/entities/user/model/user.types.ts

// UserResource in Laravel API corresponds to User interface in TypeScript.
export interface User {
    id: number
    email: string
    email_verified_at: string | null
    phone: string | null
    first_name: string
    last_name: string
    role: string
    created_at: string
}