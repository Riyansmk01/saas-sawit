'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Info, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'harvest' | 'report' | 'reminder' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    email: true,
    whatsapp: false,
    harvestReminder: true,
    reportReminder: true,
    qualityAlert: true
  });

  useEffect(() => {
    // Simulate fetching notifications from API
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'harvest',
        title: 'Reminder Panen',
        message: 'Waktu panen untuk Blok A sudah tiba. Silakan lakukan panen.',
        timestamp: '2024-01-15T08:00:00Z',
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'report',
        title: 'Laporan Harian',
        message: 'Laporan panen harian untuk tanggal 14 Januari 2024 telah siap.',
        timestamp: '2024-01-14T18:00:00Z',
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'alert',
        title: 'Kualitas Menurun',
        message: 'Kualitas panen di Blok B menurun. Perlu perhatian khusus.',
        timestamp: '2024-01-13T14:30:00Z',
        read: true,
        priority: 'high'
      },
      {
        id: '4',
        type: 'reminder',
        title: 'Pembayaran Langganan',
        message: 'Pembayaran langganan bulanan akan jatuh tempo dalam 3 hari.',
        timestamp: '2024-01-12T10:00:00Z',
        read: true,
        priority: 'medium'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'harvest':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'report':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notifikasi
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </h2>
        <button
          onClick={() => setShowSettings(true)}
          className="btn-secondary flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Pengaturan
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Tandai sebagai dibaca"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Hapus notifikasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Pengaturan Notifikasi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.whatsapp}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Reminder Panen</span>
                <input
                  type="checkbox"
                  checked={settings.harvestReminder}
                  onChange={(e) => setSettings(prev => ({ ...prev, harvestReminder: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Reminder Laporan</span>
                <input
                  type="checkbox"
                  checked={settings.reportReminder}
                  onChange={(e) => setSettings(prev => ({ ...prev, reportReminder: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Alert Kualitas</span>
                <input
                  type="checkbox"
                  checked={settings.qualityAlert}
                  onChange={(e) => setSettings(prev => ({ ...prev, qualityAlert: e.target.checked }))}
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowSettings(false)}
                className="btn-primary flex-1"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="btn-secondary flex-1"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
