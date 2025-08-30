import React from 'react';
import '../globals.css';

export default function Article({ product }: { product: { nom: string; ancienPrix?: number; prix: number } }) {
  return (
    <div className="relative z-10 p-4 text-white flex flex-col justify-end h-full">
            <p className="[font-size:var(--police-title-card-primary)] font-semibold truncate drop-shadow-md">
              {product.nom}
            </p>
            <p className="[font-size:var(--police-title-card-secondary)] mt-1 font-bold">
              {product.ancienPrix && (
                <span className="line-through text-gray-300 mr-2 font-normal">
                  {product.ancienPrix}
                </span>
              )}
              {product.prix} FCFA
            </p>
   </div>
  )
}
