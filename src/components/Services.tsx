"use client";

import { useState } from "react";

const services = [
  {
    id: "hardware",
    title: "Premium Hardware Sales",
    tagline: "Unbeatable deals on tested, certified, high-performance computing power",
    icon: "💻",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    description: "Whether you are looking for top-tier corporate lease-return laptops, premium student notebooks, or elite custom gaming rigs, we have you covered. Every device undergoes a rigorous 40-point diagnostic check before dispatch.",
    features: [
      "Rigorous 40-Point Diagnostic Check",
      "Certified Grade-A Refurbished Laptops",
      "Brand New Workstations & Accessories",
      "Flexible Payment Options & Paystack Secure Integration",
      "Warranty Backed Protection"
    ],
    badge: "100% Certified Tech"
  },
  {
    id: "schools",
    title: "School & Corporate ICT Installations",
    tagline: "End-to-end modern computer lab setups & structured networking",
    icon: "🏫",
    gradient: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-500/20",
    description: "We are passionate about digital transformation in education. We design and install high-density student computer labs, customize local servers for educational software, and handle structured CAT6 cabling, active switches, and school-wide Wi-Fi infrastructure.",
    features: [
      "Custom Multi-Station Computer Labs",
      "Network Infrastructure & CAT6 Cabling",
      "Server Deployment for e-Learning Software",
      "Secure Cabinet and Workstation Mounting",
      "Ongoing System Support & Maintenance"
    ],
    badge: "Active Gauteng Deployments"
  },
  {
    id: "servers",
    title: "Server & Enterprise Infrastructure",
    tagline: "Deploying high-availability servers and robust network architecture",
    icon: "🖥️",
    gradient: "from-purple-500 to-pink-600",
    shadow: "shadow-purple-500/20",
    description: "Power your business operations with secure, scalable, and high-performance server cabinets. We install and configure server racks, manage domain controller databases, configure active firewalls, and perform high-bandwidth network optimizations.",
    features: [
      "Enterprise Server Rack & Cabinet Fitting",
      "High-Availability Network Architecture",
      "Fiber, Cable Routing & Network Patching",
      "Proactive Firewall and Security Configuration",
      "Automatic Data Backups & Disaster Recovery"
    ],
    badge: "Enterprise Ready"
  },
  {
    id: "repairs",
    title: "Chip-Level Tech Diagnostics & Repairs",
    tagline: "Professional component repair, clean room cleaning, and upgrades",
    icon: "🔧",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    description: "Don't discard a faulty device! Our lab in Midrand offers specialized chip-level motherboard repair, liquid damage restoration, logic board diagnostics, high-speed SSD/RAM upgrades, screen replacements, and thermal servicing.",
    features: [
      "Advanced Motherboard Logic Board Repair",
      "Liquid Damage Treatment & Cleanup",
      "Thermal Paste Replacement & Dusting",
      "Fast Screen, Keyboard & Battery Replacements",
      "Speed Optimization & SSD Upgrades"
    ],
    badge: "SABS Standards & Pro Equipment"
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("hardware");
  const activeService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="py-24 bg-[#090d16] relative border-b border-slate-900/60 overflow-hidden">
      {/* Light Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-950/45 border border-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Our Enterprise Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            COMPREHENSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">IT SOLUTIONS</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            From premier hardware sourcing to large-scale school networks, enterprise server infrastructure, and expert chip-level lab repairs.
          </p>
        </div>

        {/* Tab Selection Controls */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12 max-w-5xl mx-auto">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex flex-col md:flex-row items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                activeTab === service.id
                  ? "bg-slate-900/80 border-blue-500/50 text-white shadow-lg"
                  : "bg-slate-900/20 border-slate-800/80 text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
              }`}
            >
              <span className="text-2xl">{service.icon}</span>
              <div>
                <div className="font-bold text-sm tracking-tight">{service.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 hidden md:block">
                  {service.badge}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Service Detail Display */}
        <div className="max-w-5xl mx-auto bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-slate-800 border border-slate-700 text-blue-300`}>
                  {activeService.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-slate-300 text-sm italic font-medium mt-2">
                  &ldquo;{activeService.tagline}&rdquo;
                </p>
              </div>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {activeService.description}
              </p>

              {/* Service Features Checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Deliverables
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                  {activeService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/27614916636?text=Hi Laptech, I want to inquire about your ${activeService.title} service`}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r ${activeService.gradient} text-white transition-all duration-300 hover:opacity-90 transform active:scale-95 shadow-md ${activeService.shadow}`}
                >
                  Consult an Expert
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase border border-slate-800 hover:bg-slate-900/60 text-slate-300 transition-all duration-300"
                >
                  Request Callback
                </a>
              </div>
            </div>

            {/* Right Abstract Visualizer Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-square rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
                {/* Accent Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:10px_20px] opacity-15 pointer-events-none"></div>
                
                {/* Glow Backdrop */}
                <div className={`absolute -right-4 -bottom-4 w-40 h-40 rounded-full bg-gradient-to-br ${activeService.gradient} opacity-10 blur-3xl group-hover:scale-125 transition-transform duration-500`}></div>

                {/* Card Header */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500">LAPTECH LABS</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                </div>

                {/* Dynamic Service Icon Visualization */}
                <div className="flex flex-col items-center justify-center py-6 z-10">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${activeService.gradient} flex items-center justify-center text-4xl shadow-lg border border-white/10 mb-4 animate-bounce`}>
                    {activeService.icon}
                  </div>
                  <span className="text-xs font-bold text-white tracking-widest uppercase">
                    SYSTEM STATUS
                  </span>
                  <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Operational
                  </span>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 z-10">
                  <span>MIDRAND, ZA</span>
                  <span>v1.2.6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
