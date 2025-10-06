'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Crown, 
  Zap, 
  Building, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  freeUsers: number;
  proUsers: number;
  businessUsers: number;
  conversionRate: number;
  churnRate: number;
  averageRevenuePerUser: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  joinDate: string;
  lastLogin: string;
  revenue: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  users: number;
  subscriptions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    freeUsers: 0,
    proUsers: 0,
    businessUsers: 0,
    conversionRate: 0,
    churnRate: 0,
    averageRevenuePerUser: 0
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    loadAdminData();
  }, [selectedPeriod]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockStats: AdminStats = {
        totalUsers: 1247,
        totalRevenue: 45600000,
        monthlyRevenue: 8900000,
        activeSubscriptions: 892,
        freeUsers: 355,
        proUsers: 623,
        businessUsers: 269,
        conversionRate: 71.5,
        churnRate: 3.2,
        averageRevenuePerUser: 36500
      };

      const mockUsers: UserData[] = [
        {
          id: '1',
          name: 'PT Sawit Maju',
          email: 'admin@sawitmaju.com',
          company: 'PT Sawit Maju',
          plan: 'BUSINESS',
          status: 'ACTIVE',
          joinDate: '2024-01-15',
          lastLogin: '2024-01-20',
          revenue: 499000
        },
        {
          id: '2',
          name: 'Kebun Sawit Sejahtera',
          email: 'owner@sejahtera.com',
          company: 'Kebun Sawit Sejahtera',
          plan: 'PRO',
          status: 'ACTIVE',
          joinDate: '2024-01-10',
          lastLogin: '2024-01-19',
          revenue: 149000
        },
        {
          id: '3',
          name: 'CV Tani Makmur',
          email: 'admin@tanimakmur.com',
          company: 'CV Tani Makmur',
          plan: 'FREE',
          status: 'ACTIVE',
          joinDate: '2024-01-05',
          lastLogin: '2024-01-18',
          revenue: 0
        }
      ];

      const mockRevenueData: RevenueData[] = [
        { month: 'Jan', revenue: 8900000, users: 1247, subscriptions: 892 },
        { month: 'Dec', revenue: 8200000, users: 1156, subscriptions: 823 },
        { month: 'Nov', revenue: 7800000, users: 1089, subscriptions: 789 },
        { month: 'Oct', revenue: 7200000, users: 1023, subscriptions: 745 },
        { month: 'Sep', revenue: 6800000, users: 956, subscriptions: 698 },
        { month: 'Aug', revenue: 6400000, users: 889, subscriptions: 652 }
      ];

      setStats(mockStats);
      setUsers(mockUsers);
      setRevenueData(mockRevenueData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'FREE': return 'bg-gray-100 text-gray-800';
      case 'PRO': return 'bg-blue-100 text-blue-800';
      case 'BUSINESS': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const planDistribution = [
    { name: 'FREE', value: stats.freeUsers, color: '#6B7280' },
    { name: 'PRO', value: stats.proUsers, color: '#3B82F6' },
    { name: 'BUSINESS', value: stats.businessUsers, color: '#8B5CF6' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Memuat data admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor dan kelola platform Sawit Harvest SaaS</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalUsers)}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5% dari bulan lalu</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.3% dari bulan lalu</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15.2% dari bulan lalu</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.activeSubscriptions)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+5.7% dari bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.churnRate}%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ARPU</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageRevenuePerUser)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Free Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.freeUsers)}</p>
              </div>
              <Users className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex gap-2">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1"
                >
                  <option value="7d">7 Hari</option>
                  <option value="30d">30 Hari</option>
                  <option value="90d">90 Hari</option>
                  <option value="1y">1 Tahun</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : name === 'users' ? 'Users' : 'Subscriptions'
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
              <div className="flex gap-2">
                <button className="btn-secondary flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(user.plan)}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(user.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary/80 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
