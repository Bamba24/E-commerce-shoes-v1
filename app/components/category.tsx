

import React from 'react';
import '../globals.css';

export default function Category() {
  return (
    <div className="py-10">
      {/* Titre de la section */}
      <div className="text-center mb-10">
        <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
          View Our Range Of Categories
        </p>
        <p className="[font-size:var(--police-tertiary)] mb-[var(--margin-bottom-title)]">
          Explore our diverse selection of categories tailored to your needs.
        </p>
      </div>

      {/* Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 justify-center items-center">
        {/* Item 1 */}
        <div className="lg:row-span-2 h-60 sm:h-80 lg:h-[32rem] flex items-end gap-y-2 bg-slate-100 [background-image:url('/images/basket-ball/hommes/air-jordan-1.jpeg')] bg-cover bg-center bg-no-repeat rounded-xl">
          <p className="[font-size:var(--police-title-card-primary)] text-white ml-3 mb-3">BasketBall</p>
        </div>

        {/* Item 2 */}
        <div className="h-60 sm:h-72 flex items-end gap-y-2 bg-slate-100 [background-image:url('/images/crampons.jpeg')] bg-cover bg-center bg-no-repeat rounded-xl">
          <p className="[font-size:var(--police-title-card-primary)] text-white ml-3 mb-3">Foot-Ball</p>
        </div>

        {/* Item 3 */}
        <div className="lg:row-span-2 h-60 sm:h-80 lg:h-[32rem] flex items-end gap-y-2 bg-slate-100 [background-image:url('/images/training.jpeg')] bg-cover bg-center bg-no-repeat rounded-xl">
          <p className="[font-size:var(--police-title-card-primary)] text-white ml-3 mb-3">Training</p>
        </div>

        {/* Item 4 */}
        <div className="h-60 sm:h-72 flex items-end gap-y-2 bg-slate-100 [background-image:url('/images/running/hommes/asics.jpeg')] bg-cover bg-center bg-no-repeat hover rounded-xl">
          <p className="[font-size:var(--police-title-card-primary)] text-slate-900 ml-3 mb-3">Running</p>
        </div>
      </div>
    </div>
  );
}
