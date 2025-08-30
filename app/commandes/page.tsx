'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import { jwtDecode } from 'jwt-decode';
import type { Produit } from '../types';
import { toast } from 'mui-sonner';
import type {FormValues} from "../types/index";
import type {JwtPayload} from "../types/index";
import {API_BASE_URL} from "@/config"
export default function CheckoutPage() {

  const router = useRouter();
  const [commande, setCommande] = useState<(Produit & { quantity: number })[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      adresseLivraison: '',
      ville: '',
      pays: '',
      codePostal: '',
    },
  });

  useEffect(() => {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    const panierAvecQuantite = panier.map((item: Produit & { quantity?: number }) => ({
      ...item,
      quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    }));
    setCommande(panierAvecQuantite);
  }, []);

  const total = commande.reduce((acc, item) => acc + item.prix * item.quantity, 0);
  const remise = commande.reduce((acc, item) => acc + item.prix * ((item.remise ?? 0) / 100), 0);

      const genererPDF = () => {
      const doc = new jsPDF();

      // En-tête
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Facture', 105, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, 30);
      doc.text(`N° commande : ${Math.floor(Math.random() * 1000000)}`, 150, 30);

      doc.line(20, 35, 190, 35); // ligne horizontale

      // Tableau
      let y = 45;
      doc.setFontSize(12);
      doc.text('Produit', 20, y);
      doc.text('Quantité', 100, y);
      doc.text('Total (FCFA)', 160, y);
      y += 10;

      commande.forEach((item) => {
        doc.text(item.nom, 20, y);
        doc.text(`${item.quantity}`, 110, y);
        doc.text(`${item.prix * item.quantity}`, 160, y);
        y += 10;
      });

      doc.line(20, y + 2, 190, y + 2); // ligne de séparation

      // Totaux
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text(`Sous-total : ${total} FCFA`, 150, y, { align: 'right' });
      y += 8;
      doc.text(`Remise : -${remise.toFixed(0)} FCFA`, 150, y, { align: 'right' });
      y += 8;
      doc.setFontSize(14);
      doc.text(`Total à payer : ${(total - remise).toFixed(0)} FCFA`, 150, y, { align: 'right' });

      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text('Merci pour votre commande !', 105, y + 20, { align: 'center' });

      doc.save('facture.pdf');
    };

  const onSubmit = async (data: FormValues) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return toast.error("Utilisateur non connecté");

      const decoded = jwtDecode<JwtPayload>(token);
      const utilisateurId = decoded.id;
      const utilisateurEmail = decoded.email;
      const utilisateurNom = decoded.nom;

      const payload = {
        utilisateurEmail,
        utilisateurNom,
        utilisateurId,
        adresseLivraison: data.adresseLivraison,
        ville: data.ville,
        pays: data.pays,
        codePostal: data.codePostal,
        produits: commande.map((item) => ({
          id: item.id,
          nom: item.nom,
          prix: item.prix,
          quantity: item.quantity,
        })),
        total: total - remise,
      };

      const res = await fetch(`${API_BASE_URL}/api/commande`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();
      if (result.success) {
        setOpenModal(true);
        localStorage.removeItem('panier');
        window.dispatchEvent(new Event('panierUpdated'));
        toast.success("Votre commande a été validé")
      }

      if(!result.success){
          toast.error("Votre commande a échoué")
      }
      
      
    } catch (err) {
      console.error('Erreur lors de la commande :', err);
    }
  };

  const acceuil = () => {
    window.dispatchEvent(new Event("notificationsUpdated"));
    router.push('/')
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="flex gap-2 mb-6 w-full px-4 h-16 items-center rounded-t-md text-white bg-[var(--primary-color)]">
          Confirmation de la commande
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm">Adresse de livraison*</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              {...register('adresseLivraison', { required: 'Adresse requise' })}
            />
            {errors.adresseLivraison && <p className="text-red-600">{errors.adresseLivraison.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Ville*</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              {...register('ville', { required: 'Ville requise' })}
            />
            {errors.ville && <p className="text-red-600">{errors.ville.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Pays*</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              {...register('pays', { required: 'Pays requis' })}
            />
            {errors.pays && <p className="text-red-600">{errors.pays.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm">Code postal*</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              {...register('codePostal', { required: 'Code postal requis' })}
            />
            {errors.codePostal && <p className="text-red-600">{errors.codePostal.message}</p>}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="mt-6 bg-[var(--primary-color)] text-white px-6 py-2 rounded-full"
            >
              Valider la commande
            </button>
          </div>
        </form>

        {openModal && (
          
         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-12 max-w-xl text-center flex flex-col items-center gap-6">
        {/* ✅ Icône de confirmation */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl mb-2">
          ✓
        </div>

        {/* ✅ Message */}
        <h2 className="text-2xl font-bold text-gray-800">Thank you!</h2>
        <p className="text-gray-600">
          Your order has been confirmed & it&apos;s on the way.
          <br />
          Check your email for the details.
        </p>

        {/* ✅ Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
          <button
            onClick={acceuil}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Go to Homepage
          </button>
          <button
            onClick={genererPDF}
            className="border border-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Check Order Details
              </button>
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="lg:col-span-4 bg-gray-100 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Détails du panier</h2>
        <table className="w-full text-sm">
          <thead className="text-left border-b border-dashed border-gray-300 text-gray-700 h-10">
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {commande.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td className="text-center h-12">{item.quantity}</td>
                <td className="text-right">{item.prix * item.quantity} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 border-t border-dashed border-gray-300 pt-2 text-sm">
          <div className="flex justify-between items-center h-16 border-b border-dashed">
            <span>Sous-total</span>
            <span>{total} FCFA</span>
          </div>
          <div className="flex justify-between items-center h-16 border-b border-dashed">
            <span>Remise</span>
            <span>{remise} FCFA</span>
          </div>
          <div className="flex justify-between items-center font-bold text-base mt-2 h-16 border-b border-dashed">
            <span>Total</span>
            <span>{total - remise} FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
