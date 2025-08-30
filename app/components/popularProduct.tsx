

import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function PopularProducts() {
  return (
    <div className="py-10">
      {/* Titre et bouton */}
      <div className="mb-[var(--margin-bottom-title)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="lg:w-[50%] w-full">
          <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
            Most Popular Products
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis pulvina.
          </p>
        </div>

        <button className="[font-size:var(--police-button)] bg-[var(--background-button)] py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          View All
          <Image src="/icon-svg/chevron-droite.svg" alt="Chevron" width={20} height={20} />
        </button>
      </div>

      {/* Grille de produits responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--secondary-color)]">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-end h-72 gap-y-2 [background-image:url('/images/product.avif')] bg-cover bg-center bg-no-repeat rounded-xl px-4 py-4"
          >
            <p className="[font-size:var(--police-title-card-primary)]">
              Double Bed & Side Tables
            </p>
            <p className="[font-size:var(--police-title-card-secondary)]">
              $200.00 $200.00
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
