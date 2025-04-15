// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Register a new user
export const registerUser = async (username, password) => {
    const response = await api.post('/accounts/register/', { username, password });
    return response.data;
};

// Login user and save tokens
export const loginUser = async (username, password) => {
    const response = await api.post('/accounts/token/', { username, password });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return response.data;
};

// Get user profile with token
export const getUserProfile = async (userId) => {
    const response = await api.get(`/accounts/users/${userId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    });
    return response.data;
};

// Refresh access token
export const refreshToken = async () => {
    const response = await api.post('/accounts/token/refresh/', {
        refresh: localStorage.getItem('refresh')
    });
    localStorage.setItem('access', response.data.access);
    return response.data;
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
};
