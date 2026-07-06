"use client";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-[1] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold tracking-[0.2em] mb-3"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#00F5FF",
                textShadow: "0 0 15px rgba(0,245,255,0.3)",
              }}
            >
              CYBORG-X
            </h3>
            <p className="text-sm" style={{ color: "#555" }}>
              The Human Upgrade — Where biology meets technology.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-2 font-bold"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#A0A0A0",
              }}
            >
              Navigate
            </h4>
            {["Hero", "Transformation", "Capabilities", "AI Core", "Timeline"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-sm transition-colors duration-300 hover:text-[#00F5FF] magnetic-target"
                  style={{ color: "#555" }}
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Techfest Branding */}
          <div className="md:text-right">
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-3 font-bold"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                color: "#A0A0A0",
              }}
            >
              Presented At
            </h4>
            <p
              className="text-lg font-bold tracking-wider"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                background:
                  "linear-gradient(135deg, #00F5FF, #7B2EFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IIT BOMBAY TECHFEST
            </p>
            <p className="text-sm mt-1" style={{ color: "#555" }}>
              Campus Ambassador Showcase
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "#333" }}>
            © {new Date().getFullYear()} CYBORG-X Project. All systems operational.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-xs" style={{ color: "#555" }}>
                System Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 scanlines" />
    </footer>
  );
}
