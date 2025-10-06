'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import { Loader2, Shield } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        router.push('/auth/login');
        return;
      }

      const userData = JSON.parse(user);
      
      // Check if user is admin (in real app, this would be verified via JWT)
      if (userData.role === 'ADMIN' || userData.email === 'admin@sawit.com') {
        setIsAdmin(true);
      } else {
        // Redirect non-admin users to regular dashboard
        router.push('/dashboard');
        return;
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda tidak memiliki akses ke halaman admin.</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
