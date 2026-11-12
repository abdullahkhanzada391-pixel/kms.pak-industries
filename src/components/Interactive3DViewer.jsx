import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Zap, Activity, Rotate3d, Play, Pause, Layers } from 'lucide-react';

export default function Interactive3DViewer() {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState('rotor'); // 'rotor' | 'flux' | 'dynamo'
  const [telemetry, setTelemetry] = useState({
    rpm: 1500,
    voltage: 415,
    frequency: 50.0,
    load: 78,
  });

  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    rotorGroup: null,
    fluxParticles: null,
    statorRings: [],
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRotY: 0,
    targetRotX: 0,
    currentRotY: 0,
    currentRotX: 0,
    animId: null,
    isVisible: true
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 450;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080C14, 0.04);
    sceneState.current.scene = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0, 0);
    sceneState.current.camera = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xF59E0B, 2.5);
    dirLight1.position.set(5, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0EA5E9, 2.0);
    dirLight2.position.set(-5, -3, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xFCD34D, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // ROOT ROTOR GROUP
    const rotorGroup = new THREE.Group();
    scene.add(rotorGroup);
    sceneState.current.rotorGroup = rotorGroup;

    // 1. Central Drive Shaft (Industrial polished steel)
    const shaftGeom = new THREE.CylinderGeometry(0.2, 0.2, 3.8, 32);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const shaft = new THREE.Mesh(shaftGeom, shaftMat);
    shaft.rotation.z = Math.PI / 2;
    rotorGroup.add(shaft);

    // 2. Rotor Core Cylindrical Laminations
    const coreGeom = new THREE.CylinderGeometry(0.85, 0.85, 2.2, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.7,
      roughness: 0.4,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    core.rotation.z = Math.PI / 2;
    rotorGroup.add(core);

    // 3. Copper Windings (Salient Poles)
    const poleCount = 6;
    for (let i = 0; i < poleCount; i++) {
      const angle = (i / poleCount) * Math.PI * 2;
      const poleGeom = new THREE.BoxGeometry(0.35, 1.9, 0.35);
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xD97706,
        metalness: 0.85,
        roughness: 0.25,
      });
      const pole = new THREE.Mesh(poleGeom, copperMat);
      pole.position.set(
        0,
        Math.cos(angle) * 0.82,
        Math.sin(angle) * 0.82
      );
      pole.rotation.x = angle;
      rotorGroup.add(pole);

      // Copper wire coil wraps around each pole
      const wireGeom = new THREE.TorusGeometry(0.25, 0.04, 12, 24);
      const wireMat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        metalness: 0.9,
        roughness: 0.1,
      });
      const wire = new THREE.Mesh(wireGeom, wireMat);
      wire.position.set(0, Math.cos(angle) * 0.9, Math.sin(angle) * 0.9);
      wire.rotation.y = Math.PI / 2;
      rotorGroup.add(wire);
    }

    // 4. Stator Outer Framework (Cylindrical Frame with vents)
    const statorGroup = new THREE.Group();
    scene.add(statorGroup);

    const statorGeom = new THREE.CylinderGeometry(1.4, 1.4, 2.6, 24, 1, true);
    const statorMat = new THREE.MeshStandardMaterial({
      color: 0x0F172A,
      metalness: 0.8,
      roughness: 0.4,
      wireframe: true,
    });
    const stator = new THREE.Mesh(statorGeom, statorMat);
    stator.rotation.z = Math.PI / 2;
    statorGroup.add(stator);

    // Stator End Rings
    [-1.3, 1.3].forEach(xPos => {
      const ringGeom = new THREE.TorusGeometry(1.4, 0.06, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x38BDF8,
        emissive: 0x0284C7,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.2,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.x = xPos;
      ring.rotation.y = Math.PI / 2;
      statorGroup.add(ring);
    });

    // 5. Magnetic Flux Particles (Live electrical flow)
    const particleCount = 450;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAngles = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particleXPositions = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particleAngles[i] = Math.random() * Math.PI * 2;
      particleRadii[i] = 1.05 + Math.random() * 0.35;
      particleSpeeds[i] = 0.015 + Math.random() * 0.025;
      particleXPositions[i] = (Math.random() - 0.5) * 2.2;

      particlePositions[i * 3] = particleXPositions[i];
      particlePositions[i * 3 + 1] = Math.cos(particleAngles[i]) * particleRadii[i];
      particlePositions[i * 3 + 2] = Math.sin(particleAngles[i]) * particleRadii[i];
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const fluxParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(fluxParticles);
    sceneState.current.fluxParticles = fluxParticles;

    // IntersectionObserver to pause when outside viewport
    const observer = new IntersectionObserver(([entry]) => {
      sceneState.current.isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(mount);

    // Mouse Interaction
    const onMouseDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMouseX = e.clientX;
      sceneState.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!sceneState.current.isDragging) return;
      const deltaX = e.clientX - sceneState.current.prevMouseX;
      const deltaY = e.clientY - sceneState.current.prevMouseY;
      sceneState.current.targetRotY += deltaX * 0.008;
      sceneState.current.targetRotX += deltaY * 0.008;
      sceneState.current.prevMouseX = e.clientX;
      sceneState.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      sceneState.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        sceneState.current.isDragging = true;
        sceneState.current.prevMouseX = e.touches[0].clientX;
        sceneState.current.prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!sceneState.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - sceneState.current.prevMouseX;
      const deltaY = e.touches[0].clientY - sceneState.current.prevMouseY;
      sceneState.current.targetRotY += deltaX * 0.008;
      sceneState.current.targetRotX += deltaY * 0.008;
      sceneState.current.prevMouseX = e.touches[0].clientX;
      sceneState.current.prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      sceneState.current.isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      sceneState.current.animId = requestAnimationFrame(animate);

      if (!sceneState.current.isVisible) return;

      const delta = clock.getDelta();

      // Smooth damping rotation
      sceneState.current.currentRotY += (sceneState.current.targetRotY - sceneState.current.currentRotY) * 0.1;
      sceneState.current.currentRotX += (sceneState.current.targetRotX - sceneState.current.currentRotX) * 0.1;

      // Auto rotation when playing
      if (isPlaying) {
        rotorGroup.rotation.x += delta * 2.5; // High speed rotor spin
        sceneState.current.targetRotY += delta * 0.15; // Slow gentle display drift
      }

      rotorGroup.rotation.y = sceneState.current.currentRotY;
      statorGroup.rotation.y = sceneState.current.currentRotY;
      fluxParticles.rotation.y = sceneState.current.currentRotY;

      rotorGroup.rotation.z = sceneState.current.currentRotX;
      statorGroup.rotation.z = sceneState.current.currentRotX;
      fluxParticles.rotation.z = sceneState.current.currentRotX;

      // Animate Flux Particles along circumference
      const posArray = particleGeom.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i] * (isPlaying ? 1 : 0.2);
        posArray[i * 3 + 1] = Math.cos(particleAngles[i]) * particleRadii[i];
        posArray[i * 3 + 2] = Math.sin(particleAngles[i]) * particleRadii[i];
      }
      particleGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Telemetry ticker
    const telemetryInterval = setInterval(() => {
      setTelemetry({
        rpm: 1500 + Math.floor(Math.random() * 8 - 4),
        voltage: 415 + Math.floor(Math.random() * 4 - 2),
        frequency: Number((50.0 + (Math.random() * 0.1 - 0.05)).toFixed(2)),
        load: 78 + Math.floor(Math.random() * 4 - 2),
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearInterval(telemetryInterval);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (sceneState.current.animId) cancelAnimationFrame(sceneState.current.animId);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-kps-card to-kps-dark border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
              3D Interactive Diagnostic
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display mt-0.5">
            Heavy-Duty Industrial Alternator & Rotor Core
          </h3>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-700 bg-slate-900/80 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
            title={isPlaying ? "Pause rotation" : "Start rotation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            {isPlaying ? "Live Spin" : "Paused"}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 border border-slate-800 bg-slate-900/50">
            <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
            <span>Click & Drag to Inspect</span>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Mount */}
      <div className="relative w-full h-[380px] sm:h-[440px] cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Telemetry HUD */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-xl p-3.5 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2.5">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              TELEMETRY SPEC
            </span>
            <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              SYNC OPTIMAL
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
              <span className="text-[10px] text-slate-500 block">RPM SPEED</span>
              <span className="text-sm font-bold text-slate-200">{telemetry.rpm}</span>
              <span className="text-[10px] text-slate-500 ml-1">r/min</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
              <span className="text-[10px] text-slate-500 block">OUTPUT VOLTAGE</span>
              <span className="text-sm font-bold text-amber-400">{telemetry.voltage}</span>
              <span className="text-[10px] text-slate-500 ml-1">V AC</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
              <span className="text-[10px] text-slate-500 block">FREQUENCY</span>
              <span className="text-sm font-bold text-cyan-400">{telemetry.frequency}</span>
              <span className="text-[10px] text-slate-500 ml-1">Hz</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
              <span className="text-[10px] text-slate-500 block">LOAD FACTOR</span>
              <span className="text-sm font-bold text-emerald-400">{telemetry.load}%</span>
              <span className="text-[10px] text-slate-500 ml-1">Active</span>
            </div>
          </div>
        </div>

        {/* Technical Callout overlay (Right side) */}
        <div className="hidden lg:block absolute top-6 right-6 z-10 space-y-2 pointer-events-none">
          <div className="bg-slate-950/75 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 text-right font-mono text-[11px]">
            <span className="text-amber-400 font-bold block">SALIENT POLE ROTOR</span>
            <span className="text-slate-400">Class H Copper Enamel Wire</span>
          </div>
          <div className="bg-slate-950/75 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 text-right font-mono text-[11px]">
            <span className="text-cyan-400 font-bold block">ELECTROMAGNETIC STATOR</span>
            <span className="text-slate-400">2/3 Pitch Low Harmonic Winding</span>
          </div>
        </div>
      </div>
    </div>
  );
}

