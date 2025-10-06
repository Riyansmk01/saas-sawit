'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Download, 
  Filter, 
  Calendar,
  FileText,
  BarChart3,
  Users,
  MapPin,
  Printer
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

// Mock data untuk demo
const reportData = [
  { date: '2024-01-01', worker: 'Ahmad', block: 'Blok A', tbs: 45, tonnage: 12.5, quality: 'A' },
  { date: '2024-01-02', worker: 'Budi', block: 'Blok B', tbs: 38, tonnage: 10.8, quality: 'B' },
  { date: '2024-01-03', worker: 'Siti', block: 'Blok A', tbs: 52, tonnage: 14.2, quality: 'A' },
  { date: '2024-01-04', worker: 'Rudi', block: 'Blok C', tbs: 41, tonnage: 11.5, quality: 'A' },
  { date: '2024-01-05', worker: 'Maya', block: 'Blok B', tbs: 47, tonnage: 13.1, quality: 'B' },
  { date: '2024-01-06', worker: 'Ahmad', block: 'Blok A', tbs: 43, tonnage: 11.9, quality: 'A' },
  { date: '2024-01-07', worker: 'Budi', block: 'Blok C', tbs: 39, tonnage: 10.8, quality: 'B' },
]

const dailyData = [
  { date: '2024-01-01', tbs: 45, tonnage: 12.5 },
  { date: '2024-01-02', tbs: 38, tonnage: 10.8 },
  { date: '2024-01-03', tbs: 52, tonnage: 14.2 },
  { date: '2024-01-04', tbs: 41, tonnage: 11.5 },
  { date: '2024-01-05', tbs: 47, tonnage: 13.1 },
  { date: '2024-01-06', tbs: 43, tonnage: 11.9 },
  { date: '2024-01-07', tbs: 39, tonnage: 10.8 },
]

const workerData = [
  { name: 'Ahmad', tbs: 88, tonnage: 24.4, entries: 2 },
  { name: 'Budi', tbs: 77, tonnage: 21.6, entries: 2 },
  { name: 'Siti', tbs: 52, tonnage: 14.2, entries: 1 },
  { name: 'Rudi', tbs: 41, tonnage: 11.5, entries: 1 },
  { name: 'Maya', tbs: 47, tonnage: 13.1, entries: 1 },
]

const blockData = [
  { name: 'Blok A', tbs: 140, tonnage: 38.6, percentage: 40, area: '10 ha' },
  { name: 'Blok B', tbs: 85, tonnage: 23.9, percentage: 24, area: '8 ha' },
  { name: 'Blok C', tbs: 80, tonnage: 22.3, percentage: 23, area: '7 ha' },
  { name: 'Blok D', tbs: 48, tonnage: 13.4, percentage: 13, area: '5 ha' },
]

const COLORS = ['#eab308', '#22c55e', '#3b82f6', '#ef4444']

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    dateFrom: '2024-01-01',
    dateTo: '2024-01-07',
    worker: '',
    block: '',
    reportType: 'daily'
  })

  const [activeTab, setActiveTab] = useState('overview')

  const workers = ['Ahmad', 'Budi', 'Siti', 'Rudi', 'Maya', 'Dedi', 'Rina', 'Joko']
  const blocks = ['Blok A', 'Blok B', 'Blok C', 'Blok D']

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const handleExport = (format: 'excel' | 'pdf') => {
    // TODO: Implement export functionality
    alert(`Export ${format.toUpperCase()} akan segera tersedia!`)
  }

  const filteredData = reportData.filter(entry => {
    if (filters.worker && entry.worker !== filters.worker) return false
    if (filters.block && entry.block !== filters.block) return false
    if (entry.date < filters.dateFrom || entry.date > filters.dateTo) return false
    return true
  })

  const totalTBS = filteredData.reduce((sum, entry) => sum + entry.tbs, 0)
  const totalTonnage = filteredData.reduce((sum, entry) => sum + entry.tonnage, 0)
  const avgTBS = filteredData.length > 0 ? (totalTBS / filteredData.length).toFixed(1) : 0
  const avgTonnage = filteredData.length > 0 ? (totalTonnage / filteredData.length).toFixed(2) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors duration-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Kembali
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sawit-600 to-primary-600 bg-clip-text text-transparent">🌴 Sawit Harvest</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Laporan & Analisis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Laporan Panen Sawit</h2>
          <p className="text-gray-600">Analisis dan export data panen dengan berbagai filter</p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Laporan
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('excel')}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="btn-primary flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Dari Tanggal
              </label>
              <input
                type="date"
                className="input-field"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Sampai Tanggal
              </label>
              <input
                type="date"
                className="input-field"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-1" />
                Pekerja
              </label>
              <select
                className="input-field"
                value={filters.worker}
                onChange={(e) => handleFilterChange('worker', e.target.value)}
              >
                <option value="">Semua Pekerja</option>
                {workers.map(worker => (
                  <option key={worker} value={worker}>{worker}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Blok Lahan
              </label>
              <select
                className="input-field"
                value={filters.block}
                onChange={(e) => handleFilterChange('block', e.target.value)}
              >
                <option value="">Semua Blok</option>
                {blocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BarChart3 className="h-4 w-4 inline mr-1" />
                Tipe Laporan
              </label>
              <select
                className="input-field"
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-sawit-600">{totalTBS}</div>
            <div className="text-sm text-gray-600">Total TBS</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{totalTonnage.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Total Tonase (ton)</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">{avgTBS}</div>
            <div className="text-sm text-gray-600">Rata-rata TBS</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600">{filteredData.length}</div>
            <div className="text-sm text-gray-600">Total Entri</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Ringkasan', icon: BarChart3 },
              { id: 'workers', name: 'Per Pekerja', icon: Users },
              { id: 'blocks', name: 'Per Blok', icon: MapPin },
              { id: 'detailed', name: 'Detail Data', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-sawit-500 text-sawit-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Tren Panen Harian</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tbs" stroke="#eab308" strokeWidth={2} />
                  <Line type="monotone" dataKey="tonnage" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Distribusi Per Blok</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={blockData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="tbs"
                  >
                    {blockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Produktivitas Per Pekerja</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tbs" fill="#eab308" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pekerja
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total TBS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Tonase
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Entri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rata-rata TBS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workerData.map((worker) => (
                    <tr key={worker.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {worker.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {worker.tbs}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {worker.tonnage} ton
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {worker.entries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(worker.tbs / worker.entries).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Produktivitas Per Blok Lahan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {blockData.map((block) => (
                <div key={block.name} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{block.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TBS:</span>
                      <span className="font-medium">{block.tbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tonase:</span>
                      <span className="font-medium">{block.tonnage} ton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Luas:</span>
                      <span className="font-medium">{block.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Persentase:</span>
                      <span className="font-medium">{block.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Data Detail Panen</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pekerja
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TBS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tonase
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kualitas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.worker}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.block}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.tbs}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.tonnage} ton
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.quality === 'A' ? 'bg-green-100 text-green-800' :
                          entry.quality === 'B' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.quality}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
