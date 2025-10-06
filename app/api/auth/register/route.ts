import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  company: z.string().min(2, 'Nama perusahaan minimal 2 karakter'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  plan: z.enum(['FREE', 'PRO', 'BUSINESS']).default('FREE')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Registration request body:', body)
    
    const validatedData = registerSchema.parse(body)
    console.log('Validated data:', validatedData)

    // Database code
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email sudah terdaftar' },
          { status: 400 }
        )
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 12)

      // Create user
      const user = await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          phone: validatedData.phone,
          password: hashedPassword,
          plan: validatedData.plan,
          role: 'ADMIN'
        },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          phone: true,
          role: true,
          plan: true,
          createdAt: true
        }
      })

      // Create subscription if not FREE
      if (validatedData.plan !== 'FREE') {
        const planAmounts = {
          PRO: 149000,
          BUSINESS: 499000
        }

        await prisma.subscription.create({
          data: {
            userId: user.id,
            plan: validatedData.plan,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            amount: planAmounts[validatedData.plan as keyof typeof planAmounts],
            status: 'ACTIVE'
          }
        })
      }

      console.log('User created in database:', user)

      return NextResponse.json({
        message: 'Registrasi berhasil',
        user
      }, { status: 201 })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error: ' + (dbError instanceof Error ? dbError.message : 'Unknown error') },
        { status: 500 }
      )
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      return NextResponse.json(
        { 
          error: 'Data tidak valid', 
          message: 'Data yang dimasukkan tidak sesuai format yang diminta',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan server', 
        message: 'Terjadi kesalahan saat memproses registrasi. Silakan coba lagi.' 
      },
      { status: 500 }
    )
  }
}
