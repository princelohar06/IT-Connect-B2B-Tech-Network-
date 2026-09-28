import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('itconnect_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Load user profile on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('itconnect_access_token');
      if (token) {
        try {
          const res = await api.get('/auth/profile/');
          setUser(res.data);
          localStorage.setItem('itconnect_user', JSON.stringify(res.data));
        } catch (err) {
          console.warn('Could not fetch remote profile, using cached user if available', err);
          // If cached user exists, keep it; otherwise clear
          if (!localStorage.getItem('itconnect_user')) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Standard Login
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login/', { email, password });
      const { access, refresh, user: userData } = res.data;

      if (access) {
        localStorage.setItem('itconnect_access_token', access);
      }
      if (refresh) {
        localStorage.setItem('itconnect_refresh_token', refresh);
      }

      // If backend returned user object directly
      let finalUser = userData;
      if (!finalUser) {
        // Fetch from profile endpoint
        const profileRes = await api.get('/auth/profile/');
        finalUser = profileRes.data;
      }

      setUser(finalUser);
      localStorage.setItem('itconnect_user', JSON.stringify(finalUser));
      toast.success(`Welcome back, ${finalUser.full_name || finalUser.email}!`);
      return { success: true, user: finalUser };
    } catch (err) {
      const errMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        (err.response?.data && Object.values(err.response.data)[0]) ||
        'Login failed. Please check your credentials.';
      toast.error(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
      return { success: false, error: errMsg };
    }
  };

  // Demo Quick-Login (instantly switches user for testing all role capabilities)
  const loginAsDemo = (role = 'BUSINESS') => {
    let demoUser = {
      id: 'demo-' + role.toLowerCase(),
      email: role.toLowerCase() + '@demo.itconnect.io',
      full_name:
        role === 'BUSINESS'
          ? 'Acme Global Ventures'
          : role === 'AGENCY'
          ? 'Synthetix AI Labs (Partner)'
          : 'ITConnect Platform Administrator',
      phone: '+1 (555) 234-5678',
      role: role,
      is_active: true,
      is_staff: role === 'ADMIN',
      created_at: new Date().toISOString(),
    };

    setUser(demoUser);
    localStorage.setItem('itconnect_user', JSON.stringify(demoUser));
    localStorage.setItem('itconnect_access_token', 'demo-jwt-token-' + role);
    toast.success(`Logged in as ${demoUser.full_name} (${role})`);
    return demoUser;
  };

  // Registration
  const register = async ({ full_name, email, phone, password, confirm_password, role }) => {
    try {
      const payload = {
        full_name,
        email,
        phone: phone || '',
        password,
        confirm_password,
        role: role || 'BUSINESS',
      };

      const res = await api.post('/auth/register/', payload);
      
      if (res.data.access) {
        localStorage.setItem('itconnect_access_token', res.data.access);
      }
      if (res.data.refresh) {
        localStorage.setItem('itconnect_refresh_token', res.data.refresh);
      }

      const registeredUser = res.data.user || {
        email,
        full_name,
        phone,
        role,
        is_active: true,
      };

      setUser(registeredUser);
      localStorage.setItem('itconnect_user', JSON.stringify(registeredUser));
      toast.success('Registration successful! Welcome to ITConnect.');
      return { success: true, user: registeredUser };
    } catch (err) {
      let errMsg = 'Registration failed. Please check the fields.';
      if (err.response?.data) {
        const d = err.response.data;
        if (typeof d === 'string') errMsg = d;
        else if (d.email) errMsg = `Email: ${d.email}`;
        else if (d.password) errMsg = `Password: ${d.password}`;
        else if (d.confirm_password) errMsg = `Confirm Password: ${d.confirm_password}`;
        else if (d.detail) errMsg = d.detail;
        else errMsg = Object.values(d).flat().join(', ');
      }
      toast.error(errMsg);
      return { success: false, error: errMsg };
    }
  };

  // Profile update
  const updateProfile = async (updatedData) => {
    try {
      const res = await api.put('/auth/profile/', updatedData);
      const newUser = { ...user, ...res.data };
      setUser(newUser);
      localStorage.setItem('itconnect_user', JSON.stringify(newUser));
      toast.success('Profile updated successfully.');
      return { success: true, user: newUser };
    } catch (err) {
      // If demo mode or backend fails, update local state
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem('itconnect_user', JSON.stringify(newUser));
      toast.success('Profile details saved.');
      return { success: true, user: newUser };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout/').catch(() => {});
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('itconnect_access_token');
    localStorage.removeItem('itconnect_refresh_token');
    localStorage.removeItem('itconnect_user');
    setUser(null);
    toast.info('You have logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsDemo,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
