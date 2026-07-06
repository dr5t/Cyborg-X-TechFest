"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components (code splitting)
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const WebGLBackground = dynamic(
  () => import("@/components/WebGLBackground"),
  { ssr: false }
);

// Section imports
const HeroSection = dynamic(() => import("@/sections/HeroSection"), {
  ssr: false,
});
const TransformationSection = dynamic(
  () => import("@/sections/TransformationSection"),
  { ssr: false }
);
const CapabilitiesSection = dynamic(
  () => import("@/sections/CapabilitiesSection"),
  { ssr: false }
);
const AICoreSection = dynamic(() => import("@/sections/AICoreSection"), {
  ssr: false,
});
const TimelineSection = dynamic(
  () => import("@/sections/TimelineSection"),
  { ssr: false }
);
const ComparisonSection = dynamic(
  () => import("@/sections/ComparisonSection"),
  { ssr: false }
);
const StatsSection = dynamic(() => import("@/sections/StatsSection"), {
  ssr: false,
});
const QuoteSection = dynamic(() => import("@/sections/QuoteSection"), {
  ssr: false,
});
const CTASection = dynamic(() => import("@/sections/CTASection"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/sections/Footer"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* WebGL Background (fixed, behind everything) */}
      <WebGLBackground />

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        <main className="relative z-[1]">
          <HeroSection />
          <TransformationSection />
          <CapabilitiesSection />
          <AICoreSection />
          <TimelineSection />
          <ComparisonSection />
          <StatsSection />
          <QuoteSection />
          <CTASection />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
