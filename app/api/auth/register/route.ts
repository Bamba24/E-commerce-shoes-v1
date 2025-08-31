import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import Bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export async function POST( req: NextRequest){
   try {
       const body = await req.json();
       const {nom, email, password} = body;

       const halt = Bcrypt.genSaltSync(10);
       const hashPassword = Bcrypt.hashSync(password, halt);

       const newUtilisateur = await prisma.utilisateur.create({
        data: {
          nom,
          email,
          motDePasse: hashPassword
        }
       })

  return  NextResponse.json({utilisateur: newUtilisateur}, {status: 200});

   } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
   }
}
