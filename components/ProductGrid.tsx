'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  image: string | null;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.items || []);
    }
    fetchProducts();
  }, []);

  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold mb-8">Shop</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
          >
            {p.image && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            {p.description && (
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
            )}
            <p className="mt-2 font-bold">
              ${p.price} {p.currency}
            </p>
            <button className="btn btn-brand mt-4 w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}