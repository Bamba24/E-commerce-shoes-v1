"use client";

import React, { useEffect, useState } from 'react';
import type { Produit } from "../../types/index";
import {ProduitsUser} from '../services/produits';
import Image from 'next/image';
import { toast } from 'mui-sonner';

export default function ProductList() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const data = await ProduitsUser();
        setProduits(data || []);
      } catch (error) {
        console.error('Erreur chargement produits :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Confirmer la suppression de ce produit ?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/produits`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Échec de la suppression");
        return;
      }else{
        toast.success('Produit supprimé avec succès');
      }

      setProduits((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="w-full gap-4 p-6 h-[600px] overflow-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ">
        <h2 className="text-2xl font-bold">Liste des Produits</h2>

        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="desc">Trier par date ↓</option>
            <option value="asc">Trier par date ↑</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : produits.length === 0 ? (
        <p className="text-gray-500">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {produits.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
              <Image
                src={`/${product.images.split(',')[0]}`}
                alt={product.nom}
                width={300}
                height={300}
                className="object-cover w-full h-60"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold truncate">{product.nom}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <strong>Prix:</strong>{' '}
                    <span className="text-black font-medium">{product.prix} €</span>{' '}
                    {product.ancienPrix && (
                      <span className="line-through text-gray-400 ml-2">{product.ancienPrix} €</span>
                    )}
                  </p>
                  {product.remise && (
                    <p className="text-green-600">Remise: -{product.remise}%</p>
                  )}
                  <p><strong>Catégorie:</strong> {product.categorie}</p>
                  <p><strong>Genre:</strong> {product.genre}</p>
                  <p><strong>Pointures:</strong></p>
                  <p>
                    {Array.isArray(product.pointuresDisponibles)
                      ? product.pointuresDisponibles.join(', ')
                      : typeof product.pointuresDisponibles === 'string'
                        ? product.pointuresDisponibles.split(',').join(', ')
                        : '—'}
                  </p>
                  <p><strong>Couleurs:</strong>{' '}
                    {Array.isArray(product.couleursDisponibles)
                      ? product.couleursDisponibles.join(', ')
                      : typeof product.couleursDisponibles === 'string'
                        ? product.couleursDisponibles.split(',').join(', ')
                        : '—'}
                  </p>
                  <p>
                    <strong>Stock:</strong>{' '}
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock > 0 ? `${product.stock} dispo` : 'Rupture'}
                    </span>
                  </p>
                  <p><strong>Note:</strong> {product.note} ⭐ ({product.nombreAvis} avis)</p>
                </div>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
