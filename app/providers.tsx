// app/providers.tsx
"use client";

import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'mui-sonner';
import HeaderStatus from './dashboard/components/headerStatus';
import Footer from './components/footer'; // Assurez-vous d'avoir le bon chemin ici

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HeaderStatus />
      {children}
      <Toaster />
      <Footer />
    </AuthProvider>
  );
}