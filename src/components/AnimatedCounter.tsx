"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  label,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const numericMatch = value.match(/[\d.]+/);
    const suffix = value.replace(/[\d.]+/, "");
    const targetNum = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const isDecimal = value.includes(".");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetNum,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            const formatted = isDecimal
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString();
            setDisplayValue(formatted + suffix);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div ref={containerRef} className={`text-center ${className}`}>
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-primary"
        style={{
          fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
          color: "#00F5FF",
        }}
      >
        {displayValue}
      </div>
      <p
        className="mt-3 text-xs md:text-sm tracking-[0.3em] uppercase"
        style={{ color: "#A0A0A0" }}
      >
        {label}
      </p>
    </div>
  );
}
