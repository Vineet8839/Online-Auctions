import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add authentication interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout')
};

export const auctionAPI = {
    getAll: () => api.get('/auctions'),
    getById: (id) => api.get(`/auctions/${id}`),
    create: (auctionData) => api.post('/auctions', auctionData),
    placeBid: (auctionId, amount) => api.post(`/auctions/${auctionId}/bid`, { amount }),
    search: (params) => api.get('/auctions/search', { params }),
    getBidHistory: (auctionId) => api.get(`/bids/${auctionId}`)
}; 