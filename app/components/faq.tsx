
import React from 'react';
import Image from 'next/image';
import '../globals.css';

export default function Faq() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 py-10">
      {/* Colonne gauche */}
      <div className="lg:w-1/2 w-full">
        <p className="[font-size:var(--police-secondary)] font-[var(--font-titre)]">
          Foire aux Questions
        </p>
        <p className="[font-size:var(--police-tertiary)] mb-[var(--margin-bottom-title)] text-gray-700">
          Vous avez une question ? Consultez les réponses ci-dessous. Si vous ne trouvez pas ce que vous cherchez, contactez-nous.
        </p>
        <button className="[font-size:var(--police-button)] bg-black py-2 px-4 text-white font-semibold rounded-full hover:bg-gray-800 flex items-center gap-x-2 transition-all">
          Poser une question
          <Image src="/icon-svg/chevron-droite.svg" alt="Chevron" width={20} height={20} />
        </button>
      </div>

      {/* Colonne droite - Questions */}
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
        <div className="flex flex-col gap-6">
          {[
            {
              question: "Quels sont les délais de livraison ?",
              answer: "La livraison prend entre 2 à 5 jours ouvrables selon votre localisation.",
            },
            {
              question: "Puis-je retourner un article ?",
              answer: "Oui, vous avez 14 jours pour retourner un produit s’il ne vous convient pas.",
            },
            {
              question: "Comment suivre ma commande ?",
              answer: "Un email de confirmation contenant le lien de suivi est envoyé après l'achat.",
            },
            {
              question: "Quels modes de paiement acceptez-vous ?",
              answer: "Nous acceptons les paiements par carte bancaire, PayPal, et mobile money.",
            },
          ].map((faq, index) => (
            <div key={index}>
              <p className="[font-size:var(--police-tertiary)] font-semibold text-black">
                {faq.question}
              </p>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
