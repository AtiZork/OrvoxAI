"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function CircuitLines() {
    const lineRef = useRef<any>(null);

    // Generate random lines resembling a circuit
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            pts.push(new THREE.Vector3(x, y, z));
            pts.push(new THREE.Vector3(x + (Math.random() - 0.5), y + (Math.random() - 0.5), z));
        }
        return pts;
    }, []);

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={lineRef}>
            <Line
                worldUnits
                points={points}
                color="#00f0ff"
                lineWidth={0.5}
                opacity={0.2}
                transparent
            />

        </group>
    );
}

function CircuitParticles() {
    const ref = useRef<any>(null);
    const sphere = random.inSphere(new Float32Array(500), { radius: 10 });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function CircuitBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <CircuitLines />
                <CircuitParticles />
            </Canvas>
        </div>
    );
}
