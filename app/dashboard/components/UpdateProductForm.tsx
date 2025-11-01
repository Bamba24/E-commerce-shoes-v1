"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "mui-sonner";
import { DevTool } from "@hookform/devtools";
import type { Produit } from "@/app/types/index";

type UpdateProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Produit;
  onUpdate?: () => void; // callback après mise à jour
};

export default function UpdateProductForm({
  product,
  onUpdate,
  isOpen,
  onClose,
}: UpdateProductFormProps) {
  const form = useForm<Produit>({
    defaultValues: { ...product },
  });

  const { register, handleSubmit, formState, control, setValue, watch } = form;
  const { errors } = formState;

  const nom = watch("nom");

  useEffect(() => {
    if (nom) {
      setValue("slug", slugify(nom, { lower: true, strict: true }));
    }
  }, [nom, setValue]);

  const onSubmit = async (data: Produit) => {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("nom", data.nom);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("prix", data.prix.toString());
    formData.append("ancienPrix", data.ancienPrix?.toString() || "0");
    formData.append("remise", data.remise?.toString() || "0");
    formData.append("genre", data.genre);
    formData.append("categorie", data.categorie);
    formData.append("marque", data.marque);
    formData.append(
      "pointuresDisponibles",
      Array.isArray(data.pointuresDisponibles)
        ? data.pointuresDisponibles.join(",")
        : (data.pointuresDisponibles as string)
    );
    formData.append(
      "couleursDisponibles",
      Array.isArray(data.couleursDisponibles)
        ? data.couleursDisponibles.join(",")
        : (data.couleursDisponibles as string)
    );
    formData.append("stock", data.stock.toString());
    formData.append("note", data.note?.toString() || "0");
    formData.append("nombreAvis", data.nombreAvis?.toString() || "0");

    const fileInput = data.imageFile;
    if (fileInput && fileInput.length > 0) {
      formData.append("image", fileInput[0]);
    }

    try {
      const res = await fetch(`/api/produits`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("✅ Produit mis à jour avec succès !");
        onUpdate?.();
        onClose(); // ferme la modale
      } else {
        const errData = await res.json();
        toast.error(`Erreur: ${errData.message || res.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du produit ❌");
    }
  };

  if (!isOpen) return null; // évite d'afficher la modale quand elle est fermée

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Modifier le produit
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <input
              {...register("nom", { required: "Nom requis" })}
              placeholder="Nom"
              className="w-full p-2 border rounded"
            />
            {errors.nom && (
              <p className="text-red-500 text-sm">{errors.nom.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("slug")}
              placeholder="Slug"
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <input
              {...register("prix", { required: "Prix requis" })}
              placeholder="Prix (€)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("ancienPrix")}
              placeholder="Ancien Prix (€)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("remise")}
              placeholder="Remise (%)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("genre")}
              placeholder="Genre (Homme/Femme)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("categorie")}
              placeholder="Catégorie"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("marque")}
              placeholder="Marque"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("pointuresDisponibles")}
              placeholder="Pointures (ex: 39,40,41)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("couleursDisponibles")}
              placeholder="Couleurs (ex: noir,blanc)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("stock")}
              placeholder="Stock"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("note")}
              placeholder="Note (ex: 4.5)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("nombreAvis")}
              placeholder="Nombre d'avis"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nouvelle image (facultatif)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("imageFile")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
            >
              Mettre à jour
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-black p-3 rounded hover:bg-gray-400 transition"
            >
              Annuler
            </button>
          </div>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
}
