import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const tokenHeader = req.headers.get('authorization')?.split(' ')[1]; // Récupère le token du header

  if (!tokenHeader) {
    return NextResponse.json({ success: false, message: 'Token non fourni' }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, message: 'Secret JWT manquant' }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(tokenHeader, secret);
    return NextResponse.json({ success: true, decoded });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Token invalide' }, { status: 401 });
  }
}
