"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EVENTS = [
  {
    year: "2025",
    title: "AI Assistants",
    description: "AI becomes humanity's constant companion in daily tasks.",
    color: "#00F5FF",
  },
  {
    year: "2035",
    title: "Neural Chips",
    description: "Direct brain-computer interfaces enter mainstream adoption.",
    color: "#7B2EFF",
  },
  {
    year: "2050",
    title: "Human AI Integration",
    description: "Seamless merging of biological and artificial intelligence.",
    color: "#FF006E",
  },
  {
    year: "2075",
    title: "Digital Consciousness",
    description: "Consciousness transcends physical boundaries.",
    color: "#00FF88",
  },
  {
    year: "2099",
    title: "CYBORG ERA",
    description: "The age of the enhanced human begins.",
    color: "#00F5FF",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative z-[1] section-padding"
    >
      <div ref={ref} className="max-w-4xl mx-auto">

        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "#555" }}
          >
            The Path Forward
          </p>
          <TextReveal as="h2" className="section-title">
            EVOLUTION TIMELINE
          </TextReveal>
        </div>

        <div className="relative">

          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
            <div className="w-full h-full bg-white/5 rounded-full" />
            <div
              ref={lineRef}
              className="absolute inset-0 rounded-full origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #00F5FF, #7B2EFF, #FF006E, #00FF88, #00F5FF)",
                transformOrigin: "top",
              }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {EVENTS.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: "easeOut",
                  }}
                  className={`relative flex items-center ${
                    isLeft
                      ? "md:flex-row pl-16 md:pl-0"
                      : "md:flex-row-reverse pl-16 md:pl-0"
                  }`}
                >

                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
                  >
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs tracking-[0.3em] font-bold mb-3"
                      style={{
                        fontFamily:
                          "var(--font-orbitron), 'Orbitron', sans-serif",
                        color: event.color,
                        background: `${event.color}10`,
                        border: `1px solid ${event.color}30`,
                      }}
                    >
                      {event.year}
                    </div>
                    <h3
                      className="text-lg md:text-xl font-bold mb-2 tracking-wider"
                      style={{
                        fontFamily:
                          "var(--font-orbitron), 'Orbitron', sans-serif",
                        color: "#FFFFFF",
                      }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#A0A0A0" }}>
                      {event.description}
                    </p>
                  </div>

                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{
                        boxShadow: `0 0 20px ${event.color}60`,
                      }}
                      viewport={{ once: true }}
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        borderColor: event.color,
                        background: "#050505",
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full animate-energy-pulse"
                        style={{ background: event.color, opacity: 0.5 }}
                      />
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
