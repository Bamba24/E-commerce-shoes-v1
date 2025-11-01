

export const UtilisateurUser = async () => {
  try {
    const res = await fetch(`/api/utilisateurs`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}

export const deleteUtilisateur = async (id: string)=>{
   try {
    const res = await fetch(`/api/utilisateurs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const response = await res.json();
    return response;

   } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
   }
}