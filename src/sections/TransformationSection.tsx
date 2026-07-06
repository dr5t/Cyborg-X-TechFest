"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TransformModel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const armorRef = useRef<THREE.Mesh>(null);
  const neuralRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
  });

  const armorScale = Math.max(0, (progress - 0.5) * 2);

  const neuralOpacity = Math.min(1, Math.max(0, (progress - 0.2) * 3)) * 0.3;

  const primaryMix = progress;
  const color = new THREE.Color("#FFFFFF").lerp(
    new THREE.Color("#00F5FF"),
    primaryMix
  );
  const secondaryColor = new THREE.Color("#7B2EFF");

  const detail = progress > 0.6 ? 4 : progress > 0.3 ? 3 : 2;

  return (
    <group ref={groupRef} scale={1.5}>

      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, detail]} />
        <meshBasicMaterial
          wireframe
          color={color}
          transparent
          opacity={0.4 + progress * 0.3}
        />
      </mesh>

      {progress > 0.15 && (
        <lineSegments ref={neuralRef}>
          <icosahedronGeometry args={[1.6, 2]} />
          <lineBasicMaterial
            color="#00F5FF"
            transparent
            opacity={neuralOpacity}
          />
        </lineSegments>
      )}

      {progress > 0.35 &&
        [0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const implantProgress = Math.min(
            1,
            Math.max(0, (progress - 0.35) * 3)
          );
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 1.3,
                Math.sin(angle) * 1.3,
                (Math.random() - 0.5) * 0.5,
              ]}
              scale={implantProgress * 0.15}
            >
              <octahedronGeometry args={[1]} />
              <meshBasicMaterial
                color="#7B2EFF"
                transparent
                opacity={implantProgress * 0.7}
              />
            </mesh>
          );
        })}

      {progress > 0.5 && (
        <mesh ref={armorRef} scale={1 + armorScale * 0.15}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial
            wireframe
            color={secondaryColor}
            transparent
            opacity={armorScale * 0.25}
          />
        </mesh>
      )}

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3 + progress * 0.3, 16, 16]} />
        <meshBasicMaterial
          color={progress > 0.7 ? "#FF006E" : "#00F5FF"}
          transparent
          opacity={0.3 + progress * 0.5}
        />
      </mesh>

      {progress > 0.6 &&
        [0, 1, 2].map((i) => (
          <mesh
            key={`ring-${i}`}
            rotation={[
              Math.PI / 2 + i * 0.5,
              i * 0.3,
              0,
            ]}
          >
            <torusGeometry
              args={[
                2 + i * 0.2,
                0.008,
                8,
                64,
              ]}
            />
            <meshBasicMaterial
              color={i === 0 ? "#00F5FF" : i === 1 ? "#7B2EFF" : "#FF006E"}
              transparent
              opacity={(progress - 0.6) * 2 * (0.5 - i * 0.1)}
            />
          </mesh>
        ))}
    </group>
  );
}

const STAGES = [
  { label: "HUMAN FORM", color: "#FFFFFF" },
  { label: "NEURAL AWAKENING", color: "#00F5FF" },
  { label: "DIGITAL IMPLANTS", color: "#7B2EFF" },
  { label: "CYBERNETIC ARMOR", color: "#FF006E" },
  { label: "COMPLETE EVOLUTION", color: "#00FF88" },
];

export default function TransformationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressDisplayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: canvasContainerRef.current,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        const stageIndex = Math.min(
          4,
          Math.floor(self.progress * 5)
        );
        if (stageRef.current) {
          stageRef.current.textContent = STAGES[stageIndex].label;
          stageRef.current.style.color = STAGES[stageIndex].color;
          stageRef.current.style.textShadow = `0 0 20px ${STAGES[stageIndex].color}50`;
        }

        if (progressDisplayRef.current) {
          progressDisplayRef.current.style.height = `${self.progress * 100}%`;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh" }}
    >

      <div
        ref={canvasContainerRef}
        className="w-full h-screen flex items-center justify-center"
      >

        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-2"
            style={{ color: "#555" }}
          >
            Signature Experience
          </p>
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              background: "linear-gradient(135deg, #00F5FF, #7B2EFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HUMAN → CYBORG
          </h2>
        </div>

        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
          >
            <ambientLight intensity={0.15} />
            <pointLight position={[3, 3, 5]} color="#00F5FF" intensity={1.5} />
            <pointLight
              position={[-3, -2, 3]}
              color="#7B2EFF"
              intensity={0.8}
            />
            <TransformModelWrapper progressRef={progressRef} />
          </Canvas>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div
            ref={stageRef}
            className="text-sm md:text-base font-bold tracking-[0.3em] uppercase transition-all duration-500"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              color: "#FFFFFF",
            }}
          >
            HUMAN FORM
          </div>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
          <div className="w-[2px] h-40 rounded-full overflow-hidden bg-white/10">
            <div
              ref={progressDisplayRef}
              className="w-full rounded-full transition-all duration-100"
              style={{
                background: "linear-gradient(180deg, #00F5FF, #7B2EFF, #FF006E)",
                height: "0%",
              }}
            />
          </div>

          <div className="absolute -left-[5px] top-0 h-full flex flex-col justify-between">
            {STAGES.map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-white/20 bg-[#050505]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransformModelWrapper({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  const progressState = useRef(0);

  useFrame(() => {
    if (progressRef.current !== undefined) {
      progressState.current +=
        ((progressRef.current ?? 0) - progressState.current) * 0.1;
    }
  });

  return <TransformModelInner progressRef={progressState} />;
}

function TransformModelInner({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  useFrame(() => {});
  return <TransformModel progress={progressRef.current ?? 0} />;
}
