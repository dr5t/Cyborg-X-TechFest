"use client";

import { Cpu, ChevronRight, Power, Globe, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-[1] mt-20"
    >

      <div 
        className="absolute top-0 left-0 right-0 h-[1px]" 
        style={{
          background: "linear-gradient(90deg, transparent, #00F5FF, #7B2EFF, transparent)",
          boxShadow: "0 0 20px 2px rgba(0, 245, 255, 0.4)"
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(123, 46, 255, 0.15) 0%, transparent 60%)"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="text-[#00F5FF]" size={28} />
              <h3
                className="text-2xl font-bold tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  color: "#FFFFFF",
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                }}
              >
                CYBORG<span className="text-[#00F5FF]">-X</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#A0A0A0" }}>
              The Human Upgrade — Where biology meets technology. Entering the next stage of human evolution.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:px-8">
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-1 font-bold flex items-center gap-2"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#FFFFFF",
              }}
            >
              <Network size={14} className="text-[#7B2EFF]" />
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {["Hero", "Transformation", "Capabilities", "AI Core", "Timeline"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm transition-all duration-300 hover:text-[#00F5FF] hover:translate-x-1 magnetic-target flex items-center gap-1 group"
                    style={{ color: "#888" }}
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link}</span>
                  </a>
                )
              )}
            </div>
          </div>

          <div className="md:text-right flex flex-col md:items-end">
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-4 font-bold flex items-center gap-2 md:justify-end"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#FFFFFF",
              }}
            >
              <Globe size={14} className="text-[#FF006E]" />
              Presented At
            </h4>
            
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-[#00F5FF]/50 transition-colors duration-500 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#7B2EFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p
                className="text-xl font-bold tracking-wider relative z-10"
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  background: "linear-gradient(135deg, #00F5FF, #7B2EFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                IIT BOMBAY<br/>TECHFEST
              </p>
              <p className="text-xs mt-2 relative z-10" style={{ color: "#A0A0A0" }}>
                Campus Ambassador Showcase
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs tracking-wide" style={{ color: "#666" }}>
            © {new Date().getFullYear()} CYBORG-X PROJECT. ALL SYSTEMS SECURE.
          </p>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Power size={14} className="text-[#00FF88]" />
            </motion.div>
            <span 
              className="text-xs font-bold tracking-widest uppercase" 
              style={{ color: "#00FF88" }}
            >
              System Online
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines" />
    </footer>
  );
}
