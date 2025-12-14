"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Torus, Octahedron, Sphere, Icosahedron, Dodecahedron } from "@react-three/drei";
import * as THREE from "three";

const Geometries = [Box, Torus, Octahedron, Sphere, Icosahedron, Dodecahedron];

interface Service3DProps {
    index: number;
}

export default function Service3DIcon({ index }: Service3DProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Select geometry based on index
    const Geometry = Geometries[index % Geometries.length];

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            if (hovered) {
                meshRef.current.rotation.x += delta * 1;
                meshRef.current.rotation.y += delta * 1;
            }
        }
    });

    // Determine args based on geometry type
    let args: any[] = [];
    if (Geometry === Box) args = [1.5, 1.5, 1.5]; // width, height, depth
    else if (Geometry === Torus) args = [1, 0.3, 16, 30]; // radius, tube, radialSegments, tubularSegments
    else if (Geometry === Octahedron) args = [1.5, 0]; // radius, detail
    else if (Geometry === Sphere) args = [1.2, 32, 32]; // radius, widthSegments, heightSegments
    else if (Geometry === Icosahedron) args = [1.5, 0];
    else if (Geometry === Dodecahedron) args = [1.5, 0];

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            {/* @ts-ignore */}
            <Geometry
                ref={meshRef}
                args={args as any}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.2 : 1}
            >
                <meshStandardMaterial
                    color={hovered ? "#00f0ff" : "#2d2d2d"}
                    emissive={hovered ? "#00f0ff" : "#000000"}
                    emissiveIntensity={hovered ? 2 : 0}
                    wireframe={true}
                />
            </Geometry>
        </Float>
    );
}
