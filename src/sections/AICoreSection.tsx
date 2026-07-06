"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const NODES = [
  { label: "Vision", angle: 0, color: "#00F5FF" },
  { label: "Memory", angle: 60, color: "#7B2EFF" },
  { label: "Learning", angle: 120, color: "#FF006E" },
  { label: "Prediction", angle: 180, color: "#00FF88" },
  { label: "Adaptation", angle: 240, color: "#00F5FF" },
  { label: "Creativity", angle: 300, color: "#7B2EFF" },
];

function AICoreModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
  });

  const radius = 2.5;

  return (
    <group ref={groupRef}>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.3} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshBasicMaterial wireframe color="#00F5FF" transparent opacity={0.15} />
      </mesh>

      <Text
        position={[0, 0, 0.9]}
        fontSize={0.15}
        color="#00F5FF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/orbitron.woff"
      >
        AI CORE
      </Text>

      {NODES.map((node, i) => {
        const angleRad = (node.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const z = Math.sin(angleRad) * radius;
        const isHovered = hoveredNode === i;

        return (
          <group key={node.label} position={[x, 0, z]}>

            <mesh
              onPointerEnter={() => setHoveredNode(i)}
              onPointerLeave={() => setHoveredNode(null)}
            >
              <sphereGeometry args={[isHovered ? 0.25 : 0.18, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHovered ? 0.8 : 0.5}
              />
            </mesh>

            <mesh>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHovered ? 0.15 : 0.05}
              />
            </mesh>

            <Text
              position={[0, 0.5, 0]}
              fontSize={0.12}
              color={node.color}
              anchorX="center"
              anchorY="bottom"
            >
              {node.label.toUpperCase()}
            </Text>

            <Line
              points={[[-x, 0, -z], [0, 0, 0]]}
              color={node.color}
              transparent
              opacity={isHovered ? 0.4 : 0.1}
              lineWidth={1}
            />

            {isHovered && (
              <Html position={[0, -0.5, 0]} center>
                <div
                  className="glass px-4 py-2 text-center min-w-[120px] pointer-events-none"
                  style={{ borderColor: `${node.color}30` }}
                >
                  <p
                    className="text-xs font-bold tracking-wider"
                    style={{
                      color: node.color,
                      fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                    }}
                  >
                    {node.label}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "#A0A0A0" }}>
                    Active • Connected
                  </p>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.005, 8, 64]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function AICoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="ai-core" className="relative z-[1] section-padding">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "#555" }}
          >
            Core Intelligence
          </p>
          <TextReveal as="h2" className="section-title">
            INTERACTIVE AI CORE
          </TextReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full aspect-square max-w-2xl mx-auto"
          style={{ maxHeight: "600px" }}
        >
          <Canvas
            camera={{ position: [0, 3, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
            style={{ cursor: "pointer" }}
          >
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} color="#00F5FF" intensity={0.8} />
            <pointLight
              position={[-5, -3, 3]}
              color="#7B2EFF"
              intensity={0.5}
            />
            <AICoreModel />
          </Canvas>
        </motion.div>

        <p
          className="text-center text-sm max-w-lg mx-auto mt-8"
          style={{ color: "#555", letterSpacing: "0.05em" }}
        >
          Hover over nodes to explore neural pathways. The AI Core processes and
          coordinates all cybernetic subsystems in real-time.
        </p>
      </div>
    </section>
  );
}
