// src/shared/lib/errorHandler.ts

import { AxiosError } from 'axios';

// Laravel -> { message: string, errors?: Record<string, string[]> }
interface LaravelErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const data = error.response?.data as LaravelErrorResponse | undefined;

        // 422 — validation errors
        if (error.response?.status === 422 && data?.errors) {
            const firstField = Object.values(data.errors)[0];
            return firstField?.[0] ?? 'Validation error';
        }

        return data?.message ?? error.message ?? 'Something went wrong';
    }

    if (error instanceof Error) return error.message;

    return 'Something went wrong';
}