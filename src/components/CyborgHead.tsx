"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CyborgHead() {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const neuralLinesRef = useRef<THREE.LineSegments>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Mouse tracking
  useFrame(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }
  });

  // Neural connection geometry
  const neuralGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 3);
    const posArray = geo.attributes.position.array;
    const lines: number[] = [];

    // Create random connections between vertices
    for (let i = 0; i < posArray.length; i += 3) {
      const startIdx = i;
      // Connect to 1-2 random vertices
      for (let c = 0; c < 2; c++) {
        const targetIdx =
          Math.floor(Math.random() * (posArray.length / 3)) * 3;
        if (targetIdx !== startIdx) {
          lines.push(
            posArray[startIdx],
            posArray[startIdx + 1],
            posArray[startIdx + 2]
          );
          lines.push(
            posArray[targetIdx],
            posArray[targetIdx + 1],
            posArray[targetIdx + 2]
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lines, 3)
    );
    return lineGeo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Auto rotation + mouse tracking
      groupRef.current.rotation.y = t * 0.15 + mousePos.current.x * 0.3;
      groupRef.current.rotation.x = mousePos.current.y * 0.15;
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (0.2 + i * 0.1);
        ring.rotation.x = Math.sin(t * 0.5 + i) * 0.2;
      });
    }

    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(t * 1.5) * 2.5;
      (scanLineRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.abs(Math.sin(t * 1.5)) * 0.4;
    }

    if (neuralLinesRef.current) {
      (neuralLinesRef.current.material as THREE.LineBasicMaterial).opacity =
        Math.sin(t * 2) * 0.15 + 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={viewport.width < 6 ? 0.7 : 1}>
      {/* Main wireframe head (icosahedron) */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial
          wireframe
          color="#00F5FF"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial
          color="#7B2EFF"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Neural connections inside */}
      <lineSegments ref={neuralLinesRef} geometry={neuralGeometry}>
        <lineBasicMaterial color="#7B2EFF" transparent opacity={0.2} />
      </lineSegments>

      {/* Orbital energy rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, i * 0.3, 0]}>
            <torusGeometry args={[2.8 + i * 0.3, 0.01, 8, 64]} />
            <meshBasicMaterial
              color={i === 0 ? "#00F5FF" : i === 1 ? "#7B2EFF" : "#FF006E"}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Holographic scan line */}
      <mesh ref={scanLineRef}>
        <planeGeometry args={[6, 0.05]} />
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating vertices / data points */}
      {useMemo(() => {
        const points: React.JSX.Element[] = [];
        const geo = new THREE.IcosahedronGeometry(2.2, 2);
        const posArray = geo.attributes.position.array;
        for (let i = 0; i < posArray.length; i += 9) {
          points.push(
            <mesh
              key={i}
              position={[posArray[i], posArray[i + 1], posArray[i + 2]]}
            >
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshBasicMaterial color="#00F5FF" />
            </mesh>
          );
        }
        return points;
      }, [])}
    </group>
  );
}
