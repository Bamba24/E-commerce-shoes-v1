import React from "react";
import HomePage from "./components/homePage";
import Products from "./components/products";
import Category from "./components/category";
import PopularProducts from "./components/popularProduct";
import Proportion from "./components/proportion";
import Testimonials from "./components/testimonials";
import Faq from "./components/faq";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <section className="py-25 bg-[var(--primary-color)] px-[var(--padding-x-section)] [background-image:url('/images/homepage.jpg')] bg-cover bg-center bg-no-repeat">
      <HomePage />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--secondary-color)]">
      <Products />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--secondary-color)]">
      <Category />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--secondary-color)]">
      <PopularProducts />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--primary-color)] text-white">
      <Proportion />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--secondary-color)]">
      <Testimonials />
      </section>
      <section className="py-[var(--padding-section)] px-[var(--padding-x-section)] bg-[var(--secondary-color)]">
      <Faq />
      </section>
    </div>
  );
}
