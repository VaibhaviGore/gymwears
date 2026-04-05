import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Set axios defaults if token exists
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // If we had a /me endpoint, we would fetch user details here
            // For now, we rely on the data returned during login/register
            try {
                // Decode JWT to get user ID if needed, or rely on login payload
                const decoded = JSON.parse(atob(token.split('.')[1]));
                if(decoded.exp * 1000 < Date.now()) {
                    logout();
                }
            } catch (e) {
               console.log("Invalid token");
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, data } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            const { token, data } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            loading,
            login,
            register,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
