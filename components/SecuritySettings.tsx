'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Key, User, Mail, Phone, MapPin, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecuritySettings {
  twoFactorAuth: boolean;
  emailNotifications: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileForm, setProfileForm] = useState({
    name: 'Ahmad Mandor',
    email: 'ahmad@kebun.com',
    phone: '+6281234567890',
    address: 'Jl. Sawit No. 123, Medan',
    joinDate: '2024-01-15'
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword) {
      alert('Masukkan password saat ini');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak sama');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Password minimal 8 karakter');
      return;
    }

    // Check if new password is different from current
    if (passwordForm.currentPassword === passwordForm.newPassword) {
      alert('Password baru harus berbeda dengan password saat ini');
      return;
    }

    try {
      // Call API to change password
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }),
      });

      if (response.ok) {
        alert('Password berhasil diubah!');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const error = await response.json();
        alert(error.message || 'Gagal mengubah password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Terjadi kesalahan saat mengubah password');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would call your API to update profile
      console.log('Updating profile:', profileForm);
      alert('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Terjadi kesalahan saat memperbarui profil');
    }
  };

  const handleSettingChange = (key: keyof SecuritySettings, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Pengaturan Keamanan</h2>
      </div>

      {/* Profile Information */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Informasi Profil
        </h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
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
                value={profileForm.phone}
                onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Perbarui Profil
          </button>
        </form>
      </div>

      {/* Password Change */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Ubah Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="input-field pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Ubah Password
          </button>
        </form>
      </div>

      {/* Security Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Pengaturan Keamanan
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra dengan 2FA</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Notifikasi Email</h4>
              <p className="text-sm text-gray-600">Terima notifikasi keamanan via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Alert Login</h4>
              <p className="text-sm text-gray-600">Dapatkan notifikasi saat ada login baru</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Session Timeout (menit)</h4>
              <p className="text-sm text-gray-600">Waktu maksimal sesi aktif</p>
            </div>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="input-field w-20"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={120}>120</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Password Expiry (hari)</h4>
              <p className="text-sm text-gray-600">Berapa hari password berlaku</p>
            </div>
            <select
              value={settings.passwordExpiry}
              onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
              className="input-field w-20"
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
              <option value={180}>180</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Status Keamanan
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Password kuat (8+ karakter)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Email terverifikasi</span>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700">Two-Factor Authentication belum aktif</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Login terakhir: 2 jam lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
