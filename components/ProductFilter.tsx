'use client';

import { useState } from 'react';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCount: number;
}

export default function ProductFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  productCount 
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Our Products</h2>
          <p className="text-gray-600">
            {productCount} {productCount === 1 ? 'product' : 'products'} 
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden btn btn-outline flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
          Filter Categories
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:block`}>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategoryChange(category);
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-brand text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-brand/10 hover:text-brand hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}