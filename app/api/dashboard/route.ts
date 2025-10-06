import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

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

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    // Get dashboard statistics
    const [
      totalHarvests,
      totalWorkers,
      totalBlocks,
      todayHarvests,
      recentHarvests,
      monthlyData
    ] = await Promise.all([
      // Total harvests count
      prisma.harvest.count({
        where: { userId: user.id }
      }),
      
      // Total active workers
      prisma.worker.count({
        where: { 
          userId: user.id,
          isActive: true 
        }
      }),
      
      // Total active blocks
      prisma.block.count({
        where: { 
          userId: user.id,
          isActive: true 
        }
      }),
      
      // Today's harvests
      prisma.harvest.findMany({
        where: {
          userId: user.id,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999))
          }
        },
        include: {
          worker: true,
          block: true
        }
      }),
      
      // Recent harvests (last 5)
      prisma.harvest.findMany({
        where: { userId: user.id },
        include: {
          worker: true,
          block: true
        },
        orderBy: { date: 'desc' },
        take: 5
      }),
      
      // Monthly harvest data for charts
      prisma.harvest.groupBy({
        by: ['date'],
        where: {
          userId: user.id,
          date: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        },
        _sum: {
          tbsCount: true,
          weight: true
        },
        orderBy: { date: 'asc' }
      })
    ]);

    // Calculate today's total harvest
    const todayHarvest = todayHarvests.reduce((sum, harvest) => sum + harvest.tbsCount, 0);

    // Format monthly data for charts
    const chartData = monthlyData.map(item => ({
      date: item.date.toISOString().split('T')[0],
      tbs: item._sum.tbsCount || 0,
      weight: item._sum.weight || 0
    }));

    const stats = {
      totalHarvest: totalHarvests,
      totalWorkers,
      totalBlocks,
      todayHarvest
    };

    return NextResponse.json({
      stats,
      recentHarvests,
      chartData
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
