import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const paymentSchema = z.object({
  plan: z.enum(['free', 'pro', 'business']),
  method: z.enum(['bank_transfer', 'qris', 'credit_card', 'ewallet']).default('bank_transfer'),
  amount: z.number().min(0),
  bankCode: z.enum(['BCA', 'BRI', 'BNI', 'MANDIRI', 'PERMATA', 'CIMB']).optional()
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
    const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    let bankCode: string | null = null
    let vaNumber: string | null = null
    let qrString: string | null = null

    if (validatedData.method === 'bank_transfer') {
      const bank = validatedData.bankCode || 'BCA'
      const prefixes: Record<string, string> = {
        BCA: '3901', BRI: '2627', BNI: '9880', MANDIRI: '8950', PERMATA: '8758', CIMB: '8059'
      }
      bankCode = bank
      vaNumber = `${prefixes[bank]}${Math.floor(100000000 + Math.random()*900000000)}`
    }
    if (validatedData.method === 'qris') {
      qrString = `QRIS|${txnId}|AMT:${validatedData.amount}|TS:${Date.now()}`
    }

    const payment = await prisma.payment.create({
      data: {
        userId: userId,
        plan: validatedData.plan.toUpperCase() as 'FREE' | 'PRO' | 'BUSINESS',
        amount: validatedData.amount,
        method: validatedData.method,
        bankCode: bankCode || undefined,
        vaNumber: vaNumber || undefined,
        qrString: qrString || undefined,
        status: 'PENDING',
        transactionId: txnId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
      }
    });

    // Simulate payment instructions for bank transfer and QRIS
    let responsePayload: any = {
      id: payment.id,
      transactionId: payment.transactionId,
      amount: payment.amount,
      plan: payment.plan,
      method: validatedData.method
    }

    if (validatedData.method === 'bank_transfer') {
      const bank = validatedData.bankCode || 'BCA'
      const prefixes: Record<string, string> = {
        BCA: '3901', BRI: '2627', BNI: '9880', MANDIRI: '8950', PERMATA: '8758', CIMB: '8059'
      }
      const vaNumber = `${prefixes[bank]}${Math.floor(100000000 + Math.random()*900000000)}`
      responsePayload.instructions = {
        type: 'VIRTUAL_ACCOUNT',
        bank,
        vaNumber,
        accountName: 'SAWIT HARVEST'
      }
    }

    if (validatedData.method === 'qris') {
      const qrString = `QRIS|${payment.transactionId}|AMT:${validatedData.amount}|TS:${Date.now()}`
      responsePayload.instructions = {
        type: 'QRIS',
        qrString
      }
    }

    // In real implementation, hand off to gateway and wait for callback/redirect
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Update payment status to success
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'SUCCESS', paidAt: new Date() }
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
        ...responsePayload,
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
