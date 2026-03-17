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

    const login = async (email, password) => {
        // DEMO MODE BYPASS
        console.warn("DEMO MODE ACTIVE: Bypassing real authentication");
        const mockUser = {
            id: 1,
            email: email || 'demo@hubmart.uk',
            first_name: 'Demo',
            last_name: 'User',
            is_staff: true
        };
        setUser(mockUser);
        localStorage.setItem('access_token', 'demo-token');
        localStorage.setItem('demo_mode', 'true');
        return { success: true };
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
