import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const login = (key) => {
        localStorage.setItem('admin_token', key);
        setToken(key);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);