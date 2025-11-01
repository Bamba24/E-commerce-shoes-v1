"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Produit } from "../types";
import Article from "../components/article";
import NoSearchResults from "../components/noSearchResults";
import SidebarFilters from "../components/SidebarFilters";
import { ProduitsUser } from "../services/produits";

export default function ProductListing() {
  const [allProducts, setAllProducts] = useState<Produit[]>([]);
  const [state, setState] = useState<Produit[]>([]);
  const [input, setInput] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryShoes, setSelectedCategoryShoes] = useState("");
  const [selectedPointure, setSelectedPointure] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Chargement des produits depuis l’API
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

  // Application des filtres
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCategoryShoes) {
      filtered = filtered.filter(
        (p) => p.categorie.toLowerCase() === selectedCategoryShoes.toLowerCase()
      );
    }

    if (selectedPointure !== null) {
      filtered = filtered.filter((p) => {
        const sizes =
          typeof p.pointuresDisponibles === "string"
            ? p.pointuresDisponibles.split(",").map(Number)
            : p.pointuresDisponibles;
        return sizes.includes(selectedPointure);
      });
    }

    if (selectedColor) {
      filtered = filtered.filter((p) => {
        const couleurs =
          typeof p.couleursDisponibles === "string"
            ? p.couleursDisponibles.split(",").map((c) => c.trim().toLowerCase())
            : (p.couleursDisponibles as string[]).map((c: string) =>
                c.toLowerCase()
              );
        return couleurs.includes(selectedColor.toLowerCase());
      });
    }

    if (selectedPrice) {
      const [minStr, maxStr] = selectedPrice.replace(/\$/g, "").split(/\s*-\s*/);
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

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header + Recherche */}
      <div className="px-8 py-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Our Collection Of Products</h2>

        <div className="flex items-center mx-auto gap-2 mb-4 border rounded-full px-4 py-2 w-full max-w-md bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search An Item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none text-gray-700"
          />
        </div>

        <p className="text-sm text-gray-600">
          Showing {state.length} item{state.length > 1 && "s"}
        </p>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 pb-8">
        {/* Sidebar (Desktop + Mobile) */}
        <SidebarFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCategoryShoes={selectedCategoryShoes}
          setSelectedCategoryShoes={setSelectedCategoryShoes}
          selectedPointure={selectedPointure}
          setSelectedPointure={setSelectedPointure}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          isOpen={isOpen}
          openSidebar={toggleSidebar}
        />

        {/* Liste des produits */}
        <div className="col-span-3">
          {/* Bouton filtre mobile */}
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={toggleSidebar}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Filters
            </button>
          </div>

          {state.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.map((product, idx) => {
                const imageUrl = product.images || "default-placeholder.jpg";

                return (
                  <Link
                    href={`/produits/${product.slug}`}
                    key={idx}
                    className="relative w-full h-80 rounded-xl overflow-hidden group shadow-md bg-white"
                  >
                    {/* Image de fond */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${imageUrl}')`,
                      }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Étiquette remise */}
                    {product.remise > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow">
                        -{product.remise}%
                      </div>
                    )}

                    {/* Infos produit */}
                    <Article product={product} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <NoSearchResults />
          )}
        </div>
      </div>
    </div>
  );
}
