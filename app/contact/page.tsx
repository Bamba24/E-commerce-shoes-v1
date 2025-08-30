"use client";

import {useForm} from 'react-hook-form'
import React from 'react';
import type {formValuesContact} from "../types/index";


export default function ContactSection() {

  const form = useForm<formValuesContact>({
    defaultValues: {
      name: "bamba Diagne",
      email: "example@gmail.com",
      phone: 0,
      message: "Ecrivez votre message ici"
    }
  });

  const {register, handleSubmit, formState} = form;

  const {errors} = formState;

  const onSubmit = (data: formValuesContact) => {
    console.log("le formulaire a ete soumis", data)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-[var(--primary-color,#3D3D3D)] text-white rounded-t-xl px-6 py-4 text-lg font-semibold">
        Get in Touch With Us
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 border border-t-0 p-6 rounded-b-xl shadow">
        {/* Left Info */}
        <div className="space-y-6 text-gray-800">
          <div className='h-[33%] border-b-1'>
            <h4 className="font-bold">Phone Number</h4>
            <p>0012334566</p>
          </div>
          <div className='h-[33%] border-b-1'>
            <h4 className="font-bold">Email Address</h4>
            <p>johndoe@example.com</p>
          </div>
          <div className='h-[33%]'>
            <h4 className="font-bold">Location</h4>
            <p>Lorem Ipsum</p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Send us a message</h3>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="flex gap-4">
              <input
                type="text"
                id='name'
                {...register('name',
                  {
                    required: {
                      value: true,
                      message: "le champ est requis"
                    }
                  }
                )}
                className="w-1/2 p-3 rounded border"
              />
              <p className={`${errors.name?.message ? "text-red-600": ""}`}>{errors.name?.message}</p>


              <input
                type="email"
                id='email'
                {...register('email',{
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Format invalide"
                    },
                    // validate: (fieldValue)=>{
                    //   return fieldValue !== "admin@gmail.com" || "compte deja existant"
                    // }

                    validate: {
                      notAdmin: (fieldValue)=>{
                      return fieldValue !== "admin@gmail.com" || "compte deja existant"
                     },
                     notBlacklist: (fieldValue)=>{
                      return !fieldValue.endsWith('outlook.fr') || "Format non supporté"
                     }
                    }
                  })}
                className="w-1/2 p-3 rounded border"
              />
            </div>

            <p className={`${errors.email?.message ? "text-red-700": ""}`}>{errors.email?.message}</p>

            <input
              type="text"
              id='phone'
              {...register('phone',{
                    required: {
                      value: true,
                      message: "le champ est requis"
                    }
                  })}
              className="w-full p-3 rounded border"
            />

            <p className={`${errors.phone?.message ? "text-red-700": ""}`}>{errors.phone?.message}</p>

            <textarea
            id='message'
            {...register('message',{
                    required: {
                      value: true,
                      message: "le champ est requis"
                    }
                  })}
              rows={4}
              className="w-full p-3 rounded border"
            ></textarea>

            <p className={`${errors.message?.message ? "text-red-700": ""}`}>{errors.message?.message}</p>

            <button
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
