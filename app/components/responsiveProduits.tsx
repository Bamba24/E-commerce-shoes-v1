"use client";

import React, { useState, useEffect } from 'react';
import type { Produit } from '../types/index';
import Article from '../components/article';
import Link from 'next/link';
import { ProduitsUser } from '../services/produits';
import NoSearchResults from '../components/noSearchResults';

export default function ProductListing() {
  const [allProducts, setAllProducts] = useState<Produit[]>([]);
  const [state, setState] = useState<Produit[]>([]);
  const [input, setInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCategoryShoes, setSelectedCategoryShoes] = useState('');
  const [selectedPointure, setSelectedPointure] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const categories = ['All', 'Hommes', 'Femmes', 'Enfants'];
  const categoriesShoes = ['Running', 'Basketball', 'Training', 'Football'];
  const prices = [
    '5000 - 10000',
    '10000 - 15000',
    '15000 - 20000',
    '20000 - 25000',
    '25000 - 30000',
  ];
  const shoesPointures = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  const colors = ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert', 'Gris', 'Violet', 'Rose'];

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const data = await ProduitsUser();
        setAllProducts(data);
        setState(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };
    fetchProduits();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) =>
        p.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCategoryShoes) {
      filtered = filtered.filter((p) =>
        p.categorie.toLowerCase() === selectedCategoryShoes.toLowerCase()
      );
    }

    if (selectedPointure !== null) {
      filtered = filtered.filter((p) => {
        const sizes = typeof p.pointuresDisponibles === 'string'
          ? p.pointuresDisponibles.split(',').map(Number)
          : p.pointuresDisponibles;
        return sizes.includes(selectedPointure);
      });
    }

    if (selectedColor) {
      filtered = filtered.filter((p) => {
        const couleurs = typeof p.couleursDisponibles === 'string'
          ? p.couleursDisponibles.split(',').map(c => c.trim().toLowerCase())
          : (p.couleursDisponibles as string[]).map((c:string) => c.toLowerCase());
        return couleurs.includes(selectedColor.toLowerCase());
      });
    }

    if (selectedPrice) {
      const [minStr, maxStr] = selectedPrice.replace(/\$/g, '').split(/\s*-\s*/);
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      filtered = filtered.filter((p) => p.prix >= min && p.prix <= max);
    }

    if (input) {
      filtered = filtered.filter((p) =>
        p.nom.toLowerCase().includes(input.toLowerCase())
      );
    }

    setState(filtered);
  }, [
    selectedCategory,
    selectedCategoryShoes,
    selectedPointure,
    selectedColor,
    selectedPrice,
    input,
    allProducts,
  ]);

  return (
    <div>
      {/* Titre + Search */}
      <div className="px-8 py-6 text-center">
        <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-2">
          Our Collection Of Products
        </h2>
        <div className="flex items-center mx-auto gap-2 mb-4 border rounded-full px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search An Item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none w-full"
          />
        </div>
        <p className="text-sm text-gray-600">
          Showing {state.length} item(s)
        </p>
      </div>

      {/* Filtre Responsive Mobile */}
      <div className="block md:hidden px-4 space-y-4 mb-8">
        <select className="w-full border rounded p-2" onChange={e => setSelectedCategory(e.target.value)}>
          <option value="All">Catégorie</option>
          {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>

        <select className="w-full border rounded p-2" onChange={e => setSelectedCategoryShoes(e.target.value)}>
          <option value="">Type de chaussures</option>
          {categoriesShoes.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>

        <select className="w-full border rounded p-2" onChange={e => setSelectedPointure(Number(e.target.value))}>
          <option value="">Pointure</option>
          {shoesPointures.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>

        <select className="w-full border rounded p-2" onChange={e => setSelectedColor(e.target.value)}>
          <option value="">Couleur</option>
          {colors.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>

        <select className="w-full border rounded p-2" onChange={e => setSelectedPrice(e.target.value)}>
          <option value="">Prix</option>
          {prices.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-12 gap-6 px-8 pb-8">
        {/* Sidebar Desktop */}
        <div className="hidden md:block col-span-3 sticky top-20 h-fit border p-4 space-y-8">
          {/* [Sidebar inchangée ici pour bureau - contenu déjà présent] */}
        </div>

        <div className="flex flex-wrap gap-6 col-span-12 md:col-span-9">
          {state.length > 0 ? (
            state.map((product, idx) => {
              const imagesArray = product.images?.split(',') || [];
              return (
                <Link
                  href={`/produits/${product.slug}`}
                  key={idx}
                  className="relative w-full sm:w-[48%] lg:w-[31%] h-80 rounded-xl overflow-hidden group shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        imagesArray.length > 0 ? `url('/${imagesArray[0]}')` : 'none',
                    }}
                  ></div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {product.remise > 0 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow">
                      -{product.remise}%
                    </div>
                  )}

                  <Article product={product} />
                </Link>
              );
            })
          ) : (
            <NoSearchResults />
          )}
        </div>
      </div>
    </div>
  );
}
