import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('devpassword', 10);

  // Create test user
  const user = await prisma.user.upsert({
    where: { phone: '+91 98201 12345' },
    update: {
      passwordHash: hashedPassword,
    },
    create: {
      phone: '+91 98201 12345',
      email: 'yachna.s@shieldmail.com',
      passwordHash: hashedPassword,
      role: 'USER',
      language: 'en',
      settings: {
        create: {
          smsAlerts: true,
          liveProtection: true,
          sensitivity: 'BALANCED',
        },
      },
    },
  });

  console.log('Created user:', user.id);

  // Clear existing calls
  await prisma.call.deleteMany();

  // Seed some recent calls
  await prisma.call.createMany({
    data: [
      {
        userId: user.id,
        source: 'LIVE',
        maskedNumber: '+44 7700 900123',
        durationSec: 45,
        language: 'English',
        verdict: 'AI_MADE',
        aiProbability: 0.98,
        modelVersion: 'Neural Engine v4.2.0',
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      },
      {
        userId: user.id,
        source: 'LIVE',
        maskedNumber: '+1 555-0198',
        durationSec: 12,
        language: 'English',
        verdict: 'REAL',
        aiProbability: 0.05,
        modelVersion: 'Neural Engine v4.2.0',
        createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
      },
      {
        userId: user.id,
        source: 'LIVE',
        maskedNumber: '+91 98765 43210',
        durationSec: 120,
        language: 'Hindi',
        verdict: 'REAL',
        aiProbability: 0.02,
        modelVersion: 'Neural Engine v4.2.0',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
