import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const harvestSchema = z.object({
  date: z.string(),
  workerId: z.string(),
  blockId: z.string(),
  tbsCount: z.number().min(1),
  weight: z.number().min(0.1),
  quality: z.enum(['A', 'B', 'C']),
  notes: z.string().optional()
});

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('Token tidak ditemukan');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
  
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  return user;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    const body = await request.json();
    const validatedData = harvestSchema.parse(body);

    // Create harvest record
    const harvest = await prisma.harvest.create({
      data: {
        date: new Date(validatedData.date),
        workerId: validatedData.workerId,
        blockId: validatedData.blockId,
        tbsCount: validatedData.tbsCount,
        weight: validatedData.weight,
        quality: validatedData.quality,
        notes: validatedData.notes || '',
        userId: user.id
      },
      include: {
        worker: true,
        block: true
      }
    });

    return NextResponse.json({
      message: 'Data panen berhasil disimpan',
      harvest
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Harvest creation error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const workerId = searchParams.get('workerId');
    const blockId = searchParams.get('blockId');

    const where: any = {
      userId: user.id
    };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    if (workerId) {
      where.workerId = workerId;
    }

    if (blockId) {
      where.blockId = blockId;
    }

    const harvests = await prisma.harvest.findMany({
      where,
      include: {
        worker: true,
        block: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({ harvests });

  } catch (error) {
    console.error('Harvest fetch error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}