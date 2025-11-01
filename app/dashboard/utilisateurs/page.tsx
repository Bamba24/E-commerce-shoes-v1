"use client";

import React, { useEffect, useState } from "react";
import { UtilisateurUser, deleteUtilisateur } from "../services/utilisateurs";
import type { Utilisateur } from "../../types/index";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { toast } from "mui-sonner";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

export default function UserList() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // États pour le modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Utilisateur | null>(null);

  // Chargement des utilisateurs
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

  // Ouvre ou ferme le menu d’options
  const toggleMenu = (id: string) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  // Ouvre le modal de confirmation
  const openDeleteModal = (user: Utilisateur) => {
    setUserToDelete(user);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  // Ferme le modal sans rien faire
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Confirme la suppression après clic sur "Supprimer"
  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const res = await deleteUtilisateur(userToDelete.id);

      if (res?.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        toast.success("Utilisateur supprimé avec succès");
      } else {
        toast.error(res?.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur API lors de la suppression :", error);
      toast.error("Une erreur inattendue est survenue");
    } finally {
      closeDeleteModal(); // ✅ on ferme le modal uniquement après la suppression
    }
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

      {/* Tableau des utilisateurs */}
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
                          onClick={() => openDeleteModal(user)}
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

      {/* Modal de confirmation */}
      {userToDelete && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          userName={userToDelete.nom}
        />
      )}
    </div>
  );
}
