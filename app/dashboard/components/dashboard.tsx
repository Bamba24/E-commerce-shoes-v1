"use client";

import React from 'react';
import Link from 'next/link';
import { FaChartBar } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import '../../globals.css'; // Ensure global styles are imported

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <div className='grid grid-cols-1 gap-4 p-6 h-140 w-full'>
      <div className='flex gap-4 items-center'>
        <MdDashboard size={30} />
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
        <div className='bg-white rounded-lg shadow p-4'>
            <p className='text-gray-700'>Welcome to your dashboard!</p>
            <p className='text-gray-500'>Here you can manage your data and view statistics.</p>
        </div>
        <Link href={'/dashboard'} className={` rounded-lg shadow p-4 ${pathname === '/dashboard' ? 'bg-[var(--primary-color)] text-white font-bold' : 'text-black font-bold hover:bg-gray-200 '}`}>
          <div className={"flex gap-4 items-center"}>
           <FaChartBar />  Stats
          </div>
        </Link>
        <Link href={'/dashboard/commandes'} className={` rounded-lg shadow p-4 ${pathname === '/dashboard/commandes' ? 'bg-[var(--primary-color)] text-white font-bold' : 'text-black font-bold hover:bg-gray-200 '}`}>
          <div className={"flex gap-4 items-center"}>
           <HiOutlineClipboardList /> Commandes
          </div>
        </Link>
        <Link href={'/dashboard/produits'} className={` rounded-lg shadow p-4 ${pathname === '/dashboard/produits' ? 'bg-[var(--primary-color)] text-white font-bold' : 'text-black font-bold hover:bg-gray-200'}`}>
          <div className={"flex gap-4 items-center"}>
            <BsBoxSeam /> Produits
          </div>
        </Link>
        <Link href={'/dashboard/utilisateurs'} className={` rounded-lg shadow p-4 ${pathname === '/dashboard/utilisateurs' ? 'bg-[var(--primary-color)] text-white font-bold' : 'text-black font-bold hover:bg-gray-200'}`}>  
          <div className={"flex gap-4 items-center"}>
           <FiUsers /> Utilisateurs
          </div>
        </Link>
        <Link href={'/dashboard/produits/nouveau'} className={` rounded-lg shadow p-4 ${pathname === '/dashboard/produits/nouveau' ? 'bg-[var(--primary-color)] text-white font-bold' : 'text-black font-bold hover:bg-gray-200'}`}>  
          <div className={"flex gap-4 items-center"}>
           <AiOutlinePlusCircle /> Ajout produit
          </div>
        </Link>
        
    </div>
  )
}
