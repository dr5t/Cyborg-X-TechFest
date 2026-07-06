"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activated, setActivated] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleActivate = () => {
    setActivated(true);

    // Generate particle explosion
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
      setActivated(false);
    }, 1500);
  };

  return (
    <section
      ref={ref}
      id="cta"
      className="relative z-[1] flex items-center justify-center min-h-[80vh] section-padding overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.05), transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(123,46,255,0.05), transparent 50%)
          `,
        }}
      />

      {/* Grid lines background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase mb-6"
            style={{ color: "#555" }}
          >
            The Next Chapter
          </p>

          <TextReveal as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8">
            <span
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                background: "linear-gradient(135deg, #00F5FF, #7B2EFF, #FF006E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JOIN THE EVOLUTION
            </span>
          </TextReveal>

          <p
            className="text-base md:text-lg max-w-lg mx-auto mb-12"
            style={{ color: "#A0A0A0", lineHeight: 1.8 }}
          >
            Step beyond the boundaries of human limitation. The upgrade awaits.
          </p>

          {/* CTA Button with particle explosion */}
          <div className="relative inline-block">
            <MagneticButton
              variant="primary"
              onClick={handleActivate}
              className={`text-base px-12 py-5 ${
                activated
                  ? "!bg-[#00F5FF]/20 !border-[#00F5FF] !shadow-[0_0_50px_rgba(0,245,255,0.5)]"
                  : ""
              }`}
            >
              {activated ? "⚡ ACTIVATED" : "ACTIVATE CYBORG MODE"}
            </MagneticButton>

            {/* Explosion particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: p.x,
                  y: p.y,
                  scale: 0,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background:
                    Math.random() > 0.5 ? "#00F5FF" : "#7B2EFF",
                  boxShadow: `0 0 6px ${
                    Math.random() > 0.5 ? "#00F5FF" : "#7B2EFF"
                  }`,
                }}
              />
            ))}
          </div>

          {/* Energy pulse rings */}
          {activated && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
                  initial={{ width: 0, height: 0, opacity: 0.6 }}
                  animate={{
                    width: 400 + i * 100,
                    height: 400 + i * 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                  style={{ borderColor: "#00F5FF" }}
                />
              ))}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
