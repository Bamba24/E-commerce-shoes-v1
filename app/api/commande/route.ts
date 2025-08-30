import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendOrderConfirmation } from '../../lib/email';
import type { ProduitCommande } from '@/app/types'; // adapte le chemin
import type { Produit } from '../../types';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      utilisateurId,
      utilisateurEmail,
      utilisateurNom,
      produits,
      adresseLivraison,
      ville,
      pays,
      codePostal,
      total,
    } = body;

    // Calcul total sécurisé côté backend
    const totalCalcule = produits.reduce(
      (acc: number, p: Produit) => acc + p.prix * p.quantity,
      0
    );

    // Création de la commande
    const commande = await prisma.commande.create({
      data: {
        utilisateurId,
        total: total ?? totalCalcule,
        adresseLivraison,
        ville,
        pays,
        codePostal,
        articles: {
          create: produits.map((p: Produit) => ({
            produitId: p.id,
            quantite: p.quantity,
            prix: p.prix,
          })),
        },
      },
    });

    // Notification
    await prisma.notification.create({
      data: {
        userId: utilisateurId,
        message: `Nouvelle commande passée avec un total de ${total ?? totalCalcule} FCFA`,
      },
    });

    // Résumé de commande
    await prisma.resumeCommande.create({
      data: {
        idCommande: commande.id,
        nomUtilisateur: utilisateurNom,
        email: utilisateurEmail,
        adresse: adresseLivraison,
        lieuLivraison: `${ville}, ${pays}`,
        produit: produits.map((p: Produit) => `${p.nom} x${p.quantity}`).join(', '),
        quantite: produits.reduce((acc: number, p: Produit) => acc + p.quantity, 0),
        total: total ?? totalCalcule,
        date: new Date(),
      },
    });

    // Statistiques globales
    const totalUtilisateurs = await prisma.utilisateur.count();
    const totalCommandes = await prisma.commande.count();

    // ✅ Nombre total d'articles (somme des quantités)
    const totalProduits = await prisma.articleCommande.aggregate({
      _sum: {
        quantite: true,
      },
    }).then(res => res._sum.quantite || 0);

    // ✅ Total revenus (somme de quantité * prix de tous les articles)
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

    const totalRevenus = commandes.reduce((acc, commande) => {
      return acc + commande.articles.reduce((sum, article) => sum + article.quantite * article.prix, 0);
    }, 0);

    // Enregistrer dans les statistiques
    await prisma.statistiques.create({
      data: {
        totalUtilisateurs,
        totalCommandes,
        totalProduits,
        totalRevenus,
      },
    });

    // Après création commande réussie :
    await sendOrderConfirmation({
      to: utilisateurEmail,
      name: utilisateurNom,
      produits: produits.map((p: ProduitCommande) => `${p.nom} x ${p.quantity}`).join(', '),
      total: total ?? totalCalcule,
    });

    return NextResponse.json({ success: true, commandeId: commande.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}


export async function GET() {

  const commandes = await prisma.resumeCommande.findMany();
  return NextResponse.json(commandes);
   
}

