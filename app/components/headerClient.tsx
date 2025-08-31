"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import type { Produit, Notification } from '../types';
import { useAuth } from '../context/AuthContext';

type JwtPayload = {
  id: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
  iat: number;
  exp: number;
};

export default function HeaderClient() {

  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

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
          router.push('/');
          return;
        }

        if (token) {
          const decoded: JwtPayload = jwtDecode(token);
          if (decoded.role === 'CLIENT' && pathname.startsWith('/dashboard')) {
            router.push('/');
          }
        }
      } catch (error) {
        console.error('Erreur vérification token :', error);
        router.push('/');
      }
    };

    checkAccess();
  }, [pathname, router]);


  const updatePanierCount = () => {
    const count = JSON.parse(localStorage.getItem('panier') || '[]');
    const total = count.reduce((acc: number, item: Produit) => acc + item.quantity, 0);
    setPanierCount(total);
  };

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
      const nonLues = data.filter((n: Notification) => !n.isRead);
      setNotificationCount(nonLues.length);
    } catch (error) {
      console.error('Erreur notifications client :', error);
    }
  };

  useEffect(() => {
    updatePanierCount();
    fetchNotifications();

    const handlePanierUpdate = () => updatePanierCount();
    const handleNotificationsRead = () => fetchNotifications();

    window.addEventListener('panierUpdated', handlePanierUpdate);
    window.addEventListener('notificationsRead', handleNotificationsRead);
    window.addEventListener('notificationsUpdated', fetchNotifications);
    
    
    return () => {
      window.removeEventListener('panierUpdated', handlePanierUpdate);
      window.addEventListener('notificationsUpdated', fetchNotifications);
      window.addEventListener('notificationsRead', handleNotificationsRead);

    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <Link href="/notifications" className="relative">
          <FiBell className="text-xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:ring-2 p-1 rounded-full">
            <Image src="/icon-svg/profil.svg" alt="profil" width={20} height={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl py-2 z-50 text-sm">
              <Link href="/profil" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiUser /> Profil
              </Link>
              <Link onClick={() => logout()} href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FiLogOut /> Déconnexion
              </Link>
            </div>
          )}
        </div>

        <Link href="/panier" className="relative">
          {panierCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {panierCount}
            </span>
          )}
          <Image src="/icon-svg/shop.svg" alt="panier" width={20} height={20} />
        </Link>

        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Image src="/icon-svg/menuHamburger.svg" alt="menu" width={24} height={24} />
        </button>
      </div>

      <div className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-6 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="space-y-4 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produits">Produits</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </header>
  );
}
