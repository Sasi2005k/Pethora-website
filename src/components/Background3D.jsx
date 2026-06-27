import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const STORY_ORDER = ['home', 'sarees', 'chudithars', 'kurtis', 'jewellery', 'about', 'contact'];

function getStoryWindow(sectionId, offsets) {
  const index = STORY_ORDER.indexOf(sectionId);
  const current = offsets[sectionId] ?? 0;
  const previous = offsets[STORY_ORDER[index - 1]] ?? Math.max(0, current - 0.16);
  const next = offsets[STORY_ORDER[index + 1]] ?? Math.min(1, current + 0.16);
  const leadIn = (current - previous) * 0.2;
  const leadOut = (next - current) * 0.48;

  return {
    start: Math.max(0, current - leadIn),
    peak: current,
    end: Math.min(1, current + leadOut)
  };
}

function smoothRange(value, start, peak, end) {
  if (value <= start || value >= end) return 0;
  if (value <= peak) {
    return THREE.MathUtils.smoothstep(value, start, peak);
  }
  return 1 - THREE.MathUtils.smoothstep(value, peak, end);
}

function seededParticleValue(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

// Product Mesh Component (Reduced Card Size: 2.1 x 3.1)
function ProductPanel({ position, textureUrl, sectionId, scrollVal, sectionOffsets }) {
  const texture = useTexture(textureUrl);
  const groupRef = useRef();
  const frameMaterialRef = useRef();
  const imageMaterialRef = useRef();
  const visibilityRef = useRef(0);

  useFrame(() => {
    if (!groupRef.current || !frameMaterialRef.current || !imageMaterialRef.current) return;

    const storyWindow = getStoryWindow(sectionId, sectionOffsets);
    const targetVisibility = smoothRange(scrollVal.current, storyWindow.start, storyWindow.peak, storyWindow.end);
    visibilityRef.current = THREE.MathUtils.lerp(visibilityRef.current, targetVisibility, 0.08);

    const imageOpacity = visibilityRef.current * 0.95;
    const frameOpacity = visibilityRef.current * 0.9;
    imageMaterialRef.current.opacity = imageOpacity;
    frameMaterialRef.current.opacity = frameOpacity;
    groupRef.current.scale.setScalar(0.94 + visibilityRef.current * 0.06);
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Outer Luxury Gold Frame */}
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[2.2, 3.2]} />
        <meshStandardMaterial
          ref={frameMaterialRef}
          color="#D4AF37"
          roughness={0.15}
          metalness={0.85}
          transparent={true}
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Image Mesh */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.1, 3.1]} />
        <meshBasicMaterial
          ref={imageMaterialRef}
          map={texture}
          transparent={true}
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Gold Dust Particles Component
function GoldParticles({ count = 250 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const xSeed = seededParticleValue(i, 1);
      const ySeed = seededParticleValue(i, 2);
      const zSeed = seededParticleValue(i, 3);
      const speedSeed = seededParticleValue(i, 4);
      const phaseSeed = seededParticleValue(i, 5);

      positions[i * 3] = (xSeed - 0.5) * 12; // X
      positions[i * 3 + 1] = ySeed * -32 + 2; // Y (Expanded bounds)
      positions[i * 3 + 2] = (zSeed - 0.5) * 8; // Z

      speeds[i] = 0.01 + speedSeed * 0.02;
      phases[i] = phaseSeed * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx + 1] -= particles.speeds[i] * 0.15;
      positions[idx] += Math.sin(time + particles.phases[i]) * 0.0015;

      if (positions[idx + 1] < -32) {
        positions[idx + 1] = 2;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.04}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera and Scene Controller (Scroll Lerping for Smoothness)
function SceneController({ scrollVal, mouseRef, sectionOffsets }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const lerpedScroll = useRef(0);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  // Shifted keyframes down by an extra 2.0 units to ensure Saree card is 100% hidden on Hero screen:
  // - Hero (p: 0.0): Camera at [0, 0, 6.2]
  // - Saree (p: 0.2): Card at y: -5.8. Camera looks right [0.6, -5.8, 3.8] with rot Y: -0.14
  // - Chudithar (p: 0.4): Card at y: -9.8. Camera looks left [-0.6, -9.8, 3.8] with rot Y: 0.14
  // - Kurti (p: 0.6): Card at y: -13.8. Camera looks right [0.6, -13.8, 3.8] with rot Y: -0.14
  // - Jewellery (p: 0.8): Card at y: -17.8. Camera looks left [-0.6, -17.8, 3.8] with rot Y: 0.14
  // - About (p: 0.9): Camera pos [0, -22.5, 5.0], rot X: 0.12 (well clear of jewellery)
  // - Contact (p: 1.0): Camera pos [0, -27.0, 5.8], rot X: 0.22 (well clear of jewellery)
  const keyframes = useMemo(() => {
    const offsets = sectionOffsets || {
      home: 0,
      sarees: 0.16,
      chudithars: 0.33,
      kurtis: 0.5,
      jewellery: 0.66,
      about: 0.83,
      contact: 1.0
    };

    return [
      { p: offsets.home || 0.0, pos: [0, 0, 6.2], rot: [0, 0, 0] },
      { p: offsets.sarees || 0.16, pos: [0.6, -5.8, 3.8], rot: [0.03, -0.14, 0] },   // Saree (look right)
      { p: offsets.chudithars || 0.33, pos: [-0.6, -9.8, 3.8], rot: [0.03, 0.14, 0] },   // Chudithar (look left)
      { p: offsets.kurtis || 0.5, pos: [0.6, -13.8, 3.8], rot: [0.03, -0.14, 0] },  // Kurti (look right)
      { p: offsets.jewellery || 0.66, pos: [-0.6, -17.8, 3.8], rot: [0.03, 0.14, 0] }, // Jewellery (look left)
      { p: offsets.about || 0.83, pos: [0, -22.5, 5.0], rot: [0.12, 0, 0] },          // About (completely clear)
      { p: offsets.contact || 1.0, pos: [0, -27.0, 5.8], rot: [0.22, 0, 0] }          // Contact (completely clear)
    ];
  }, [sectionOffsets]);

  useFrame(() => {
    const activeCamera = cameraRef.current;

    // Smooth scroll position
    lerpedScroll.current = THREE.MathUtils.lerp(lerpedScroll.current, scrollVal.current, 0.045);
    const p = lerpedScroll.current;

    // Bounding keyframes
    let k1 = keyframes[0];
    let k2 = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (p >= keyframes[i].p && p <= keyframes[i + 1].p) {
        k1 = keyframes[i];
        k2 = keyframes[i + 1];
        break;
      }
    }

    const range = k2.p - k1.p;
    const t = range === 0 ? 0 : (p - k1.p) / range;

    const targetX = k1.pos[0] + t * (k2.pos[0] - k1.pos[0]);
    const targetY = k1.pos[1] + t * (k2.pos[1] - k1.pos[1]);
    const targetZ = k1.pos[2] + t * (k2.pos[2] - k1.pos[2]);

    const targetRotX = k1.rot[0] + t * (k2.rot[0] - k1.rot[0]);
    const targetRotY = k1.rot[1] + t * (k2.rot[1] - k1.rot[1]);
    const targetRotZ = k1.rot[2] + t * (k2.rot[2] - k1.rot[2]);

    const mouseXOffset = mouseRef.current.x * 0.25;
    const mouseYOffset = mouseRef.current.y * 0.25;

    activeCamera.position.x = THREE.MathUtils.lerp(activeCamera.position.x, targetX + mouseXOffset, 0.075);
    activeCamera.position.y = THREE.MathUtils.lerp(activeCamera.position.y, targetY + mouseYOffset, 0.075);
    activeCamera.position.z = THREE.MathUtils.lerp(activeCamera.position.z, targetZ, 0.075);

    activeCamera.rotation.x = THREE.MathUtils.lerp(activeCamera.rotation.x, targetRotX - mouseYOffset * 0.05, 0.075);
    activeCamera.rotation.y = THREE.MathUtils.lerp(activeCamera.rotation.y, targetRotY + mouseXOffset * 0.05, 0.075);
    activeCamera.rotation.z = THREE.MathUtils.lerp(activeCamera.rotation.z, targetRotZ, 0.075);
  });

  return null;
}

