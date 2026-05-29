"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  brand: string;
  model: string;
  processor?: string | null;
  ram?: string | null;
  storage?: string | null;
  display?: string | null;
  graphics?: string | null;
  features?: string | null;
  originalPrice?: number | null;
  promoPrice: number;
  quantity: number;
  imageUrl?: string | null;
  isNew: boolean;
};

export default function ProductCatalog({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedRam, setSelectedRam] = useState<string>("All");
  const [selectedStorage, setSelectedStorage] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(30000);

  // Extract unique brands, ram, and storage for filter options
  const brands = ["All", ...Array.from(new Set(initialProducts.map(p => p.brand).filter(Boolean)))];
  
  // A simple heuristic to extract common RAM sizes (e.g., "8GB", "16GB", "32GB")
  const ramOptions = ["All", "8GB", "16GB", "32GB"];
  const storageOptions = ["All", "256GB", "512GB", "1TB"];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Search filter
      const matchesSearch = 
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.features && product.features.toLowerCase().includes(searchQuery.toLowerCase()));

      // Brand filter
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;

      // RAM filter (basic string inclusion check)
      const matchesRam = selectedRam === "All" || (product.ram && product.ram.includes(selectedRam));

      // Storage filter (basic string inclusion check)
      const matchesStorage = selectedStorage === "All" || (product.storage && product.storage.includes(selectedStorage));

      // Price filter
      const matchesPrice = product.promoPrice <= maxPrice;

      return matchesSearch && matchesBrand && matchesRam && matchesStorage && matchesPrice;
    });
  }, [initialProducts, searchQuery, selectedBrand, selectedRam, selectedStorage, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          LAPTECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">DEALS</span>
        </h2>
        <p className="text-gray-400 text-lg">Limited Stock — Find Your Perfect Machine!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6 bg-slate-900/30 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl h-fit sticky top-24">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🔍</span> Filter Deals
          </h3>

          {/* Search */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Search models, features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none text-white placeholder-slate-600 transition-all"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Brand</label>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none text-white appearance-none cursor-pointer"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* RAM */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Minimum RAM</label>
            <div className="flex flex-wrap gap-2">
              {ramOptions.map(ram => (
                <button
                  key={ram}
                  onClick={() => setSelectedRam(ram)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedRam === ram 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {ram}
                </button>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Storage</label>
            <div className="flex flex-wrap gap-2">
              {storageOptions.map(storage => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStorage === storage 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Max Price</label>
              <span className="text-xs font-bold text-amber-400">R{maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="30000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedBrand("All");
              setSelectedRam("All");
              setSelectedStorage("All");
              setMaxPrice(30000);
            }}
            className="w-full mt-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-transparent border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800/50 rounded-2xl bg-slate-900/20">
              <span className="text-5xl mb-4">🕵️‍♂️</span>
              <h3 className="text-lg font-bold text-white mb-2">No matching deals found</h3>
              <p className="text-slate-400 text-sm text-center max-w-sm">
                Try adjusting your filters or expanding your price range to see more premium laptops.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrand("All");
                  setSelectedRam("All");
                  setSelectedStorage("All");
                  setMaxPrice(30000);
                }}
                className="mt-6 text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors cursor-pointer underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
