import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function Services() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 py-10">
      {/* Colonne gauche */}
      <div className="flex-1">
        <p className="[font-size:var(--police-secondary)] mb-[var(--margin-bottom-title)] font-[var(--font-titre)]">
          Découvrez nos services exclusifs
        </p>
        <button className="[font-size:var(--police-button)] bg-[var(--background-button)] py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          Voir tous les services
          <Image src="/icon-svg/chevron-droite.svg" alt="Chevron" width={20} height={20} />
        </button>
      </div>

      {/* Colonne droite */}
      <div className="flex-1 flex flex-col gap-y-6">
        <p className="[font-size:var(--police-tertiary)] opacity-70">
          Nous mettons à votre disposition une plateforme rapide, sécurisée et adaptée à vos besoins. Notre mission : faciliter votre expérience d&apos;achat de chaussures de sport en ligne.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <p className="[font-size:var(--police-secondary)] font-bold">Livraison Express</p>
            <p className="[font-size:var(--police-tertiary)]">
              Recevez vos produits sous 48h partout au Sénégal, avec suivi en temps réel.
            </p>
          </div>
          <div className="flex-1">
            <p className="[font-size:var(--police-secondary)] font-bold">Support 24/7</p>
            <p className="[font-size:var(--police-tertiary)]">
              Une équipe dédiée à votre écoute pour toute question ou réclamation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
