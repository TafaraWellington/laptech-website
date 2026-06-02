"use client";

const testimonials = [
  {
    id: 1,
    name: "Principal Sibongile Dube",
    role: "Gauteng Public Secondary School",
    location: "Soweto, Johannesburg",
    avatarBg: "bg-gradient-to-tr from-amber-500 to-yellow-600",
    initials: "SD",
    badge: "School Lab Installation",
    rating: 5,
    quote: "Laptech completely transformed our school's computer learning center. They deployed 45 high-speed student workstations, installed our educational server, and completed all network cabling in record time. Our students are now fully equipped for the digital age!",
    tagline: "45 Stations • Full Cabling • Server Setup"
  },
  {
    id: 2,
    name: "David Naidoo",
    role: "Senior Software Developer",
    location: "Midrand, Johannesburg",
    avatarBg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    initials: "DN",
    badge: "Hardware Sales Purchase",
    rating: 5,
    quote: "As a developer, I need serious computing power. I bought a refurbished Dell Precision Workstation from Laptech. The machine arrived in pristine Grade-A condition, freshly serviced, and performs at peak speed. Jimmy's attention to hardware quality is world-class.",
    tagline: "Dell Precision Workstation • 16GB RAM"
  },
  {
    id: 3,
    name: "Lerato Mokwena",
    role: "Operations Director",
    location: "Richards Drive, Midrand",
    avatarBg: "bg-gradient-to-tr from-purple-500 to-pink-600",
    initials: "LM",
    badge: "Enterprise Server Deployment",
    rating: 5,
    quote: "We outsourced our server room cabinet organization, CAT6 patching, and firewall security setup to Laptech IT Solutions. Their engineers worked with extreme professionalism, standardizing our infrastructure and optimizing our corporate network speeds.",
    tagline: "Full Server Rack Fitting & Secure Networking"
  },
  {
    id: 4,
    name: "Tinashe Gumbo",
    role: "Engineering Student",
    location: "Pretoria, South Africa",
    avatarBg: "bg-gradient-to-tr from-emerald-500 to-teal-600",
    initials: "TG",
    badge: "Student Laptop Deal",
    rating: 5,
    quote: "Unbelievable pricing for students. I bought a Lenovo ThinkPad T14 for my engineering designs. The secure Paystack payment was effortless, and the laptop was delivered fast with a solid guarantee. Outstanding customer service!",
    tagline: "Lenovo ThinkPad • Paystack Secure Payment"
  }
];

export default function Testimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-[#0b0f19] border-t border-slate-900 relative overflow-hidden">
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scrollMarquee 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="text-center mb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-950/45 border border-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
            Trusted Across Mzansi
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            WHAT OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">CLIENTS SAY</span>
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b0f19] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b0f19] to-transparent z-20 pointer-events-none"></div>

          <div className="animate-scroll gap-6 px-6">
            {marqueeItems.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="w-[450px] flex-shrink-0 bg-gradient-to-b from-slate-900/60 to-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between"
              >
                <div className="flex gap-1 text-amber-400 text-lg mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="text-slate-200 text-sm md:text-base leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50 mt-auto">
                  <div className={"w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md " + testimonial.avatarBg}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
