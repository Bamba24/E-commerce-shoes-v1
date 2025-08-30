// app/dashboard/statsClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { StatistiquesUser } from './services/statistiques';

export default function StatsClient() {
  const [stats, setStats] = useState([
    {
      totalProduits: 0,
      totalCommandes: 0,
      totalUtilisateurs: 0,
      revenusTotaux: 0,
      dernierClient: '',
      produitTopVente: '',
      derniereCommandeDate: '',
      revenusParJour: [],
      totalRevenus: 0,
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatistiquesUser();
        setStats(data);
      } catch (error) {
        console.error('Erreur chargement stats :', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Produits',
      value: stats[0].totalProduits,
      icon: <FaBox className="text-blue-500 text-3xl" />,
      color: 'text-blue-600',
    },
    {
      label: 'Commandes',
      value: stats[0].totalCommandes,
      icon: <FaShoppingCart className="text-green-500 text-3xl" />,
      color: 'text-green-600',
    },
    {
      label: 'Utilisateurs',
      value: stats[0].totalUtilisateurs,
      icon: <FaUsers className="text-purple-500 text-3xl" />,
      color: 'text-purple-600',
    },
    {
      label: 'Revenus (fcfa)',
      value: stats[0].totalRevenus.toLocaleString(),
      icon: <FaMoneyBillWave className="text-red-500 text-3xl" />,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="w-full col-span-3 gap-4 p-6">
      <h2 className="text-2xl font-bold mb-6">Statistiques Globales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white border shadow rounded-xl p-5 flex items-center gap-4"
          >
            <div>{stat.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border shadow rounded-xl p-5">
        <p className="text-gray-600 text-sm mb-4">Revenus par jour</p>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats[0].revenusParJour || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenu" fill="#fb2c36" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}