"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  };

  const baseStyles =
    "relative overflow-hidden px-8 py-4 font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 rounded-lg magnetic-target";

  const variants = {
    primary: `${baseStyles} bg-gradient-to-r from-[#00F5FF]/10 to-[#7B2EFF]/10 border border-[#00F5FF]/40 text-[#00F5FF] hover:border-[#00F5FF] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] active:scale-95`,
    outline: `${baseStyles} bg-transparent border border-white/20 text-white/80 hover:border-[#7B2EFF]/60 hover:text-white hover:shadow-[0_0_20px_rgba(123,46,255,0.2)] active:scale-95`,
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
        transition: "transform 0.2s ease-out, box-shadow 0.3s, border-color 0.3s, color 0.3s",
      }}
    >

      <span className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00F5FF]/5 to-[#7B2EFF]/5" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
