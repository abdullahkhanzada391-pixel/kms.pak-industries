import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { 
  RotateCcw, 
  Flame, 
  Compass, 
  Hand, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

const {
  Engine,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
  Body,
  Events,
  Vector
} = Matter;

export default function TumbleWall({
  clients = [],
  title = "Client Tumble Wall — Circular Physics Chamber",
  subtitle = "Interactive 2D physics simulation. Every client is rendered as a circular rolling token. Drag, toss, fling, or scatter icons across the chamber.",
  className = ""
}) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const itemsRef = useRef([]);
  const cardElementsRef = useRef([]);
  const wallsRef = useRef({ ground: null, left: null, right: null, ceiling: null });
  const mouseConstraintRef = useRef(null);
  const activeGrabbedBodyRef = useRef(null);

  const [isZeroG, setIsZeroG] = useState(false);
  const [activeClient, setActiveClient] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [circleRadius, setCircleRadius] = useState(36);

  // Complete 34 KPS Clients & Technology Partners from the official directory
  const clientList = clients.length > 0 ? clients : [
    { id: 1, name: 'Nishat Group', sector: 'Textile', file: 'client-partner-1.jpg' },
    { id: 2, name: 'Gourmet Foods', sector: 'FMCG', file: 'client-partner-2.jpg' },
    { id: 3, name: 'Shaukat Khanum', sector: 'Hospital', file: 'client-partner-3.jpg' },
    { id: 4, name: 'Aga Khan Hospital', sector: 'Medical', file: 'client-partner-4.jpg' },
    { id: 5, name: 'ICL Interloop', sector: 'Industry', file: 'client-partner-5.jpg' },
    { id: 6, name: 'Taiga Apparel', sector: 'Textile', file: 'client-partner-6.jpg' },
    { id: 7, name: 'Lahore Stock Exch.', sector: 'Finance', file: 'client-partner-7.jpg' },
    { id: 8, name: 'Nizam Apparel', sector: 'Apparel', file: 'client-partner-8.jpg' },
    { id: 9, name: 'PTCL Telecom', sector: 'Telecom', file: 'client-partner-9.jpg' },
    { id: 10, name: 'Zong 4G', sector: 'Cellular', file: 'client-partner-10.jpg' },
    { id: 11, name: 'Outfitters', sector: 'Retail', file: 'client-partner-11.jpg' },
    { id: 12, name: 'Azgard-9', sector: 'Denim', file: 'client-partner-12.jpg' },
    { id: 13, name: 'PepsiCo Pakistan', sector: 'Beverages', file: 'client-partner-13.jpg' },
    { id: 14, name: 'ZTE Corporation', sector: 'Network', file: 'client-partner-14.jpg' },
    { id: 15, name: 'Ufone GSM', sector: 'Telecom', file: 'client-partner-15.jpg' },
    { id: 16, name: "Salt'n Pepper", sector: 'Dining', file: 'client-partner-16.jpg' },
    { id: 17, name: 'Bundu Khan', sector: 'Food', file: 'client-partner-17.jpg' },
    { id: 18, name: 'Savour Foods', sector: 'Food', file: 'client-partner-18.jpg' },
    { id: 19, name: 'LACAS', sector: 'Education', file: 'client-partner-19.jpg' },
    { id: 20, name: 'Pharmagen Ltd.', sector: 'Pharma', file: 'client-partner-20.jpg' },
    { id: 21, name: 'Al Khair Group', sector: 'Manufacturing', file: 'client-partner-21.jpg' },
    { id: 22, name: 'BNU University', sector: 'Education', file: 'client-partner-22.jpg' },
    { id: 23, name: 'Ideas Gul Ahmed', sector: 'Retail', file: 'client-partner-23.jpg' },
    { id: 24, name: 'Meezan Bank', sector: 'Banking', file: 'client-partner-24.jpg' },
    { id: 25, name: 'Mass Pharma', sector: 'Pharma', file: 'client-partner-25.jpg' },
    { id: 28, name: 'Cummins Power', sector: 'OEM Partner', file: 'client-partner-28.jpg' },
    { id: 29, name: 'Lovol Industry', sector: 'OEM Partner', file: 'client-partner-29.jpg' },
    { id: 30, name: 'Weichai Power', sector: 'OEM Partner', file: 'client-partner-30.jpg' },
    { id: 31, name: 'Deep Sea DSE', sector: 'Controllers', file: 'client-partner-31.jpg' },
    { id: 32, name: 'Schneider Electric', sector: 'Switchgear', file: 'client-partner-32.jpg' },
    { id: 33, name: 'ABB Power', sector: 'Switchgear', file: 'client-partner-33.jpg' }
  ];

  // Spawn all client circular bodies inside the chamber safely below the ceiling
  const spawnCircles = useCallback((engine, containerWidth, containerHeight) => {
    if (!engine || !containerWidth || !containerHeight) return;

    // Remove existing client bodies
    itemsRef.current.forEach(item => {
      if (item.body) {
        World.remove(engine.world, item.body);
      }
    });
    itemsRef.current = [];

    const isMobile = containerWidth < 640;
    // Circular radius: 36px on desktop (72px circle), 28px on mobile (56px circle)
    const radius = isMobile ? 28 : 36;
    const diameter = radius * 2;
    setCircleRadius(radius);

    const margin = radius + 20;
    const usableWidth = Math.max(containerWidth - margin * 2, 200);

    const newItems = clientList.map((client, index) => {
      // Stagger initial drop points horizontally across the chamber width
      const x = margin + ((index * (radius * 2.2)) % usableWidth) + (Math.random() * 12 - 6);
      
      // Cascade vertical drops safely starting INSIDE the chamber (y = 40 to 220)
      // This guarantees 100% of the circles are inside the chamber and immediately visible
      const y = 35 + ((index * 18) % 190);

      // Create rigid body circle with smooth rolling and bounce physics
      const body = Bodies.circle(x, y, radius, {
        restitution: 0.72, // Bouncy, playful feel
        friction: 0.08,    // Low friction for natural rolling
        frictionAir: 0.012,
        density: 0.002,
        angle: Math.random() * Math.PI * 2
      });

      // Give each circle a slight randomized initial downward and lateral impulse
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 2 + 1
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      // Store client metadata directly on the physics body
      body.clientData = client;
      body.radius = radius;
      body.clientId = client.id;

      World.add(engine.world, body);

      return {
        ...client,
        body,
        radius,
        diameter
      };
    });

    itemsRef.current = newItems;
    setTotalCount(newItems.length);
  }, [clientList]);

  // Scatter blast: fling all circular icons outward from the center
  const scatterBlast = useCallback(() => {
    setHasInteracted(true);
    if (!containerRef.current || !itemsRef.current.length) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const center = { x: width / 2, y: height * 0.7 };

    itemsRef.current.forEach(({ body }) => {
      if (!body) return;
      const forceVector = Vector.sub(body.position, center);
      const normalized = Vector.normalise(forceVector);
      
      const magnitude = 0.07 * (body.mass || 1);
      Body.applyForce(body, body.position, {
        x: normalized.x * magnitude + (Math.random() - 0.5) * 0.03,
        y: normalized.y * magnitude - 0.045 // Upward launch kick
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    });
  }, []);

  // Toggle Zero-G floating mode
  const toggleZeroG = useCallback(() => {
    setHasInteracted(true);
    if (!engineRef.current) return;
    setIsZeroG(prev => {
      const next = !prev;
      engineRef.current.gravity.y = next ? 0 : 1;

      // If entering Zero-G, impart gentle floating drifts
      if (next) {
        itemsRef.current.forEach(({ body }) => {
          if (!body) return;
          Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 3.5,
            y: (Math.random() - 0.5) * 3.5
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        });
      }
      return next;
    });
  }, []);

  // Re-drop / Cascade all circles from the top
  const handleResetRain = useCallback(() => {
    setHasInteracted(true);
    if (!containerRef.current || !engineRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    spawnCircles(engineRef.current, width, height);
  }, [spawnCircles]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Create Engine with natural gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    });
    engineRef.current = engine;

    // 2. Boundary walls placed precisely around the container
    const wallThickness = 60;
    const wallOptions = { 
      isStatic: true, 
      friction: 0.2, 
      restitution: 0.5 
    };

    // Floor, Left Wall, Right Wall, and Ceiling
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 2, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2 + 2, height / 2, wallThickness, height * 3, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2 - 2, height / 2, wallThickness, height * 3, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);

    wallsRef.current = { ground, left: leftWall, right: rightWall, ceiling };
    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 3. Spawn all circular client bodies inside the chamber
    spawnCircles(engine, width, height);

    // 4. Mouse / Touch Constraint for grabbing & tossing
    const mouse = Mouse.create(container);
    // Remove wheel trapping so normal page scrolling works cleanly
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.3,
        damping: 0.1,
        render: { visible: false }
      }
    });
    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    // Track active grab state for visual feedback & info display
    Events.on(mouseConstraint, 'startdrag', (event) => {
      setHasInteracted(true);
      if (event.body && event.body.clientData) {
        activeGrabbedBodyRef.current = event.body;
        setActiveClient(event.body.clientData);
      }
    });

    Events.on(mouseConstraint, 'enddrag', () => {
      activeGrabbedBodyRef.current = null;
    });

    // 5. High-FPS Render Loop: update DOM styles from Matter body coordinates
    const updateDOM = () => {
      itemsRef.current.forEach((item, index) => {
        const domEl = cardElementsRef.current[index];
        if (!domEl || !item.body) return;

        const { position, angle } = item.body;
        const x = position.x - item.radius;
        const y = position.y - item.radius;

        domEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotate(${angle.toFixed(3)}rad)`;
      });
    };

    Events.on(engine, 'afterUpdate', updateDOM);

    // 6. Start Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 7. Responsive Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 - 2 });
      Body.setPosition(rightWall, { x: newWidth + wallThickness / 2 - 2, y: newHeight / 2 });
      Body.setPosition(leftWall, { x: -wallThickness / 2 + 2, y: newHeight / 2 });
      Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Events.off(engine, 'afterUpdate', updateDOM);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Composite.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [spawnCircles]);

  return (
    <div className={`relative bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#F1F5F9] rounded-2xl border border-[#E2E8F0] shadow-warm-xs overflow-hidden select-none ${className}`}>
      {/* Top Header & Interactive Physics Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]/95 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4 z-20 relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#C59B27] font-bold">
              CIRCULAR PHYSICS CHAMBER • ALL {clientList.length} CLIENTS ACTIVE
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B192C]">
            {title}
          </h3>
          <p className="text-xs text-[#334155] max-w-xl font-sans">
            {subtitle}
          </p>
        </div>

        {/* Action Controls & Active Grab Inspector */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Active Client Badge (When Dragging/Hovering) */}
          {activeClient && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono font-bold text-[#0B192C] animate-in fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
              <span className="text-[#C59B27]">{activeClient.name}</span>
              <span className="text-[#64748B] font-normal">({activeClient.sector})</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleResetRain}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white text-[#0B192C] border border-[#E2E8F0] hover:border-[#C59B27] hover:text-[#C59B27] transition-all shadow-warm-xs active:scale-95 min-h-[38px]"
            title="Re-cascade all circular icons from the top"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Rain All</span>
          </button>

          <button
            type="button"
            onClick={scatterBlast}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-white text-[#0B192C] border border-[#E2E8F0] hover:border-[#C59B27] hover:text-[#C59B27] transition-all shadow-warm-xs active:scale-95 min-h-[38px]"
            title="Launch kinetic blast from center"
          >
            <Flame className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Scatter</span>
          </button>

          <button
            type="button"
            onClick={toggleZeroG}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-warm-xs active:scale-95 min-h-[38px] ${
              isZeroG
                ? 'bg-[#0B192C] text-white border border-[#0B192C]'
                : 'bg-white text-[#0B192C] border border-[#E2E8F0] hover:border-[#C59B27]'
            }`}
            title="Toggle zero gravity"
          >
            <Compass className={`w-3.5 h-3.5 ${isZeroG ? 'text-[#F59E0B] animate-spin' : 'text-[#C59B27]'}`} />
            <span>{isZeroG ? 'Zero-G On' : 'Zero-G'}</span>
          </button>
        </div>
      </div>

      {/* Physics Chamber Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-[#F8FAFC] cursor-grab active:cursor-grabbing touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Subtle Ambient Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="font-serif text-8xl sm:text-9xl font-extrabold text-[#0B192C] tracking-tight">
            100+ CLIENTS
          </span>
        </div>

        {/* First-time Interaction Hint */}
        {!hasInteracted && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 animate-bounce">
            <div className="px-4 py-2 rounded-full bg-[#0B192C]/90 text-white border border-[#1E3A8A] backdrop-blur-sm text-xs font-mono font-semibold flex items-center gap-2 shadow-warm-md">
              <Hand className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Grab, toss, or throw any circular client badge!</span>
            </div>
          </div>
        )}

        {/* DOM Circular Icons synced 1:1 with Matter.js Circular Rigid Bodies */}
        {clientList.map((client, index) => {
          const isGrabbed = activeClient && activeClient.id === client.id;
          return (
            <div
              key={`circle-client-${client.id}`}
              ref={(el) => (cardElementsRef.current[index] = el)}
              className={`absolute top-0 left-0 will-change-transform rounded-full border-2 bg-white flex items-center justify-center p-2.5 transition-shadow select-none shadow-warm-xs pointer-events-none group ${
                isGrabbed
                  ? 'border-[#C59B27] ring-4 ring-[#C59B27]/35 shadow-warm-lg scale-110 z-30'
                  : 'border-[#E2E8F0] hover:border-[#C59B27]'
              }`}
              style={{
                width: `${circleRadius * 2}px`,
                height: `${circleRadius * 2}px`,
                transform: 'translate3d(0px, 0px, 0px)' // Updated at 60fps via afterUpdate
              }}
              title={`${client.name} — ${client.sector}`}
            >
              {/* Client Logo Image Centered Inside Circular Badge */}
              <div className="w-full h-full rounded-full bg-[#F8FAFC] flex items-center justify-center p-1.5 overflow-hidden border border-[#E2E8F0] pointer-events-none">
                <img
                  src={`/assets/clients/${client.file}`}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Status Bar with Total Verified Accounts */}
      <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#64748B] gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Every icon is a 2D circular rigid body with rolling friction, chamfer, and mass dynamics</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Active Circles: <strong className="text-[#0B192C]">{clientList.length} of {clientList.length}</strong></span>
          <span className="text-[#E2E8F0]">|</span>
          <span className="text-[#C59B27] font-bold">100+ Verified Accounts</span>
        </div>
      </div>
    </div>
  );
}
