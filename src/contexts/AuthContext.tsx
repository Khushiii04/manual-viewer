
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Check for stored auth on app load
    const storedAuth = localStorage.getItem('ietm_auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would validate against a secure backend
    const validUsers = [
      { username: 'technician', password: 'tech2024' },
      { username: 'admin', password: 'admin2024' },
      { username: 'bel_user', password: 'bel2024' }
    ];

    const user = validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      const authData = { user: { username } };
      localStorage.setItem('ietm_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('ietm_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
