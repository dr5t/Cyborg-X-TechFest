"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const trailPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {

    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.matches(
          "a, button, [role='button'], input, textarea, select, .magnetic-target"
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleElementLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.matches(
          "a, button, [role='button'], input, textarea, select, .magnetic-target"
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseout", handleElementLeave);

    const animate = () => {
      trailPosition.current.x +=
        (position.current.x - trailPosition.current.x) * 0.15;
      trailPosition.current.y +=
        (position.current.y - trailPosition.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPosition.current.x}px, ${trailPosition.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseout", handleElementLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          borderRadius: "50%",
          background: "#00F5FF",
          boxShadow: "0 0 10px rgba(0,245,255,0.8), 0 0 20px rgba(0,245,255,0.4)",
          transition: "width 0.3s, height 0.3s",
          willChange: "transform",
        }}
      />

      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: isHovering ? "50px" : "36px",
          height: isHovering ? "50px" : "36px",
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "rgba(123,46,255,0.6)" : "rgba(0,245,255,0.3)"}`,
          background: isHovering ? "rgba(123,46,255,0.05)" : "transparent",
          boxShadow: isHovering
            ? "0 0 20px rgba(123,46,255,0.2)"
            : "0 0 10px rgba(0,245,255,0.1)",
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
