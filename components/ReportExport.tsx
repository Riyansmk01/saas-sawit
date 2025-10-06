'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, Filter, Users, MapPin, BarChart3 } from 'lucide-react';

interface ExportOptions {
  format: 'excel' | 'pdf';
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  includeDetails: boolean;
  groupBy: 'date' | 'worker' | 'block';
}

export default function ReportExport() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'excel',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    includeCharts: true,
    includeDetails: true,
    groupBy: 'date'
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Here you would implement the actual export functionality
      // This would typically involve calling an API endpoint that generates the report
      console.log('Exporting report with options:', exportOptions);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Laporan berhasil diekspor dalam format ${exportOptions.format.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Terjadi kesalahan saat mengekspor laporan');
    } finally {
      setIsExporting(false);
    }
  };

  const handleOptionChange = (key: keyof ExportOptions, value: any) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (key: 'start' | 'end', value: string) => {
    setExportOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Download className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Export Laporan</h2>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Pengaturan Export</h3>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Format File
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportOptions.format === 'excel'}
                  onChange={(e) => handleOptionChange('format', e.target.value)}
                  className="text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Excel (.xlsx)</span>
                  </div>
                  <p className="text-sm text-gray-600">Format spreadsheet dengan grafik</p>
                </div>
              </label>
              
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportOptions.format === 'pdf'}
                  onChange={(e) => handleOptionChange('format', e.target.value)}
                  className="text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="font-medium">PDF (.pdf)</span>
                  </div>
                  <p className="text-sm text-gray-600">Format dokumen untuk presentasi</p>
                </div>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Rentang Tanggal
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  value={exportOptions.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tanggal Akhir</label>
                <input
                  type="date"
                  value={exportOptions.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Group By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Filter className="w-4 h-4 inline mr-2" />
              Kelompokkan Berdasarkan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="groupBy"
                  value="date"
                  checked={exportOptions.groupBy === 'date'}
                  onChange={(e) => handleOptionChange('groupBy', e.target.value)}
                  className="text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Tanggal</span>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="groupBy"
                  value="worker"
                  checked={exportOptions.groupBy === 'worker'}
                  onChange={(e) => handleOptionChange('groupBy', e.target.value)}
                  className="text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Pekerja</span>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="groupBy"
                  value="block"
                  checked={exportOptions.groupBy === 'block'}
                  onChange={(e) => handleOptionChange('groupBy', e.target.value)}
                  className="text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">Blok</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Opsi Tambahan
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportOptions.includeCharts}
                  onChange={(e) => handleOptionChange('includeCharts', e.target.checked)}
                  className="rounded text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Sertakan Grafik</span>
                  </div>
                  <p className="text-sm text-gray-600">Tambahkan grafik dan chart ke laporan</p>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportOptions.includeDetails}
                  onChange={(e) => handleOptionChange('includeDetails', e.target.checked)}
                  className="rounded text-primary"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">Sertakan Detail</span>
                  </div>
                  <p className="text-sm text-gray-600">Tambahkan detail lengkap setiap transaksi</p>
                </div>
              </label>
            </div>
          </div>

          {/* Export Button */}
          <div className="pt-4">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Mengekspor...' : 'Export Laporan'}
            </button>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Riwayat Export</h3>
        <div className="space-y-3">
          {[
            { name: 'Laporan Harian Januari 2024', format: 'Excel', date: '2024-01-15', size: '2.3 MB' },
            { name: 'Laporan Mingguan Blok A', format: 'PDF', date: '2024-01-14', size: '1.8 MB' },
            { name: 'Laporan Bulanan Desember 2023', format: 'Excel', date: '2024-01-01', size: '5.2 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {report.format === 'Excel' ? (
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                ) : (
                  <FileText className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-600">{report.format} • {report.size}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(report.date).toLocaleDateString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
