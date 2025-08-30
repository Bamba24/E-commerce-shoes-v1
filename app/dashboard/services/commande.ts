import { API_BASE_URL } from '@/config';


export const CommandeUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/commande`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}