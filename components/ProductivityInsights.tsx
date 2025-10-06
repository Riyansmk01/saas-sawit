'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, Award, Users, MapPin, Calendar, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface ProductivityInsight {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface ProductivityData {
  date: string;
  tbsPerWorker: number;
  weightPerWorker: number;
  efficiency: number;
  quality: number;
}

interface WorkerPerformance {
  name: string;
  tbsCount: number;
  weight: number;
  efficiency: number;
  trend: 'up' | 'down' | 'stable';
  quality: number;
}

interface BlockPerformance {
  name: string;
  area: number;
  tbsPerHectare: number;
  weightPerHectare: number;
  efficiency: number;
  quality: number;
}

export default function ProductivityInsights() {
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([]);
  const [workerPerformance, setWorkerPerformance] = useState<WorkerPerformance[]>([]);
  const [blockPerformance, setBlockPerformance] = useState<BlockPerformance[]>([]);
  const [insights, setInsights] = useState<ProductivityInsight[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    // Simulate fetching productivity data from API
    const mockProductivityData: ProductivityData[] = [
      { date: '2024-01-01', tbsPerWorker: 25, weightPerWorker: 200, efficiency: 85, quality: 90 },
      { date: '2024-01-02', tbsPerWorker: 30, weightPerWorker: 240, efficiency: 90, quality: 92 },
      { date: '2024-01-03', tbsPerWorker: 28, weightPerWorker: 224, efficiency: 88, quality: 89 },
      { date: '2024-01-04', tbsPerWorker: 32, weightPerWorker: 256, efficiency: 92, quality: 94 },
      { date: '2024-01-05', tbsPerWorker: 35, weightPerWorker: 280, efficiency: 95, quality: 96 }
    ];

    const mockWorkerPerformance: WorkerPerformance[] = [
      { name: 'Ahmad', tbsCount: 500, weight: 4000, efficiency: 95, trend: 'up', quality: 94 },
      { name: 'Budi', tbsCount: 450, weight: 3600, efficiency: 90, trend: 'stable', quality: 91 },
      { name: 'Siti', tbsCount: 400, weight: 3200, efficiency: 85, trend: 'down', quality: 88 },
      { name: 'Dedi', tbsCount: 480, weight: 3840, efficiency: 92, trend: 'up', quality: 93 }
    ];

    const mockBlockPerformance: BlockPerformance[] = [
      { name: 'Blok A', area: 10, tbsPerHectare: 50, weightPerHectare: 400, efficiency: 90, quality: 92 },
      { name: 'Blok B', area: 15, tbsPerHectare: 45, weightPerHectare: 360, efficiency: 85, quality: 89 },
      { name: 'Blok C', area: 12, tbsPerHectare: 48, weightPerHectare: 384, efficiency: 88, quality: 91 },
      { name: 'Blok D', area: 8, tbsPerHectare: 52, weightPerHectare: 416, efficiency: 93, quality: 95 }
    ];

    const mockInsights: ProductivityInsight[] = [
      {
        type: 'positive',
        title: 'Peningkatan Efisiensi',
        description: 'Efisiensi rata-rata meningkat 5% dari bulan lalu',
        impact: 'high',
        recommendation: 'Pertahankan metode kerja yang sudah baik dan bagikan ke pekerja lain'
      },
      {
        type: 'negative',
        title: 'Penurunan Kualitas di Blok B',
        description: 'Kualitas buah di Blok B menurun 3% dari target',
        impact: 'medium',
        recommendation: 'Periksa kondisi tanah dan lakukan perawatan tambahan'
      },
      {
        type: 'neutral',
        title: 'Stabilitas Produksi',
        description: 'Produksi harian stabil dalam 2 minggu terakhir',
        impact: 'low',
        recommendation: 'Pertahankan konsistensi dan cari peluang peningkatan'
      }
    ];

    setProductivityData(mockProductivityData);
    setWorkerPerformance(mockWorkerPerformance);
    setBlockPerformance(mockBlockPerformance);
    setInsights(mockInsights);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Target className="w-5 h-5 text-blue-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'negative':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const qualityData = [
    { name: 'Kualitas A', value: 65, color: '#10B981' },
    { name: 'Kualitas B', value: 25, color: '#F59E0B' },
    { name: 'Kualitas C', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Insights Produktivitas</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
          className="input-field w-auto"
        >
          <option value="week">Mingguan</option>
          <option value="month">Bulanan</option>
          <option value="quarter">Triwulan</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efisiensi Rata-rata</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+5% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kualitas Rata-rata</p>
              <p className="text-2xl font-bold text-gray-900">91%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+2% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produktivitas per Hektare</p>
              <p className="text-2xl font-bold text-gray-900">48 TBS</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+3% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pekerja Terbaik</p>
              <p className="text-2xl font-bold text-gray-900">Ahmad</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">95% efisiensi</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Insights & Rekomendasi
        </h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}>
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact === 'high' ? 'Tinggi' : insight.impact === 'medium' ? 'Sedang' : 'Rendah'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{insight.description}</p>
                  {insight.recommendation && (
                    <p className="text-sm text-gray-600">
                      <strong>Rekomendasi:</strong> {insight.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Tren Produktivitas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="quality" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Distribusi Kualitas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {qualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Performa Pekerja</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efisiensi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kualitas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tren
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workerPerformance.map((worker, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {worker.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {worker.efficiency}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {worker.quality}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {worker.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : worker.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      ) : (
                        <Target className="w-4 h-4 text-yellow-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Performa Blok</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TBS/Ha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efisiensi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kualitas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blockPerformance.map((block, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {block.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.tbsPerHectare}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.efficiency}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.quality}%
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
