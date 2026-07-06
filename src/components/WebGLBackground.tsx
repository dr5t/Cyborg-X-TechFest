"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "@/shaders/particleShader";
import { gridVertexShader, gridFragmentShader } from "@/shaders/gridShader";

/* ============================
   Cyber Grid Floor
   ============================ */
function CyberGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00F5FF") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[60, 60, 60, 60]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ============================
   Particle Galaxy
   ============================ */
function ParticleGalaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, speeds, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const primaryColor = new THREE.Color("#00F5FF");
    const secondaryColor = new THREE.Color("#7B2EFF");
    const accentColor = new THREE.Color("#FF006E");

    for (let i = 0; i < count; i++) {
      // Spread particles in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      sizes[i] = Math.random() * 3 + 0.5;
      speeds[i] = Math.random() * 0.3 + 0.1;

      // Random color selection
      const r = Math.random();
      const color =
        r < 0.5 ? primaryColor : r < 0.8 ? secondaryColor : accentColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, speeds, colors };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          array={speeds}
          count={speeds.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ============================
   Neural Network Lines
   ============================ */
function NeuralLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodeCount = 40;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 25
        )
      );
    }

    // Connect nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 8) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z);
          points.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      linesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#00F5FF" transparent opacity={0.06} />
    </lineSegments>
  );
}

/* ============================
   Mouse Reactive Light
   ============================ */
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      const y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
      lightRef.current.position.set(x, y, 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  return (
    <pointLight
      ref={lightRef}
      color="#00F5FF"
      intensity={2}
      distance={20}
      decay={2}
    />
  );
}

/* ============================
   Scene
   ============================ */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <MouseLight />
      <CyberGrid />
      <ParticleGalaxy />
      <NeuralLines />
    </>
  );
}

/* ============================
   Main Export
   ============================ */
export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0005)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise
            premultiply
            blendFunction={BlendFunction.ADD}
            opacity={0.02}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
