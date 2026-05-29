import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[#090d16]/80 text-white border-b border-slate-800/60 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tighter group-hover:scale-105 transition-transform duration-300">
                LT
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-widest leading-none group-hover:text-blue-400 transition-colors">
                  LAPTECH
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest leading-none mt-1">
                  IT Solutions
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
            <Link href="/" className="text-slate-300 hover:text-white hover:scale-105 transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">
              Home
            </Link>
            <Link href="#deals" className="text-slate-300 hover:text-white hover:scale-105 transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">
              Laptop Deals
            </Link>
            <Link href="#contact" className="text-slate-300 hover:text-white hover:scale-105 transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/c/27615246470" 
              target="_blank" 
              rel="noreferrer" 
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
