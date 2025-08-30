
import { API_BASE_URL } from '@/config';

export const StatistiquesUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/statistiques`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}