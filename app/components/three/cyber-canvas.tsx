import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useAppTheme, getConciseTheme } from "~/components/theme";

const DARK_BG = "#0a0a0f";
const LIGHT_BG = "#e8e8f0";

function getColors(isDark: boolean) {
  return {
    primary: isDark ? "#00f5ff" : "#008898",
    secondary: isDark ? "#ff00b4" : "#c00070",
    accent: isDark ? "#ff7800" : "#c06000",
  };
}

// Large wireframe centerpiece - icosahedron with nested dodecahedron
function Centerpiece({ isDark }: { isDark: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const c = getColors(isDark);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.06;
      outerRef.current.rotation.y = t * 0.09;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.12;
      innerRef.current.rotation.y = -t * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.2}>
      <group position={[3.5, 0.2, -4]}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial
            color={c.primary}
            wireframe
            transparent
            opacity={isDark ? 0.2 : 0.35}
          />
        </mesh>
        <mesh ref={innerRef}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial
            color={c.secondary}
            wireframe
            transparent
            opacity={isDark ? 0.12 : 0.25}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={c.primary}
            transparent
            opacity={isDark ? 0.4 : 0.25}
          />
        </mesh>
        <pointLight
          color={c.primary}
          intensity={isDark ? 3 : 1.5}
          distance={10}
          decay={2}
        />
      </group>
    </Float>
  );
}

// Scattered wireframe shapes floating in space
function FloatingShapes({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const c = getColors(isDark);

  const shapes = useMemo(() => {
    const colors = [c.primary, c.secondary, c.accent];
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        -Math.random() * 15 - 3,
      ] as [number, number, number],
      scale: 0.06 + Math.random() * 0.15,
      speed: 0.15 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.5 ? ("oct" as const) : ("tet" as const),
    }));
  }, [c.primary, c.secondary, c.accent]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      if (!s) return;
      child.position.y = s.position[1] + Math.sin(t * s.speed + s.offset) * 0.4;
      child.rotation.x = t * s.speed * 0.4;
      child.rotation.y = t * s.speed * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          {s.type === "oct" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <tetrahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial
            color={s.color}
            wireframe
            transparent
            opacity={isDark ? 0.5 : 0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Subtle mouse parallax on camera
function CameraRig() {
  useFrame((state) => {
    const x = state.pointer.x * 0.3;
    const y = state.pointer.y * 0.15;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y + 0.5,
      0.03
    );
    state.camera.lookAt(1, 0, -3);
  });
  return null;
}

function Effects({ isDark }: { isDark: boolean }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={isDark ? 0.4 : 0.08}
        luminanceThreshold={isDark ? 0.15 : 0.5}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.3} darkness={isDark ? 0.4 : 0.2} />
    </EffectComposer>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  const bg = isDark ? DARK_BG : LIGHT_BG;

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 14, 35]} />
      <ambientLight intensity={isDark ? 0.05 : 0.3} />

      <Centerpiece isDark={isDark} />
      <FloatingShapes isDark={isDark} />
      <CameraRig />
      <Effects isDark={isDark} />
    </>
  );
}

export default function CyberCanvas() {
  const theme = useAppTheme();
  const isDark = getConciseTheme(theme) === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      dpr={[1, 1.5]}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}
