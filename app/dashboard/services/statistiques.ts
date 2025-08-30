

export const StatistiquesUser = async () => {
  try {
    const res = await fetch("/api/statistiques");
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}