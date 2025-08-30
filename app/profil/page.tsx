"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { toast } from 'mui-sonner';
import type { FormValuesProfil } from '../types/index';
import { profilUser } from '../services/profil';


export default function AccountSettings() {
  const form = useForm<FormValuesProfil>({
    defaultValues: {
      nom: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { register, handleSubmit, formState, control, watch, reset } = form;
  const { errors } = formState;

  const newPassword = watch('newPassword');

    const onSubmit = async (data: FormValuesProfil) => {
      try {
        const response = await profilUser(data);

        if (response) {
          toast.success('Utilisateur mis à jour avec succès');
          reset();
        } else {
         toast.error("modification de l'utilisateur echoué");
        }
      } catch (error) {
        console.error('Erreur API :', error);
        alert("Erreur lors de la mise à jour.");
      }
    };


  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Paramètres du compte</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div>
          <input
            type="text"
            {...register('nom', { required: 'Nom requis' })}
            placeholder="Nom"
            className="border p-3 rounded w-full"
          />
          {errors.nom && (
            <p className="text-red-600 mt-1 text-sm">{errors.nom.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register('email', {
              required: 'Email requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format email invalide',
              },
            })}
            placeholder="Adresse email"
            className="border p-3 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register('newPassword', {
              required: 'Mot de passe requis',
              minLength: {
                value: 6,
                message: 'Au moins 6 caractères',
              },
            })}
            placeholder="Nouveau mot de passe"
            className="border p-3 rounded w-full"
          />
          {errors.newPassword && (
            <p className="text-red-600 mt-1 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register('confirmPassword', {
              validate: value =>
                value === newPassword || 'Les mots de passe ne correspondent pas',
            })}
            placeholder="Confirmer mot de passe"
            className="border p-3 rounded w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 mt-1 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
        >
          Enregistrer
        </button>

        <DevTool control={control} />
      </form>
    </div>
  );
}
