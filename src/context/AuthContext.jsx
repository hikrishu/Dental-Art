import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic check if token exists
    if (token) {
      // In a real app, you would verify the token with the backend here
      // For now, we'll just assume it's valid if it exists
      setAdmin({ name: 'Clinic Admin' }); // Placeholder
    }
    setLoading(false);
  }, [token]);

  const login = (newToken, adminData) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
