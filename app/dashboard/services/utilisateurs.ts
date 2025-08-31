

export const UtilisateurUser = async () => {
  try {
    const res = await fetch(`/api/utilisateurs`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}