"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import TextReveal from "@/components/TextReveal";

const STATS = [
  { value: "98%", label: "Enhancement Accuracy" },
  { value: "12M+", label: "Neural Connections" },
  { value: "300+", label: "Integrated Systems" },
  { value: "99.9%", label: "Efficiency Rate" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="stats" className="relative z-[1] section-padding">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <TextReveal as="h2" className="section-title">
            BY THE NUMBERS
          </TextReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass p-8 text-center"
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
