import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { TrainPosition } from '../../types/railway';
import { Camera, Play, Pause, Compass, Gauge, AlertTriangle, Eye } from 'lucide-react';

interface Railway3DCanvasProps {
  activeTrain?: TrainPosition | null;
  isFeedActive?: boolean;
}

// Procedural 3D Locomotive & Coach Mesh
const TrainMesh: React.FC<{ speedKmph: number; isMoving: boolean }> = ({ speedKmph, isMoving }) => {
  const trainGroupRef = useRef<THREE.Group>(null);
  const wheelsGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (trainGroupRef.current && isMoving && speedKmph > 0) {
      // Gentle vibration & sway proportional to speed
      const sway = Math.sin(state.clock.elapsedTime * 8) * 0.015 * (speedKmph / 100);
      trainGroupRef.current.position.y = sway;
      trainGroupRef.current.rotation.z = sway * 0.5;

      // Wheel rotation
      if (wheelsGroupRef.current) {
        wheelsGroupRef.current.children.forEach(wheel => {
          wheel.rotation.x += delta * (speedKmph * 0.05);
        });
      }
    }
  });

  return (
    <group ref={trainGroupRef} position={[0, 0.4, 0]}>
      {/* 1. Main Locomotive Body (Aerodynamic Vande Bharat / WAP-7 style) */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.6, 9]} />
        <meshStandardMaterial color="#0284C7" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Aerodynamic White/Blue Nose */}
      <mesh position={[0, 0.9, 4.8]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[2.36, 1.2, 1.5]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Front Windshield Cabin Glass */}
      <mesh position={[0, 1.4, 4.5]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[2.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
      </mesh>

      {/* Roof Stripe & AC Units */}
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[2.2, 0.2, 8.5]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* High-voltage Pantograph (Overhead Catenary Pick-up) */}
      <group position={[0, 2.3, -2]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
          <meshStandardMaterial color="#DC2626" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[1.8, 0.06, 0.3]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
      </group>

      {/* Powerful Dual Headlights */}
      <group position={[0, 0.7, 5.4]}>
        {/* Left Headlight */}
        <mesh position={[-0.7, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <spotLight
          position={[-0.7, 0, 0]}
          target-position={[-0.7, -1, 20]}
          color="#FFFFFF"
          intensity={isMoving ? 6 : 2}
          distance={35}
          angle={0.45}
          penumbra={0.5}
          castShadow
        />

        {/* Right Headlight */}
        <mesh position={[0.7, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <spotLight
          position={[0.7, 0, 0]}
          target-position={[0.7, -1, 20]}
          color="#FFFFFF"
          intensity={isMoving ? 6 : 2}
          distance={35}
          angle={0.45}
          penumbra={0.5}
          castShadow
        />

        {/* Marker Signal Red Lamps */}
        <mesh position={[-0.9, 0.3, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <mesh position={[0.9, 0.3, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
      </group>

      {/* Trailing Coach 1 */}
      <mesh position={[0, 1.2, -10.2]} castShadow receiveShadow>
        <boxGeometry args={[2.35, 1.55, 9]} />
        <meshStandardMaterial color="#0284C7" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Coach Windows */}
      <mesh position={[0, 1.3, -10.2]}>
        <boxGeometry args={[2.42, 0.5, 8]} />
        <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bogeys & Wheels */}
      <group ref={wheelsGroupRef}>
        {[-3, 3, -13, -7].map((zPos, idx) => (
          <group key={idx} position={[0, -0.2, zPos]}>
            {/* Wheel Left */}
            <mesh position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Wheel Right */}
            <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Axle */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 1.9, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// Procedural Track Ballast, Rails & Catenary Gantry
const RailwayEnvironment: React.FC = () => {
  return (
    <group>
      {/* Ground Bed */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[100, 150]} />
        <meshStandardMaterial color="#090E17" roughness={0.9} />
      </mesh>

      {/* Ballast Stone Track Bed */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.15, 150]} />
        <meshStandardMaterial color="#1E293B" roughness={0.95} />
      </mesh>

      {/* Steel Rails (Left & Right) */}
      <mesh position={[-0.83, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.12, 150]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.83, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.12, 150]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Concrete Sleepers / Ties */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[0, 0.08, -60 + i * 2.8]}>
          <boxGeometry args={[2.5, 0.1, 0.28]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
      ))}

      {/* Overhead 25kV AC Catenary Wire */}
      <mesh position={[0, 3.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 150, 8]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} />
      </mesh>

      {/* Catenary Overhead Portals / Gantries */}
      {[-40, -10, 20, 50].map((zPos, i) => (
        <group key={i} position={[0, 0, zPos]}>
          {/* Left Mast */}
          <mesh position={[-3, 2.5, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 5, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          {/* Right Mast */}
          <mesh position={[3, 2.5, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 5, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          {/* Horizontal Beam */}
          <mesh position={[0, 4.8, 0]}>
            <boxGeometry args={[6.2, 0.15, 0.15]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Railway 3-Aspect Automatic Block Signal Post */}
      <group position={[2.8, 0, 15]}>
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 4.4, 8]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
        {/* Signal Hood */}
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[0.5, 1.2, 0.3]} />
          <meshStandardMaterial color="#0A0F1D" />
        </mesh>
        {/* Green Lamp Illuminated */}
        <mesh position={[0, 3.8, 0.16]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <pointLight position={[0, 3.8, 0.5]} color="#10B981" intensity={3} distance={8} />
      </group>

      {/* Station Platform Edge on Left */}
      <group position={[-5, 0, 0]}>
        <mesh position={[0, 0.45, 0]} receiveShadow>
          <boxGeometry args={[5, 0.9, 120]} />
          <meshStandardMaterial color="#1E293B" roughness={0.9} />
        </mesh>
        {/* Platform Yellow Safety Line */}
        <mesh position={[2.3, 0.91, 0]}>
          <boxGeometry args={[0.18, 0.01, 120]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.5} />
        </mesh>
        {/* Platform Canopy Posts */}
        {[-30, 0, 30].map((z, i) => (
          <group key={i} position={[0, 0, z]}>
            <mesh position={[-1, 2.5, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 3.8, 8]} />
              <meshStandardMaterial color="#38BDF8" metalness={0.8} />
            </mesh>
            <mesh position={[-1, 4.2, 0]}>
              <boxGeometry args={[4.5, 0.1, 8]} />
              <meshStandardMaterial color="#0F172A" metalness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export const Railway3DCanvas: React.FC<Railway3DCanvasProps> = ({
  activeTrain,
  isFeedActive = true
}) => {
  const [cameraMode, setCameraMode] = useState<'orbit' | 'cabin' | 'track' | 'overhead'>('orbit');
  const speed = activeTrain?.speedKmph ?? 130;
  const isTrainLive = isFeedActive && activeTrain?.freshnessState === 'LIVE';

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#070B14] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* 3D Canvas Viewport */}
      <div className="relative flex-1 w-full h-full">
        <Canvas shadows gl={{ antialias: true }}>
          <color attach="background" args={['#070B14']} />
          <fog attach="fog" args={['#070B14', 25, 75]} />

          {/* Dynamic Cameras */}
          {cameraMode === 'orbit' && <PerspectiveCamera makeDefault position={[9, 5, 12]} fov={45} />}
          {cameraMode === 'cabin' && <PerspectiveCamera makeDefault position={[0, 1.8, 4.8]} fov={55} />}
          {cameraMode === 'track' && <PerspectiveCamera makeDefault position={[3.2, 0.6, -6]} fov={50} />}
          {cameraMode === 'overhead' && <PerspectiveCamera makeDefault position={[0, 22, 5]} fov={40} />}

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={3}
            maxDistance={40}
          />

          {/* Environmental Lights */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[15, 25, 15]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Stars radius={60} depth={40} count={2000} factor={3} saturation={0} fade speed={1} />

          {/* 3D Meshes */}
          <TrainMesh speedKmph={speed} isMoving={isTrainLive} />
          <RailwayEnvironment />
        </Canvas>

        {/* Top Overlay Bar: Camera Modes & Telemetry Info */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap justify-between items-center gap-2 pointer-events-none">
          {/* Train HUD Badge */}
          <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md shadow-lg text-xs font-mono">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse signal-cyan" />
            <div>
              <span className="text-slate-400">TRACKING: </span>
              <strong className="text-white">{activeTrain?.trainNumber || '22436'} - {activeTrain?.trainName || 'Vande Bharat Express'}</strong>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Gauge className="w-3.5 h-3.5" />
              <span>{isTrainLive ? `${speed} KM/H` : 'PAUSED'}</span>
            </div>
          </div>

          {/* Camera View Switcher */}
          <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md shadow-lg">
            {(['orbit', 'cabin', 'track', 'overhead'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setCameraMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition ${
                  cameraMode === mode
                    ? 'bg-cyan-600 text-white font-semibold shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        {/* Live Data Synchronized / Paused Warning Banner */}
        {!isTrainLive && (
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-center">
            <div className="pointer-events-auto inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-amber-950/90 border border-amber-500/60 text-amber-300 font-mono text-xs shadow-2xl backdrop-blur-md">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>WAITING FOR AUTHORIZED RAILWAY DATA // 3D SIMULATION PAUSED</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span>LAT: <strong className="text-slate-200">{activeTrain?.latitude?.toFixed(4) ?? '26.8500'}</strong></span>
          <span>LNG: <strong className="text-slate-200">{activeTrain?.longitude?.toFixed(4) ?? '80.9500'}</strong></span>
          <span>HEADING: <strong className="text-slate-200">{activeTrain?.headingDegrees ?? 118}°</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400">SIGNAL: {activeTrain?.signalAspect ?? 'GREEN (CLEAR)'}</span>
          <span>•</span>
          <span>SOURCE: <strong className="text-cyan-400">{activeTrain?.source ?? 'AUTHORIZED_CRIS_FEED'}</strong></span>
        </div>
      </div>
    </div>
  );
};
