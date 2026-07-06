import type { Metadata } from "next";
import { Inter, Orbitron, Audiowide } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CYBORG-X | The Human Upgrade — IIT Bombay Techfest",
  description:
    "Where Human Intelligence Meets Artificial Evolution. Experience the future of human-machine integration through an immersive cyberpunk journey. IIT Bombay Techfest Campus Ambassador Showcase.",
  keywords: [
    "Cyborg",
    "AI",
    "Human Upgrade",
    "Techfest",
    "IIT Bombay",
    "Cyberpunk",
    "Future Technology",
  ],
  openGraph: {
    title: "CYBORG-X | The Human Upgrade",
    description: "Where Human Intelligence Meets Artificial Evolution",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${audiowide.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
