import { Notification } from "../types/index";

export const notificationUser = async (): Promise<Notification[] | undefined> => {
  try {
    const res = await fetch("/api/notifications");
    const all = await res.json();

    // 🔒 Filtrer ici via le token localStorage
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userIdFromToken = payload.id;

    const filtered = all.filter((n: Notification) => n.userId === userIdFromToken);

    // Marquer comme lues
    await fetch("/api/notifications/mark-read", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // facultatif si filtrage côté client
      },
    });

    return filtered;
  } catch (error) {
    console.error('Erreur chargement des notifications :', error);
    return undefined;
  }
};