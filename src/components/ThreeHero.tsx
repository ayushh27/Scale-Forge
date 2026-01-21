"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingNodes() {
    const count = 40;
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10
                ],
                size: Math.random() * 0.1 + 0.05
            });
        }
        return p;
    }, []);

    return (
        <group>
            {points.map((p, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh position={p.position as any}>
                        <sphereGeometry args={[p.size, 16, 16]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.5} transparent opacity={0.6} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function CentralCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial
                color="#4ade80"
                wireframe
                transparent
                opacity={0.2}
            />
        </mesh>
    );
}

import { Preload, AdaptiveEvents } from "@react-three/drei";

export default function ThreeHero() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <AdaptiveEvents />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <FloatingNodes />
                <CentralCore />

                <Preload all />
                {/* Abstract background elements */}
                <mesh position={[0, 0, -5]}>
                    <planeGeometry args={[50, 50]} />
                    <meshBasicMaterial color="#050505" transparent opacity={0.5} />
                </mesh>
            </Canvas>
        </div>
    );
}
