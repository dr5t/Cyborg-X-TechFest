"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import CyborgHead from "@/components/CyborgHead";
import MagneticButton from "@/components/MagneticButton";
import GlitchText from "@/components/GlitchText";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.8 }); // After loading screen

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll(".hero-char");
      tl.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
        }
      );
    }

    if (subheadlineRef.current) {
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, []);

  const headline1 = "THE FUTURE ISN'T COMING";
  const headline2 = "IT'S MERGING";

  const renderChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ opacity: 0 }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >

      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 5, 5]} color="#00F5FF" intensity={1} />
          <pointLight position={[-5, -3, 3]} color="#7B2EFF" intensity={0.5} />
          <CyborgHead />
        </Canvas>
      </div>

      <div className="relative z-[2] text-center px-6 max-w-5xl mx-auto">
        <div ref={headlineRef}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              perspective: "600px",
            }}
          >
            <span className="block mb-2 text-white">
              {renderChars(headline1)}
            </span>
            <span className="block">
              <GlitchText
                className="bg-gradient-to-r from-[#00F5FF] via-[#7B2EFF] to-[#FF006E] bg-clip-text"
                intensity="low"
              >
                <span
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage:
                      "linear-gradient(135deg, #00F5FF, #7B2EFF, #FF006E)",
                  }}
                >
                  {renderChars(headline2)}
                </span>
              </GlitchText>
            </span>
          </h1>
        </div>

        <p
          ref={subheadlineRef}
          className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{
            color: "#A0A0A0",
            opacity: 0,
            letterSpacing: "0.1em",
          }}
        >
          Where Human Intelligence Meets Artificial Evolution
        </p>

        <div
          ref={ctaRef}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton variant="primary">Enter The Future</MagneticButton>
          <MagneticButton variant="outline">Watch Protocol</MagneticButton>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
      >
        <div className="animate-bounce-arrow flex flex-col items-center gap-2">
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              color: "#555",
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            }}
          >
            Scroll
          </span>
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            className="opacity-40"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="28"
              rx="9"
              stroke="#00F5FF"
              strokeWidth="1"
            />
            <circle cx="10" cy="10" r="2" fill="#00F5FF">
              <animate
                attributeName="cy"
                values="8;18;8"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505, transparent)",
        }}
      />
    </section>
  );
}
