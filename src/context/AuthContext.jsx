import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const res = await api.get('/users/profiles/me/');
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth initialization failed", err);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password, isAdminLogin = false) => {
        try {
            const res = await api.post('/users/auth/login/', { email, password });
            
            // Store tokens
            localStorage.setItem('access_token', res.data.access);
            if (res.data.refresh) {
                localStorage.setItem('refresh_token', res.data.refresh);
            }
            localStorage.removeItem('demo_mode');

            // Fetch user profile
            const profileRes = await api.get('/users/profiles/me/');
            const fetchedUser = profileRes.data;

            // Enforce Admin check if requested from /Hubmaster
            if (isAdminLogin && !fetchedUser.is_staff) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return { success: false, error: 'Unauthorized: Admin privileges required.' };
            }

            setUser(fetchedUser);
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.response?.data?.detail || 'Invalid email or password.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
