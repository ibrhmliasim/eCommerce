// src/shared/config/index.ts

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!apiUrl) {
    throw new Error(
        'Error: NEXT_PUBLIC_API_URL environment variable is not set! ' 
        + 
        'Please check the .env.local file in the root of the project.'
    );
}

if (!appUrl) {
    throw new Error(
        'Error: NEXT_PUBLIC_APP_URL environment variable is not set! ' 
        + 
        'Please check the .env.local file in the root of the project.'
    );
}

export const config = {
    apiUrl,
    appUrl,
} as const;