import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Total des produits disponibles (en stock par ex.)
    const totalProduits = await prisma.produit.count();

    // Récupérer toutes les commandes avec leurs articles (quantité et prix)
    const commandes = await prisma.commande.findMany({
      select: {
        articles: {
          select: {
            quantite: true,
            prix: true,
          },
        },
      },
    });

    // Calcul des revenus = somme(prix * quantité)
    const totalRevenus = commandes.reduce((acc, commande) => {
      return acc + commande.articles.reduce((sum, article) => sum + article.quantite * article.prix, 0);
    }, 0);

    // Nombre total d'utilisateurs
    const totalUtilisateurs = await prisma.utilisateur.count();

    // Nombre total de commandes
    const totalCommandes = await prisma.commande.count();

    return NextResponse.json([
      {
      totalProduits,
      totalRevenus,
      totalUtilisateurs,
      totalCommandes,
    }
    ]);
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques :", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
