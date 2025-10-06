'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Info, X, Settings, Clock, User, MapPin, TrendingUp, TrendingDown } from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'harvest' | 'report' | 'reminder' | 'alert' | 'insight' | 'achievement' | 'weather';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'productivity' | 'quality' | 'safety' | 'maintenance' | 'weather' | 'market';
  actionable: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    worker?: string;
    block?: string;
    value?: number;
    trend?: 'up' | 'down' | 'stable';
  };
}

interface NotificationSettings {
  email: boolean;
  whatsapp: boolean;
  push: boolean;
  harvestReminder: boolean;
  reportReminder: boolean;
  qualityAlert: boolean;
  productivityInsight: boolean;
  weatherAlert: boolean;
  marketUpdate: boolean;
  maintenanceReminder: boolean;
  safetyAlert: boolean;
}

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    whatsapp: false,
    push: true,
    harvestReminder: true,
    reportReminder: true,
    qualityAlert: true,
    productivityInsight: true,
    weatherAlert: true,
    marketUpdate: false,
    maintenanceReminder: true,
    safetyAlert: true
  });

  useEffect(() => {
    // Simulate fetching smart notifications from API
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'harvest',
        title: 'Waktu Panen Optimal',
        message: 'Kondisi cuaca ideal untuk panen di Blok A. Efisiensi diperkirakan meningkat 15%.',
        timestamp: '2024-01-15T08:00:00Z',
        read: false,
        priority: 'high',
        category: 'productivity',
        actionable: true,
        actionUrl: '/dashboard/harvest',
        actionText: 'Mulai Panen',
        metadata: {
          block: 'Blok A',
          value: 15,
          trend: 'up'
        }
      },
      {
        id: '2',
        type: 'insight',
        title: 'Insight Produktivitas',
        message: 'Pekerja Ahmad menunjukkan peningkatan efisiensi 12% minggu ini. Pertimbangkan untuk memberikan reward.',
        timestamp: '2024-01-15T07:30:00Z',
        read: false,
        priority: 'medium',
        category: 'productivity',
        actionable: true,
        actionUrl: '/dashboard/users',
        actionText: 'Lihat Detail',
        metadata: {
          worker: 'Ahmad',
          value: 12,
          trend: 'up'
        }
      },
      {
        id: '3',
        type: 'alert',
        title: 'Kualitas Menurun',
        message: 'Kualitas buah di Blok B menurun 8% dari target. Perlu perhatian khusus pada perawatan.',
        timestamp: '2024-01-15T06:45:00Z',
        read: false,
        priority: 'urgent',
        category: 'quality',
        actionable: true,
        actionUrl: '/dashboard/blocks',
        actionText: 'Periksa Blok',
        metadata: {
          block: 'Blok B',
          value: 8,
          trend: 'down'
        }
      },
      {
        id: '4',
        type: 'weather',
        title: 'Peringatan Cuaca',
        message: 'Hujan lebat diperkirakan dalam 2 jam. Segera lakukan panen atau lindungi hasil panen.',
        timestamp: '2024-01-15T06:00:00Z',
        read: true,
        priority: 'urgent',
        category: 'weather',
        actionable: true,
        actionUrl: '/dashboard/harvest',
        actionText: 'Aksi Cepat'
      },
      {
        id: '5',
        type: 'achievement',
        title: 'Target Bulanan Tercapai',
        message: 'Selamat! Target produksi bulanan telah tercapai 3 hari lebih cepat dari jadwal.',
        timestamp: '2024-01-14T18:00:00Z',
        read: true,
        priority: 'medium',
        category: 'productivity',
        actionable: false,
        metadata: {
          value: 3,
          trend: 'up'
        }
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
      case 'insight':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-300 bg-red-100';
      case 'high':
        return 'border-orange-200 bg-orange-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity':
        return 'text-green-600 bg-green-100';
      case 'quality':
        return 'text-blue-600 bg-blue-100';
      case 'safety':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      case 'weather':
        return 'text-cyan-600 bg-cyan-100';
      case 'market':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
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

  const handleAction = (notification: SmartNotification) => {
    if (notification.actionable && notification.actionUrl) {
      // Here you would navigate to the action URL
      console.log('Navigating to:', notification.actionUrl);
      markAsRead(notification.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Smart Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
          {urgentCount > 0 && (
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 animate-pulse">
              {urgentCount} URGENT
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

      {/* Notification Categories */}
      <div className="flex flex-wrap gap-2">
        {['productivity', 'quality', 'safety', 'maintenance', 'weather', 'market'].map((category) => (
          <span
            key={category}
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        ))}
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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notification.category)}`}>
                      {notification.category}
                    </span>
                    {notification.priority === 'urgent' && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{notification.message}</p>
                  
                  {/* Metadata */}
                  {notification.metadata && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      {notification.metadata.worker && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {notification.metadata.worker}
                        </div>
                      )}
                      {notification.metadata.block && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {notification.metadata.block}
                        </div>
                      )}
                      {notification.metadata.value && (
                        <div className="flex items-center gap-1">
                          {notification.metadata.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : notification.metadata.trend === 'down' ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          ) : (
                            <Info className="w-3 h-3 text-blue-500" />
                          )}
                          {notification.metadata.value}%
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(notification.timestamp).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                {notification.actionable && (
                  <button
                    onClick={() => handleAction(notification)}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
                  >
                    {notification.actionText || 'Aksi'}
                  </button>
                )}
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
            <h3 className="text-lg font-semibold mb-4">Pengaturan Smart Notifications</h3>
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
                <span>Push Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.push}
                  onChange={(e) => setSettings(prev => ({ ...prev, push: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Harvest Reminder</span>
                <input
                  type="checkbox"
                  checked={settings.harvestReminder}
                  onChange={(e) => setSettings(prev => ({ ...prev, harvestReminder: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Quality Alert</span>
                <input
                  type="checkbox"
                  checked={settings.qualityAlert}
                  onChange={(e) => setSettings(prev => ({ ...prev, qualityAlert: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Productivity Insight</span>
                <input
                  type="checkbox"
                  checked={settings.productivityInsight}
                  onChange={(e) => setSettings(prev => ({ ...prev, productivityInsight: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Weather Alert</span>
                <input
                  type="checkbox"
                  checked={settings.weatherAlert}
                  onChange={(e) => setSettings(prev => ({ ...prev, weatherAlert: e.target.checked }))}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Safety Alert</span>
                <input
                  type="checkbox"
                  checked={settings.safetyAlert}
                  onChange={(e) => setSettings(prev => ({ ...prev, safetyAlert: e.target.checked }))}
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
