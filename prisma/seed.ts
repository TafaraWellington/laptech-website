import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    brand: 'Dell',
    model: 'Workstation Precision 3560',
    processor: '11th Gen Intel Core i7-1185G7 @3.00GHz',
    ram: '16GB DDR4 RAM',
    storage: '512GB M.2 NVMe SSD',
    display: '15.6 inch FHD Screen',
    graphics: 'NVIDIA T500 2GB GPU',
    features: 'Backlit Keyboard',
    originalPrice: 9000,
    promoPrice: 7000,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'Lenovo',
    model: 'Thinkpad T14 Gen 2',
    processor: 'AMD Ryzen 5 PRO 5650U',
    ram: '8GB DDR4 RAM',
    storage: '256GB M.2 NVMe SSD',
    display: '14-inch FHD IPS Screen',
    features: 'Backlit Keyboard',
    originalPrice: 6500,
    promoPrice: 6500,
    quantity: 2,
    isNew: false
  },
  {
    brand: 'Dell',
    model: 'Latitude E7440',
    processor: 'Intel Core i7-4600U Processor',
    ram: '8GB RAM',
    storage: '256GB SSD',
    display: '14" FHD IPS Display',
    features: 'Backlit Keyboard, Built-in LTE Connectivity, Battery Status: Excellent',
    promoPrice: 4500,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'ASUS',
    model: 'Gaming PC (AirFace Pure Series Case)',
    processor: '12th Gen Intel Core i7-12700 (20 Threads)',
    ram: '16GB DDR5 RAM',
    storage: '1TB M.2 NVMe SSD',
    features: 'High-Airflow Gaming Chassis, Excellent for Gaming/Design',
    promoPrice: 8000,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'Apple',
    model: 'Macbook Pro 16" 2019',
    processor: 'Intel Core i7 2.60GHz',
    ram: '16GB RAM',
    storage: '512GB M.2 NVMe SSD',
    graphics: 'Intel UHD Graphics 630',
    features: 'Touch Bar & Touch ID, Mac OS Installed, Apple Charger',
    promoPrice: 10500,
    quantity: 3,
    isNew: false
  },
  {
    brand: 'Dell',
    model: 'Latitude 5400',
    processor: '8th Gen Intel Core i7',
    ram: '16GB DDR4 RAM',
    storage: '256GB M.2 NVMe SSD',
    display: '14inch FHD Screen',
    promoPrice: 5500,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'Lenovo',
    model: 'Thinkpad X13 Yoga Gen 3',
    processor: '12th Gen Intel Core i5',
    ram: '16GB DDR4 RAM',
    storage: '256GB M.2 NVMe',
    display: '13.3inch FHD+ (1920x1200) Touch screen',
    features: 'Stylus pen, Inbuilt LTE Modem, Backlit Keyboard',
    originalPrice: 9500,
    promoPrice: 8500,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'Lenovo',
    model: 'Thinkpad X390',
    processor: 'Core i5 8th Gen',
    ram: '8GB DDR4 RAM',
    storage: '256GB M.2 NVMe SSD',
    display: '13.3 Inch FHD Screen',
    features: 'Battery - Excellent',
    promoPrice: 4800,
    quantity: 1,
    isNew: false
  },
  {
    brand: 'Dell',
    model: 'Pro 14 Plus',
    processor: '14th Gen Intel Core ultra 5 235U vPro',
    ram: '16GB DDR5 RAM',
    storage: '512GB M.2 NVMe SSD',
    display: '14inch FHD+ IPS Screen 4G',
    features: 'Backlit Keyboard, Windows 11 Pro',
    originalPrice: 16000,
    promoPrice: 15000,
    quantity: 1,
    isNew: true
  },
  {
    brand: 'Dell',
    model: 'Latitude 5350 AI',
    processor: 'Core Ultra 7 165U',
    ram: '16GB DDR5 RAM',
    storage: '512GB M.2 NVMe SSD',
    display: '13.3" (1920x1080) FHD',
    features: 'Integrated Intel Graphics & Win 11 Pro, Fingerprint Reader, Smart Card Reader',
    promoPrice: 18500,
    quantity: 4,
    isNew: true
  },
  {
    brand: 'Lenovo',
    model: 'X1 2-in-1 Gen 9 Convertible Laptop',
    processor: 'Intel Core M Ultra 7 155U',
    ram: '32GB DDR5 RAM',
    storage: '512GB M.2 NVMe SSD',
    display: '14-inch Touch screen, x360-degree',
    features: 'Windows 11 Pro',
    originalPrice: 23000,
    promoPrice: 19000,
    quantity: 1,
    isNew: false
  }
]

async function main() {
  console.log('Start seeding ...')
  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
