import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 40 : 100;

  // Create per-particle data
  const particles = useRef(
    Array.from({ length: COUNT }, (_, _i) => ({
      semiMajor: 2 + Math.random() * 8,
      semiMinor: 1 + Math.random() * 5,
      inclination: Math.random() * Math.PI,
      longAscNode: Math.random() * Math.PI * 2,
      speed: 0.05 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      radius: 0.03 + Math.random() * 0.12,
      color: new THREE.Color().setHSL(
        [0.6, 0.72, 0.85][Math.floor(Math.random() * 3)] + (Math.random() - 0.5) * 0.05,
        0.85,
        0.65 + Math.random() * 0.2
      ),
    }))
  );

  const dummy = useRef(new THREE.Object3D());
  const colors = useRef(new Float32Array(COUNT * 3));

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    particles.current.forEach((p, i) => {
      p.color.toArray(colors.current, i * 3);
    });
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors.current, 3);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;

    particles.current.forEach((p, i) => {
      const angle = t * p.speed + p.phase;

      // Elliptical orbit in local plane
      const lx = Math.cos(angle) * p.semiMajor;
      const lz = Math.sin(angle) * p.semiMinor;

      // Rotate by inclination and longitude of ascending node
      const cosI = Math.cos(p.inclination);
      const sinI = Math.sin(p.inclination);
      const cosO = Math.cos(p.longAscNode);
      const sinO = Math.sin(p.longAscNode);

      const x = cosO * lx - sinO * lz * cosI;
      const y = sinI * lz;
      const z = sinO * lx + cosO * lz * cosI;

      dummy.current.position.set(x, y, z);
      dummy.current.scale.setScalar(p.radius);
      dummy.current.rotation.set(t * 0.5, t * 0.3, 0);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

    // Camera subtle parallax
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial roughness={0.1} metalness={0.8} />
    </instancedMesh>
  );
}

export function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60 }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
        }, false);
        canvas.addEventListener('webglcontextrestored', () => {
          // Re-trigger render loop or re-init if explicitly needed
        }, false);
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <fog attach="fog" args={['#050508', 12, 28]} />
      <ambientLight intensity={0.15} color="#4F8EF7" />
      <pointLight position={[8, 6, 4]} intensity={40} color="#4F8EF7" />
      <pointLight position={[-8, -4, 6]} intensity={30} color="#A78BFA" />
      <pointLight position={[0, 8, -6]} intensity={20} color="#34D399" />
      <Particles />
    </Canvas>
  );
}
