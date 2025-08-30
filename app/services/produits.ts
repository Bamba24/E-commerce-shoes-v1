

export const ProduitsUser = async () => {
  try {
    const res = await fetch("/api/produits");
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}