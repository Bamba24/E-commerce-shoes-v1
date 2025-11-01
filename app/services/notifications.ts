import { Notification } from "../types/index";

export const notificationUser = async (): Promise<Notification[] | undefined> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch(`/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const notifications = await res.json();

    // ✅ Marquer comme lues
    await fetch(`/api/notifications/mark-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return notifications;
  } catch (error) {
    console.error('Erreur chargement des notifications :', error);
    return undefined;
  }
};
