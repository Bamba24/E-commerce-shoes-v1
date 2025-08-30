"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Produit } from '../types';
import '../globals.css';
import Image from 'next/image';
type ProduitAvecQuantite = Produit & { quantity: number };

export default function CartPage() {
  const [panier, setPanier] = useState<ProduitAvecQuantite[]>([]);

  useEffect(() => {
    const panierLocalStorage: Produit[] = JSON.parse(localStorage.getItem('panier') || '[]');

    const panierAvecQuantite: ProduitAvecQuantite[] = panierLocalStorage.map((item) => ({
      ...item,
      quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    }));

    setPanier(panierAvecQuantite);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedPanier = panier.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
    window.dispatchEvent(new Event('panierUpdated'));
  };

  const removeItem = (id: string) => {
    const updatedPanier = panier.filter((item) => item.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
    window.dispatchEvent(new Event('panierUpdated'));
  };

  const subtotal = panier.reduce((sum, item) => sum + item.prix * item.quantity, 0);
  const remise = panier.reduce((acc, item) => acc + (item.prix * (item.remise ?? 0) / 100), 0);
  const total = subtotal - remise;

  if (panier.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4 py-8">
        <Image
          src="/images/empty-cart.svg"
          alt="Panier vide"
          className="w-64 h-64 mb-6"
        />
        <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">Votre panier est vide</h2>
        <p className="text-gray-600 mb-6">Ajoutez des produits pour les retrouver ici.</p>
        <Link href="/produits">
          <div className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition">
            Consulter nos produits
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 w-full overflow-x-auto rounded-xl">
          <table className="table w-full text-left border border-spacing-y-4">
            <thead className="text-sm text-white border-b bg-[var(--primary-color)] h-16">
              <tr>
                <th></th>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((item) => (
                <tr key={item.id} className="border-b h-20">
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 font-bold text-lg"
                    >
                      ×
                    </button>
                  </td>
                  <td className="flex items-center gap-2 h-20">
                    <div
                      style={{ backgroundImage: `url('/${item.images.split(',')[0]}')` }}
                      className="w-12 h-12 rounded-lg bg-cover bg-center bg-no-repeat"
                    ></div>
                    <p>{item.nom}</p>
                  </td>
                  <td>{item.prix} fcfa</td>
                  <td>
                    <div className="flex items-center border rounded-full px-2 w-22">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2">-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2">+</button>
                    </div>
                  </td>
                  <td>{item.prix * item.quantity} fcfa</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Résumé panier */}
        <div className="lg:col-span-4 bg-gray-100 p-6 rounded-xl overflow-x-auto h-80">
          <h2 className="text-lg font-semibold mb-4">Total Panier</h2>
          <table className="table-auto w-full border-separate border-spacing-y-2">
            <tbody>
              <tr className="text-sm">
                <td className="py-2">Sous-total</td>
                <td className="text-right font-medium">{subtotal} fcfa</td>
              </tr>
              <tr className="text-sm">
                <td className="py-2">Remise</td>
                <td className="text-right font-medium">{remise} fcfa</td>
              </tr>
              <tr className="font-bold text-lg border-t border-gray-300">
                <td className="py-2">Total</td>
                <td className="text-right">{total} fcfa</td>
              </tr>
            </tbody>
          </table>

          <Link href="/commandes">
            <button className="mt-6 bg-black text-white w-full py-2 rounded-full hover:bg-gray-800 transition-all">
              Commander
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
