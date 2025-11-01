"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "mui-sonner";
import { DevTool } from "@hookform/devtools";
import type { Produit } from "../../../types/index";

export default function AddProductForm() {
  const form = useForm<Produit & { imageFile?: FileList }>({
    defaultValues: {
      id: "",
      nom: "",
      slug: "",
      description: "",
      prix: 0,
      ancienPrix: 0,
      remise: 0,
      genre: "",
      categorie: "",
      marque: "",
      pointuresDisponibles: "",
      couleursDisponibles: "",
      images: "",
      stock: 0,
      note: 0,
      nombreAvis: 0,
      quantity: 0,
    },
  });

  const { register, handleSubmit, formState, control, reset, setValue, watch } = form;
  const { errors } = formState;

  const nom = watch("nom");

  // 🔹 Génère le slug automatiquement
  useEffect(() => {
    const slug = slugify(nom || "", { lower: true, strict: true });
    setValue("slug", slug);
  }, [nom, setValue]);

  const onSubmit = async (data: Produit & { imageFile?: FileList }) => {
    const formData = new FormData();

    // ✅ Ajout manuel des champs texte
    formData.append("nom", data.nom);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("prix", data.prix.toString());
    formData.append("ancienPrix", data.ancienPrix.toString());
    formData.append("remise", data.remise.toString());
    formData.append("genre", data.genre);
    formData.append("categorie", data.categorie);
    formData.append("marque", data.marque);
    formData.append("pointuresDisponibles", data.pointuresDisponibles);
    formData.append("couleursDisponibles", data.couleursDisponibles);
    formData.append("stock", data.stock.toString());
    formData.append("note", data.note.toString());
    formData.append("nombreAvis", data.nombreAvis.toString());

    // ✅ Ajout de l’image principale
    if (data.imageFile && data.imageFile.length > 0) {
      formData.append("image", data.imageFile[0]);
    } else {
      toast.error("Veuillez sélectionner une image !");
      return;
    }

    try {
      const res = await fetch(`/api/produits`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Produit ajouté avec succès ✅");
        reset();
      } else {
        const errorData = await res.json();
        toast.error(`Erreur: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du produit ❌");
    }
  };

  return (
    <div className="col-span-3 bg-white p-6 w-full rounded">
      <h2 className="text-2xl font-bold mb-6">Ajouter un produit</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input {...register("nom", { required: "Nom requis" })} placeholder="Nom" className="w-full p-2 border rounded" />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
        </div>

        <div>
          <input {...register("slug")} placeholder="Slug" readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-500" />
        </div>

        <div>
          <input {...register("description")} placeholder="Description" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" {...register("prix", { required: "Prix requis" })} placeholder="Prix (€)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" {...register("ancienPrix")} placeholder="Ancien Prix (€)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" {...register("remise")} placeholder="Remise (%)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input {...register("genre")} placeholder="Genre (Homme/Femme)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input {...register("categorie")} placeholder="Catégorie" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input {...register("marque")} placeholder="Marque" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input {...register("pointuresDisponibles")} placeholder="Pointures (ex: 39,40,41)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input {...register("couleursDisponibles")} placeholder="Couleurs (ex: noir,blanc)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" {...register("stock")} placeholder="Stock" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" step="0.1" {...register("note")} placeholder="Note (ex: 4.5)" className="w-full p-2 border rounded" />
        </div>

        <div>
          <input type="number" {...register("nombreAvis")} placeholder="Nombre d'avis" className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
            Image Principale
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            {...register("imageFile", { required: "Image requise" })}
            className="w-full p-2 border rounded"
          />
          {errors.imageFile && <p className="text-red-500 text-sm">{errors.imageFile.message}</p>}
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
