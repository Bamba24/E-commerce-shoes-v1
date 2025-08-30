

export const CommandeUser = async () => {
  try {
    const res = await fetch("/api/commande");
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}