import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {

  const utilisateurs = await prisma.utilisateur.findMany();
  return NextResponse.json(utilisateurs );
   
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, motDePasse } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email requis' }, { status: 400 });
    }

    const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });

    if (!utilisateur) {
      return NextResponse.json({ success: false, message: 'Utilisateur introuvable' }, { status: 404 });
    }

    const hashedPassword = motDePasse ? await bcrypt.hash(motDePasse, 10) : undefined;

    await prisma.utilisateur.update({
      where: { email },
      data: {
        nom,
        motDePasse: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur updateUtilisateur:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

