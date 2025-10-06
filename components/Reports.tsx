'use client';

import { useState, useEffect } from 'react';
import { Download, Filter, Calendar, BarChart3, TrendingUp, FileText, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface ReportData {
  date: string;
  tbsCount: number;
  weight: number;
  quality: {
    A: number;
    B: number;
    C: number;
  };
}

interface WorkerPerformance {
  name: string;
  tbsCount: number;
  weight: number;
  efficiency: number;
}

export default function Reports() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [workerPerformance, setWorkerPerformance] = useState<WorkerPerformance[]>([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    // Simulate fetching report data from API
    const mockData: ReportData[] = [
      { date: '2024-01-01', tbsCount: 150, weight: 1200, quality: { A: 80, B: 50, C: 20 } },
      { date: '2024-01-02', tbsCount: 180, weight: 1440, quality: { A: 100, B: 60, C: 20 } },
      { date: '2024-01-03', tbsCount: 200, weight: 1600, quality: { A: 120, B: 60, C: 20 } },
      { date: '2024-01-04', tbsCount: 170, weight: 1360, quality: { A: 90, B: 60, C: 20 } },
      { date: '2024-01-05', tbsCount: 190, weight: 1520, quality: { A: 110, B: 60, C: 20 } }
    ];

    const mockWorkerPerformance: WorkerPerformance[] = [
      { name: 'Ahmad', tbsCount: 500, weight: 4000, efficiency: 95 },
      { name: 'Budi', tbsCount: 450, weight: 3600, efficiency: 90 },
      { name: 'Siti', tbsCount: 400, weight: 3200, efficiency: 85 }
    ];

    setReportData(mockData);
    setWorkerPerformance(mockWorkerPerformance);
  }, []);

  const handleExport = (format: 'excel' | 'pdf') => {
    // Here you would implement the export functionality
    console.log(`Exporting report as ${format}`);
    alert(`Laporan berhasil diekspor dalam format ${format.toUpperCase()}`);
  };

  const qualityData = [
    { name: 'Kualitas A', value: 500, color: '#10B981' },
    { name: 'Kualitas B', value: 300, color: '#F59E0B' },
    { name: 'Kualitas C', value: 100, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Laporan & Analisis</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="btn-secondary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="input-field"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="input-field"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="input-field"
            >
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Tren Panen Harian
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tbsCount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribusi Kualitas
            </h3>
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

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performa Pekerja
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Pekerja
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah TBS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berat (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efisiensi
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
                      {worker.tbsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {worker.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${worker.efficiency}%` }}
                          ></div>
                        </div>
                        <span>{worker.efficiency}%</span>
                      </div>
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
