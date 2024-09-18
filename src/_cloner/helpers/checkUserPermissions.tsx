// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// نوع‌بندی برای context و props
interface AuthContextType {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
  permissions: string[];
}

// ایجاد context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// تابع ارائه دهنده context
export const AuthProvider = ({ children, permissions }: AuthProviderProps) => {
  const hasPermission = (permission: string) => permissions.includes(permission);

  return (
    <AuthContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوک برای دسترسی به context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
