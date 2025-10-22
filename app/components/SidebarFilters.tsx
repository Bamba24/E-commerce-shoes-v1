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
  setIsopen: ()=> void;
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
  openSidebar
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
  const colors = ["Noir", "Blanc", "Bleu", "Rouge", "Vert", "Gris", "Violet", "Rose"];

  return (
    <div className={`
         // CLASSES POUR MOBILE (par défaut)
        fixed inset-y-0 left-0 w-3/4 max-w-xs h-full bg-white p-4 z-50 overflow-y-auto transition-transform duration-300 shadow-2xl
        
        // Logique d'ouverture/fermeture (Mobile)
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        
        // ---------------------------------------------------------------------------------------
        // CLASSES POUR DESKTOP (à partir de md: qui annulent les styles 'fixed' et 'translate'
        md:sticky top-20 md:translate-x-0 md:h-fit md:w-full md:border md:shadow-none md:block 
    `}>

      {/* Genre */}
      <div>
        <h3 className="text-lg font-bold mb-4">| Categories</h3>
        <ul className="grid grid-cols-2 gap-4">
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
      <div>
        <h3 className="text-lg font-bold mb-4">| Shoes Type</h3>
        <ul className="grid grid-cols-2 gap-4">
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
      <div>
        <h3 className="text-lg font-bold mb-4">| Shoes Sizes</h3>
        <ul className="grid grid-cols-3 gap-4">
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
      <div>
        <h3 className="text-lg font-bold mb-4">| Colors</h3>
        <ul className="grid grid-cols-2 gap-4">
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
      <div>
        <h3 className="text-lg font-bold mb-4">| Price Range</h3>
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

    <button onClick={()=> openSidebar()} className="bg-gray-500 text-white text-2xl ">
      Appliquer et fermer
    </button>
    </div>
  );
}
