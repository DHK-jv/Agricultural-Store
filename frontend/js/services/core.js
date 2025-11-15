// Http error response handling
class HttpError extends Error {
    constructor(message, statusCode, data = null) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.data = data;
    }
}

// Toast notification handler
const toast = {
    show(message, type = 'info') {
        // You can replace this with your preferred toast notification library
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Automatically remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    success(message) {
        this.show(message, 'success');
    },

    error(message) {
        this.show(message, 'error');
    },

    info(message) {
        this.show(message, 'info');
    }
};

// Loading state handler
const loading = {
    show() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'global-loader';
        document.body.appendChild(loader);
    },

    hide() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.remove();
        }
    }
};

// Handle API responses
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const error = isJson ? data.message || data.error : data;
        throw new HttpError(error, response.status, data);
    }

    return data;
};

// Error handler for API calls
const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error instanceof HttpError) {
        // Handle specific HTTP errors
        switch (error.statusCode) {
            case 401:
                toast.error('Please login to continue');
                // Redirect to login page
                window.location.href = '/pages/Login.html';
                break;
            case 403:
                toast.error('You do not have permission to perform this action');
                break;
            case 404:
                toast.error('Resource not found');
                break;
            case 422:
                toast.error('Invalid data provided');
                break;
            case 500:
                toast.error('Server error occurred. Please try again later.');
                break;
            default:
                toast.error(error.message || 'An error occurred');
        }
    } else {
        // Handle network or other errors
        toast.error('Network error occurred. Please check your connection.');
    }

    throw error; // Re-throw to allow further handling if needed
};

// Refresh token handler
const refreshToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/pages/Login.html';
        throw error;
    }
};

export {
    HttpError,
    toast,
    loading,
    handleResponse,
    handleApiError,
    refreshToken
};