// app/produits/[slug]/page.tsx (ou .js)

import ProductPage from '../components/productPage'; 

// La fonction 'Page' peut rester async si vous faites du fetching de données côté serveur,
// mais elle doit être marquée 'use client' pour pouvoir rendre un composant client avec des hooks.
// Note : Si vous n'utilisez pas await params.slug et que vous le passez directement, la fonction n'a pas besoin d'être async.
export default async function Page({ params }: { params: Promise<{ slug: string }>}) { // On enlève async et Promise
  // Dans un Client Component, params.slug est directement disponible
  const {slug} = await params;
  return <ProductPage params={{ slug }} />;
}