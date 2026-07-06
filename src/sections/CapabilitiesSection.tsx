"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";

import { Eye, Brain, Zap, Network } from "lucide-react";

const CAPABILITIES = [
  {
    icon: <Eye size={36} strokeWidth={1.5} />,
    title: "Neural Vision",
    description: "See beyond biological limitations. Enhanced visual processing with AR overlays and multi-spectrum analysis.",
    color: "#00F5FF",
  },
  {
    icon: <Brain size={36} strokeWidth={1.5} />,
    title: "Memory Expansion",
    description: "Store and access infinite knowledge. Petabyte neural storage with instant recall capabilities.",
    color: "#7B2EFF",
  },
  {
    icon: <Zap size={36} strokeWidth={1.5} />,
    title: "Quantum Thinking",
    description: "Accelerated decision making. Process complex scenarios in milliseconds with quantum-enhanced cognition.",
    color: "#FF006E",
  },
  {
    icon: <Network size={36} strokeWidth={1.5} />,
    title: "Bio Integration",
    description: "Merge seamlessly with AI systems. Real-time neural interface with global AI networks.",
    color: "#00FF88",
  },
];

function TiltCard({
  capability,
  index,
}: {
  capability: (typeof CAPABILITIES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.boxShadow = `0 0 30px ${capability.color}20, 0 0 60px ${capability.color}10`;

    const glowEl = card.querySelector(".card-glow") as HTMLElement;
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, ${capability.color}15, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.boxShadow = "none";
    const glowEl = card.querySelector(".card-glow") as HTMLElement;
    if (glowEl) {
      glowEl.style.background = "transparent";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        className="glass relative overflow-hidden p-8 h-full magnetic-target"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition:
            "transform 0.15s ease-out, box-shadow 0.3s ease",
          animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        }}
      >

        <div className="card-glow absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300" />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${capability.color}30, transparent, ${capability.color}15)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        <div className="relative z-10">
          <div
            className="text-4xl mb-5"
            style={{
              filter: `drop-shadow(0 0 8px ${capability.color}50)`,
            }}
          >
            {capability.icon}
          </div>
          <h3
            className="text-lg md:text-xl font-bold mb-3 tracking-wider"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              color: capability.color,
            }}
          >
            {capability.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            {capability.description}
          </p>
        </div>

        <div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            background: `linear-gradient(225deg, ${capability.color}08, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative z-[1] section-padding"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "#555" }}
          >
            Enhancement Suite
          </p>
          <TextReveal
            as="h2"
            className="section-title"
          >
            CYBERNETIC CAPABILITIES
          </TextReveal>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 mx-auto h-[1px] w-24"
            style={{
              background: "linear-gradient(90deg, transparent, #00F5FF, transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <TiltCard key={cap.title} capability={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