// Scene Wrapper
function SceneContent({ scrollVal, mouseRef, sectionOffsets }) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFF8F0" />
      <pointLight position={[-5, -5, -2]} intensity={1.0} color="#D4AF37" />
      <pointLight position={[3, -10, 2]} intensity={2.0} color="#D4AF37" />

      <GoldParticles count={300} />

      {/* Repositioned Product Panels shifted down by an extra 2.0 units:
          - Saree (y: -5.8): Card is on the Right (x: 3.2)
          - Chudithar (y: -9.8): Card is on the Left (x: -3.2)
          - Kurti (y: -13.8): Card is on the Right (x: 3.2)
          - Jewellery (y: -17.8): Card is on the Left (x: -3.2) */}
      <ProductPanel position={[3.2, -5.8, 0]} textureUrl="/saree.png" sectionId="sarees" scrollVal={scrollVal} sectionOffsets={sectionOffsets} />
      <ProductPanel position={[-3.2, -9.8, 0]} textureUrl="/chudithar.png" sectionId="chudithars" scrollVal={scrollVal} sectionOffsets={sectionOffsets} />
      <ProductPanel position={[3.2, -13.8, 0]} textureUrl="/kurti.png" sectionId="kurtis" scrollVal={scrollVal} sectionOffsets={sectionOffsets} />
      <ProductPanel position={[-3.2, -17.8, 0]} textureUrl="/jewellery.png" sectionId="jewellery" scrollVal={scrollVal} sectionOffsets={sectionOffsets} />

      {/* Scene Controller */}
      <SceneController scrollVal={scrollVal} mouseRef={mouseRef} sectionOffsets={sectionOffsets} />
    </>
  );
}

export default function Background3D({ scrollVal, sectionOffsets }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="webgl-canvas-container">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 50, position: [0, 0, 6.2] }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent scrollVal={scrollVal} mouseRef={mouseRef} sectionOffsets={sectionOffsets} />
      </Canvas>
    </div>
  );
}
