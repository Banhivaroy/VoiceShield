import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  return userId || null;
}

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user, settings: user.settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, language, smsAlerts, liveProtection, dialect } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        language: dialect || language,
        settings: {
          upsert: {
            create: {
              smsAlerts: smsAlerts ?? false,
              liveProtection: liveProtection ?? false,
              sensitivity: 'BALANCED',
            },
            update: {
              smsAlerts: smsAlerts ?? undefined,
              liveProtection: liveProtection ?? undefined,
            },
          },
        },
      },
      include: { settings: true },
    });

    return NextResponse.json({ user, settings: user.settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
