import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ProductCard from "@/components/ProductCard";
import { PrismaClient } from "@prisma/client";

// Re-use the mock data from seed script as a fallback in case DB is not connected yet
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
    storage: "256GB SSD", display: "14\" FHD IPS Display",
    features: "Backlit Keyboard, Built-in LTE", promoPrice: 4500, quantity: 1, isNew: false
  },
  {
    id: "4", brand: "ASUS", model: "Gaming PC",
    processor: "12th Gen Intel Core i7-12700", ram: "16GB DDR5 RAM",
    storage: "1TB M.2 NVMe SSD", features: "High-Airflow Gaming Chassis",
    promoPrice: 8000, quantity: 1, isNew: false
  },
  {
    id: "5", brand: "Apple", model: "Macbook Pro 16\" 2019",
    processor: "Intel Core i7 2.60GHz", ram: "16GB RAM",
    storage: "512GB M.2 NVMe SSD", graphics: "Intel UHD Graphics 630",
    features: "Touch Bar & Touch ID", promoPrice: 10500, quantity: 3, isNew: false
  },
  {
    id: "6", brand: "Lenovo", model: "Thinkpad X13 Yoga Gen 3",
    processor: "12th Gen Intel Core i5", ram: "16GB DDR4 RAM",
    storage: "256GB M.2 NVMe", display: "13.3inch FHD+ Touch screen",
    originalPrice: 9500, promoPrice: 8500, quantity: 1, isNew: false
  },
  {
    id: "7", brand: "Dell", model: "Pro 14 Plus",
    processor: "14th Gen Intel Core ultra 5", ram: "16GB DDR5 RAM",
    storage: "512GB M.2 NVMe SSD", display: "14inch FHD+ IPS",
    originalPrice: 16000, promoPrice: 15000, quantity: 1, isNew: true
  },
  {
    id: "8", brand: "Dell", model: "Latitude 5350 AI",
    processor: "Core Ultra 7 165U", ram: "16GB DDR5 RAM",
    storage: "512GB M.2 NVMe SSD", display: "13.3\" FHD",
    promoPrice: 18500, quantity: 4, isNew: true
  },
  {
    id: "9", brand: "Lenovo", model: "X1 2-in-1 Gen 9",
    processor: "Intel Core M Ultra 7 155U", ram: "32GB DDR5 RAM",
    storage: "512GB M.2 NVMe SSD", display: "14-inch Touch screen",
    originalPrice: 23000, promoPrice: 19000, quantity: 1, isNew: false
  }
]

export default async function Home() {
  let products = [];
  
  try {
    const prisma = new PrismaClient();
    products = await prisma.product.findMany({
      orderBy: { promoPrice: 'desc' }
    });
    // Disconnect to avoid exhausting connections in dev
    await prisma.$disconnect();
  } catch (error) {
    console.error("Database connection failed, falling back to mock data");
    // Fallback to mock data if database isn't running yet
    products = mockProducts as any[];
  }

  // If DB is empty, use mock data
  if (products.length === 0) {
    products = mockProducts as any[];
  }

  return (
    <>
      <Hero />
      <Services />
      <section id="deals" className="py-20 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              LAPTECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">DEALS</span>
            </h2>
            <p className="text-gray-400 text-lg">Limited Stock — First Come, First Served!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 border border-gray-800 rounded-2xl bg-gray-900/50 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="pt-4 md:pt-0">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Tech</h3>
              <p className="text-gray-400 text-sm">Fast and Efficient Premium Devices built to perform.</p>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Tested & Certified</h3>
              <p className="text-gray-400 text-sm">Rigorously tested for reliability and peak performance.</p>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Refurbished to Perfection</h3>
              <p className="text-gray-400 text-sm">Carefully restored to meet the highest standards.</p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
