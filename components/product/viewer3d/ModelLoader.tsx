"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  useProgress,
  Html,
  PresentationControls,
  ContactShadows,
  Center,
} from "@react-three/drei";
import * as THREE from "three";
import type { ProductModel, EnvironmentPreset } from "@/types/product";

// ============================================
// LOADING INDICATOR
// ============================================

function LoadingSpinner() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <svg className="w-20 h-20 animate-spin" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-[var(--color-sand)]"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              className="text-[var(--color-charcoal)]"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-[var(--color-charcoal)]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Loading 3D Model
        </p>
      </div>
    </Html>
  );
}

// ============================================
// 3D MODEL COMPONENT
// ============================================

interface ModelProps {
  url: string;
  scale?: number;
  onLoaded?: () => void;
}

function Model({ url, scale = 1, onLoaded }: ModelProps) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Notify parent that model is loaded
      onLoaded?.();
    }
  }, [scene, onLoaded]);

  // Optional: Add subtle animation
  useFrame((state) => {
    if (modelRef.current) {
      // Subtle floating animation
      modelRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={modelRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// ============================================
// CAMERA CONTROLLER
// ============================================

interface CameraControllerProps {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  controls: ProductModel["controls"];
}

function CameraController({
  position,
  target,
  controls,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(target.x, target.y, target.z);
  }, [camera, position, target]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[target.x, target.y, target.z]}
      autoRotate={controls.autoRotate}
      autoRotateSpeed={controls.autoRotateSpeed}
      enableZoom={controls.enableZoom}
      enablePan={controls.enablePan}
      minDistance={controls.minDistance}
      maxDistance={controls.maxDistance}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
    />
  );
}

// ============================================
// MAIN 3D VIEWER COMPONENT
// ============================================

interface ModelViewerProps {
  model: ProductModel;
  isFullscreen?: boolean;
  onLoadComplete?: () => void;
}

export function ModelViewer({
  model,
  isFullscreen = false,
  onLoadComplete,
}: ModelViewerProps) {
  const [quality, setQuality] = useState<"low" | "high">("low");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHighPolyLoading, setIsHighPolyLoading] = useState(false);

  // Load high poly when entering fullscreen
  useEffect(() => {
    if (isFullscreen && model.highPolyUrl && quality === "low") {
      setIsHighPolyLoading(true);
      setQuality("high");
    }
  }, [isFullscreen, model.highPolyUrl, quality]);

  const handleModelLoaded = useCallback(() => {
    setIsLoaded(true);
    setIsHighPolyLoading(false);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const currentModelUrl =
    quality === "high" && model.highPolyUrl
      ? model.highPolyUrl
      : model.lowPolyUrl;

  // Map environment preset to drei format
  const environmentPreset =
    model.environmentPreset.toLowerCase() as EnvironmentPreset;

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        style={{
          background: model.backgroundColor || "transparent",
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Environment */}
          <Environment preset={environmentPreset} />

          {/* Model */}
          <Center>
            <Model
              url={currentModelUrl}
              scale={model.scale}
              onLoaded={handleModelLoaded}
            />
          </Center>

          {/* Contact shadow for grounding */}
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Camera Controls */}
          <CameraController
            position={model.cameraPosition}
            target={model.cameraTarget}
            controls={model.controls}
          />
        </Suspense>
      </Canvas>

      {/* High poly loading indicator */}
      {isHighPolyLoading && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--color-muted)]">Loading HD</span>
        </div>
      )}

      {/* Quality indicator */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
          {quality === "high" ? "HD" : "Preview"}
        </div>
      )}
    </div>
  );
}

// Preload models
useGLTF.preload;
