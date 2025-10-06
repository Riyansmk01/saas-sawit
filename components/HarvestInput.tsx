'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Package, Scale, Star, Save, X } from 'lucide-react';

interface HarvestData {
  date: string;
  workerId: string;
  blockId: string;
  tbsCount: number;
  weight: number;
  quality: 'A' | 'B' | 'C';
  notes?: string;
}

interface Worker {
  id: string;
  name: string;
}

interface Block {
  id: string;
  name: string;
  area: number;
}

export default function HarvestInput() {
  const [formData, setFormData] = useState<HarvestData>({
    date: new Date().toISOString().split('T')[0],
    workerId: '',
    blockId: '',
    tbsCount: 0,
    weight: 0,
    quality: 'A',
    notes: ''
  });

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const [workersResponse, blocksResponse] = await Promise.all([
          fetch('/api/workers', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch('/api/blocks', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        if (workersResponse.ok) {
          const workersData = await workersResponse.json();
          setWorkers(workersData.workers || []);
        }

        if (blocksResponse.ok) {
          const blocksData = await blocksResponse.json();
          setBlocks(blocksData.blocks || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data
        const mockWorkers: Worker[] = [
          { id: '1', name: 'Ahmad' },
          { id: '2', name: 'Budi' },
          { id: '3', name: 'Siti' }
        ];
        const mockBlocks: Block[] = [
          { id: '1', name: 'Blok A', area: 10 },
          { id: '2', name: 'Blok B', area: 15 },
          { id: '3', name: 'Blok C', area: 12 }
        ];
        setWorkers(mockWorkers);
        setBlocks(mockBlocks);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (!formData.workerId || !formData.blockId) {
        alert('Pilih pekerja dan blok lahan terlebih dahulu!');
        return;
      }

      if (formData.tbsCount <= 0 || formData.weight <= 0) {
        alert('Jumlah TBS dan berat harus lebih dari 0!');
        return;
      }

      // Call API to save harvest data
      const token = localStorage.getItem('token');
      const response = await fetch('/api/harvest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data panen berhasil disimpan!');
        // Reset form after successful submission
        setFormData({
          date: new Date().toISOString().split('T')[0],
          workerId: '',
          blockId: '',
          tbsCount: 0,
          weight: 0,
          quality: 'A',
          notes: ''
        });
      } else {
        const error = await response.json();
        alert(error.message || 'Terjadi kesalahan saat menyimpan data');
      }
    } catch (error) {
      console.error('Error saving harvest data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof HarvestData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Data Panen</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Tanggal Panen
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Pekerja
              </label>
              <select
                value={formData.workerId}
                onChange={(e) => handleInputChange('workerId', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Pilih Pekerja</option>
                {workers.map(worker => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Blok Lahan
              </label>
              <select
                value={formData.blockId}
                onChange={(e) => handleInputChange('blockId', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Pilih Blok</option>
                {blocks.map(block => (
                  <option key={block.id} value={block.id}>
                    {block.name} ({block.area} ha)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-2" />
                Jumlah TBS
              </label>
              <input
                type="number"
                value={formData.tbsCount}
                onChange={(e) => handleInputChange('tbsCount', parseInt(e.target.value) || 0)}
                className="input-field"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Scale className="w-4 h-4 inline mr-2" />
                Berat (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="input-field"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4 inline mr-2" />
                Kualitas
              </label>
              <select
                value={formData.quality}
                onChange={(e) => handleInputChange('quality', e.target.value as 'A' | 'B' | 'C')}
                className="input-field"
                required
              >
                <option value="A">Kualitas A (Sangat Baik)</option>
                <option value="B">Kualitas B (Baik)</option>
                <option value="C">Kualitas C (Cukup)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Masukkan catatan tambahan jika ada..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  date: new Date().toISOString().split('T')[0],
                  workerId: '',
                  blockId: '',
                  tbsCount: 0,
                  weight: 0,
                  quality: 'A',
                  notes: ''
                });
              }}
              className="btn-secondary flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
