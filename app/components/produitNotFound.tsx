"use client";

import React from 'react';
import Link from 'next/link';
import { FaBoxOpen, FaArrowLeft } from 'react-icons/fa';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center px-4">
      <FaBoxOpen className="text-6xl text-gray-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Produit introuvable</h1>
      <p className="text-black mb-6 text-center">
        Le produit que vous cherchez nexiste pas ou nest plus disponible.
      </p>
      <Link
        href="/produits"
        className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded transition"
      >
        <FaArrowLeft />
        Retour aux produits
      </Link>
    </div>
  );
}
