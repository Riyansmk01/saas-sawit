import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const paymentSchema = z.object({
  plan: z.enum(['free', 'pro', 'business']),
  method: z.string(),
  amount: z.number().min(0)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    // Get user from token (in real implementation, extract from JWT)
    const userId = '1'; // This should come from JWT token

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: userId,
        plan: validatedData.plan.toUpperCase() as 'FREE' | 'PRO' | 'BUSINESS',
        amount: validatedData.amount,
        method: validatedData.method,
        status: 'PENDING',
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });

    // In real implementation, integrate with payment gateway (Midtrans, Xendit, etc.)
    // For now, simulate successful payment
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update payment status to success
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'SUCCESS' }
    });

    // Create or update subscription
    const planAmounts = {
      FREE: 0,
      PRO: 149000,
      BUSINESS: 499000
    };

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    await prisma.subscription.upsert({
      where: { userId: userId },
      update: {
        plan: validatedData.plan.toUpperCase() as 'FREE' | 'PRO' | 'BUSINESS',
        startDate: new Date(),
        endDate: endDate,
        amount: planAmounts[validatedData.plan.toUpperCase() as keyof typeof planAmounts],
        status: 'ACTIVE'
      },
      create: {
        userId: userId,
        plan: validatedData.plan.toUpperCase() as 'FREE' | 'PRO' | 'BUSINESS',
        startDate: new Date(),
        endDate: endDate,
        amount: planAmounts[validatedData.plan.toUpperCase() as keyof typeof planAmounts],
        status: 'ACTIVE'
      }
    });

    return NextResponse.json({
      message: 'Pembayaran berhasil diproses',
      payment: {
        id: payment.id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        plan: payment.plan,
        status: 'SUCCESS'
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses pembayaran' },
      { status: 500 }
    );
  }
}
