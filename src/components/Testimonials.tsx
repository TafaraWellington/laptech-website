"use client";

import { useState, useEffect, useRef } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 3000); // matching fade transition
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const selectIndex = (idx: number) => {
    if (isAnimating || idx === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsAnimating(false);
    }, 300);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#0b0f19] border-b border-slate-900 relative overflow-hidden">
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-950/45 border border-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
            Trusted Across Mzansi
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            WHAT OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">CLIENTS SAY</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            See how Laptech IT Solutions delivers premium tech reliability to schools, professionals, and corporate offices.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div 
          className="relative max-w-4xl mx-auto bg-gradient-to-b from-slate-900/60 to-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          {/* Accent quotation mark */}
          <span className="absolute -top-6 -left-2 text-[180px] font-serif text-slate-800/20 pointer-events-none leading-none select-none">
            &ldquo;
          </span>

          {/* Testimonial Content Wrapper */}
          <div className={`transition-opacity duration-300 flex-grow flex flex-col justify-center ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Stars & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex gap-1 text-amber-400 text-xl">
                {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase bg-slate-800 border border-slate-700/80 px-3 py-1 rounded-full text-blue-300 shadow-md">
                {activeTestimonial.badge}
              </span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg md:text-2xl text-slate-100 font-medium leading-relaxed mb-6 italic relative z-10">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>

            {/* Quote Tagline highlight */}
            <div className="text-xs font-semibold text-amber-400 tracking-wide mb-8 border-l-2 border-amber-500/60 pl-3">
              {activeTestimonial.tagline}
            </div>
          </div>

          {/* Reviewer Details & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-800/50 mt-auto">
            
            {/* Reviewer Profile */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${activeTestimonial.avatarBg} flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                {activeTestimonial.initials}
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base leading-tight">
                  {activeTestimonial.name}
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  {activeTestimonial.role}
                </p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">
                  📍 {activeTestimonial.location}
                </p>
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Index Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? "w-8 bg-amber-500" : "w-2.5 bg-slate-800 hover:bg-slate-700"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
