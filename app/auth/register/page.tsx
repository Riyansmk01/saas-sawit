'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Check, CheckCircle, Loader2, AlertCircle, Mail, Lock, User, Building, Phone } from 'lucide-react'
import Captcha from '@/components/Captcha'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: '',
    plan: 'free',
    agreeTerms: false
  })

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email harus diisi'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Nama perusahaan harus diisi'
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Nama perusahaan minimal 2 karakter'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung huruf besar, kecil, dan angka'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan'
    }
    
    if (!isCaptchaVerified) {
      newErrors.captcha = 'Silakan verifikasi captcha terlebih dahulu'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Simulate API call untuk registrasi
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          password: formData.password,
          plan: formData.plan.toUpperCase()
        }),
      })

            if (response.ok) {
              // Registrasi berhasil, redirect ke login
              setErrors({ success: 'Registrasi berhasil! Silakan login dengan akun Anda.' })
              setTimeout(() => {
                window.location.href = '/auth/login'
              }, 2000)
      } else {
        const error = await response.json()
        console.error('Registration error response:', error)
        
        // Tampilkan error yang lebih detail
        let errorMessage = 'Terjadi kesalahan saat registrasi'
        if (error.error) {
          errorMessage = error.error
        } else if (error.message) {
          errorMessage = error.message
        }
        
        // Jika ada detail validation error, tampilkan yang pertama
        if (error.details && error.details.length > 0) {
          errorMessage = error.details[0].message || errorMessage
        }
        
        setErrors({ general: errorMessage })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Terjadi kesalahan saat registrasi. Silakan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const plans = [
    { id: 'free', name: 'Gratis', price: 'Rp 0', description: '1 kebun, 3 pekerja, 100 data/bulan' },
    { id: 'pro', name: 'Pro', price: 'Rp 149rb', description: '3 kebun, unlimited data, export laporan' },
    { id: 'business', name: 'Bisnis', price: 'Rp 499rb', description: 'Unlimited kebun, API, mobile app' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sawit-50 to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-sawit-600 hover:text-sawit-700 mb-6 transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sawit-600 to-primary-600 bg-clip-text text-transparent mb-2">🌴 Sawit Harvest</h1>
          <h2 className="text-2xl font-bold text-gray-900">Daftar Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="font-medium text-sawit-600 hover:text-sawit-500 transition-colors duration-300">
              Masuk di sini
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">Informasi Akun</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Success Message */}
              {errors.success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-green-700 text-sm">{errors.success}</p>
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Lengkap *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Nama lengkap Anda"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="nama@perusahaan.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Nama Perusahaan/Kebun *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className={`input-field ${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="PT. Sawit Maju Jaya"
                  value={formData.company}
                  onChange={handleChange}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.company}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Nomor Telepon *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Kata Sandi *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`input-field pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Minimal 8 karakter (huruf besar, kecil, angka)"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Konfirmasi Kata Sandi *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Ulangi kata sandi"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Captcha */}
              <div>
                <Captcha onVerify={setIsCaptchaVerified} />
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.captcha}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className={`h-4 w-4 text-sawit-600 focus:ring-sawit-500 border-gray-300 rounded mt-1 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                  Saya menyetujui{' '}
                  <Link href="/terms" className="text-sawit-600 hover:text-sawit-500 transition-colors duration-300">
                    Syarat & Ketentuan
                  </Link>{' '}
                  dan{' '}
                  <Link href="/privacy" className="text-sawit-600 hover:text-sawit-500 transition-colors duration-300">
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.agreeTerms}
                </p>
              )}

              <button
                type="submit"
                disabled={!isCaptchaVerified || isSubmitting}
                className={`btn-primary w-full flex items-center justify-center gap-2 ${
                  !isCaptchaVerified || isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mendaftar...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>
          </div>

          {/* Plan Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">Pilih Paket Langganan</h3>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    formData.plan === plan.id
                      ? 'border-sawit-500 bg-sawit-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setFormData({ ...formData, plan: plan.id })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.plan === plan.id
                          ? 'border-sawit-500 bg-sawit-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.plan === plan.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{plan.price}</div>
                      <div className="text-sm text-gray-500">/bulan</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tips Memilih Paket</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mulai dengan paket Gratis untuk mencoba fitur</li>
                <li>• Upgrade ke Pro jika butuh export laporan</li>
                <li>• Pilih Bisnis untuk multiple kebun & API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
