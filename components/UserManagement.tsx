'use client';

import { useState, useEffect } from 'react';
import { User, Plus, Edit, Trash2, Shield, UserCheck, UserX, Phone, MapPin } from 'lucide-react';

interface WorkerData {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
}

export default function UserManagement() {
  const [workers, setWorkers] = useState<WorkerData[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState<WorkerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/workers', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWorkers(data.workers || []);
      }
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/workers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchWorkers();
        setShowAddModal(false);
        setEditingWorker(null);
        setFormData({ name: '', phone: '', address: '' });
        alert('Data pekerja berhasil disimpan!');
      } else {
        const error = await response.json();
        alert(error.error || 'Terjadi kesalahan saat menyimpan data');
      }
    } catch (error) {
      console.error('Error saving worker:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (workerId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pekerja ini?')) {
      // For now, just remove from local state
      // In a real app, you'd call DELETE API
      setWorkers(workers.filter(worker => worker.id !== workerId));
    }
  };

  const handleEdit = (worker: WorkerData) => {
    setEditingWorker(worker);
    setFormData({
      name: worker.name,
      phone: worker.phone || '',
      address: worker.address || ''
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Pekerja</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Pekerja
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div key={worker.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                  {worker.phone && (
                    <p className="text-sm text-gray-600">{worker.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(worker)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(worker.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {worker.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{worker.phone}</span>
                </div>
              )}
              {worker.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{worker.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {worker.isActive ? (
                  <UserCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <UserX className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm text-gray-600">
                  Status: {worker.isActive ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Bergabung: {new Date(worker.createdAt).toLocaleDateString('id-ID')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Worker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingWorker ? 'Edit Pekerja' : 'Tambah Pekerja Baru'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field"
                  placeholder="Opsional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Opsional"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Menyimpan...' : (editingWorker ? 'Update' : 'Tambah')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingWorker(null);
                    setFormData({ name: '', phone: '', address: '' });
                  }}
                  className="btn-secondary flex-1"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
