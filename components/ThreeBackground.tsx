"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";

function Model() {
    const modelRef = useRef<any>(null);
    const { scene } = useGLTF("/crystal.glb");

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.3;
            modelRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
        >
            <primitive
                ref={modelRef}
                object={scene.clone()}
                scale={2.5}
            />
        </Float>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-50">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00f0ff" />
                <pointLight position={[0, 0, 0]} intensity={2} color="#0088ff" />
                <Suspense fallback={null}>
                    <Model />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
