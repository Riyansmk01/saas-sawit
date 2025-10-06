'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Wifi, WifiOff, Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RealTimeData {
  timestamp: string;
  tbsCount: number;
  weight: number;
  workers: number;
  efficiency: number;
}

export default function RealTimeDashboard() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);
  const [currentStats, setCurrentStats] = useState({
    tbsCount: 0,
    weight: 0,
    workers: 0,
    efficiency: 0
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newData: RealTimeData = {
        timestamp: new Date().toISOString(),
        tbsCount: Math.floor(Math.random() * 50) + 20,
        weight: Math.floor(Math.random() * 400) + 200,
        workers: Math.floor(Math.random() * 5) + 8,
        efficiency: Math.floor(Math.random() * 20) + 80
      };

      setRealTimeData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-20); // Keep only last 20 data points
      });

      setCurrentStats({
        tbsCount: newData.tbsCount,
        weight: newData.weight,
        workers: newData.workers,
        efficiency: newData.efficiency
      });

      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyIcon = (efficiency: number) => {
    if (efficiency >= 90) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (efficiency >= 80) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Real-time</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-gray-600">
              {isConnected ? 'Terhubung' : 'Terputus'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Terakhir update: {formatTime(lastUpdate)}
            </span>
          </div>
          <button
            onClick={() => setLastUpdate(new Date())}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">TBS Saat Ini</p>
              <p className="text-2xl font-bold text-gray-900">{currentStats.tbsCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Update setiap 5 detik</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Berat (kg)</p>
              <p className="text-2xl font-bold text-gray-900">{currentStats.weight}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Update setiap 5 detik</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pekerja Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{currentStats.workers}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Update setiap 5 detik</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efisiensi</p>
              <p className={`text-2xl font-bold ${getEfficiencyColor(currentStats.efficiency)}`}>
                {currentStats.efficiency}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              {getEfficiencyIcon(currentStats.efficiency)}
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Update setiap 5 detik</span>
          </div>
        </div>
      </div>

      {/* Real-time Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Tren Real-time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={realTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleString('id-ID')}
            />
            <Line 
              type="monotone" 
              dataKey="tbsCount" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="TBS Count"
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Weight (kg)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Alert Real-time
        </h3>
        <div className="space-y-3">
          {currentStats.efficiency < 80 && (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium text-red-900">Efisiensi Rendah</p>
                <p className="text-sm text-red-700">
                  Efisiensi saat ini {currentStats.efficiency}% di bawah target 80%
                </p>
              </div>
            </div>
          )}
          
          {currentStats.workers < 5 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-900">Pekerja Sedikit</p>
                <p className="text-sm text-yellow-700">
                  Hanya {currentStats.workers} pekerja yang aktif
                </p>
              </div>
            </div>
          )}

          {currentStats.efficiency >= 90 && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-green-900">Efisiensi Optimal</p>
                <p className="text-sm text-green-700">
                  Efisiensi {currentStats.efficiency}% sangat baik!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
