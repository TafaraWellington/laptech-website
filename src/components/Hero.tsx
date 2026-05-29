export default function Hero() {
  return (
    <div className="relative bg-[#090d16] overflow-hidden border-b border-slate-900 py-24 md:py-36 flex items-center justify-center min-h-[85vh]">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0 pointer-events-none"></div>

      {/* Layered glowing orb background mesh */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[140px] mix-blend-screen pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-950/45 border border-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
          Premium Devices • Unbeatable Prices
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
          Upgrade your tech game with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 drop-shadow-sm">
            top-notch laptops
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          High-performance devices designed to keep up with your busy lifestyle. Rigorously tested, fully certified, and backed by expert service. Find your perfect machine today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#deals"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5"
          >
            View Current Deals
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 text-slate-200 border border-slate-800 hover:border-slate-700 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  )
}
