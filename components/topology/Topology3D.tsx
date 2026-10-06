"use client";

import { content } from "@/content/content";
import { getScrollScene } from "@/lib/scroll-scene";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function scenePos(x: number, y: number, z: number): [number, number, number] {
  return [(x - 580) / 140, (300 - y) / 140, z];
}

const PROJECT_NODES: string[][] = [
  ["ui", "api", "trace", "response"],
  ["auth", "budget", "executor", "provider"],
  ["auth", "ratelimit", "api"],
  ["executor", "trace"],
];

function Graph() {
  const reduced = usePrefersReducedMotion();
  const group = useRef<Group>(null);
  const particle = useRef<Mesh>(null);
  const trail = useRef<Mesh[]>([]);
  const nodeMeshes = useRef<Record<string, Mesh | null>>({});
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 8));
  const scaleScratch = useRef(new THREE.Vector3(1, 1, 1));

  const points = useMemo(
    () =>
      content.topology.map((node) => ({
        id: node.id,
        label: node.label,
        pos: scenePos(node.x, node.y, node.z),
      })),
    [],
  );

  const byId = useMemo(
    () => Object.fromEntries(points.map((point) => [point.id, point.pos])),
    [points],
  );

  const lines = useMemo(
    () =>
      content.topologyEdges
        .filter(([from, to]) => byId[from] && byId[to])
        .map(([from, to]) => [byId[from], byId[to]] as const),
    [byId],
  );

  const path = useMemo(() => {
    const order = [
      "browser",
      "ui",
      "api",
      "auth",
      "budget",
      "executor",
      "trace",
      "response",
    ];
    return order
      .filter((id) => byId[id])
      .map((id) => new THREE.Vector3(...byId[id]));
  }, [byId]);

  useFrame(({ camera, clock }) => {
    if (reduced) return;
    const scene = getScrollScene();
    const t = clock.getElapsedTime();

    let look = new THREE.Vector3(0, 0, 0);
    let cam = new THREE.Vector3(0, 0.2, 8);
    const next = new Set<string>();

    if (scene.experience > 0.15 && scene.handoff < 0.2) {
      const campus = byId.campuspro;
      look = new THREE.Vector3(...campus);
      cam = new THREE.Vector3(campus[0], campus[1] + 0.4, 5.5);
      next.add("campuspro");
      next.add("api");
    } else if (scene.handoff > 0.05 && scene.works < 0.02) {
      const response = byId.response;
      look = new THREE.Vector3(...response);
      cam = new THREE.Vector3(
        response[0] * 0.25,
        response[1] * 0.15,
        6 - scene.handoff * 2.4,
      );
      next.add("ui");
      next.add("response");
    } else if (scene.works > 0.02) {
      const active = PROJECT_NODES[scene.activeProject] ?? PROJECT_NODES[0];
      active.forEach((id) => next.add(id));
      const first = byId[active[0]];
      if (first) {
        look = new THREE.Vector3(...first);
        cam = new THREE.Vector3(first[0] * 0.35, first[1] * 0.2 + 0.15, 6.2);
      }
    }

    camera.position.lerp(cam, 0.045);
    cameraTarget.current.lerp(look, 0.05);
    camera.lookAt(cameraTarget.current);

    Object.entries(nodeMeshes.current).forEach(([id, mesh]) => {
      if (!mesh) return;
      const scale = next.has(id) ? 1.7 : 1;
      scaleScratch.current.set(scale, scale, scale);
      mesh.scale.lerp(scaleScratch.current, 0.08);
    });

    if (path.length > 1) {
      const place = (mesh: Mesh | null, offset: number) => {
        if (!mesh) return;
        const span = path.length - 1;
        const u = (t * 0.22 + offset) % 1;
        const scaled = u * span;
        const i = Math.min(span - 1, Math.floor(scaled));
        const local = scaled - i;
        mesh.position.lerpVectors(path[i], path[i + 1], local);
      };
      place(particle.current, 0);
      trail.current.forEach((dot, index) => place(dot, (index + 1) * 0.08));
    }
  });

  return (
    <group ref={group}>
      {lines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color="#ece9e1"
          lineWidth={1}
          transparent
          opacity={0.22}
        />
      ))}
      {points.map((point) => (
        <mesh
          key={point.id}
          position={point.pos}
          ref={(mesh) => {
            nodeMeshes.current[point.id] = mesh;
          }}
        >
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#ece9e1"
            emissive="#ece9e1"
            emissiveIntensity={0.35}
            roughness={0.4}
          />
          <Html
            center
            distanceFactor={10}
            style={{
              pointerEvents: "none",
              color: "rgba(236,233,225,0.55)",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transform: "translateY(14px)",
            }}
          >
            {point.label}
          </Html>
        </mesh>
      ))}
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            if (mesh) trail.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial
            color="#ece9e1"
            emissive="#ece9e1"
            emissiveIntensity={0.4}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
      <mesh ref={particle}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial
          color="#ece9e1"
          emissive="#ece9e1"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function Topology3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 8], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[2, 3, 4]} intensity={0.4} />
      <Graph />
    </Canvas>
  );
}
