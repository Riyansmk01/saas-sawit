'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      console.log('AuthGuard: Checking authentication...');
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      console.log('AuthGuard: Token exists:', !!token);
      console.log('AuthGuard: User exists:', !!user);

      if (!token || !user) {
        console.log('AuthGuard: No token or user, redirecting to login');
        router.push('/auth/login');
        return;
      }

      try {
        // Verify token is still valid (basic check)
        const userData = JSON.parse(user);
        console.log('AuthGuard: User data:', userData);
        
        if (userData && userData.id) {
          console.log('AuthGuard: Authentication successful');
          setIsAuthenticated(true);
        } else {
          console.log('AuthGuard: Invalid user data, clearing storage');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('AuthGuard: Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Memverifikasi autentikasi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
