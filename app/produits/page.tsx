"use client";


import React, { useState, useEffect } from 'react';

import type { Produit } from '../types/index';

import Article from '../components/article';

import Link from 'next/link';

import { ProduitsUser } from '../services/produits';

import NoSearchResults from '../components/noSearchResults';
import SidebarFilters from '../components/SidebarFilters';


export default function ProductListing() {

  const [allProducts, setAllProducts] = useState<Produit[]>([]);
  const [state, setState] = useState<Produit[]>([]);
  const [input, setInput] = useState('');


  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCategoryShoes, setSelectedCategoryShoes] = useState('');
  const [selectedPointure, setSelectedPointure] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isOpen, setIsopen] = useState<boolean>(false)


  // Chargement des produits depuis l'API

  useEffect(() => {

    const fetchProduits = async () => {

      try {

        const data = await ProduitsUser();

        setAllProducts(data);

        setState(data);

      } catch (error) {

        console.error("Erreur lors du chargement des produits :", error);

      }

    };

    fetchProduits();

  }, []);


  // Filtres

  useEffect(() => {

    let filtered = [...allProducts];


    if (selectedCategory !== 'All') {

      filtered = filtered.filter((p) =>

        p.genre.toLowerCase() === selectedCategory.toLowerCase()

      );

    }


    if (selectedCategoryShoes) {

      filtered = filtered.filter((p) =>

        p.categorie.toLowerCase() === selectedCategoryShoes.toLowerCase()

      );

    }


    if (selectedPointure !== null) {

      filtered = filtered.filter((p) => {

        const sizes = typeof p.pointuresDisponibles === 'string'

          ? p.pointuresDisponibles.split(',').map(Number)

          : p.pointuresDisponibles;

        return sizes.includes(selectedPointure);

      });

    }


    if (selectedColor) {

      filtered = filtered.filter((p) => {

        const couleurs = typeof p.couleursDisponibles === 'string'

          ? p.couleursDisponibles.split(',').map(c => c.trim().toLowerCase())

          : (p.couleursDisponibles as string[]).map((c:string) => c.toLowerCase());

        return couleurs.includes(selectedColor.toLowerCase());

      });

    }


    if (selectedPrice) {

      const [minStr, maxStr] = selectedPrice.replace(/\$/g, '').split(/\s*-\s*/);

      const min = parseFloat(minStr);

      const max = parseFloat(maxStr);

      filtered = filtered.filter((p) => p.prix >= min && p.prix <= max);

    }


    if (input) {

      filtered = filtered.filter((p) =>

        p.nom.toLowerCase().includes(input.toLowerCase())

      );

    }


    setState(filtered);

  }, [

    selectedCategory,

    selectedCategoryShoes,

    selectedPointure,

    selectedColor,

    selectedPrice,

    input,

    allProducts,

  ]);

  const openSidebar = ()=>{
    setIsopen((prev)=> !prev)
  }


  return (

    <div>

      {/* Titre + Search */}

      <div className="px-8 py-6 text-center">

        <h2 className="[font-size:var(--police-secondary)] font-[var(--font-titre)] mb-2">

          Our Collection Of Products

        </h2>

        <div className="flex items-center mx-auto gap-2 mb-4 border rounded-full px-4 py-2 w-full max-w-md">

          <input

            type="text"

            placeholder="Search An Item"

            value={input}

            onChange={(e) => setInput(e.target.value)}

            className="flex-grow bg-transparent focus:outline-none w-full"

          />

        </div>

        <p className="text-sm text-gray-600">

          Showing {state.length} item(s)

        </p>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-8 ">

        {/* sidebar pour la version mobile */}
        
        <SidebarFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCategoryShoes={selectedCategoryShoes}
          setSelectedCategoryShoes={setSelectedCategoryShoes}
          selectedPointure={selectedPointure}
          setSelectedPointure={setSelectedPointure}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          openSidebar={openSidebar}
          isOpen={isOpen}
        />

 
        <div className="flex flex-col gap-1  sm:grid-cols-2 lg:grid-cols-3 col-span-2 ">

          <button onClick={() => openSidebar()} className="bg-black text-white text-2xl p-2 block md:hidden mb-2 ">
            filter
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-2 gap-6 ">
            {state.length > 0 ? (

            state.map((product, idx) => {

              const imagesArray = product.images?.split(',') || [];

              return (

                <Link

                  href={`/produits/${product.slug}`}

                  key={idx}

                  className="relative w-full h-80 rounded-xl overflow-hidden group shadow-lg"

                >

                  {/* Image de fond */}

                  <div

                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"

                    style={{

                      backgroundImage:

                        imagesArray.length > 0 ? `url('/${imagesArray[0]}')` : 'none',

                    }}

                  ></div>


                  {/* Overlay dégradé */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>


                  {/* Étiquette de remise */}

                  {product.remise > 0 && (

                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow">

                      -{product.remise}%

                    </div>

                  )}


                  {/* Infos produit */}

                  <Article product={product} />

                </Link>

              );

            })

          ) : (

            <NoSearchResults />

          )}
          </div>

        </div>

      </div>

    </div>

  );

}