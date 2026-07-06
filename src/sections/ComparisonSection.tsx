"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const METRICS = [
  {
    title: "Processing Speed",
    human: 15,
    cyborg: 95,
  },
  {
    title: "Memory Capacity",
    human: 25,
    cyborg: 100,
  },
  {
    title: "Prediction Accuracy",
    human: 30,
    cyborg: 99,
  },
];

function ProgressBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${value}%`,
        duration: 1.5,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current.parentElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [value, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span style={{ color: "#A0A0A0" }}>{label}</span>
        <span
          className="font-bold"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            color,
          }}
        >
          {value}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="comparison"
      className="relative z-[1] section-padding"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "#555" }}
          >
            Performance Analysis
          </p>
          <TextReveal as="h2" className="section-title">
            HUMAN VS CYBORG
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass p-8 md:rounded-r-none"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <h3
                className="text-lg font-bold tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  color: "#A0A0A0",
                }}
              >
                HUMAN
              </h3>
            </div>

            <div className="space-y-6">
              {METRICS.map((metric, i) => (
                <ProgressBar
                  key={metric.title}
                  label={metric.title}
                  value={metric.human}
                  color="#A0A0A0"
                  delay={i * 0.2}
                />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs" style={{ color: "#555" }}>
                Average Efficiency
              </p>
              <p
                className="text-2xl font-bold mt-1"
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  color: "#A0A0A0",
                }}
              >
                23.3%
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 md:rounded-l-none relative overflow-hidden"
            style={{ borderColor: "rgba(0,245,255,0.1)" }}
          >

            <div
              className="absolute inset-0 opacity-5"
              style={{
                background:
                  "radial-gradient(ellipse at center, #00F5FF, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#00F5FF] animate-pulse-glow" />
                <h3
                  className="text-lg font-bold tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    color: "#00F5FF",
                  }}
                >
                  CYBORG
                </h3>
              </div>

              <div className="space-y-6">
                {METRICS.map((metric, i) => (
                  <ProgressBar
                    key={metric.title}
                    label={metric.title}
                    value={metric.cyborg}
                    color="#00F5FF"
                    delay={i * 0.2 + 0.3}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#00F5FF]/10">
                <p className="text-xs" style={{ color: "#555" }}>
                  Average Efficiency
                </p>
                <p
                  className="text-2xl font-bold mt-1 text-glow-primary"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    color: "#00F5FF",
                  }}
                >
                  98.0%
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-12rem)] top-[8rem]"
          style={{
            background:
              "linear-gradient(180deg, transparent, #00F5FF, #7B2EFF, transparent)",
            transformOrigin: "top",
          }}
        />
      </div>
    </section>
  );
}
