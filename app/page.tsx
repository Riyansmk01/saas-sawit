'use client';

import Link from 'next/link'
import { ArrowRight, BarChart3, Users, FileText, Shield, Zap, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'
import CustomCursor from '@/components/animations/CustomCursor'
import Logo from '@/components/Logo'
import LogoLoop from '@/components/animations/LogoLoop'
import MagnetButton from '@/components/animations/MagnetButton'
import ElectricBorder from '@/components/animations/ElectricBorder'
import RotatingText from '@/components/animations/RotatingText'
import AnimatedThreads from '@/components/animations/AnimatedThreads'

export default function HomePage() {
  return (
    <CustomCursor>
      <div className="min-h-screen brand-gradient relative">
        {/* Background Threads */}
        <AnimatedThreads 
          threadCount={15}
          speed={0.3}
          interactive={false}
          className="opacity-10"
        />
      {/* Navigation */}
      <nav className="brand-glass shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo withText size={28} />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="#features" className="text-gray-600 hover:text-sawit-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Fitur
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-sawit-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Harga
                </Link>
                <Link href="/auth/login" className="text-gray-600 hover:text-sawit-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Masuk
                </Link>
                <Link href="/auth/register" className="bg-sawit-600 hover:bg-sawit-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 soft-gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 brand-glass text-sawit-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Platform SaaS Terdepan untuk Petani Sawit
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">
                Kelola Panen Sawit
              </span>
              <br />
              <div className="h-20 flex items-center justify-center">
                <RotatingText 
                  texts={['dengan Teknologi Modern', 'dengan AI & Analytics', 'dengan Real-time Monitoring', 'dengan Smart Reports']}
                  speed={3}
                  className="h-20"
                />
              </div>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Platform SaaS untuk pencatatan, monitoring, dan laporan hasil panen TBS (Tandan Buah Segar) 
              dengan sistem multi-user dan analisis data real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <MagnetButton 
                  className="text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl shine-on-hover"
                >
                  <span className="flex items-center">
                    Mulai Gratis Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </MagnetButton>
              </Link>
              <Link href="#demo" className="border-2 border-sawit-600 bg-white/70 text-sawit-700 hover:bg-sawit-600 hover:text-white font-medium py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 inline-flex items-center shine-on-hover">
                <span className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Lihat Demo
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-sawit-600 bg-clip-text text-transparent">
                Fitur Lengkap untuk Manajemen Panen Sawit
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengoptimalkan produktivitas kebun sawit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ElectricBorder intensity="medium" className="p-8 text-center tilt-on-hover">
              <div className="bg-gradient-to-br from-sawit-100 to-sawit-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-sawit-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Dashboard Real-time</h3>
              <p className="text-gray-600">
                Pantau statistik panen harian, mingguan, dan bulanan dengan grafik interaktif
              </p>
            </ElectricBorder>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 tilt-on-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Input Data Panen</h3>
                <p className="text-gray-600">
                  Catat hasil panen TBS dengan mudah: tanggal, pekerja, blok lahan, tonase, dan kualitas
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 tilt-on-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Multi-User System</h3>
                <p className="text-gray-600">
                  Kelola tim dengan role berbeda: Admin, Mandor, dan Pekerja dengan akses terbatas
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 tilt-on-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Laporan Otomatis</h3>
                <p className="text-gray-600">
                  Generate laporan harian, mingguan, bulanan dengan export Excel/PDF
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 tilt-on-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Notifikasi Smart</h3>
                <p className="text-gray-600">
                  Reminder panen dan laporan otomatis via email/WhatsApp
                </p>
              </div>
            </div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Analisis Produktivitas</h3>
                <p className="text-gray-600">
                  Analisis performa per pekerja, blok lahan, dan periode waktu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dipercaya Petani & Perusahaan Kebun</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Cerita sukses pengguna yang meningkatkan produktivitas panen dan efisiensi operasional dengan Sawit Harvest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-sawit-100 flex items-center justify-center font-bold text-sawit-700">AR</div>
                <div>
                  <div className="font-semibold text-gray-900">Andi Rahman</div>
                  <div className="text-sm text-gray-500">Pemilik Kebun, Riau</div>
                </div>
              </div>
              <p className="text-gray-700">“Pencatatan panen jadi rapi dan cepat. Laporan otomatis sangat membantu pengambilan keputusan harian.”</p>
              <div className="mt-4 text-sm text-gray-500">Peningkatan efisiensi 27%</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">SR</div>
                <div>
                  <div className="font-semibold text-gray-900">Sari Putri</div>
                  <div className="text-sm text-gray-500">Mandor, Kalimantan</div>
                </div>
              </div>
              <p className="text-gray-700">“Input data pekerja dan blok lahan sangat mudah. Notifikasi reminder panen itu lifesaver!”</p>
              <div className="mt-4 text-sm text-gray-500">Akurasi data naik 35%</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">TM</div>
                <div>
                  <div className="font-semibold text-gray-900">Teguh Mahendra</div>
                  <div className="text-sm text-gray-500">Ops Manager, Sumut</div>
                </div>
              </div>
              <p className="text-gray-700">“Dashboard realtime dan export laporan PDF/Excel mempersingkat rapat mingguan kami.”</p>
              <div className="mt-4 text-sm text-gray-500">Waktu laporan -60%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pilih Paket yang Sesuai Kebutuhan
            </h2>
            <p className="text-xl text-gray-600">
              Mulai gratis, upgrade kapan saja sesuai pertumbuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratis</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  Rp 0<span className="text-lg text-gray-600">/bulan</span>
                </div>
                <p className="text-gray-600 mb-6">Cocok untuk kebun kecil</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>1 kebun sawit</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Max 3 pekerja</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>100 data panen/bulan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Dashboard dasar</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Support email</span>
                </li>
              </ul>
              <Link href="/auth/register" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 w-full text-center block">
                Mulai Gratis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md border-2 border-sawit-500 p-6 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-sawit-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Paling Populer
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  Rp 149rb<span className="text-lg text-gray-600">/bulan</span>
                </div>
                <p className="text-gray-600 mb-6">Untuk kebun menengah</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>3 kebun sawit</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited pekerja</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited data panen</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Export laporan Excel/PDF</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Notifikasi WhatsApp</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Support prioritas</span>
                </li>
              </ul>
              <Link href="/auth/register?plan=pro" className="bg-sawit-600 hover:bg-sawit-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 w-full text-center block">
                Pilih Pro
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bisnis</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  Rp 499rb<span className="text-lg text-gray-600">/bulan</span>
                </div>
                <p className="text-gray-600 mb-6">Untuk perusahaan besar</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited kebun sawit</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited pekerja</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>API untuk integrasi</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Mobile app access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>White-label solution</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Support 24/7</span>
                </li>
              </ul>
              <Link href="/auth/register?plan=business" className="bg-sawit-600 hover:bg-sawit-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 w-full text-center block">
                Pilih Bisnis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-lg text-gray-600">Butuh bantuan? Berikut jawaban cepatnya.</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl border border-gray-200 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                Apakah paket Gratis cukup untuk kebun kecil?
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Ya. Paket Gratis mencakup 1 kebun, 3 pekerja, dan 100 data panen/bulan. Cocok untuk mulai.</p>
            </details>

            <details className="group bg-gray-50 rounded-xl border border-gray-200 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                Bisakah data diekspor ke Excel atau PDF?
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Bisa. Paket Pro dan Bisnis mendukung export laporan Excel dan PDF langsung dari aplikasi.</p>
            </details>

            <details className="group bg-gray-50 rounded-xl border border-gray-200 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                Bagaimana keamanan data saya?
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Data disimpan aman, akses dilindungi autentikasi berbasis token, dan ada kontrol role Admin/Mandor/Pekerja.</p>
            </details>

            <details className="group bg-gray-50 rounded-xl border border-gray-200 p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                Apakah bisa upgrade/downgrade paket kapan saja?
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">Tentu. Anda bisa upgrade/downgrade paket kapan saja sesuai kebutuhan operasional.</p>
            </details>
          </div>

          <div className="text-center mt-10">
            <Link href="/auth/register" className="bg-sawit-600 hover:bg-sawit-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center transition-all duration-300 hover:scale-105">
              Mulai Gratis Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sawit-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Meningkatkan Produktivitas Kebun Sawit?
          </h2>
          <p className="text-xl text-sawit-100 mb-8">
            Bergabunglah dengan ratusan petani sawit yang sudah merasakan manfaat teknologi modern
          </p>
          <Link href="/auth/register" className="bg-white text-sawit-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg hover:shadow-xl">
            Daftar Sekarang - Gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Logo Loop Section */}
      <section className="py-12 bg-gradient-to-r from-sawit-600 via-primary-600 to-blue-600">
        <LogoLoop 
          text="SAWIT HARVEST • PREMIUM QUALITY • INNOVATION • EFFICIENCY"
          className="text-white"
          speed={25}
          copies={8}
          showDivider={false}
          gradientFrom="from-white"
          gradientVia="via-sawit-100"
          gradientTo="to-white"
          fontSize="xl"
        />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-sawit-400 mb-4">🌴 Sawit Harvest</h3>
              <p className="text-gray-400">
                Platform SaaS terdepan untuk manajemen panen sawit di Indonesia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors duration-300">Fitur</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors duration-300">Harga</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors duration-300">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors duration-300">Bantuan</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-300">Kontak</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors duration-300">Dokumentasi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors duration-300">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors duration-300">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sawit Harvest. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
      </div>
    </CustomCursor>
  )
}