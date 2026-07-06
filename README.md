# CYBORG-X: The Human Upgrade

A premium, futuristic landing page developed for the **IIT Bombay Techfest Campus Ambassador Task**. This project showcases an Awwwards-winning level web experience that combines modern web technologies with advanced 3D WebGL rendering, smooth scroll animations, and a cyberpunk aesthetic.

## 🚀 Features

- **Immersive 3D WebGL Background**: Procedurally generated cyber-grid and floating data particles built with React Three Fiber.
- **Scroll-Driven Storytelling**: Cinematic human-to-cyborg transformation sequence triggered by scroll position using GSAP.
- **Glassmorphism UI**: High-end translucent interfaces with neon hover states and dynamic lighting.
- **Interactive Cybernetics**: 
  - Magnetic buttons
  - Tilt-aware capability cards
  - Reactive 3D AI Core
  - Particle explosion CTA
- **Performance Optimized**: Fully responsive Next.js 16 (Turbopack) architecture with dynamically loaded components and optimized Three.js renders.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla CSS Custom Properties
- **3D & WebGL**: 
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
  - [@react-three/drei](https://github.com/pmndrs/drei)
  - [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Animations**:
  - [GSAP](https://gsap.com/) (ScrollTrigger)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Icons**: [Lucide React](https://lucide.dev/)

## 💻 Local Development

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd cyborg-x-techfest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the experience.

## 🌐 Project Structure

- `/src/components` - Reusable UI elements (Buttons, Text Reveal, Cursor, Loaders)
- `/src/sections` - Major page segments (Hero, AI Core, Capabilities, Timeline, CTA)
- `/src/shaders` - Custom GLSL shaders for WebGL effects
- `/src/app` - Next.js App Router configuration and global styles

## 📄 License

This project was developed exclusively for the IIT Bombay Techfest Campus Ambassador showcase. All systems operational.
