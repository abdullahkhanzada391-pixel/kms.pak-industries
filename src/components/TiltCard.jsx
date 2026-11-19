import React, { useState, useRef } from 'react';

export default function TiltCard({
  image,
  alt = 'Industrial engineering showcase',
  title,
  subtitle,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  maxTilt = 10,
  children
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateY = coords.x * maxTilt;
  const rotateX = -coords.y * maxTilt;
  const glareX = (coords.x + 0.5) * 100;
  const glareY = (coords.y + 0.5) * 100;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group perspective-stage rounded-xl select-none cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden border border-[#E2E8F0] bg-white transition-all duration-300 ease-out shadow-warm-md group-hover:border-[#C59B27] group-hover:shadow-warm-xl"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Image layer */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-slate-100`}>
          {image ? (
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#FFFBEB] flex items-center justify-center">
              <span className="text-[#64748B] font-mono text-sm">[HK POWER ENGINEERING]</span>
            </div>
          )}

          {/* Gentle gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Glare specular light following cursor */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
              }}
            />
          )}
        </div>

        {/* Card Body with 3D depth */}
        <div
          className="p-5 sm:p-6 bg-white"
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transition: 'transform 0.2s ease-out',
          }}
        >
          {title && (
            <h3 className="text-lg font-serif font-bold text-[#0B192C] group-hover:text-[#C59B27] transition-colors duration-200">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-2 text-xs text-[#64748B] line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
