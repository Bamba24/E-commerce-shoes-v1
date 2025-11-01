'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmationModalProps) {
  // État pour stocker l'élément DOM de destination (le body)
  const [mounted, setMounted] = useState(false);

  // Assurez-vous que le composant est monté côté client avant d'utiliser createPortal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) {
    return null;
  }

  // Le modal lui-même, rendu dans le body via un Portal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl p-6 w-11/12 max-w-md transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors d'un clic dans le modal
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmer la suppression</h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer l&apos;utilisateur {userName} ?
          Cette action est irréversible.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>,
    document.body // C'est ici que le Portal rend le contenu
  );
}