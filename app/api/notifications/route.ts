// /api/notifications/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Erreur récupération notifications :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
