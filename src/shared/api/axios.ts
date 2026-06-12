// src/shared/api/axios.ts

// This file sets up a custom Axios instance with interceptors to handle CSRF token management and global error handling for 401 and 419 status codes. 
// It ensures that all API requests are made to the correct base URL and that CSRF tokens are fetched and included as needed.

import { config } from '../config';
import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

// For 419(Token Mismatch Error - invalid CSRF token or an expired session) retry logic, we need to track if the request is already a retry to avoid infinite loops
interface CustomRequestConfig extends InternalAxiosRequestConfig {
    _csrfRetry?: boolean;
}

export const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true, // Important for CSRF cookie/session handling
    withXSRFToken: true, // Automatically include the CSRF token from the cookie in the headers
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// To prevent multiple simultaneous requests(for example like and add to cart) from triggering multiple CSRF cookie fetches, we track the ongoing request.
let csrfCookieRequest: Promise<void> | null = null;
const apiUrl = config.apiUrl.replace('/api/v1', ''); // Remove the /api/v1 prefix to get the base URL for the CSRF cookie endpoint

// Function to fetch the CSRF cookie. If there's no active request, create a new one, otherwise return the existing one.
const fetchCsrfCookie = (): Promise<void> => {
    if (!csrfCookieRequest) { 
        csrfCookieRequest = axios
            .get(`${apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
            .then(() => { csrfCookieRequest = null; })
            .catch((err) => { csrfCookieRequest = null; throw err; });
    }

    return csrfCookieRequest;
};

// CSRF prefetch interceptor: For any mutation request (POST, PUT, PATCH, DELETE), we ensure that the CSRF cookie is fetched before the request is sent.
api.interceptors.request.use(async (reqConfig) => {
    const method = reqConfig.method?.toUpperCase();
    const isMutation = method && !['GET', 'HEAD', 'OPTIONS'].includes(method);

    if (isMutation) {
        await fetchCsrfCookie();
    }

    return reqConfig;
});

// Response interceptor to handle 401 and 419 errors globally.
api.interceptors.response.use((response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomRequestConfig;
        const status = error.response?.status;

        if (!originalRequest) return Promise.reject(error);

        // 401 Unaauthorized Error - usually means the user is not authenticated. We should not retry in this case.
        if (status === 401) {
            // redirect will in useMeQuery's error handling, so we just reject the promise here.
            return Promise.reject(error);
        }

        // 419 Token Mismatch Error - usually means the CSRF token is invalid or the session has expired. We can attempt to fetch a new CSRF cookie and retry the original request once.
        if (status === 419 && !originalRequest._csrfRetry) {
            originalRequest._csrfRetry = true;

            // Attempt to fetch a new CSRF cookie and retry the original request. If it fails again, we reject the promise with the retry error.
            try {
                await fetchCsrfCookie();
                return api(originalRequest);
            } catch (retryError) {
                // redirect will in useMeQuery's error handling, so we just reject the promise here.
                return Promise.reject(retryError);
            }
        }

        return Promise.reject(error);
    }
);

export { axios };