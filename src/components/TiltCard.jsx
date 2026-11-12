import React, { useState, useRef } from 'react';

export default function TiltCard({
  image,
  alt = 'Industrial engineering showcase',
  title,
  subtitle,
  category,
  badge,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  maxTilt = 12,
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
        className="w-full h-full rounded-xl overflow-hidden border border-[#343B37] bg-[#24282A] transition-all duration-300 ease-out shadow-xl group-hover:border-[#216447] group-hover:shadow-2xl group-hover:shadow-[#174D38]/20"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Image layer */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#111315]`}>
          {image ? (
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#181C1B] to-[#24282A] flex items-center justify-center">
              <span className="text-[#929A96] font-mono text-sm">[KPS ENGINEERING]</span>
            </div>
          )}

          {/* Dark gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#24282A] via-[#24282A]/40 to-transparent" />

          {/* Glare specular light following cursor */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
              }}
            />
          )}

          {/* Badges on top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {category && (
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#111315]/80 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#2E8B62] border border-[#216447]/50">
                {category}
              </span>
            )}
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#B51F32] text-white">
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Card Body with 3D depth */}
        <div
          className="p-5"
          style={{
            transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
            transition: 'transform 0.2s ease-out',
          }}
        >
          {title && (
            <h3 className="text-lg font-bold text-[#E8ECE9] group-hover:text-white transition-colors duration-200">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1.5 text-xs text-[#929A96] line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
