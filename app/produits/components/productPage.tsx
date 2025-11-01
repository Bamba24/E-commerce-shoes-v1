"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "mui-sonner";
import type { Produit } from "@/app/types";
import { ProduitsUser } from "@/app/services/produits";
import "../../globals.css";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Produit | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Produit[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Produit[] = await ProduitsUser();

        if (typeof params.slug !== "string") {
          console.error("Slug manquant dans les paramètres");
          return;
        }

        const found = data.find((item) => item.slug === params.slug);
        setProduct(found || null);

        if (found) {
          const similars = data.filter(
            (item) =>
              item.categorie.toLowerCase() === found.categorie.toLowerCase() &&
              item.slug !== found.slug
          );
          setSimilarProducts(similars);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const AjoutPanier = () => {
    if (!product) return;

    const ancienPanier = JSON.parse(localStorage.getItem("panier") || "[]");
    const produitIndex = ancienPanier.findIndex(
      (item: Produit) => item.id === product.id
    );

    if (produitIndex !== -1) {
      ancienPanier[produitIndex].quantity += 1;
    } else {
      ancienPanier.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("panier", JSON.stringify(ancienPanier));
    window.dispatchEvent(new Event("panierUpdated"));
    toast.success("Produit ajouté au panier !");
  };

  if (!product)
    return <h2 className="p-8 text-center">Produit introuvable</h2>;

  const primaryImageUrl = product.images || "/placeholder.jpg";

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      {/* SECTION HAUT - IMAGE + INFOS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Image principale */}
        <div className="col-span-12 md:col-span-7 flex flex-col items-center">
          <div
            className="w-full h-[400px] md:h-[550px] rounded-xl bg-cover bg-center bg-no-repeat shadow-md border"
            style={{
              backgroundImage: `url('${primaryImageUrl}')`,
            }}
          ></div>

          {/* (Optionnel) miniatures */}
          {/* 
          <div className="flex gap-3 mt-4">
            {product.imagesSecondaires?.map((img, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-md bg-cover bg-center border cursor-pointer hover:opacity-80"
                style={{ backgroundImage: `url('${img}')` }}
              ></div>
            ))}
          </div>
          */}
        </div>

        {/* Détails produit */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {product.nom}
            </h2>
            <p className="text-2xl font-semibold text-[var(--primary-color)]">
              {product.prix} Fcfa
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ★ ★ ★ ★ ☆ ({product.nombreAvis ?? 32} avis)
            </p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            {product.description}
          </p>

          <ul className="text-sm text-gray-600 space-y-1">
            <li>Livraison rapide</li>
            <li>Retour gratuit sous 7 jours</li>
            <li>Disponible en plusieurs tailles et couleurs</li>
          </ul>

          {/* Boutons */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={AjoutPanier}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all font-semibold"
            >
              Ajouter au panier
            </button>
            <Link href="/panier">
              <button className="border border-black px-6 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold w-full">
                Voir le panier
              </button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Livraison offerte dès 20 000 Fcfa d&apos;achat
          </p>
        </div>
      </div>

      {/* SECTION BAS - PRODUITS SIMILAIRES */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-bold mb-6">
            Produits similaires
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.slice(0, 4).map((prod, idx) => {
              const imageUrl =
                typeof prod.images === "string"
                  ? prod.images
                  : Array.isArray(prod.images)
                  ? prod.images[0]
                  : "/placeholder.jpg";

              return (
                <Link
                  href={`/produits/${prod.slug}`}
                  key={idx}
                  className="relative rounded-xl overflow-hidden group shadow-md bg-white"
                >
                  {/* Image produit */}
                  <div
                    className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${imageUrl}')`,
                    }}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl"></div>

                  {/* Badge remise */}
                  {prod.remise > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow">
                      -{prod.remise}%
                    </div>
                  )}

                  {/* Infos produit */}
                  <div className="absolute bottom-0 z-10 p-4 text-white">
                    <p className="truncate font-semibold text-base drop-shadow-md">
                      {prod.nom}
                    </p>
                    <p className="text-sm font-bold mt-1">
                      {prod.ancienPrix && (
                        <span className="line-through text-gray-300 mr-2 font-normal">
                          {prod.ancienPrix}
                        </span>
                      )}
                      {prod.prix} Fcfa
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
