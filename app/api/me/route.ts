import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

function getUserIdFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null
  if (!token) return null
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    return decoded.userId as string
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, company: true, phone: true, role: true, plan: true, createdAt: true }
  })
  if (!user) return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
  return NextResponse.json({ user })
}

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().min(2).optional(),
  phone: z.string().optional()
})

export async function PATCH(request: NextRequest) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const data = updateSchema.parse(body)
    const updated = await prisma.user.update({
      where: { id: userId },
      data
    })
    return NextResponse.json({ message: 'Profil diperbarui', user: {
      id: updated.id, email: updated.email, name: updated.name, company: updated.company, phone: updated.phone, role: updated.role, plan: updated.plan, createdAt: updated.createdAt
    } })
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ error: 'Data tidak valid', details: e.errors }, { status: 400 })
    return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 })
  }
}


