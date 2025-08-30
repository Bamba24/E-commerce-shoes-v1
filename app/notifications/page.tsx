"use client";

import React, { useEffect, useState } from 'react';
import { notificationUser } from '../services/notifications';
import { Notification } from '../types/index';

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await notificationUser();
        if (result) {
          window.dispatchEvent(new Event('notificationsUpdated'));
          setNotifications(result);
        }
      } catch (error) {
        console.error('Erreur chargement des notifications :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {loading ? (
        <p className="text-gray-500">Chargement en cours...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-lg border shadow-sm ${
                notif.isRead ? 'bg-gray-100' : 'bg-blue-100'
              }`}
            >
              <p className="text-sm">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                Reçue le {new Date(notif.createdAt).toLocaleString('fr-FR')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
