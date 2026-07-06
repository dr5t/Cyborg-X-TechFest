"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "@/components/GlitchText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordsRef.current || !sectionRef.current) return;

    const words = wordsRef.current.querySelectorAll(".quote-word");

    gsap.fromTo(
      words,
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const quoteText =
    "EVOLUTION IS NO LONGER BIOLOGICAL. IT IS TECHNOLOGICAL.";
  const words = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="relative z-[1] flex items-center justify-center min-h-[70vh] section-padding"
    >

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(123,46,255,0.05), transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div ref={wordsRef}>
          <blockquote>
            <GlitchText intensity="low">
              <span
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wider animate-text-pulse"
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                }}
              >
                {words.map((word, i) => (
                  <span key={i} className="quote-word inline-block mr-[0.3em]" style={{ opacity: 0.1 }}>
                    {word}
                  </span>
                ))}
              </span>
            </GlitchText>
          </blockquote>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <div
            className="h-[1px] w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00F5FF)",
            }}
          />
          <div className="w-2 h-2 rounded-full bg-[#00F5FF]/50" />
          <div
            className="h-[1px] w-16"
            style={{
              background:
                "linear-gradient(90deg, #00F5FF, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
