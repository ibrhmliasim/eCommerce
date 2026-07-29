// src/shared/lib/errorHandler.ts

import { AxiosError } from 'axios';
import { translateErrorCode, type Locale } from './errorMessages';

// Laravel -> { message, error_code, errors?: Record<string, string[]> }
// errors now contains error_codes according to the rule ("validation.email.required"),
// and not ready-made English text - see App\Support\ValidationErrorCodeMapper.
interface ApiErrorResponse {
    message?: string;
    error_code?: string;
    errors?: Record<string, string[]>;
}

export interface StructuredError {
    message: string;
    errorCode: string;
    status: number | null;
    // For forms - code for each field so that a specific input can be highlighted,
    // rather than just showing one general text.
    fieldErrors: Record<string, string> | null;
}

export function getStructuredError(
    error: unknown,
    locale: Locale = 'ja',
): StructuredError {
    if (error instanceof AxiosError) {
        // Network unavailable / timeout - we didn’t even reach the backend, there is no error_code.
        if (!error.response) {
            return {
                message: translateErrorCode('network.unreachable', locale),
                errorCode: 'network.unreachable',
                status: null,
                fieldErrors: null,
            };
        }

        const data = error.response.data as ApiErrorResponse | undefined;
        const status = error.response.status;

        // 422 — map the first code for each field to highlight the form.
        if (status === 422 && data?.errors) {
            const fieldErrors = Object.fromEntries(
                Object.entries(data.errors).map(([field, codes]) => [
                    field,
                    translateErrorCode(codes[0], locale),
                ]),
            );

            const firstCode = Object.values(data.errors)[0]?.[0] ?? 'validation.failed';

            return {
                message: translateErrorCode(firstCode, locale),
                errorCode: firstCode,
                status,
                fieldErrors,
            };
        }

        const errorCode = data?.error_code ?? 'unknown.error';

        return {
            message: translateErrorCode(errorCode, locale),
            errorCode,
            status,
            fieldErrors: null,
        };
    }

    return {
        message: translateErrorCode('unknown.error', locale),
        errorCode: 'unknown.error',
        status: null,
        fieldErrors: null,
    };
}

// Backwards compatible for places where you just need text, no structure.
export function getErrorMessage(error: unknown, locale: Locale = 'ja'): string {
    return getStructuredError(error, locale).message;
}