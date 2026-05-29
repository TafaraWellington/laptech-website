import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#06090f] text-slate-400 py-16 border-t border-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">LAPTECH</span> IT SOLUTIONS
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Reliable High-Performance Devices. Upgrade your tech game with our rigorously tested laptops and top-tier IT gadgets. Excellence guaranteed.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Corporate Office</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-500 text-xs mt-1">📍</span>
              <span className="leading-relaxed">
                Unit 14, The Home Gallery, 28-48 Richards Drive, Midrand, South Africa
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-blue-500 text-xs">✉</span>
              <a href="mailto:james@laptechitsolutions.co.za" className="hover:text-blue-400 transition-colors">
                james@laptechitsolutions.co.za
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-500 text-xs">☎</span>
              <a href="https://wa.me/27614916636" className="hover:text-emerald-400 transition-colors font-semibold">
                +27 61 491 6636 (Cell / WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-500 text-xs">☎</span>
              <a href="https://wa.me/27615246470" className="hover:text-emerald-400 transition-colors">
                +27 61 524 6470 (Sales / Support)
              </a>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect With Us</h4>
          <p className="text-xs text-slate-500 leading-normal">
            Stay updated with our latest stock arrivals, limited-time flash sales, and exclusive client offers.
          </p>
          <a 
            href="https://whatsapp.com/channel/0029VbCNwgz4dTnHwkSxvX2S" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            Join our WhatsApp Channel
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900/60 text-xs text-center text-slate-600">
        &copy; {new Date().getFullYear()} LapTech IT Solutions. All rights reserved. Crafted for peak efficiency.
      </div>
    </footer>
  )
}
