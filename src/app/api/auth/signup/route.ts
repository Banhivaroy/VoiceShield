import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Auto-generate phone if not provided just to satisfy schema for demo
    const phoneToUse = phone || `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const user = await prisma.user.create({
      data: {
        email,
        phone: phoneToUse,
        passwordHash: hashedPassword,
        settings: {
          create: {
            smsAlerts: true,
            liveProtection: true,
            sensitivity: 'BALANCED',
          }
        }
      },
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
