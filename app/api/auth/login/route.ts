import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import Bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST (req: NextRequest){
  try {
     const body = await req.json();
     const {email, password} = body;

     const user = await prisma.utilisateur.findUnique({
        where: {email}
     })


     if(user && Bcrypt.compareSync(password, user.motDePasse)){

          const token = jwt.sign(
              {id: user.id, email: user.email, role: user.role, nom: user.nom},
              process.env.JWT_SECRET as string,
              {expiresIn: "1h"} 
          )

        return NextResponse.json({
               token,
               user: {
                  id: user.id,
                  email: user.email,
                  nom: user.nom,
                  role: user.role,
               },
               }, { status: 200 });


     } else{

        return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
     }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
 }
