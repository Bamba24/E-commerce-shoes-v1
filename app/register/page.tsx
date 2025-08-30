"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from "mui-sonner";
import { useForm } from 'react-hook-form';
import type { RegisterFormValues } from '../types/index';
import { registerUser } from '../services/register';


export default function RegisterPage() {

  const route = useRouter();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      nom: '',
      email: '',
      password: ''
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: RegisterFormValues) => {

   try {
    
       const result = await registerUser(data, route);
       if (result) {
         toast.success("Incription reussi");
         route.push('/login');
       } else {
         toast.error("Cet utilisateur existe deja");
       }

   } catch (error) {
     console.log("erreur lors de la recuperation des donnees", error)
   }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        
        {/* Formulaire */}
        <div className="flex flex-col justify-center px-8 py-12">
          <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-6">Creer votre compte</h2>
          <p className="[font-size:var(--police-tertiary)] text-gray-500 mb-8">Inscrivez vous pour commencer</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block mb-1 [font-size:var(--police-tertiary)]">Nom complet</label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("nom", { required: "Nom requis" })}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors.nom && <p className="text-red-600">{errors.nom.message}</p>}
            </div>

            <div>
              <label className="block mb-1 [font-size:var(--police-tertiary)]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email requis",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email invalide",
                  },
                })}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 [font-size:var(--police-tertiary)]">Mot de passe </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Mot de passe requis",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 caractères",
                  },
                })}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-[var(--primary-color)] hover:bg-red-600 text-white py-2 px-6 rounded-full w-full mt-4 transition-all"
            >
              S&apos;inscrire
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            Vous avez deja un compte?{' '}
            <a href="/login" className="text-[var(--primary-color)] hover:underline">Se connecter</a>
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:block relative h-full w-full">
          <Image
            src="/images/register.avif"
            alt="Register illustration"
            layout="fill"
            objectFit="cover"
            className="brightness-90"
          />
        </div>
      </div>
    </div>
  );
}
