

import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function TestimonialsSection() {
  return (
    <div className="py-10">
      {/* Titre + bouton */}
      <div className="mb-[var(--margin-bottom-title)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="lg:w-[50%] w-full">
          <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
            What Our Customers Say
          </p>
          <p className="mt-2">
            We value every feedback. Here’s what some of our customers shared about their experience.
          </p>
        </div>

        <button className="[font-size:var(--police-button)] bg-[var(--background-button)] py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          View More
          <Image src="/icon-svg/chevron-droite.svg" alt="chevron" width={20} height={20} />
        </button>
      </div>

      {/* Grille des témoignages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col gap-4 px-6 py-10 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <Image
                src="/icon-svg/user.svg"
                alt="User"
                width={50}
                height={50}
                className="rounded-full bg-gray-100"
              />
              <div>
                <p className="[font-size:var(--police-title-card-primary)] font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">Client fidèle</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">
              “Très satisfait ! Livraison rapide, service impeccable. Les chaussures sont magnifiques et confortables.”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
