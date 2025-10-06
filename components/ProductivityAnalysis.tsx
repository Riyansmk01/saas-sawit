'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, Award, Users, MapPin, Calendar, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

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

export default function ProductivityAnalysis() {
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([]);
  const [workerPerformance, setWorkerPerformance] = useState<WorkerPerformance[]>([]);
  const [blockPerformance, setBlockPerformance] = useState<BlockPerformance[]>([]);
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

    setProductivityData(mockProductivityData);
    setWorkerPerformance(mockWorkerPerformance);
    setBlockPerformance(mockBlockPerformance);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Target className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const qualityData = [
    { name: 'Kualitas A', value: 65, color: '#10B981' },
    { name: 'Kualitas B', value: 25, color: '#F59E0B' },
    { name: 'Kualitas C', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analisis Produktivitas</h2>
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
              <p className="text-sm font-medium text-gray-600">Rata-rata TBS/Pekerja</p>
              <p className="text-2xl font-bold text-gray-900">30</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+5% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata Berat/Pekerja</p>
              <p className="text-2xl font-bold text-gray-900">240 kg</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efisiensi Keseluruhan</p>
              <p className="text-2xl font-bold text-gray-900">90%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+3% dari bulan lalu</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">TBS/Hektare</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+2% dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Productivity Trend Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Tren Produktivitas
        </h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Worker Performance */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Performa Pekerja
          </h3>
          <div className="space-y-4">
            {workerPerformance.map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{worker.name}</h4>
                    <p className="text-sm text-gray-600">{worker.tbsCount} TBS, {worker.weight} kg</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${getEfficiencyColor(worker.efficiency)}`}>
                    {worker.efficiency}%
                  </span>
                  {getTrendIcon(worker.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block Performance */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Performa Blok
          </h3>
          <div className="space-y-4">
            {blockPerformance.map((block, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{block.name}</h4>
                    <p className="text-sm text-gray-600">{block.area} ha, {block.tbsPerHectare} TBS/ha</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${getEfficiencyColor(block.efficiency)}`}>
                    {block.efficiency}%
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${block.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Distribution */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Distribusi Kualitas
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
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
          <div className="space-y-4">
            {qualityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}