"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  { text: "INITIALIZING NEURAL CORE", duration: 800 },
  { text: "LOADING CYBERNETIC SYSTEMS", duration: 700 },
  { text: "CONNECTING QUANTUM NETWORK", duration: 900 },
  { text: "CALIBRATING AI INTERFACE", duration: 600 },
  { text: "SYSTEM READY", duration: 500 },
];

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    let msgTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const totalDuration = BOOT_MESSAGES.reduce((sum, m) => sum + m.duration, 0);
    const startTime = Date.now();

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(progressInterval);
    }, 30);

    const advanceMessage = (index: number) => {
      if (index >= BOOT_MESSAGES.length) {
        handleComplete();
        return;
      }
      setCurrentMsg(index);
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
      msgTimeout = setTimeout(
        () => advanceMessage(index + 1),
        BOOT_MESSAGES[index].duration
      );
    };

    msgTimeout = setTimeout(() => advanceMessage(0), 300);

    return () => {
      clearTimeout(msgTimeout);
      clearInterval(progressInterval);
    };
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#050505" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >

          <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />

          <div className="absolute inset-0 animate-crt-flicker" />

          <div
            className="absolute left-0 right-0 h-[2px] animate-scan-line pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1
              className="text-3xl md:text-5xl font-bold tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#00F5FF",
                textShadow:
                  "0 0 20px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.2)",
              }}
            >
              CYBORG-X
            </h1>
            <p
              className="mt-2 text-xs tracking-[0.5em] uppercase"
              style={{ color: "#A0A0A0" }}
            >
              The Human Upgrade
            </p>
          </motion.div>

          <div className="w-[300px] md:w-[400px]">
            <div className="relative mb-6">
              <motion.p
                key={currentMsg}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`loading-text text-center ${
                  glitchActive ? "text-[#FF006E]" : "text-[#00F5FF]"
                }`}
                style={{
                  fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  textShadow: glitchActive
                    ? "2px 0 #FF006E, -2px 0 #7B2EFF"
                    : "0 0 10px rgba(0,245,255,0.5)",
                }}
              >
                {`> ${BOOT_MESSAGES[currentMsg]?.text || "READY"}_`}
              </motion.p>
            </div>

            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00F5FF, #7B2EFF, #FF006E)",
                  width: `${progress}%`,
                  boxShadow: "0 0 15px rgba(0,245,255,0.5)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p
              className="mt-3 text-right text-xs tracking-widest"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#555",
              }}
            >
              {Math.round(progress)}%
            </p>
          </div>

          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#00F5FF]/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#00F5FF]/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#00F5FF]/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#00F5FF]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
