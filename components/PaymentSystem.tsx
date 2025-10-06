'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Check, X, AlertCircle, Calendar, DollarSign, Crown, Zap, Building, QrCode, Landmark } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'bank_transfer' | 'ewallet' | 'qris';
  icon: React.ReactNode;
}

export default function PaymentSystem() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratis',
      price: 0,
      period: 'month',
      features: [
        '1 kebun',
        '3 pekerja',
        '100 data panen/bulan',
        'Laporan dasar',
        'Support email'
      ],
      icon: <Check className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 149000,
      period: 'month',
      features: [
        'Unlimited data',
        'Export laporan',
        'Support email',
        'Analisis produktivitas',
        'Notifikasi smart'
      ],
      popular: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'business',
      name: 'Bisnis',
      price: 499000,
      period: 'month',
      features: [
        'Multi kebun',
        'API access',
        'Integrasi mobile app',
        'Support premium',
        'Custom reports'
      ],
      icon: <Building className="w-6 h-6" />
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Kartu Kredit',
      type: 'credit_card',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      type: 'bank_transfer',
      icon: <Landmark className="w-6 h-6" />
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      type: 'ewallet',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 'qris',
      name: 'QRIS (QR Code Indonesia Standard)',
      type: 'qris',
      icon: <QrCode className="w-6 h-6" />
    }
  ];

  const bankOptions = [
    { code: 'BCA', name: 'BCA' },
    { code: 'BRI', name: 'BRI' },
    { code: 'BNI', name: 'BNI' },
    { code: 'MANDIRI', name: 'Mandiri' },
    { code: 'PERMATA', name: 'Permata' },
    { code: 'CIMB', name: 'CIMB Niaga' }
  ] as const

  const [selectedBank, setSelectedBank] = useState<typeof bankOptions[number]['code']>('BCA')
  const [qrisPayload, setQrisPayload] = useState<string | null>(null)
  const [vaInfo, setVaInfo] = useState<{ bank: string; vaNumber: string } | null>(null)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setPaymentStatus('pending');
    
    try {
      // Call payment API
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          method: selectedPaymentMethod,
          amount: plans.find(p => p.id === selectedPlan)?.price || 0,
          bankCode: selectedPaymentMethod === 'bank_transfer' ? selectedBank : undefined
        }),
      });

      if (response.ok) {
        const data = await response.json()
        const instr = data?.payment?.instructions
        if (instr?.type === 'QRIS' && instr.qrString) {
          setQrisPayload(instr.qrString)
        }
        if (instr?.type === 'VIRTUAL_ACCOUNT') {
          setVaInfo({ bank: instr.bank, vaNumber: instr.vaNumber })
        }
        setPaymentStatus('success');
        // Reset selections after successful payment
        setTimeout(() => {
          setSelectedPlan('');
          setSelectedPaymentMethod('');
          setSelectedBank('BCA')
          setQrisPayload(null)
          setVaInfo(null)
          setShowPaymentModal(false);
          setPaymentStatus('pending');
        }, 2000);
      } else {
        const error = await response.json();
        alert(error.message || 'Pembayaran gagal');
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Terjadi kesalahan saat memproses pembayaran');
      setPaymentStatus('failed');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Paket Langganan</h2>
        <p className="text-gray-600">Pilih paket yang sesuai dengan kebutuhan Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card p-6 relative ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Paling Populer
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-gray-600">/{plan.period === 'month' ? 'bulan' : 'tahun'}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full py-2 px-4 rounded-lg font-medium ${
                plan.popular
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.price === 0 ? 'Mulai Gratis' : 'Pilih Paket'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Pembayaran</h3>
            
            {paymentStatus === 'pending' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metode Pembayaran
                  </label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-primary"
                        />
                        {method.icon}
                        <span>{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedPaymentMethod === 'bank_transfer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Bank</label>
                    <select
                      className="input-field"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value as any)}
                    >
                      {bankOptions.map((b) => (
                        <option key={b.code} value={b.code}>{b.name}</option>
                      ))}
                    </select>
                    {vaInfo && (
                      <div className="mt-3 p-3 rounded-lg border bg-gray-50 text-sm">
                        <div className="font-medium text-gray-900">{vaInfo.bank} Virtual Account</div>
                        <div className="font-mono text-lg mt-1">{vaInfo.vaNumber}</div>
                        <div className="text-gray-600 mt-1">Atas Nama: SAWIT HARVEST</div>
                      </div>
                    )}
                  </div>
                )}

                {selectedPaymentMethod === 'qris' && qrisPayload && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">QRIS</label>
                    <div className="p-4 rounded-lg border bg-white">
                      <img
                        alt="QRIS"
                        className="mx-auto"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrisPayload)}`}
                      />
                      <p className="mt-2 text-center text-sm text-gray-600">Scan QR ini dengan aplikasi pembayaran Anda</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handlePayment}
                    className="btn-primary flex-1"
                  >
                    Bayar Sekarang
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pembayaran Berhasil!
                </h3>
                <p className="text-gray-600 mb-4">
                  Langganan Anda telah aktif. Terima kasih!
                </p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStatus('pending');
                  }}
                  className="btn-primary"
                >
                  Tutup
                </button>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pembayaran Gagal
                </h3>
                <p className="text-gray-600 mb-4">
                  Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.
                </p>
                <button
                  onClick={() => {
                    setPaymentStatus('pending');
                  }}
                  className="btn-primary"
                >
                  Coba Lagi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
