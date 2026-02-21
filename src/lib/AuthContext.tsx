import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, issuesAPI, noticesAPI } from './api';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  phone?: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reported_by: string;
  reporter_name?: string;
  assigned_to?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'normal' | 'high';
  created_by: string;
  created_by_name?: string;
  expires_at?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  issues: Issue[];
  notices: Notice[];
  fetchIssues: () => Promise<void>;
  fetchNotices: () => Promise<void>;
  addIssue: (issue: any) => Promise<boolean>;
  updateIssue: (id: string, updates: any) => Promise<boolean>;
  addNotice: (notice: any) => Promise<boolean>;
  deleteNotice: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Fetch issues and notices when user logs in
  useEffect(() => {
    if (user) {
      fetchIssues();
      fetchNotices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.register({ name, email, password, phone });
      if (response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Registration successful!');
        return { success: true };
      }
      return { success: false, message: response.data.message || 'Registration failed' };
    } catch (error: any) {
      console.error('Registration error:', error);
      const msg = error.response?.data?.message || 'Registration failed. Please check your connection and try again.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIssues([]);
    setNotices([]);
    toast.success('Logged out successfully');
  };

  const fetchIssues = async () => {
    try {
      const response = await issuesAPI.getAll();
      if (response.data.success) {
        setIssues(response.data.issues || []);
      }
    } catch (error) {
      console.error('Fetch issues error:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await noticesAPI.getAll();
      if (response.data.success) {
        setNotices(response.data.notices || []);
      }
    } catch (error) {
      console.error('Fetch notices error:', error);
    }
  };

  const addIssue = async (issueData: any): Promise<boolean> => {
    try {
      const response = await issuesAPI.create(issueData);
      if (response.data.success) {
        toast.success('Issue created successfully!');
        await fetchIssues(); // Refresh issues
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Add issue error:', error);
      toast.error(error.response?.data?.message || 'Failed to create issue');
      return false;
    }
  };

  const updateIssue = async (id: string, updates: any): Promise<boolean> => {
    try {
      const response = await issuesAPI.updateStatus(id, updates.status);
      if (response.data.success) {
        toast.success('Issue updated successfully!');
        await fetchIssues(); // Refresh issues
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Update issue error:', error);
      toast.error(error.response?.data?.message || 'Failed to update issue');
      return false;
    }
  };

  const addNotice = async (noticeData: any): Promise<boolean> => {
    try {
      const response = await noticesAPI.create(noticeData);
      if (response.data.success) {
        toast.success('Notice created successfully!');
        await fetchNotices(); // Refresh notices
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Add notice error:', error);
      toast.error(error.response?.data?.message || 'Failed to create notice');
      return false;
    }
  };

  const deleteNotice = async (id: string): Promise<boolean> => {
    try {
      const response = await noticesAPI.delete(id);
      if (response.data.success) {
        toast.success('Notice deleted successfully!');
        await fetchNotices(); // Refresh notices
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Delete notice error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete notice');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      issues,
      notices,
      fetchIssues,
      fetchNotices,
      addIssue,
      updateIssue,
      addNotice,
      deleteNotice,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
