// AppProviders.tsx

'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient as defaultClient } from '@/shared/api/queryClient';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => defaultClient);

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};
