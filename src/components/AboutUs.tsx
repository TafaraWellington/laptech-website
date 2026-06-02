export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-[#090d16] border-y border-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-950/45 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.08)]">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            LAPTECH IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">SOLUTIONS</span>
          </h2>
          <p className="text-lg text-slate-300 font-medium">Reliable High-Performance Devices & ICT Solutions</p>
          <p className="text-sm text-amber-400 font-bold tracking-widest uppercase mt-2">Quality Tech | Fast & Efficient | Tested & Certified</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Main About Text */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">About Us</h3>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                LapTech IT Solutions specializes in supplying high-quality new and refurbished laptops, PCs, accessories, and professional ICT infrastructure solutions. We are committed to delivering reliable technology products and dependable technical support services tailored for students, professionals, businesses, schools, and everyday users.
              </p>
              <p>
                We are a 100% Black-owned ICT company delivering high-quality technology solutions across South Africa. We specialize in ICT infrastructure, network configurations, desktop support, hardware sales, and connectivity solutions. Fostering diversity and inclusion is a key driver of our success.
              </p>
              <p className="text-blue-200 border-l-2 border-blue-500 pl-4 italic">
                Our mission is to provide affordable, performance-driven technology solutions while ensuring customer satisfaction through quality assurance, professional support, and trusted service delivery.
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-3">Our Target Audience</h4>
              <div className="flex flex-wrap gap-2">
                {['Students', 'Professionals', 'Small businesses', 'Schools and institutions', 'Everyday users', 'Budget-conscious customers'].map(audience => (
                  <span key={audience} className="bg-slate-800 border border-slate-700 px-3 py-1 text-sm rounded-full text-slate-300">{audience}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Services Highlight */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl h-full">
               <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Tech Services & Products</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                   <div className="text-3xl mb-2">💻</div>
                   <h4 className="text-white font-bold mb-1">New & Refurbished</h4>
                   <p className="text-slate-400 text-xs">Affordable, tested, and performance-optimized laptops, PCs, and accessories.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                   <div className="text-3xl mb-2">🔧</div>
                   <h4 className="text-white font-bold mb-1">Gadget Repairs</h4>
                   <p className="text-slate-400 text-xs">Professional hardware/software repairs, upgrades, and diagnostics.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                   <div className="text-3xl mb-2">🔌</div>
                   <h4 className="text-white font-bold mb-1">Network & Infra</h4>
                   <p className="text-slate-400 text-xs">LAN/WAN, data cabling, CCTV, and structured network setups.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                   <div className="text-3xl mb-2">☁️</div>
                   <h4 className="text-white font-bold mb-1">Servers & Cloud</h4>
                   <p className="text-slate-400 text-xs">Server health checks, VM management, and cloud migration services.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Extended Details Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
           <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl">
             <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><span className="text-2xl">🛡️</span> Quality Assurance</h4>
             <p className="text-slate-300 text-sm mb-4">LapTech IT Solutions is committed to providing dependable products and services. Every product undergoes strict testing, quality inspection, performance checks, hardware verification, and software optimization.</p>
             <h5 className="font-semibold text-white text-sm mb-2">Our Goal:</h5>
             <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
               <li>Reliable products</li>
               <li>Professional technical support</li>
               <li>Affordable solutions</li>
               <li>Fast and efficient service</li>
             </ul>
           </div>

           <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl">
             <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><span className="text-2xl">🏆</span> Proven Expertise</h4>
             <p className="text-slate-300 text-sm mb-4">Our experience demonstrates our ability to deliver dependable, scalable, and professional ICT solutions. LapTech IT Solutions has successfully delivered ICT solutions and support services for:</p>
             <ul className="text-sm text-slate-400 space-y-2">
               <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> MTN ICT projects</li>
               <li className="flex items-center gap-2"><span className="text-amber-500">✔</span> Vodacom ICT projects</li>
             </ul>
           </div>

           <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-800/50 p-6 rounded-2xl">
             <h4 className="text-lg font-bold text-white mb-4">Why Choose LapTech IT Solutions?</h4>
             <ul className="text-sm text-slate-300 space-y-2">
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Reliable High-Performance Devices</li>
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Affordable Prices</li>
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Tested & Certified Products</li>
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Professional ICT Support</li>
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Trusted Network Installation Solutions</li>
               <li className="flex items-start gap-2"><span className="text-blue-400">✔</span> Customer Satisfaction Focused</li>
             </ul>
           </div>
        </div>

      </div>
    </section>
  );
}
