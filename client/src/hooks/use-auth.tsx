import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from './use-toast';
import { apiRequest } from '@/lib/queryClient';

type User = {
  id: string;
  email?: string;
  username?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if we have a session token
        const sessionId = localStorage.getItem('cleverai_session');
        
        if (!sessionId) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Attempt to fetch user data with the session token
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${sessionId}`
          }
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // If the session is invalid, clear it
          localStorage.removeItem('cleverai_session');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('cleverai_session');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await apiRequest('POST', '/api/auth/login', { email, password });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const responseData = await res.json();
      
      // Store the session token
      localStorage.setItem('cleverai_session', responseData.sessionId);
      
      // Set the user data
      setUser(responseData.user);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const res = await apiRequest('POST', '/api/auth/register', { 
        email, 
        password,
        username 
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. You can now log in.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const sessionId = localStorage.getItem('cleverai_session');
      
      if (sessionId) {
        const res = await apiRequest('POST', '/api/auth/logout', null);
        
        if (!res.ok) {
          throw new Error('Logout failed');
        }
      }
      
      // Clear the session token regardless of the result
      localStorage.removeItem('cleverai_session');
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      // Still remove the session token on error
      localStorage.removeItem('cleverai_session');
      setUser(null);
      
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}