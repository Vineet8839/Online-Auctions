import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const paymentService = {
    getAllMethods: async () => {
        try {
            const response = await axios.get(`${API_URL}/payment-methods`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || 'Failed to fetch payment methods';
        }
    },

    addMethod: async (methodData) => {
        try {
            const response = await axios.post(`${API_URL}/payment-methods`, methodData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || 'Failed to add payment method';
        }
    },

    updateMethod: async (id, methodData) => {
        try {
            const response = await axios.put(`${API_URL}/payment-methods/${id}`, methodData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || 'Failed to update payment method';
        }
    },

    deleteMethod: async (id) => {
        try {
            await axios.delete(`${API_URL}/payment-methods/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            throw error.response?.data?.error || 'Failed to delete payment method';
        }
    }
};

export default paymentService; 