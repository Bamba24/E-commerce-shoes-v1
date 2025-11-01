"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { FaChartBar } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdDashboard } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'mui-sonner';
import type { Produit, JwtPayload } from '../types';
import { useAuth } from '../context/AuthContext';

export default function HeaderAdmin() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  // 🔒 Vérification d’accès
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error("Connectez-vous pour accéder à cette page");
      router.push('/');
      return;
    }

    const checkAccess = async () => {
      try {
        const res = await fetch('/api/jwtoken', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          toast.error("Accès refusé");
          router.push('/');
          return;
        }

        const decoded: JwtPayload = jwtDecode(token);
        if (pathname === '/dashboard' && decoded.role !== 'ADMIN') {
          toast.error("Accès réservé aux administrateurs");
          router.push('/');
        }

      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        toast.error('Erreur serveur');
        router.push('/');
      }
    };

    checkAccess();
  }, [pathname, router]);

  // 🧮 Panier
  const updatePanierCount = () => {
    const count = JSON.parse(localStorage.getItem('panier') || '[]');
    const totalCount = count.reduce((acc: number, item: Produit) => acc + item.quantity, 0);
    setPanierCount(totalCount);
  };

  // 🔔 Notifications (corrigé avec token)
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const nonLues = data.filter((n: { isRead: boolean }) => !n.isRead);
      setNotificationCount(nonLues.length);
    } catch (error) {
      console.error('Erreur de récupération des notifications', error);
    }
  };

  // 🔄 Initialisation et événements
  useEffect(() => {
    updatePanierCount();
    fetchNotifications();

    const handlePanierUpdate = () => updatePanierCount();
    const handleNotificationsUpdate = () => fetchNotifications();

    window.addEventListener('panierUpdated', handlePanierUpdate);
    window.addEventListener('notificationsUpdated', handleNotificationsUpdate);
    window.addEventListener('notificationsRead', handleNotificationsUpdate);

    return () => {
      window.removeEventListener('panierUpdated', handlePanierUpdate);
      window.removeEventListener('notificationsUpdated', handleNotificationsUpdate);
      window.removeEventListener('notificationsRead', handleNotificationsUpdate);
    };
  }, []);

  // 🧍‍♂️ Fermer le dropdown si clic à l’extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📄 Aller à la page notifications
  const pageNotification = () => {
    window.dispatchEvent(new Event("notificationsUpdated"));
    router.push('/notifications');
  };

  return (
    <header className="flex justify-between items-center py-6 px-[var(--padding-x-section)] bg-[var(--primary-color)] text-white sticky top-0 z-50">
      <div className="logo flex-1">
        <Image src="/icon-svg/logo.svg" alt="Logo" width={40} height={40} />
      </div>

      <nav>
        <ul className="flex flex-1 space-x-6 font-semibold hide-under-500">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Produits</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="flex flex-1 gap-x-4 items-center justify-end">
        {/* 🔔 Notifications */}
        <button onClick={pageNotification} className="relative">
          <FiBell className="text-xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* 🧍‍♂️ Dropdown utilisateur */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:ring-2 p-1 rounded-full">
            <Image src="/icon-svg/profil.svg" alt="profil" width={20} height={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl py-2 z-50 text-sm">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <MdDashboard /> Dashboard
              </Link>
              <Link href="/profil" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiUser /> Profil
              </Link>
              <Link href="/dashboard/stats" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FaChartBar /> Statistiques
              </Link>
              <Link href="/dashboard/produits" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <BsBoxSeam /> Produits
              </Link>
              <Link href="/dashboard/utilisateurs" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiUser /> Utilisateurs
              </Link>
              <Link href="/dashboard/commandes" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <HiOutlineClipboardList /> Commandes
              </Link>
              <Link href="/dashboard/produits/nouveau" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <AiOutlinePlusCircle /> Ajouter un produit
              </Link>
              <button onClick={() => logout()} className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100">
                <FiLogOut /> Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* 🛒 Panier */}
        <Link href="/panier" className="relative">
          {panierCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {panierCount}
            </span>
          )}
          <Image src="/icon-svg/shop.svg" alt="panier" width={20} height={20} />
        </Link>

        {/* 🍔 Menu mobile */}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Image src="/icon-svg/menuHamburger.svg" alt="menu" width={24} height={24} />
        </button>
      </div>

      {/* 📱 Menu mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-6 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="space-y-4 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Produits</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/dashboard/commandes">Commandes</Link></li>
          <li><Link href="/dashboard/produits">Produits</Link></li>
          <li><Link href="/dashboard/utilisateurs">Utilisateurs</Link></li>
        </ul>
      </div>
    </header>
  );
}
