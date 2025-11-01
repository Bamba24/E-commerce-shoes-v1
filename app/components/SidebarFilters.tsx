"use client";

import React from "react";

type SidebarFiltersProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedCategoryShoes: string;
  setSelectedCategoryShoes: (value: string) => void;
  selectedPointure: number | null;
  setSelectedPointure: (value: number | null) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  selectedPrice: string;
  setSelectedPrice: (value: string) => void;
  isOpen: boolean;
  openSidebar: () => void;
};

export default function SidebarFilters({
  selectedCategory,
  setSelectedCategory,
  selectedCategoryShoes,
  setSelectedCategoryShoes,
  selectedPointure,
  setSelectedPointure,
  selectedColor,
  setSelectedColor,
  selectedPrice,
  setSelectedPrice,
  isOpen,
  openSidebar,
}: SidebarFiltersProps) {
  const categories = ["All", "Hommes", "Femmes", "Enfants"];
  const categoriesShoes = ["Running", "Basketball", "Training", "Football"];
  const prices = [
    "5000 - 10000",
    "10000 - 15000",
    "15000 - 20000",
    "20000 - 25000",
    "25000 - 30000",
  ];
  const shoesPointures = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  const colors = [
    "Noir",
    "Blanc",
    "Bleu",
    "Rouge",
    "Vert",
    "Gris",
    "Violet",
    "Rose",
  ];

  return (
    <>
      {/* OVERLAY (uniquement sur mobile quand ouvert) */}
      <div
        className={`fixed inset-0 bg-black/40 z-20 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={openSidebar}
      ></div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white p-5 overflow-y-auto z-30 
          transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:sticky md:translate-x-0 md:top-20 md:h-fit md:w-full md:border md:shadow-none
        `}
      >
        {/* Titre + bouton fermer (mobile uniquement) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Filtres</h2>
          <button
            onClick={openSidebar}
            className="text-gray-600 text-lg hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Catégories */}
        <div>
          <h3 className="text-lg font-bold mb-3">| Categories</h3>
          <ul className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Type */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">| Type</h3>
          <ul className="grid grid-cols-2 gap-3">
            {categoriesShoes.map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shoesCategory"
                    checked={selectedCategoryShoes === category}
                    onChange={() => setSelectedCategoryShoes(category)}
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Pointures */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">| Taille</h3>
          <ul className="grid grid-cols-3 gap-3">
            {shoesPointures.map((pointure) => (
              <li key={pointure}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="pointure"
                    checked={selectedPointure === pointure}
                    onChange={() => setSelectedPointure(pointure)}
                  />
                  <span>{pointure}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Couleurs */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">| Couleurs</h3>
          <ul className="grid grid-cols-2 gap-3">
            {colors.map((color) => (
              <li key={color}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="color"
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                  />
                  <span>{color}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Prix */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">| Prix</h3>
          <ul className="space-y-2">
            {prices.map((price) => (
              <li key={price}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === price}
                    onChange={() => setSelectedPrice(price)}
                  />
                  <span>{price}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Bouton fermer (mobile) */}
        <button
          onClick={openSidebar}
          className="mt-8 w-full bg-black text-white py-2 rounded-md md:hidden"
        >
          Appliquer et fermer
        </button>
      </aside>
    </>
  );
}
