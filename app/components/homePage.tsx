
import React from 'react';
import '../globals.css';

export default function HomePage() {
  return (
    <div className="text-center flex flex-col gap-y-13 items-center w-[90%] sm:w-[80%] lg:w-[50%] mx-auto py-10">
      {/* Titre principal */}
      <h1 className="text-3xl sm:text-4xl text-white font-[var(--font-titre)]">
        Crafting Comfort, Redefining Spaces. Your Home, Your Signature Style!
      </h1>

      {/* Paragraphe */}
      <p className="text-sm text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat.
      </p>

      {/* Barre de recherche */}
      <div
        className="bg-[var(--secondary-color)] text-black font-bold py-3 px-4 rounded-full flex items-center justify-center w-full max-w-sm animate-pulse hover:animate-none hover:ring-2 hover:ring-slate-300 transition-all cursor-pointer"
      >
        Consulter nos produits
      </div>

    </div>
  );
}
