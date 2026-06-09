// src/shared/api/endpoints.ts

// Single route contract between Next.js and Laravel API.
// If the backend changes the prefix or version, we edit it only here.

const AUTH = '/v1/auth';

export const endpoints = {
    auth: {
        register:        `${AUTH}/register`,
        login:           `${AUTH}/login`,
        logout:          `${AUTH}/logout`,
        me:              `${AUTH}/me`,

        email: {
            verify: (id: string | number, hash: string) => `${AUTH}/email/verify/${id}/${hash}`,
            resend: `${AUTH}/email/resend`,
        },

        password: {
            forgot:        `${AUTH}/password/forgot`,
            reset:         `${AUTH}/password/reset`,
        },
    },
} as const;

export type ApiEndpoints = typeof endpoints;