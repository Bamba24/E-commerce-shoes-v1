
import { API_BASE_URL } from '@/config';

export const UtilisateurUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/utilisateurs`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  } 
}