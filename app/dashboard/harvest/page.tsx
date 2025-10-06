'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Save,
  Calendar,
  Users,
  MapPin,
  Package,
  Scale,
  Star,
  FileText,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'

// Mock data - nanti akan diganti dengan API calls
const workers = [
  { id: 1, name: 'Ahmad Susanto', position: 'Mandor' },
  { id: 2, name: 'Budi Santoso', position: 'Pekerja' },
  { id: 3, name: 'Cahyo Wijaya', position: 'Pekerja' },
  { id: 4, name: 'Dedi Kurniawan', position: 'Pekerja' },
  { id: 5, name: 'Eko Prasetyo', position: 'Pekerja' }
]

const blocks = [
  { id: 1, name: 'Blok A', area: 2.5, variety: 'Tenera' },
  { id: 2, name: 'Blok B', area: 3.2, variety: 'Dura' },
  { id: 3, name: 'Blok C', area: 1.8, variety: 'Tenera' },
  { id: 4, name: 'Blok D', area: 2.1, variety: 'Dura' }
]

const qualityOptions = [
  { value: 'A', label: 'Kualitas A (Excellent)', color: 'text-green-600', bg: 'bg-green-100' },
  { value: 'B', label: 'Kualitas B (Good)', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { value: 'C', label: 'Kualitas C (Fair)', color: 'text-red-600', bg: 'bg-red-100' }
]

interface HarvestFormData {
  date: string
  workerId: string
  blockId: string
  tbsCount: number
  tonnage: number
  quality: string
  notes: string
  photos: File[]
}

export default function HarvestInputPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<HarvestFormData>({
    date: new Date().toISOString().split('T')[0],
    workerId: '',
    blockId: '',
    tbsCount: 0,
    tonnage: 0,
    quality: '',
    notes: '',
    photos: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tbsCount' || name === 'tonnage' ? Number(value) : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.workerId) newErrors.workerId = 'Pilih pekerja yang melakukan panen'
    if (!formData.blockId) newErrors.blockId = 'Pilih blok lahan'
    if (formData.tbsCount <= 0) newErrors.tbsCount = 'Jumlah TBS harus lebih dari 0'
    if (formData.tonnage <= 0) newErrors.tonnage = 'Tonase harus lebih dari 0'
    if (!formData.quality) newErrors.quality = 'Pilih kualitas buah'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error submitting harvest data:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateProductivity = () => {
    if (formData.tbsCount > 0 && formData.tonnage > 0) {
      return (formData.tbsCount / formData.tonnage).toFixed(2)
    }
    return 0
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Berhasil Disimpan!</h2>
          <p className="text-gray-600 mb-4">Data panen telah berhasil dicatat ke sistem.</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sawit-50 to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
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
              <span className="text-sm text-gray-600">Input Data Panen</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Input Data Panen</h2>
            <p className="text-gray-600">Catat hasil panen TBS (Tandan Buah Segar) dengan detail</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date and Worker Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Tanggal Panen
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sawit-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-2" />
                  Pekerja yang Melakukan Panen
                </label>
                <select
                  name="workerId"
                  value={formData.workerId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sawit-500 focus:border-transparent transition-all duration-300 ${
                    errors.workerId ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih pekerja</option>
                  {workers.map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} - {worker.position}
                    </option>
                  ))}
                </select>
                {errors.workerId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.workerId}
                  </p>
                )}
              </div>
            </div>

            {/* Block Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Blok Lahan
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blocks.map(block => (
                  <div
                    key={block.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.blockId === block.id.toString()
                        ? 'border-sawit-500 bg-sawit-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, blockId: block.id.toString() }))}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{block.name}</h3>
                        <p className="text-sm text-gray-600">{block.area} hektar - {block.variety}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.blockId === block.id.toString()
                          ? 'border-sawit-500 bg-sawit-500'
                          : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              {errors.blockId && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.blockId}
                </p>
              )}
            </div>

            {/* Harvest Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package className="h-4 w-4 inline mr-2" />
                  Jumlah TBS
                </label>
                <input
                  type="number"
                  name="tbsCount"
                  value={formData.tbsCount}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sawit-500 focus:border-transparent transition-all duration-300 ${
                    errors.tbsCount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan jumlah TBS"
                />
                {errors.tbsCount && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.tbsCount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Scale className="h-4 w-4 inline mr-2" />
                  Tonase (Ton)
                </label>
                <input
                  type="number"
                  name="tonnage"
                  value={formData.tonnage}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sawit-500 focus:border-transparent transition-all duration-300 ${
                    errors.tonnage ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan tonase"
                />
                {errors.tonnage && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.tonnage}
                  </p>
                )}
              </div>
            </div>

            {/* Productivity Calculation */}
            {formData.tbsCount > 0 && formData.tonnage > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Perhitungan Produktivitas</h3>
                <p className="text-sm text-blue-700">
                  TBS per ton: <span className="font-semibold">{calculateProductivity()}</span>
                </p>
              </div>
            )}

            {/* Quality Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="h-4 w-4 inline mr-2" />
                Kualitas Buah
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {qualityOptions.map(option => (
                  <div
                    key={option.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.quality === option.value
                        ? 'border-sawit-500 bg-sawit-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, quality: option.value }))}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-semibold ${option.color}`}>{option.value}</h3>
                        <p className="text-sm text-gray-600">{option.label.split('(')[1].replace(')', '')}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.quality === option.value
                          ? 'border-sawit-500 bg-sawit-500'
                          : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              {errors.quality && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.quality}
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="h-4 w-4 inline mr-2" />
                Foto Dokumentasi
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sawit-400 transition-colors duration-300">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Klik untuk upload foto atau drag & drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG hingga 10MB</p>
                </label>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 inline mr-2" />
                Catatan Tambahan
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sawit-500 focus:border-transparent transition-all duration-300"
                placeholder="Masukkan catatan tambahan (opsional)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-sawit-600 text-white rounded-lg hover:bg-sawit-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Data
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}