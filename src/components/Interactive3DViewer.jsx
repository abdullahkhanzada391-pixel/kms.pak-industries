import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Zap, Activity, Rotate3d, Play, Pause, Layers } from 'lucide-react';

export default function Interactive3DViewer() {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [telemetry, setTelemetry] = useState({
    rpm: 1500,
    voltage: 400,
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
    const height = mount.clientHeight || 440;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x111315, 0.04);
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
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // LIGHTS: Forest green & technical white industrial lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x216447, 2.8);
    dirLight1.position.set(5, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xE8ECE9, 1.8);
    dirLight2.position.set(-5, -3, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x2E8B62, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // ROOT ROTOR GROUP
    const rotorGroup = new THREE.Group();
    scene.add(rotorGroup);
    sceneState.current.rotorGroup = rotorGroup;

    // 1. Central Drive Shaft (Industrial polished steel)
    const shaftGeom = new THREE.CylinderGeometry(0.2, 0.2, 3.8, 32);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0x929A96,
      metalness: 0.9,
      roughness: 0.2,
    });
    const shaft = new THREE.Mesh(shaftGeom, shaftMat);
    shaft.rotation.z = Math.PI / 2;
    rotorGroup.add(shaft);

    // 2. Rotor Core Cylindrical Laminations
    const coreGeom = new THREE.CylinderGeometry(0.85, 0.85, 2.2, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x24282A,
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
        color: 0xB45309,
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
        color: 0xD97706,
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
      color: 0x181C1B,
      metalness: 0.8,
      roughness: 0.4,
      wireframe: true,
    });
    const stator = new THREE.Mesh(statorGeom, statorMat);
    stator.rotation.z = Math.PI / 2;
    statorGroup.add(stator);

    // Stator End Rings: Forest Green Accents
    [-1.3, 1.3].forEach(xPos => {
      const ringGeom = new THREE.TorusGeometry(1.4, 0.06, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x216447,
        emissive: 0x174D38,
        emissiveIntensity: 0.5,
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
      color: 0x2E8B62,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const fluxParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(fluxParticles);
    sceneState.current.fluxParticles = fluxParticles;

    // INTERACTION HANDLERS
    const onMouseDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMouseX = e.clientX;
      sceneState.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!sceneState.current.isDragging) return;
      const deltaX = e.clientX - sceneState.current.prevMouseX;
      const deltaY = e.clientY - sceneState.current.prevMouseY;
      sceneState.current.targetRotY += deltaX * 0.007;
      sceneState.current.targetRotX += deltaY * 0.007;
      sceneState.current.prevMouseX = e.clientX;
      sceneState.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      sceneState.current.isDragging = false;
    };

    // Touch events for mobile
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
      sceneState.current.targetRotY += deltaX * 0.007;
      sceneState.current.targetRotX += deltaY * 0.007;
      sceneState.current.prevMouseX = e.touches[0].clientX;
      sceneState.current.prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      sceneState.current.isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(mount);

    // ANIMATION LOOP
    let angleOffset = 0;
    const animate = () => {
      sceneState.current.animId = requestAnimationFrame(animate);

      // Smooth inertia rotation
      sceneState.current.currentRotY += (sceneState.current.targetRotY - sceneState.current.currentRotY) * 0.08;
      sceneState.current.currentRotX += (sceneState.current.targetRotX - sceneState.current.currentRotX) * 0.08;

      if (rotorGroup) {
        if (isPlaying) {
          angleOffset += 0.04;
          rotorGroup.rotation.x = angleOffset;
        }
        rotorGroup.rotation.y = sceneState.current.currentRotY;
        rotorGroup.rotation.z = sceneState.current.currentRotX;
      }

      // Animate Flux Particles
      if (fluxParticles && isPlaying) {
        const positions = fluxParticles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          particleAngles[i] += particleSpeeds[i];
          positions[i * 3 + 1] = Math.cos(particleAngles[i]) * particleRadii[i];
          positions[i * 3 + 2] = Math.sin(particleAngles[i]) * particleRadii[i];
        }
        fluxParticles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP
    return () => {
      if (sceneState.current.animId) cancelAnimationFrame(sceneState.current.animId);
      resizeObserver.disconnect();
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mount.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl bg-[#24282A] border border-[#343B37] p-5 sm:p-6 shadow-2xl overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#174D38]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#343B37] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#216447] animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-[#2E8B62] uppercase">
              3D Interactive Diagnostic
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#E8ECE9] font-display mt-0.5">
            Heavy-Duty Industrial Alternator & Rotor Core
          </h3>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[#343B37] bg-[#181C1B] hover:border-[#216447] hover:text-[#E8ECE9] transition-colors"
            title={isPlaying ? "Pause rotation" : "Start rotation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#2E8B62]" /> : <Play className="w-3.5 h-3.5 text-[#216447]" />}
            {isPlaying ? "Live Spin" : "Paused"}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#929A96] border border-[#343B37] bg-[#181C1B]">
            <Rotate3d className="w-3.5 h-3.5 text-[#2E8B62]" />
            <span>Click & Drag to Inspect</span>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Mount */}
      <div className="relative w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Telemetry HUD */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-10 bg-[#181C1B]/90 backdrop-blur-md border border-[#343B37] rounded-xl p-3.5 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between text-[#929A96] border-b border-[#343B37] pb-2 mb-2.5">
            <span className="flex items-center gap-1.5 font-semibold text-[#E8ECE9]">
              <Activity className="w-3.5 h-3.5 text-[#216447]" />
              TELEMETRY SPEC
            </span>
            <span className="text-[11px] text-[#2E8B62] font-bold bg-[#174D38]/30 px-1.5 py-0.5 rounded border border-[#216447]/40">
              SYNC OPTIMAL
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#24282A] p-2 rounded border border-[#343B37]">
              <span className="text-[10px] text-[#929A96] block">RPM SPEED</span>
              <span className="text-sm font-bold text-[#E8ECE9]">{telemetry.rpm}</span>
              <span className="text-[10px] text-[#929A96] ml-1">r/min</span>
            </div>
            <div className="bg-[#24282A] p-2 rounded border border-[#343B37]">
              <span className="text-[10px] text-[#929A96] block">OUTPUT VOLTAGE</span>
              <span className="text-sm font-bold text-[#2E8B62]">{telemetry.voltage}</span>
              <span className="text-[10px] text-[#929A96] ml-1">V AC</span>
            </div>
            <div className="bg-[#24282A] p-2 rounded border border-[#343B37]">
              <span className="text-[10px] text-[#929A96] block">FREQUENCY</span>
              <span className="text-sm font-bold text-[#E8ECE9]">{telemetry.frequency}</span>
              <span className="text-[10px] text-[#929A96] ml-1">Hz</span>
            </div>
            <div className="bg-[#24282A] p-2 rounded border border-[#343B37]">
              <span className="text-[10px] text-[#929A96] block">LOAD FACTOR</span>
              <span className="text-sm font-bold text-[#2E8B62]">{telemetry.load}%</span>
              <span className="text-[10px] text-[#929A96] ml-1">Active</span>
            </div>
          </div>
        </div>

        {/* Technical Callout overlay (Right side) */}
        <div className="hidden lg:block absolute top-6 right-6 z-10 space-y-2 pointer-events-none">
          <div className="bg-[#181C1B]/85 backdrop-blur-md border border-[#343B37] rounded-lg p-2.5 text-right font-mono text-[11px]">
            <span className="text-[#2E8B62] font-bold block">SALIENT POLE ROTOR</span>
            <span className="text-[#929A96]">Class H Copper Enamel Wire</span>
          </div>
          <div className="bg-[#181C1B]/85 backdrop-blur-md border border-[#343B37] rounded-lg p-2.5 text-right font-mono text-[11px]">
            <span className="text-[#E8ECE9] font-bold block">ELECTROMAGNETIC STATOR</span>
            <span className="text-[#929A96]">2/3 Pitch Low Harmonic Winding</span>
          </div>
        </div>
      </div>
    </div>
  );
}
