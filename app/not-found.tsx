import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen text-gray-200 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-black">Oups ! La page que vous cherchez nexiste pas.</p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-700 text-white rounded transition"
      >
        <FaArrowLeft />
        Retour à laccueil
      </Link>
    </div>
  );
}
