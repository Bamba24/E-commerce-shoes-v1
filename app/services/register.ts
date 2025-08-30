"use client";

import { RegisterFormValues } from "../types";
import { useRouter } from 'next/navigation';
import { toast } from "mui-sonner";
import { API_BASE_URL } from '@/config';


export const registerUser =  async (data: RegisterFormValues, router: ReturnType<typeof useRouter>)=> {

  try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
         method: "POST",
         headers: {
           'Content-Type': "application/json"
         },
         body: JSON.stringify({
            nom: data.nom,
            email: data.email,
            password: data.password
         })
       })
  
       if(res.ok){

        const result = await res.json();
        toast.success("Incription reussi");
        router.push('/login');
        return result;

       } else {
        toast.error("Cet utilisateur existe deja");
       }

  }catch (error) {
    console.log("erreur lors de l'inscription", error);
  }

}