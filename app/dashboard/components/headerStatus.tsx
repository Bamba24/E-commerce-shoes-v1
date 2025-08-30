"use client";

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Headers from '@/app/components/headers';
import HeaderAdmin from '@/app/components/headerAdmin';
import HeaderClient from '@/app/components/headerClient';


export default function Header() {
  const { user } = useAuth();

  if (!user) return <Headers />;
  if (user.role === 'ADMIN') return <HeaderAdmin />;
  return <HeaderClient />;
}