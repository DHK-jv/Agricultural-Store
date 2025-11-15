import { refreshToken, handleApiError } from './core.js';

const API_URL = 'https://localhost:7001/api';

// Auth interceptor for handling token refresh and auth headers
const authInterceptor = {
    async fetch(url, options = {}) {
        // Add base URL if relative path is provided
        const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
        
        // Get the current token
        const token = localStorage.getItem('token');
        
        // Add auth header if token exists
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        try {
            const response = await fetch(fullUrl, options);

            // Handle 401 Unauthorized error
            if (response.status === 401) {
                try {
                    // Attempt to refresh the token
                    const newToken = await refreshToken();
                    
                    // Retry the original request with new token
                    options.headers = {
                        ...options.headers,
                        'Authorization': `Bearer ${newToken}`
                    };
                    
                    return await fetch(fullUrl, options);
                } catch (refreshError) {
                    // If refresh fails, redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/pages/Login.html';
                    throw refreshError;
                }
            }

            return response;
        } catch (error) {
            return handleApiError(error);
        }
    }
};

// Helper function to create authenticated fetch requests
const createAuthenticatedRequest = (method) => async (url, data = null, customHeaders = {}) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...customHeaders
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    return await authInterceptor.fetch(url, options);
};

// Export authenticated HTTP methods
export const http = {
    get: createAuthenticatedRequest('GET'),
    post: createAuthenticatedRequest('POST'),
    put: createAuthenticatedRequest('PUT'),
    delete: createAuthenticatedRequest('DELETE'),
    patch: createAuthenticatedRequest('PATCH')
};