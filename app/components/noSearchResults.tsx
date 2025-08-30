"use client";

import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function NoSearchResults() {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center text-center text-gray-300 rounded-xl border border-gray-700 p-4">
      <FaSearch className="text-5xl text-black mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Aucun résultat</h2>
      <p className="text-black">
        Aucun produit ne correspond à votre recherche. Essayez un autre mot-clé ou filtre.
      </p>
    </div>
  );
}
