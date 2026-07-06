"use client";

import { useRef, useEffect, ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export default function GlitchText({
  children,
  className = "",
  intensity = "medium",
}: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const durations = { low: 8, medium: 5, high: 3 };
    el.style.setProperty("--glitch-duration", `${durations[intensity]}s`);
  }, [intensity]);

  return (
    <span ref={textRef} className={`glitch-wrapper ${className}`}>
      <span className="glitch-text" data-text={typeof children === 'string' ? children : ''}>
        {children}
      </span>
      <style jsx>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          color: #FF006E;
          animation: glitch-1 var(--glitch-duration, 5s) infinite;
          z-index: -1;
        }
        .glitch-text::after {
          color: #00F5FF;
          animation: glitch-2 var(--glitch-duration, 5s) infinite;
          animation-delay: 0.1s;
          z-index: -1;
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 96% 0); transform: translate(0); }
          10% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
          20% { clip-path: inset(50% 0 30% 0); transform: translate(3px, -1px); }
          30% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(80% 0 5% 0); transform: translate(1px, -2px); }
          50% { clip-path: inset(0 0 96% 0); transform: translate(0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(96% 0 0 0); transform: translate(0); }
          10% { clip-path: inset(60% 0 20% 0); transform: translate(3px, -1px); }
          20% { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 1px); }
          30% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(5% 0 80% 0); transform: translate(-1px, 2px); }
          50% { clip-path: inset(96% 0 0 0); transform: translate(0); }
        }
      `}</style>
    </span>
  );
}
