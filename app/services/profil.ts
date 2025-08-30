import type { FormValuesProfil } from '../types/index';

export const profilUser = async (data: FormValuesProfil): Promise<FormValuesProfil | null> => {

  try {
          const response = await fetch("/api/utilisateurs", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nom: data.nom,
              email: data.email,
              motDePasse: data.newPassword,
            }),
          });
  
          const result = await response.json();
          if (result.success) {
            return result;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur API :', error);
          alert("Erreur lors de la mise à jour.");
        }
  return null;
}