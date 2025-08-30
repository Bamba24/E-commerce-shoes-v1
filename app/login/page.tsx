"use client";

import React from 'react';
import Image from 'next/image';
import { toast } from "mui-sonner";
import { useForm } from 'react-hook-form';
import {LoginFormValues} from  "../types/index";
import {useAuth} from '../context/AuthContext';
import { loginUser } from '../services/login';


export default function LoginPage() {

  const {login}= useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: LoginFormValues) => {

  try {
      const result = await loginUser(data);
      login(result.user, result.token);
      toast.success(`Connexion réussie, Bienvenue ${result.user.nom}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Email ou mot de passe invalide");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        
        {/* Formulaire */}
        <div className="flex flex-col justify-center px-8 py-12">
          <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-6">Heureux de vous revoir</h2>
          <p className="[font-size:var(--police-tertiary)] text-gray-500 mb-8">Connecter vous a votre compte</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block mb-1 [font-size:var(--police-tertiary)]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email requis",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email invalide"
                  }
                })}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors.email && <p className="text-red-700 bg-red-200 py-1 px-2 mt-1 rounded">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 [font-size:var(--police-tertiary)]">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Mot de passe requis",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 caractères"
                  }
                })}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <a href="#" className="text-[var(--primary-color)] hover:underline">Mot de passe oublié</a>
            </div>

            <button
              type="submit"
              className="bg-[var(--primary-color)] hover:bg-red-600 text-white py-2 px-6 rounded-full w-full mt-4 transition-all"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            Vous n&apos;avez pas de compte?{' '}
            <a href="#" className="text-[var(--primary-color)] hover:underline">S&apos;inscrire</a>
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:block relative h-full w-full">
          <Image
            src="/images/login.avif"
            alt="Login illustration"
            layout="fill"
            objectFit="cover"
            className="brightness-90"
          />
        </div>
      </div>
    </div>
  );
}
