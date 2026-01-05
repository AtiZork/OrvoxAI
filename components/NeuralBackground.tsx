"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Node {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
}

// Detect if mobile for performance optimization
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

function NeuralNetwork() {
    const linesRef = useRef<THREE.LineSegments>(null);
    const nodesRef = useRef<any>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const isMobile = useIsMobile();

    // Reduce nodes for a cleaner, minimal aesthetic
    const nodeCount = isMobile ? 20 : 35;

    // Create neural nodes
    const nodes = useMemo<Node[]>(() => {
        const nodeArray: Node[] = [];
        for (let i = 0; i < nodeCount; i++) {
            nodeArray.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 25, // Spread out more
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 10
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.008, // Much slower
                    (Math.random() - 0.5) * 0.008,
                    0
                )
            });
        }
        return nodeArray;
    }, [nodeCount]);

    // Create positions array for Points
    const positions = useMemo(() => {
        const pos = new Float32Array(nodes.length * 3);
        nodes.forEach((node, i) => {
            pos[i * 3] = node.position.x;
            pos[i * 3 + 1] = node.position.y;
            pos[i * 3 + 2] = node.position.z;
        });
        return pos;
    }, [nodes]);

    useEffect(() => {
        // Disable mouse tracking on mobile
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    useFrame((state) => {
        // Animate nodes
        nodes.forEach((node) => {
            node.position.add(node.velocity);

            // Boundary check
            if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
            if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
        });

        // Update node positions with NaN check
        if (nodesRef.current && nodesRef.current.geometry.attributes.position) {
            const positions = nodesRef.current.geometry.attributes.position.array;
            nodes.forEach((node, i) => {
                // Ensure no NaN values
                const x = isNaN(node.position.x) ? 0 : node.position.x;
                const y = isNaN(node.position.y) ? 0 : node.position.y;
                const z = isNaN(node.position.z) ? 0 : node.position.z;
                
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
            });
            nodesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Update connections based on proximity and mouse
        if (linesRef.current) {
            const linePositions: number[] = [];
            const lineColors: number[] = [];
            const maxDistance = 3.5;
            const mouseInfluence = isMobile ? 0 : 5; // Disable mouse on mobile

            const mousePos3D = new THREE.Vector3(
                mousePos.x * 10,
                mousePos.y * 10,
                0
            );

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const distance = nodes[i].position.distanceTo(nodes[j].position);

                    // Check distance to mouse
                    const distToMouse = Math.min(
                        nodes[i].position.distanceTo(mousePos3D),
                        nodes[j].position.distanceTo(mousePos3D)
                    );

                    if (distance < maxDistance || distToMouse < mouseInfluence) {
                        linePositions.push(
                            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                        );

                        // Color based on distance to mouse - professional cyan/blue only
                        const intensity = distToMouse < mouseInfluence
                            ? 1 - (distToMouse / mouseInfluence)
                            : 0.2;

                        // Consistent cyan-blue tones for professional look
                        const r = 0.0;
                        const g = 0.7 * intensity;
                        const b = 1.0 * intensity;

                        lineColors.push(r, g, b, r, g, b);
                    }
                }
            }

            // Only update if we have valid line positions
            if (linePositions.length > 0) {
                const geometry = linesRef.current.geometry;
                geometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(linePositions, 3)
                );
                geometry.setAttribute(
                    'color',
                    new THREE.Float32BufferAttribute(lineColors, 3)
                );
                geometry.attributes.position.needsUpdate = true;
                geometry.attributes.color.needsUpdate = true;
            }
        }
    });

    return (
        <group>
            {/* Neural nodes */}
            <Points ref={nodesRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00d4ff"
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3} // More subtle
                />
            </Points>

            {/* Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.15} // Very subtle connections
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}

function FloatingParticles() {
    const ref = useRef<any>(null);
    const isMobile = useIsMobile();

    // Reduce particles on mobile
    const particleCount = isMobile ? 50 : 100;

    const particles = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, [particleCount]);

    useFrame((state, delta) => {
        if (ref.current) {
            const speed = isMobile ? 0.02 : 0.03;
            ref.current.rotation.y += delta * speed;
            ref.current.rotation.x += delta * (speed / 3);
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#60a5fa"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
            />
        </Points>
    );
}

export default function NeuralBackground() {
    const isMobile = useIsMobile();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Only on mobile, add slight parallax effect
        if (!isMobile) return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={isMobile ? { transform: `translateY(${scrollY * 0.3}px)` } : undefined}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{ alpha: true, antialias: !isMobile }}
            >
                <NeuralNetwork />
                <FloatingParticles />
            </Canvas>
        </div>
    );
}
