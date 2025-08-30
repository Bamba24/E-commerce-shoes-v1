
import { API_BASE_URL } from '@/config';

export const ProduitsUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/produits`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}