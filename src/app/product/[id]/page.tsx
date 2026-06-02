import { supabase } from "@/lib/supabase";
export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductImageCarousel from "@/components/ProductImageCarousel";

const mockProducts = [
  {
    id: "1", brand: "Dell", model: "Workstation Precision 3560",
    processor: "11th Gen Intel Core i7-1185G7 @3.00GHz", ram: "16GB DDR4 RAM",
    storage: "512GB M.2 NVMe SSD", display: "15.6 inch FHD Screen",
    graphics: "NVIDIA T500 2GB GPU", features: "Backlit Keyboard",
    originalPrice: 9000, promoPrice: 7000, quantity: 1, isNew: false
  },
  {
    id: "2", brand: "Lenovo", model: "Thinkpad T14 Gen 2",
    processor: "AMD Ryzen 5 PRO 5650U", ram: "8GB DDR4 RAM",
    storage: "256GB M.2 NVMe SSD", display: "14-inch FHD IPS Screen",
    features: "Backlit Keyboard", originalPrice: 6500, promoPrice: 6500, quantity: 2, isNew: false
  },
  {
    id: "3", brand: "Dell", model: "Latitude E7440",
    processor: "Intel Core i7-4600U Processor", ram: "8GB RAM",
    storage: "256GB SSD", display: '14" FHD IPS Display',
    features: "Backlit Keyboard, Built-in LTE Connectivity, Battery Status: Excellent",
    originalPrice: null, promoPrice: 4500, quantity: 1, isNew: false
  }
];

import PaystackButton from '@/components/PaystackButton';

// Helper to determine neon glow theme color based on laptop brand (reused from ProductCard for consistency)
const getBrandTheme = (brand: string) => {
  const b = brand.toLowerCase();
  if (b.includes('dell')) return { from: 'from-blue-600/20', to: 'to-cyan-600/20', text: 'text-blue-400', badgeBg: 'bg-blue-950/80 border-blue-500/30 text-blue-300' };
  if (b.includes('lenovo')) return { from: 'from-red-600/20', to: 'to-amber-600/20', text: 'text-red-400', badgeBg: 'bg-red-950/80 border-red-500/30 text-red-300' };
  if (b.includes('apple')) return { from: 'from-slate-400/20', to: 'to-slate-600/20', text: 'text-slate-200', badgeBg: 'bg-slate-900/80 border-slate-700/50 text-slate-300' };
  if (b.includes('asus')) return { from: 'from-purple-600/20', to: 'to-pink-600/20', text: 'text-purple-400', badgeBg: 'bg-purple-950/80 border-purple-500/30 text-purple-300' };
  return { from: 'from-amber-600/20', to: 'to-yellow-600/20', text: 'text-amber-400', badgeBg: 'bg-amber-950/80 border-amber-500/30 text-amber-300' };
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;

  try {
    // Try to fetch from Supabase DB
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    product = data;
  } catch (error) {
    console.error("Supabase connection failed, falling back to mock data", error);
  }

  // Fallback to mock data if DB is empty or fails
  if (!product) {
    product = mockProducts.find((p: any) => p.id === id);
  }

  // If still not found, return 404
  if (!product) {
    notFound();
  }

  const theme = getBrandTheme(product.brand);

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/#deals" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold tracking-wider uppercase">
          <span>←</span> Back to Deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Image / Visualization */}
          <div className={`relative rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden flex flex-col justify-center items-center min-h-[400px] lg:min-h-[600px] shadow-2xl`}>
            
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} opacity-50`}></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            
            <div className="absolute w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>

            {/* High-fidelity Vector Device mockup (scaled up) or Image Carousel */}
            {product.id === "1" || product.model.includes("Workstation Precision") ? (
              <ProductImageCarousel images={[
                "/uploads/Laptech deals/Dell Precision 3560 No1 (1).png",
                "/uploads/Laptech deals/Dell Precision 3560 No1 (2).png",
                "/uploads/Laptech deals/Dell Precision 3560 No1 (3).png",
                "/uploads/Laptech deals/Dell Precision 3560 No1 (4).png"
              ]} />
            ) : (
              <div className="relative w-80 h-56 flex flex-col items-center justify-end z-10 scale-125 md:scale-150">
                <div className="relative w-72 h-44 bg-slate-950 rounded-lg border-2 border-slate-700 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/5"></div>
                  <div className="flex justify-between items-center z-10">
                    <span className={`text-xs font-mono tracking-widest font-semibold ${theme.text}`}>{product.brand}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                  
                  <div className="w-full space-y-2 z-10 mb-2">
                    <div className="h-2 w-2/3 bg-slate-800 rounded"></div>
                    <div className="h-1.5 w-full bg-slate-800/50 rounded"></div>
                    <div className="h-1.5 w-1/2 bg-slate-800/50 rounded"></div>
                  </div>
                </div>
                
                <div className="w-80 h-3 bg-slate-800 rounded-t-sm border-t border-slate-600 relative z-20"></div>
                <div className="w-80 h-4 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-lg shadow-xl border-b-2 border-slate-950 flex justify-center relative z-20">
                  <div className="w-16 h-2 bg-slate-800/80 rounded-b-sm border-t border-slate-950/20"></div>
                </div>
              </div>
            )}

            {product.isNew && (
              <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full z-10 shadow-lg tracking-widest">
                NEW ARRIVAL
              </div>
            )}
          </div>

          {/* Right Column: Details & Specs */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className={`border px-3 py-1 rounded text-xs font-bold tracking-widest uppercase ${theme.badgeBg}`}>
                {product.brand}
              </span>
              <span className="text-slate-400 text-sm font-medium">
                {product.quantity > 0 ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> In Stock ({product.quantity})
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span> Sold Out
                  </span>
                )}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {product.model}
            </h1>

            {/* Price Section */}
            <div className="mb-8 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-1">Our Price</div>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-amber-400 tracking-tight">
                    R{(product.promoPrice || product.originalPrice || 0).toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.promoPrice || 0) && (
                    <span className="text-slate-500 text-lg line-through mb-1 font-medium">
                      R{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <PaystackButton amount={product.promoPrice || product.originalPrice || 0} productName={`${product.brand} ${product.model}`} />
                <a href={`https://wa.me/27615246470?text=Hi Laptech, I am interested in the ${product.brand} ${product.model} for R${product.promoPrice}`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-full bg-transparent hover:bg-emerald-600/10 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2">
                  <span>📱</span> Enquire via WhatsApp
                </a>
              </div>
            </div>

            {/* Specifications Grid */}
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Technical Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {product.processor && (
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Processor (CPU)</div>
                  <div className="text-white font-medium">{product.processor}</div>
                </div>
              )}
              {product.ram && (
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Memory (RAM)</div>
                  <div className="text-white font-medium">{product.ram}</div>
                </div>
              )}
              {product.storage && (
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Storage (SSD/HDD)</div>
                  <div className="text-white font-medium">{product.storage}</div>
                </div>
              )}
              {product.display && (
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Display</div>
                  <div className="text-white font-medium">{product.display}</div>
                </div>
              )}
              {product.graphics && (
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Graphics (GPU)</div>
                  <div className="text-white font-medium">{product.graphics}</div>
                </div>
              )}
            </div>

            {/* Features & Guarantees */}
            {product.features && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.split(',').map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Standard Warranty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Tested & Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Secure Delivery</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
