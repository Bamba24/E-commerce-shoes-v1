

import React from 'react';
import '../globals.css';

export default function Products() {
  return (
    <div className="py-10">
      {/* Titre section */}
      <div className="mb-6">
        <p className="[font-size:var(--police-secondary)] mb-[var(--margin-bottom-title)] font-[var(--font-titre)]">
          Features products
        </p>
      </div>

      {/* Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--secondary-color)]">
        {/* Produit 1 */}
        <div className="flex flex-col justify-end h-72 gap-y-2 bg-cover bg-center bg-no-repeat rounded-xl px-4 py-4 [background-image:url('/images/product.avif')]">
          <p className="[font-size:var(--police-title-card-primary)]">
            Double Bed & Side Tables
          </p>
          <p className="[font-size:var(--police-title-card-secondary)]">
            $200.00 $200.00
          </p>
        </div>

        {/* Produit 2 */}
        <div className="flex flex-col justify-end h-72 gap-y-2 bg-cover bg-center bg-no-repeat rounded-xl px-4 py-4 [background-image:url('/images/product.avif')]">
          <p className="[font-size:var(--police-title-card-primary)]">
            Double Bed & Side Tables
          </p>
          <p className="[font-size:var(--police-title-card-secondary)]">
            $200.00 $200.00
          </p>
        </div>

        {/* Produit 3 */}
        <div className="flex flex-col justify-end h-72 gap-y-2 bg-cover bg-center bg-no-repeat rounded-xl px-4 py-4 [background-image:url('/images/product.avif')]">
          <p className="[font-size:var(--police-title-card-primary)]">
            Double Bed & Side Tables
          </p>
          <p className="[font-size:var(--police-title-card-secondary)]">
            $200.00 $200.00
          </p>
        </div>

        {/* Produit 4 */}
        <div className="flex flex-col justify-end h-72 gap-y-2 bg-cover bg-center bg-no-repeat rounded-xl px-4 py-4 [background-image:url('/images/product.avif')]">
          <p className="[font-size:var(--police-title-card-primary)]">
            Double Bed & Side Tables
          </p>
          <p className="[font-size:var(--police-title-card-secondary)]">
            $200.00 $200.00
          </p>
        </div>
      </div>
    </div>
  );
}
