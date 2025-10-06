'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, TrendingUp, Users, MapPin, Calendar, Plus, Bell, Settings, LogOut, 
  Download, Filter, Sparkles, FileText, Activity, CreditCard, Shield, 
  Package, DollarSign, Clock, AlertCircle, CheckCircle, ArrowUpRight, 
  ArrowDownRight, Eye, Edit, Trash2, Search, RefreshCw, Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import Link from 'next/link';
import UserManagement from '@/components/UserManagement';
import HarvestInput from '@/components/HarvestInput';
import Reports from '@/components/Reports';
import Notifications from '@/components/Notifications';
import ProductivityAnalysis from '@/components/ProductivityAnalysis';
import PaymentSystem from '@/components/PaymentSystem';
import SecuritySettings from '@/components/SecuritySettings';
import RealTimeDashboard from '@/components/RealTimeDashboard';
import ReportExport from '@/components/ReportExport';
import ProductivityInsights from '@/components/ProductivityInsights';
import SmartNotifications from '@/components/SmartNotifications';
import AuthGuard from '@/components/AuthGuard';

interface HarvestData {
  date: string;
  tbs: number;
  weight: number;
}

interface Stats {
  totalHarvest: number;
  totalWorkers: number;
  totalBlocks: number;
  todayHarvest: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [harvestData, setHarvestData] = useState<HarvestData[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalHarvest: 0,
    totalWorkers: 0,
    totalBlocks: 0,
    todayHarvest: 0
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setHarvestData(data.chartData);
        } else {
          // Fallback to mock data
          const mockData = [
            { date: '2024-01-01', tbs: 150, weight: 1200 },
            { date: '2024-01-02', tbs: 180, weight: 1440 },
            { date: '2024-01-03', tbs: 200, weight: 1600 },
            { date: '2024-01-04', tbs: 170, weight: 1360 },
            { date: '2024-01-05', tbs: 190, weight: 1520 }
          ];
          setHarvestData(mockData);
          setStats({
            totalHarvest: 890,
            totalWorkers: 12,
            totalBlocks: 5,
            todayHarvest: 190
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data
        const mockData = [
          { date: '2024-01-01', tbs: 150, weight: 1200 },
          { date: '2024-01-02', tbs: 180, weight: 1440 },
          { date: '2024-01-03', tbs: 200, weight: 1600 },
          { date: '2024-01-04', tbs: 170, weight: 1360 },
          { date: '2024-01-05', tbs: 190, weight: 1520 }
        ];
        setHarvestData(mockData);
        setStats({
          totalHarvest: 890,
          totalWorkers: 12,
          totalBlocks: 5,
          todayHarvest: 190
        });
      }
    };

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Panen</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalHarvest}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pekerja</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalWorkers}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blok Lahan</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBlocks}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Panen Hari Ini</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.todayHarvest}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tren Panen</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={harvestData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tbs" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button onClick={() => setActiveTab('harvest')} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Input Panen</h3>
                    <p className="text-sm text-gray-600">Catat hasil panen hari ini</p>
                  </div>
                </div>
              </button>

              <button onClick={() => setActiveTab('reports')} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Laporan</h3>
                    <p className="text-sm text-gray-600">Lihat laporan panen</p>
                  </div>
                </div>
              </button>

              <button onClick={() => setActiveTab('users')} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kelola Pekerja</h3>
                    <p className="text-sm text-gray-600">Tambah atau edit pekerja</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Recent Harvest */}
            <div className="card p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Panen Terbaru</h2>
              <div className="space-y-4">
                {[
                  { worker: 'Ahmad', block: 'Blok A', tbs: 25, weight: 200, date: '2024-01-15' },
                  { worker: 'Budi', block: 'Blok B', tbs: 30, weight: 240, date: '2024-01-15' },
                  { worker: 'Siti', block: 'Blok C', tbs: 28, weight: 224, date: '2024-01-14' }
                ].map((harvest, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{harvest.worker}</h4>
                        <p className="text-sm text-gray-600">{harvest.block}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{harvest.tbs} TBS</p>
                      <p className="text-sm text-gray-600">{harvest.weight} kg</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(harvest.date).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'harvest':
        return <HarvestInput />;
      case 'reports':
        return <Reports />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <Notifications />;
      case 'productivity':
        return <ProductivityAnalysis />;
      case 'payment':
        return <PaymentSystem />;
      case 'security':
        return <SecuritySettings />;
      case 'realtime':
        return <RealTimeDashboard />;
      case 'export':
        return <ReportExport />;
      case 'insights':
        return <ProductivityInsights />;
      case 'smart-notifications':
        return <SmartNotifications />;
      default:
        return null;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">SawitApp</h1>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('realtime')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'realtime' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Real-time
          </button>
          <button
            onClick={() => setActiveTab('harvest')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'harvest' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5" />
            Input Panen
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'reports' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Download className="w-5 h-5" />
            Laporan
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'export' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            Export
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Kelola User
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            Notifikasi
          </button>
          <button
            onClick={() => setActiveTab('smart-notifications')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'smart-notifications' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            Smart Notifications
          </button>
          <button
            onClick={() => setActiveTab('productivity')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'productivity' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-5 h-5" />
            Analisis Produktivitas
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'insights' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Insights
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'payment' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Langganan
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            Keamanan
          </button>
          <button
            onClick={() => window.location.href = '/admin/dashboard'}
            className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-700 hover:bg-gray-100 border-t border-gray-200 mt-4 pt-4"
          >
            <Shield className="w-5 h-5" />
            Admin Dashboard
          </button>
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'realtime' && 'Real-time Dashboard'}
            {activeTab === 'harvest' && 'Input Panen'}
            {activeTab === 'reports' && 'Laporan'}
            {activeTab === 'export' && 'Export Laporan'}
            {activeTab === 'users' && 'Kelola User'}
            {activeTab === 'notifications' && 'Notifikasi'}
            {activeTab === 'smart-notifications' && 'Smart Notifications'}
            {activeTab === 'productivity' && 'Analisis Produktivitas'}
            {activeTab === 'insights' && 'Insights Produktivitas'}
            {activeTab === 'payment' && 'Langganan'}
            {activeTab === 'security' && 'Keamanan'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
    </AuthGuard>
  );
}