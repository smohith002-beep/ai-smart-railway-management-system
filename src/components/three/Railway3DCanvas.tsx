import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { TrainPosition, TrainDetails, StationScheduleItem } from '../../types/railway';
import { nationalTrainDatabaseService } from '../../services/railwayApi/nationalTrainDatabaseService';
import { getStationByCode } from '../../services/railwayApi/realIndianRailwaysDataset';
import {
  Camera,
  Eye,
  Compass,
  Navigation,
  Sun,
  Moon,
  Maximize2,
  Volume2,
  AlertCircle
} from 'lucide-react';
import { soundService } from '../../services/sound/soundService';

export type CameraMode = 'ORBIT' | 'CHASE' | 'CAB_VIEW' | 'TOP_DOWN';

interface Railway3DCanvasProps {
  activeTrain?: TrainPosition | null;
  details?: TrainDetails | null;
  height?: string;
  onSelectStation?: (stationCode: string) => void;
}

export const Railway3DCanvas: React.FC<Railway3DCanvasProps> = ({
  activeTrain,
  details,
  height = '520px',
  onSelectStation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>('CHASE');
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [webGlError, setWebGlError] = useState<string | null>(null);
  const [progressPct, setProgressPct] = useState<number>(35);

  const trainNum = activeTrain?.trainNumber || details?.trainNumber || '20607';
  const trainName = activeTrain?.trainName || details?.trainName || 'Vande Bharat Express';
  const speed = activeTrain?.speedKmph ?? 110;
  const delay = activeTrain?.delayMinutes ?? 0;

  // Extract Route Coordinates
  const routeStations = useMemo(() => {
    const stops: StationScheduleItem[] = details?.schedule || [];
    if (stops.length > 0) return stops;
    const resolved = nationalTrainDatabaseService.getFullTrainDetails(trainNum);
    return resolved?.schedule || [];
  }, [details, trainNum]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlError('WebGL hardware acceleration is disabled or unsupported on this device.');
        return;
      }
    } catch (e) {
      setWebGlError('Unable to initialize WebGL context.');
      return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isNightMode ? 0x05070a : 0x111622);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x05070a : 0x111622, 0.0035);

    // 2. Camera Setup
    const width = container.clientWidth || 800;
    const canvasHeight = container.clientHeight || 520;
    const camera = new THREE.PerspectiveCamera(55, width / canvasHeight, 0.5, 2000);
    camera.position.set(0, 40, 120);

    // 3. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setSize(width, canvasHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      // Clear existing canvas
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch (err: any) {
      setWebGlError(`Failed to initialize 3D Renderer: ${err?.message || err}`);
      return;
    }

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(isNightMode ? 0x223344 : 0x8899aa, isNightMode ? 0.7 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(isNightMode ? 0x446688 : 0xffffff, isNightMode ? 1.0 : 2.0);
    dirLight.position.set(100, 150, 80);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Subtle Ground Grid / Terrain
    const gridHelper = new THREE.GridHelper(800, 80, isNightMode ? 0x1a2332 : 0x334455, isNightMode ? 0x0c111a : 0x1e2736);
    gridHelper.position.y = -0.2;
    scene.add(gridHelper);

    // 5. Build 3D Route Spline from Real Stations
    const splinePoints: THREE.Vector3[] = [];
    if (routeStations.length >= 2) {
      const firstSt = nationalTrainDatabaseService.getStationByCode(routeStations[0].stationCode) || getStationByCode(routeStations[0].stationCode);
      const originLat = firstSt?.latitude || 13.0827;
      const originLng = firstSt?.longitude || 80.2755;

      routeStations.forEach((st, idx) => {
        const stObj = nationalTrainDatabaseService.getStationByCode(st.stationCode) || getStationByCode(st.stationCode);
        const lat = stObj?.latitude || (originLat + idx * 0.4);
        const lng = stObj?.longitude || (originLng + idx * 0.4);

        // Convert lat/lng delta to local meters (1 deg lat ~ 111km, scaled down for 3D view)
        const scale = 220;
        const x = (lng - originLng) * scale;
        const z = -(lat - originLat) * scale;
        const y = Math.sin(idx * 0.8) * 2; // subtle elevation changes

        splinePoints.push(new THREE.Vector3(x, y, z));
      });
    }

    // Fallback smooth spline if stations are close
    if (splinePoints.length < 2) {
      for (let i = 0; i < 6; i++) {
        splinePoints.push(new THREE.Vector3(
          Math.sin(i * 0.8) * 120,
          0,
          (i - 2.5) * 100
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(splinePoints, false, 'catmullrom', 0.2);

    // 6. Extrude Dual Steel Rails along Spline
    const railOffset = 1.435; // Standard gauge distance
    const trackPointsCount = 240;
    const curvePoints = curve.getPoints(trackPointsCount);

    // Ballast Bed Tube
    const ballastGeo = new THREE.TubeGeometry(curve, 180, 2.8, 6, false);
    const ballastMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x1c1e22 : 0x3a3d45,
      roughness: 0.95,
      metalness: 0.1
    });
    const ballastMesh = new THREE.Mesh(ballastGeo, ballastMat);
    ballastMesh.position.y = -0.8;
    scene.add(ballastMesh);

    // Left & Right Steel Rails
    const leftRailPoints: THREE.Vector3[] = [];
    const rightRailPoints: THREE.Vector3[] = [];

    for (let i = 0; i <= trackPointsCount; i++) {
      const u = i / trackPointsCount;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u).normalize();
      const normal = new THREE.Vector3(0, 1, 0);
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      leftRailPoints.push(new THREE.Vector3().copy(pt).addScaledVector(binormal, railOffset * 0.5));
      rightRailPoints.push(new THREE.Vector3().copy(pt).addScaledVector(binormal, -railOffset * 0.5));
    }

    const leftRailCurve = new THREE.CatmullRomCurve3(leftRailPoints);
    const rightRailCurve = new THREE.CatmullRomCurve3(rightRailPoints);

    const railMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.85,
      roughness: 0.2
    });

    const leftRailMesh = new THREE.Mesh(new THREE.TubeGeometry(leftRailCurve, 180, 0.22, 6, false), railMat);
    const rightRailMesh = new THREE.Mesh(new THREE.TubeGeometry(rightRailCurve, 180, 0.22, 6, false), railMat);
    leftRailMesh.position.y = 0.2;
    rightRailMesh.position.y = 0.2;
    scene.add(leftRailMesh);
    scene.add(rightRailMesh);

    // Cross-Ties (Sleepers) and Catenary Masts along Route
    const sleeperGeo = new THREE.BoxGeometry(3.6, 0.3, 0.6);
    const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });

    const mastPoleGeo = new THREE.CylinderGeometry(0.18, 0.18, 12, 6);
    const mastArmGeo = new THREE.BoxGeometry(4.5, 0.15, 0.15);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x778899, metalness: 0.6, roughness: 0.4 });

    const sleeperCount = 120;
    for (let i = 0; i < sleeperCount; i++) {
      const u = i / sleeperCount;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u).normalize();

      const sleeper = new THREE.Mesh(sleeperGeo, sleeperMat);
      sleeper.position.copy(pt);
      sleeper.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      sleeper.rotateY(Math.PI / 2);
      scene.add(sleeper);

      // Catenary Masts every 8 sleepers
      if (i % 8 === 0) {
        const binormal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
        const mastGroup = new THREE.Group();

        const pole = new THREE.Mesh(mastPoleGeo, mastMat);
        pole.position.set(0, 6, 0);
        mastGroup.add(pole);

        const arm = new THREE.Mesh(mastArmGeo, mastMat);
        arm.position.set(1.8, 11.5, 0);
        mastGroup.add(arm);

        mastGroup.position.copy(pt).addScaledVector(binormal, 3.8);
        scene.add(mastGroup);
      }
    }

    // 7. 3D Station Nodes along the route
    routeStations.forEach((st, idx) => {
      const u = routeStations.length > 1 ? idx / (routeStations.length - 1) : 0.5;
      const pt = curve.getPointAt(u);

      const isCurrent = st.status === 'CURRENT';
      const isPassed = st.status === 'PASSED';

      const stationGroup = new THREE.Group();

      // Station Platform
      const platformGeo = new THREE.BoxGeometry(7, 0.8, 16);
      const platformMat = new THREE.MeshStandardMaterial({
        color: isCurrent ? 0x112211 : (isPassed ? 0x181818 : 0x222222),
        roughness: 0.8
      });
      const platform = new THREE.Mesh(platformGeo, platformMat);
      platform.position.set(5.5, 0.4, 0);
      stationGroup.add(platform);

      // Station Signal Light (Green / Yellow / Red)
      const signalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 8, 6), mastMat);
      signalPole.position.set(2.8, 4, 6);
      stationGroup.add(signalPole);

      const signalLamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 12, 12),
        new THREE.MeshBasicMaterial({ color: isCurrent ? 0x00ff88 : (isPassed ? 0x444444 : 0xffcc00) })
      );
      signalLamp.position.set(2.8, 7.8, 6);
      stationGroup.add(signalLamp);

      // Station Code Beacon Light
      const beaconLight = new THREE.PointLight(isCurrent ? 0x00ff88 : 0xffffff, isCurrent ? 1.5 : 0.4, 30);
      beaconLight.position.set(5.5, 4, 0);
      stationGroup.add(beaconLight);

      stationGroup.position.copy(pt);
      scene.add(stationGroup);
    });

    // 8. Detailed 3D Locomotive & Coach Rake Model
    const trainGroup = new THREE.Group();

    // Aerodynamic Engine Body
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.3,
      roughness: 0.3
    });
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0x003366, // Classic Indian Railways Navy Stripe
      metalness: 0.4,
      roughness: 0.4
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1
    });

    // Main Engine Hull
    const locoBodyGeo = new THREE.BoxGeometry(2.8, 2.6, 12);
    const locoBody = new THREE.Mesh(locoBodyGeo, bodyMat);
    locoBody.position.y = 2.0;
    trainGroup.add(locoBody);

    // Aerodynamic Nose Wedge
    const noseGeo = new THREE.ConeGeometry(2.0, 3.5, 4);
    const nose = new THREE.Mesh(noseGeo, bodyMat);
    nose.rotation.x = Math.PI / 2;
    nose.rotation.y = Math.PI / 4;
    nose.position.set(0, 1.9, 7.2);
    trainGroup.add(nose);

    // Windshield
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.8), glassMat);
    windshield.position.set(0, 2.7, 5.8);
    trainGroup.add(windshield);

    // Blue Speed Stripe
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.5, 11.8), stripeMat);
    stripe.position.set(0, 1.6, 0);
    trainGroup.add(stripe);

    // Roof Pantograph Assembly
    const pantoMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.7, roughness: 0.3 });
    const pantoBase = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, 2.5), pantoMat);
    pantoBase.position.set(0, 3.4, -2.5);
    trainGroup.add(pantoBase);

    const pantoArm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 4), pantoMat);
    pantoArm.rotation.x = 0.5;
    pantoArm.position.set(0, 4.3, -2.5);
    trainGroup.add(pantoArm);

    // Volumetric Dual High-Beam LED Headlights
    const headlight1 = new THREE.SpotLight(0xffffff, 4.0, 120, Math.PI / 6, 0.5, 1.0);
    headlight1.position.set(-0.7, 1.8, 7.5);
    headlight1.target.position.set(-0.7, 0, 40);
    trainGroup.add(headlight1);
    trainGroup.add(headlight1.target);

    const headlight2 = new THREE.SpotLight(0xffffff, 4.0, 120, Math.PI / 6, 0.5, 1.0);
    headlight2.position.set(0.7, 1.8, 7.5);
    headlight2.target.position.set(0.7, 0, 40);
    trainGroup.add(headlight2);
    trainGroup.add(headlight2.target);

    // Trailing Passenger Coach
    const coachGeo = new THREE.BoxGeometry(2.8, 2.6, 14);
    const coach1 = new THREE.Mesh(coachGeo, bodyMat);
    coach1.position.set(0, 2.0, -14.5);
    trainGroup.add(coach1);

    const coachStripe = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.5, 13.8), stripeMat);
    coachStripe.position.set(0, 1.6, -14.5);
    trainGroup.add(coachStripe);

    scene.add(trainGroup);

    // 9. Animation & Interaction Loop
    let trainT = 0.35; // Default progress on route
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let orbitTheta = 0;
    let orbitPhi = 0.35;
    let orbitRadius = 75;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      orbitTheta -= dx * 0.008;
      orbitPhi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, orbitPhi + dy * 0.008));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRadius = Math.max(25, Math.min(300, orbitRadius + e.deltaY * 0.15));
    };

    // Touch Support for Mobile / Android WebView
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;

      orbitTheta -= dx * 0.01;
      orbitPhi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, orbitPhi + dy * 0.01));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth progression along curve based on real train speed
      const speedFactor = (speed > 0 ? speed : 100) / 3600 * 0.04;
      trainT = (trainT + delta * speedFactor) % 0.98;
      setProgressPct(Math.round(trainT * 100));

      const trainPos = curve.getPointAt(trainT);
      const trainTangent = curve.getTangentAt(trainT).normalize();

      trainGroup.position.copy(trainPos);
      trainGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), trainTangent);

      // Camera Modes
      if (cameraMode === 'CHASE') {
        const chaseOffset = new THREE.Vector3(0, 8, -32).applyQuaternion(trainGroup.quaternion);
        const lookTarget = new THREE.Vector3().copy(trainPos).add(new THREE.Vector3(0, 3, 20).applyQuaternion(trainGroup.quaternion));

        camera.position.lerp(new THREE.Vector3().copy(trainPos).add(chaseOffset), 0.06);
        camera.lookAt(lookTarget);
      } else if (cameraMode === 'CAB_VIEW') {
        const cabPos = new THREE.Vector3(0, 2.7, 5.0).applyQuaternion(trainGroup.quaternion).add(trainPos);
        const cabLook = new THREE.Vector3(0, 2.5, 60).applyQuaternion(trainGroup.quaternion).add(trainPos);

        camera.position.copy(cabPos);
        camera.lookAt(cabLook);
      } else if (cameraMode === 'TOP_DOWN') {
        const topPos = new THREE.Vector3(0, 160, 0).add(trainPos);
        camera.position.lerp(topPos, 0.08);
        camera.lookAt(trainPos);
      } else if (cameraMode === 'ORBIT') {
        const camX = trainPos.x + orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta);
        const camY = trainPos.y + orbitRadius * Math.cos(orbitPhi);
        const camZ = trainPos.z + orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta);

        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.1);
        camera.lookAt(trainPos);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [routeStations, isNightMode, cameraMode, speed]);

  const handleHorn = () => {
    soundService.playHorn();
  };

  if (webGlError) {
    return (
      <div className="w-full rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-8 text-center space-y-4 font-mono">
        <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-800 text-amber-400 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white uppercase">3D WebGL Visualization Unavailable</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">{webGlError}</p>
        </div>
        <p className="text-[11px] text-neutral-500">Live 2D GIS tracking and official timetable progression are running normally.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-black font-mono shadow-2xl">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full cursor-grab active:cursor-grabbing relative select-none"
      />

      {/* Top Left: Live Train HUD Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none space-y-1.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-neutral-700/80 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-dot-live" />
          <span className="text-xs font-bold text-white">{trainNum}</span>
          <span className="text-xs text-neutral-300 font-sans font-semibold truncate max-w-[200px] sm:max-w-[320px]">
            {trainName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-neutral-300 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-neutral-800">
          <span>SPEED: <strong className="text-white">{speed} KM/H</strong></span>
          <span>•</span>
          <span>DELAY: <strong className={delay > 5 ? 'text-amber-400' : 'text-emerald-400'}>{delay > 0 ? `+${delay}m` : '0m'}</strong></span>
          <span>•</span>
          <span>PROGRESS: <strong className="text-white">{progressPct}%</strong></span>
        </div>
      </div>

      {/* Top Right: Camera Mode Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-neutral-700/80 shadow-xl">
        <button
          onClick={() => setCameraMode('CHASE')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
            cameraMode === 'CHASE' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
          title="Chase Cam (Follows behind train)"
        >
          <Camera className="w-3 h-3" />
          <span className="hidden sm:inline">Chase</span>
        </button>

        <button
          onClick={() => setCameraMode('CAB_VIEW')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
            cameraMode === 'CAB_VIEW' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
          title="Driver Cab View (Look down tracks)"
        >
          <Eye className="w-3 h-3" />
          <span className="hidden sm:inline">Cab View</span>
        </button>

        <button
          onClick={() => setCameraMode('ORBIT')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
            cameraMode === 'ORBIT' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
          title="Orbit Mode (Free 360° pan & zoom)"
        >
          <Compass className="w-3 h-3" />
          <span className="hidden sm:inline">360° Orbit</span>
        </button>

        <button
          onClick={() => setCameraMode('TOP_DOWN')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ${
            cameraMode === 'TOP_DOWN' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
          title="Top-Down Satellite Tracking"
        >
          <Navigation className="w-3 h-3" />
          <span className="hidden sm:inline">Top Down</span>
        </button>

        <div className="h-4 w-px bg-neutral-700 mx-0.5" />

        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition cursor-pointer"
          title="Toggle Day/Night Scene Lighting"
        >
          {isNightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleHorn}
          className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 transition cursor-pointer"
          title="Sound Locomotive Air Horn"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Floating Legend / Control Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-neutral-800 text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Interactive 3D WebGL Camera • Real GIS Route Spline • Drag to rotate, scroll to zoom</span>
        </div>
        <div className="text-[10px] font-mono text-neutral-400">
          MODE: <strong className="text-white">{cameraMode}</strong> • ROUTE STATIONS: <strong className="text-white">{routeStations.length}</strong>
        </div>
      </div>
    </div>
  );
};
