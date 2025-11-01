// api/produits/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from '@/app/lib/cloudinary'; // Assurez-vous que ce chemin est correct

const prisma = new PrismaClient();

// Fonction GET inchangée
export async function GET() {
    const produits = await prisma.produit.findMany();
    return NextResponse.json(produits);
}

// Fonction DELETE inchangée
export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const id = body.id;

        if (!id) {
            return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
        }

        const produit = await prisma.produit.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, produit });
    } catch (error) {
        console.error('Erreur suppression produit :', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

// ----------------------------------------------------------------------
// CORRECTION DE LA FONCTION POST POUR GÉRER L'UPLOAD CLOUDINARY
// ----------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Lire le FormData
    const formData = await req.formData();

    // 2️⃣ Extraire les champs texte
    const nom = formData.get("nom") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const prix = formData.get("prix") as string;
    const ancienPrix = formData.get("ancienPrix") as string | null;
    const remise = formData.get("remise") as string | null;
    const genre = formData.get("genre") as string;
    const categorie = formData.get("categorie") as string;
    const marque = formData.get("marque") as string;
    const pointuresDisponibles = formData.get("pointuresDisponibles") as string;
    const couleursDisponibles = formData.get("couleursDisponibles") as string;
    const stock = formData.get("stock") as string | null;
    const note = formData.get("note") as string | null;
    const nombreAvis = formData.get("nombreAvis") as string | null;

    // 3️⃣ Récupérer le fichier image
    const imageFile = formData.get("image") as File | null;
    if (!imageFile) {
      return NextResponse.json({ message: "Image requise" }, { status: 400 });
    }

    // 4️⃣ Conversion de l’image → Base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataUri = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

    // 5️⃣ Upload sur Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: "produits-ecommerce",
    });

    const imageUrl = uploadResponse.secure_url;

    // 6️⃣ Création du produit dans Prisma
    const newProduct = await prisma.produit.create({
      data: {
        nom,
        slug,
        description,
        prix: parseFloat(prix),
        ancienPrix: parseFloat(ancienPrix || "0"),
        remise: parseInt(remise || "0"),
        genre,
        categorie,
        marque,
        pointuresDisponibles,
        couleursDisponibles,
        images: imageUrl, // ✅ URL Cloudinary
        stock: parseInt(stock || "0"),
        note: parseFloat(note || "0"),
        nombreAvis: parseInt(nombreAvis || "0"),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Erreur ajout produit :", error);
    return NextResponse.json(
      { message: "Erreur serveur ou Cloudinary" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const existingProduit = await prisma.produit.findUnique({ where: { id } });
    if (!existingProduit) {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    }

    // Champs texte
    const nom = formData.get("nom") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const prix = formData.get("prix") as string;
    const ancienPrix = formData.get("ancienPrix") as string | null;
    const remise = formData.get("remise") as string | null;
    const genre = formData.get("genre") as string;
    const categorie = formData.get("categorie") as string;
    const marque = formData.get("marque") as string;
    const pointuresDisponibles = formData.get("pointuresDisponibles") as string;
    const couleursDisponibles = formData.get("couleursDisponibles") as string;
    const stock = formData.get("stock") as string | null;
    const note = formData.get("note") as string | null;
    const nombreAvis = formData.get("nombreAvis") as string | null;

    // Image optionnelle
    const imageFile = formData.get("image") as File | null;
    let imageUrl = existingProduit.images;

    if (imageFile && imageFile.size > 0) {
      // Convertir et uploader vers Cloudinary
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dataUri = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        folder: "produits-ecommerce",
      });

      imageUrl = uploadResponse.secure_url;
    }

    // Mise à jour Prisma
    const updatedProduit = await prisma.produit.update({
      where: { id },
      data: {
        nom,
        slug,
        description,
        prix: parseFloat(prix),
        ancienPrix: parseFloat(ancienPrix || "0"),
        remise: parseInt(remise || "0"),
        genre,
        categorie,
        marque,
        pointuresDisponibles,
        couleursDisponibles,
        images: imageUrl,
        stock: parseInt(stock || "0"),
        note: parseFloat(note || "0"),
        nombreAvis: parseInt(nombreAvis || "0"),
      },
    });

    return NextResponse.json({ success: true, produit: updatedProduit });
  } catch (error) {
    console.error("Erreur mise à jour produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}