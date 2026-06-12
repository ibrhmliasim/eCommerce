// src/shared/api/queryKeys.ts

export const queryKeys = {
  user: {
    // ['user'] — for useMeQuery, invalidate after login/logout
    all:     ['user']         as const,
    // ['user', 'me'] - if you need a separate key for /me
    me:      ['user', 'me']   as const,
  },
} as const;