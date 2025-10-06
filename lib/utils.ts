import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('id-ID').format(number)
}

export function formatTonnage(tonnage: number) {
  return `${formatNumber(tonnage)} ton`
}

export function calculateProductivity(tbs: number, tonnage: number) {
  if (tonnage === 0) return 0
  return Number((tbs / tonnage).toFixed(2))
}

// Centralized authenticated fetch helper
export async function apiFetch<T = any>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const headers = new Headers(init.headers || {})
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(input, { ...init, headers })
  if (!res.ok) {
    let message = 'Permintaan gagal'
    try {
      const data = await res.json()
      message = data.error || data.message || message
    } catch {}
    throw new Error(message)
  }
  // Try parse JSON; allow empty
  try {
    return (await res.json()) as T
  } catch {
    return undefined as unknown as T
  }
}

export function getQualityColor(quality: 'A' | 'B' | 'C') {
  switch (quality) {
    case 'A':
      return 'bg-green-100 text-green-800'
    case 'B':
      return 'bg-yellow-100 text-yellow-800'
    case 'C':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getPlanLimits(plan: 'FREE' | 'PRO' | 'BUSINESS') {
  switch (plan) {
    case 'FREE':
      return {
        blocks: 1,
        workers: 3,
        harvestsPerMonth: 100,
        features: ['Basic dashboard', 'Email support']
      }
    case 'PRO':
      return {
        blocks: 3,
        workers: -1, // unlimited
        harvestsPerMonth: -1, // unlimited
        features: ['Export reports', 'WhatsApp notifications', 'Priority support']
      }
    case 'BUSINESS':
      return {
        blocks: -1, // unlimited
        workers: -1, // unlimited
        harvestsPerMonth: -1, // unlimited
        features: ['API access', 'Mobile app', 'White-label', '24/7 support']
      }
    default:
      return {
        blocks: 1,
        workers: 3,
        harvestsPerMonth: 100,
        features: []
      }
  }
}