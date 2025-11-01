import type  {Produit} from '@/app/types/index';

export const ProduitsUser = async () => {
  try {
    const res = await fetch(`/api/produits`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}

export const updateProduit = async (id: string, updatedData: Partial<Produit>) => {
  try {
    
    const res = await fetch(`/api/produits`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedData }),
    });

    const response = res.json();
    return response;

  } catch (error) {
    
    console.error('Erreur lors de la mise à jour du produit :', error);

  }
}

export const deleteProduit = async (id: string)=>{
    try {
    const res = await fetch(`/api/produits`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const response = res.json();
    return response;

  } catch (error) {

    console.error('Erreur lors de la mise à jour du produit :', error);

  }
}

//  const handleDelete = async (id: string) => {
//     const confirm = window.confirm('Confirmer la suppression de ce produit ?');
//     if (!confirm) return;

//     try {
//       const res = await fetch(`/api/produits`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) {
//         console.error("Échec de la suppression");
//         return;
//       }else{
//         toast.success('Produit supprimé avec succès');
//       }

//       setProduits((prev) => prev.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error('Erreur lors de la suppression :', error);
//     }
//   };

