"use client";


import dynamic from 'next/dynamic'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
const PaystackButton = dynamic(() => import('./PaystackButton'), { ssr: false })

type ProductUI = {
  id: string
  brand: string
  model: string
  processor?: string | null
  ram?: string | null
  storage?: string | null
  display?: string | null
  graphics?: string | null
  features?: string | null
  originalPrice?: number | null
  promoPrice?: number | null
  quantity: number
  isNew: boolean
}

// Helper to determine neon glow theme color based on laptop brand
const getBrandTheme = (brand: string) => {
  const b = brand.toLowerCase();
  if (b.includes('dell')) return { from: 'from-blue-600/20', to: 'to-cyan-600/20', border: 'group-hover:border-blue-500/50', text: 'text-blue-400', badgeBg: 'bg-blue-950/80 border-blue-500/30 text-blue-300' };
  if (b.includes('lenovo')) return { from: 'from-red-600/20', to: 'to-amber-600/20', border: 'group-hover:border-red-500/50', text: 'text-red-400', badgeBg: 'bg-red-950/80 border-red-500/30 text-red-300' };
  if (b.includes('apple')) return { from: 'from-slate-400/20', to: 'to-slate-600/20', border: 'group-hover:border-slate-400/50', text: 'text-slate-200', badgeBg: 'bg-slate-900/80 border-slate-700/50 text-slate-300' };
  if (b.includes('asus')) return { from: 'from-purple-600/20', to: 'to-pink-600/20', border: 'group-hover:border-purple-500/50', text: 'text-purple-400', badgeBg: 'bg-purple-950/80 border-purple-500/30 text-purple-300' };
  return { from: 'from-amber-600/20', to: 'to-yellow-600/20', border: 'group-hover:border-amber-500/50', text: 'text-amber-400', badgeBg: 'bg-amber-950/80 border-amber-500/30 text-amber-300' };
};

export default function ProductCard({ product }: { product: ProductUI }) {
  const theme = getBrandTheme(product.brand);

  return (
    <div className={`group flex flex-col h-full relative bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 ${theme.border} transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_0_35px_rgba(30,41,59,0.5)]`}>
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${product.brand} ${product.model}`}></Link>
      
      {product.isNew && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full z-10 shadow-lg tracking-wider">
          NEW
        </div>
      )}
      
      {/* Interactive, dynamic device visualization SVG */}
      <div className={`h-48 bg-gradient-to-br ${theme.from} ${theme.to} w-full flex items-center justify-center p-6 relative overflow-hidden border-b border-slate-800/60`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        
        {/* Animated ambient light orb */}
        <div className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

        {/* High-fidelity Vector Device mockup */}
        <div className="relative w-40 h-28 flex flex-col items-center justify-end transform group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-500 ease-out z-10">
          {/* Laptop Screen */}
          <div className="relative w-36 h-22 bg-slate-950 rounded-md border border-slate-700 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden">
            {/* Screen contents & glowing light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/5 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-center z-10">
              <span className={`text-[8px] font-mono tracking-widest font-semibold ${theme.text}`}>{product.brand}</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            
            {/* Mock graphics element */}
            <div className="w-full space-y-1 z-10 mb-1">
              <div className="h-1.5 w-2/3 bg-slate-800 rounded"></div>
              <div className="h-1 w-full bg-slate-800/50 rounded"></div>
              <div className="h-1 w-1/2 bg-slate-800/50 rounded"></div>
            </div>
          </div>
          
          {/* Laptop Hinge & keyboard base */}
          <div className="w-40 h-1.5 bg-slate-800 rounded-t-sm border-t border-slate-600 relative z-20"></div>
          {/* Lower bottom chassis */}
          <div className="w-40 h-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-md shadow-lg border-b border-slate-950 flex justify-center relative z-20">
            {/* Trackpad */}
            <div className="w-8 h-1 bg-slate-800/80 rounded-b-sm border-t border-slate-950/20"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className={`border px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${theme.badgeBg}`}>
            {product.brand}
          </span>
          <span className="text-slate-400 text-xs font-medium ml-auto">
            {product.quantity > 0 ? `${product.quantity} Available` : 'Sold Out'}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {product.model}
        </h3>
        
        <div className="space-y-2 mb-6 flex-grow text-xs text-slate-300">
          {product.processor && (
            <div className="flex items-center gap-2.5">
              <span className="text-slate-500 text-[10px] bg-slate-800/50 p-1 rounded">CPU</span>
              <span className="truncate">{product.processor}</span>
            </div>
          )}
          {product.ram && (
            <div className="flex items-center gap-2.5">
              <span className="text-slate-500 text-[10px] bg-slate-800/50 p-1 rounded">RAM</span>
              <span className="truncate">{product.ram}</span>
            </div>
          )}
          {product.storage && (
            <div className="flex items-center gap-2.5">
              <span className="text-slate-500 text-[10px] bg-slate-800/50 p-1 rounded">SSD</span>
              <span className="truncate">{product.storage}</span>
            </div>
          )}
          {product.display && (
            <div className="flex items-center gap-2.5">
              <span className="text-slate-500 text-[10px] bg-slate-800/50 p-1 rounded">DISP</span>
              <span className="truncate">{product.display}</span>
            </div>
          )}
          {product.features && (
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-start gap-1.5 text-slate-400">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span className="text-[11px] leading-relaxed italic">{product.features}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div>
            {product.originalPrice && product.originalPrice > (product.promoPrice || 0) && (
              <div className="text-slate-500 text-[10px] line-through mb-0.5 tracking-wide">
                R{formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-xl font-extrabold text-amber-400 tracking-tight">
              R{formatPrice(product.promoPrice || product.originalPrice || 0)}
            </div>
          </div>
          
          <div className="flex gap-2 relative z-10">
            <a href={`https://wa.me/27615246470?text=Hi Laptech, I am interested in the ${product.brand} ${product.model} for R${product.promoPrice}`} 
               target="_blank" 
               rel="noreferrer"
               className="bg-transparent hover:bg-emerald-600/10 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center justify-center">
              Enquire
            </a>
            <PaystackButton amount={product.promoPrice || product.originalPrice || 0} productName={`${product.brand} ${product.model}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
