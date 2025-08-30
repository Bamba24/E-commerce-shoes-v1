"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'mui-sonner';
import { DevTool } from '@hookform/devtools';
import type {FormValuesAjoutProduit} from "../../../types/index";
import { API_BASE_URL } from '@/config';



export default function AddProductForm() {
  const form = useForm<FormValuesAjoutProduit>({
    defaultValues: {
      nom: '',
      slug: '',
      description: '',
      prix: '',
      ancienPrix: '',
      remise: '',
      genre: '',
      categorie: '',
      marque: '',
      pointuresDisponibles: '',
      couleursDisponibles: '',
      stock: '',
      note: '',
      nombreAvis: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
    },
  });

  const { register, handleSubmit, formState, control, reset, setValue, watch } = form;
  const { errors } = formState;

  const nom = watch('nom');

  useEffect(() => {
    const slug = slugify(nom || '', { lower: true, strict: true });
    setValue('slug', slug);
  }, [nom, setValue]);

  const onSubmit = async (data: FormValuesAjoutProduit) => {
    const produit = {
      nom: data.nom,
      slug: data.slug,
      description: data.description,
      prix: parseFloat(data.prix),
      ancienPrix: parseFloat(data.ancienPrix || '0'),
      remise: parseInt(data.remise || '0'),
      genre: data.genre,
      categorie: data.categorie,
      marque: data.marque,
      pointuresDisponibles: data.pointuresDisponibles,
      couleursDisponibles: data.couleursDisponibles,
      stock: parseInt(data.stock || '0'),
      note: parseFloat(data.note || '0'),
      nombreAvis: parseInt(data.nombreAvis || '0'),
      images: [data.image1, data.image2, data.image3, data.image4]
        .filter((img) => img.trim() !== '')
        .join(','),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/produits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produit),
      });

      if (res.ok) {
        toast.success('Produit ajouté avec succès');
        reset();
      } else {
        toast.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div className="col-span-3 bg-white p-6 w-full rounded">
      <h2 className="text-2xl font-bold mb-6">Ajouter un produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input {...register('nom', { required: 'Nom requis' })} placeholder="Nom" className="w-full p-2 border rounded" />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
        </div>
        <div>
          <input {...register('slug')} placeholder="Slug" readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-500" />
        </div>
        <div>
          <input {...register('description')} placeholder="Description" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('prix', { required: 'Prix requis' })} placeholder="Prix" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('ancienPrix')} placeholder="Ancien Prix" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('remise')} placeholder="Remise (%)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('genre')} placeholder="Genre (Hommes, Femmes...)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('categorie')} placeholder="Catégorie (Running...)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('marque')} placeholder="Marque" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('pointuresDisponibles')} placeholder="Pointures (ex: 39,40,41)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('couleursDisponibles')} placeholder="Couleurs (ex: noir,blanc)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('stock')} placeholder="Stock" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('note')} placeholder="Note (ex: 4.5)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('nombreAvis')} placeholder="Nombre d'avis" className="w-full p-2 border rounded" />
        </div>

        {/* Images */}
        <div>
          <input {...register('image1')} placeholder="Image principale (ex: images/running/air-jordan-1.jpg)" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('image2')} placeholder="Image secondaire 1" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('image3')} placeholder="Image secondaire 2" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register('image4')} placeholder="Image secondaire 3" className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="w-full bg-black text-white p-3 rounded mt-4 hover:bg-gray-800">
            Ajouter
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  );
}
