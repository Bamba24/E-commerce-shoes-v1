"use client";

import React, { useEffect, useState } from 'react';
import { UtilisateurUser } from '../services/utilisateurs';
import type { Utilisateur } from '../../types/index';
import { FiMoreVertical, FiTrash2, FiInfo } from 'react-icons/fi';

export default function UserList() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UtilisateurUser();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleMenu = (id: string) => {
    setMenuOpenId(prev => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    console.log("Supprimer utilisateur", id);
    // TODO: Logique de suppression
  };

  const handleDetails = (id: string) => {
    console.log("Détails utilisateur", id);
    // TODO: Logique de navigation ou affichage des détails
  };

  return (
    <div className="w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des Utilisateurs</h2>

      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />

        <select className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md">
          <option value="">Trier par rôle</option>
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">Aucun utilisateur enregistré.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-sm font-semibold text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rôle</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t text-sm relative">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.nom}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 relative">
                    <button onClick={() => toggleMenu(user.id)} className="p-1">
                      <FiMoreVertical className="text-gray-600 hover:text-black" />
                    </button>
                    {menuOpenId === user.id && (
                      <div className="absolute right-4 z-10 mt-2 w-32 bg-white shadow-lg border rounded-md">
                        <button
                          onClick={() => handleDetails(user.id)}
                          className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FiInfo className="mr-2" /> Détails
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <FiTrash2 className="mr-2" /> Supprimer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
