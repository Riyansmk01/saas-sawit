import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const workerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().optional(),
  address: z.string().optional()
})

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw new Error('Token tidak ditemukan')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
  
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId }
  })

  if (!user) {
    throw new Error('User tidak ditemukan')
  }

  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)

    const workers = await prisma.worker.findMany({
      where: {
        userId: user.id,
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ workers })

  } catch (error) {
    console.error('Get workers error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    const body = await request.json()
    const validatedData = workerSchema.parse(body)

    // Check plan limits for FREE users
    if (user.plan === 'FREE') {
      const workerCount = await prisma.worker.count({
        where: {
          userId: user.id,
          isActive: true
        }
      })

      if (workerCount >= 3) {
        return NextResponse.json(
          { error: 'Paket Gratis hanya bisa menambah maksimal 3 pekerja. Upgrade ke paket Pro untuk menambah lebih banyak.' },
          { status: 403 }
        )
      }
    }

    const worker = await prisma.worker.create({
      data: {
        ...validatedData,
        userId: user.id
      }
    })

    return NextResponse.json({
      message: 'Data pekerja berhasil disimpan',
      worker
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create worker error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
