import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const blockSchema = z.object({
  name: z.string().min(2, 'Nama blok minimal 2 karakter'),
  area: z.number().min(0.1, 'Luas area minimal 0.1 hektar'),
  location: z.string().optional()
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

    const blocks = await prisma.block.findMany({
      where: {
        userId: user.id,
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ blocks })

  } catch (error) {
    console.error('Get blocks error:', error)
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
    const validatedData = blockSchema.parse(body)

    // Check plan limits for FREE users
    if (user.plan === 'FREE') {
      const blockCount = await prisma.block.count({
        where: {
          userId: user.id,
          isActive: true
        }
      })

      if (blockCount >= 1) {
        return NextResponse.json(
          { error: 'Paket Gratis hanya bisa menambah 1 blok lahan. Upgrade ke paket Pro untuk menambah lebih banyak.' },
          { status: 403 }
        )
      }
    }

    const block = await prisma.block.create({
      data: {
        ...validatedData,
        userId: user.id
      }
    })

    return NextResponse.json({
      message: 'Data blok lahan berhasil disimpan',
      block
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create block error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
