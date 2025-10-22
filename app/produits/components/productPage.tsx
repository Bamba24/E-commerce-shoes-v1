'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'mui-sonner';
import type { Produit } from '@/app/types/index';
import {ProduitsUser} from '@/app/services/produits';

import '../../globals.css';

export default function ProductPage({ params }: {params: {slug: string}}) {

  const [product, setProduct] = useState<Produit | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Produit[]>([]);
  console.log('Slug param:', params.slug)


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Produit[] = await ProduitsUser();
        console.log(data)

        if (typeof params.slug !== 'string') {
          console.error("Slug manquant dans les paramètres");
          return;
        }

        const found = data.find((item) => item.slug === params.slug);
        console.log("fond existe", found)
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
    console.log(product)

    const ancienPanier = JSON.parse(localStorage.getItem('panier') || '[]');
    const produitIndex = ancienPanier.findIndex((item: Produit) => item.id === product.id);

    if (produitIndex !== -1) {
      ancienPanier[produitIndex].quantity += 1;
    } else {
      ancienPanier.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('panier', JSON.stringify(ancienPanier));
    window.dispatchEvent(new Event('panierUpdated'));
    toast.success('Produit ajouté');
  };

  console.log(product)
  if (!product) return <h2 className="p-8 text-center">Produit introuvable</h2>;

  const imagesArray = product.images.split(',');

  return (
    <div className="p-8">
      {/* Top Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Gallery */}
        <div className="col-span-12 md:col-span-7 grid grid-cols-4 gap-2">
          {imagesArray.length > 1 && (
            <div className="col-span-1 flex flex-col gap-2">
              {imagesArray.slice(1, 4).map((img, idx) => (
                <div
                  key={idx}
                  style={{ backgroundImage: `url('/${img}')` }}
                  className="h-[33%] rounded-lg bg-no-repeat bg-cover bg-center border-1"
                ></div>
              ))}
            </div>
          )}
          <div className="col-span-3">
            <div
              className="h-full aspect-square rounded-lg bg-no-repeat bg-cover bg-center border-1"
              style={{ backgroundImage: `url('/${imagesArray[0]}')` }}
            ></div>
          </div>
        </div>

        {/* Infos produit */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-8 text-center">
          <div className="flex flex-col gap-2">
            <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">{product.nom}</h2>
            <p className="text-2xl font-semibold text-[var(--primary-color)]">{product.prix} Fcfa</p>
            <p className="text-sm text-gray-500">★ ★ ★ ★ ☆ ({product.nombreAvis ?? 32} avis)</p>
            <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
          </div>

          <ul className="text-sm text-gray-600 text-center">
            <li>Livraison rapide</li>
            <li>Retour gratuit</li>
            <li>Disponible en plusieurs tailles et couleurs</li>
          </ul>

          {/* Add to cart */}
          <div className="flex flex-col gap-4">
            <button
              onClick={AjoutPanier}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all"
            >
              Ajouter au panier
            </button>
            <Link href="/panier">
              <button className="border w-full border-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all font-bold">
                Voir panier
              </button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-2">Livraison offerte dès 20000 fcfa d&apos;achat</p>
        </div>
      </div>


      {/* Similar Products */}
      <div className="mt-12">
        <h3 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-6">Produits similaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {similarProducts
        .slice(0, 4)
        .map((prod, idx) => {
          const imgs = prod.images?.split(',') || [];
          return (
            <Link
              href={`/produits/${prod.slug}`}
              key={idx}
              className="relative rounded-xl overflow-hidden group shadow-md"
            >
              {/* Image avec effet zoom */}
              <div
                className="h-80 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url('/${imgs[idx]}')` }}
              ></div>

              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl"></div>

              {/* Badge de remise */}
              {prod.remise > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow">
                  -{prod.remise}%
                </div>
              )}

              {/* Infos produit */}
              <div className="absolute bottom-0 z-10 p-4 text-white">
                <p className="[font-size:var(--police-title-card-primary)] truncate font-semibold drop-shadow-md">
                  {prod.nom}
                </p>
                <p className="[font-size:var(--police-title-card-secondary)] font-bold mt-1">
                  {prod.ancienPrix && (
                    <span className="line-through text-gray-300 mr-2 font-normal">
                      {prod.ancienPrix}
                    </span>
                  )}
                  {prod.prix} €
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </div>
  );
}
