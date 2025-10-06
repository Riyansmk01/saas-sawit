import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Login request body:', body)
    
    const validatedData = loginSchema.parse(body)
    console.log('Validated login data:', validatedData)

    // Database code
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: validatedData.email },
        include: {
          subscription: true
        }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Email atau password salah' },
          { status: 401 }
        )
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password)

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Email atau password salah' },
          { status: 401 }
        )
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          role: user.role,
          plan: user.plan
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      )

      // Return user data without password
      const { password, ...userWithoutPassword } = user

      console.log('Login successful for:', user.email)

      return NextResponse.json({
        message: 'Login berhasil',
        token,
        user: userWithoutPassword
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error: ' + (dbError instanceof Error ? dbError.message : 'Unknown error') },
        { status: 500 }
      )
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
