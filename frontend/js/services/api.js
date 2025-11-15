const API_URL = 'https://localhost:7001/api';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Auth Service
const authService = {
    async login(username, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
            username: data.username,
            email: data.email,
            role: data.role
        }));

        return data;
    },

    async register(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        return data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'Admin';
    }
};

// Product Service
const productService = {
    async getAll() {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    },

    async getById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    },

    async create(productData) {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return await response.json();
    },

    async update(id, productData) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    },

    async delete(id) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    }
};

// Cart Service
const cartService = {
    async getCart() {
        const response = await fetch(`${API_URL}/cart`, {
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }
        return await response.json();
    },

    async addToCart(productId, quantity) {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }
        return await response.json();
    },

    async updateCartItem(id, quantity) {
        const response = await fetch(`${API_URL}/cart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
            throw new Error('Failed to update cart item');
        }
    },

    async removeFromCart(id) {
        const response = await fetch(`${API_URL}/cart/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to remove from cart');
        }
    },

    async clearCart() {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'DELETE',
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to clear cart');
        }
    }
};

// Order Service
const orderService = {
    async createOrder(orderData) {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return await response.json();
    },

    async getOrders() {
        const response = await fetch(`${API_URL}/orders`, {
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return await response.json();
    },

    async getOrderById(id) {
        const response = await fetch(`${API_URL}/orders/${id}`, {
            headers: authHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return await response.json();
    }
};

// Export all services
export {
    authService,
    productService,
    cartService,
    orderService
};