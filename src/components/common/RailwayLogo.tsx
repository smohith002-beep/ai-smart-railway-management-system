import React from 'react';

interface RailwayLogoProps {
  variant?: 'full' | 'compact' | 'sidebar' | 'login' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const RailwayLogo: React.FC<RailwayLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  // Dimension definitions
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Precision Minimalist SVG Emblem: Locomotive Front Silhouette + Railway Tracks + AI Network Signal Arcs
  const LogoEmblem = ({ emblemClass = 'w-full h-full' }: { emblemClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={emblemClass}
    >
      {/* 1. Converging Perspective Railway Tracks & Sleepers (Base) */}
      <path
        d="M18 92L36 66M82 92L64 66"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M24 86H76M31 76H69M37 68H63"
        stroke="#737373"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 2. Streamlined Locomotive Aerodynamic Silhouette Shield */}
      <path
        d="M36 68L39 40C40 32 44 28 50 28C56 28 60 32 61 40L64 68C64 71 61 73 58 73H42C39 73 36 71 36 68Z"
        fill="#080808"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 3. Locomotive Cab Windshield */}
      <path
        d="M42 41C43 36 46 34 50 34C54 34 57 36 58 41L59 47H41L42 41Z"
        fill="#FFFFFF"
      />

      {/* 4. Precision Headlight Core */}
      <circle cx="50" cy="62" r="3.5" fill="#FFFFFF" />

      {/* 5. Minimalist AI / Network Signal Waves Radiating from Antenna */}
      <path
        d="M50 28V20"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="18" r="2" fill="#FFFFFF" />

      {/* Inner Signal Wave */}
      <path
        d="M38 18C42 14 58 14 62 18"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Outer Signal Wave */}
      <path
        d="M28 10C40 4 60 4 72 10"
        stroke="#A0A0A0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 2"
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${iconSizes[size]} ${className}`}>
        <LogoEmblem />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="w-8 h-8 rounded-lg bg-black border border-neutral-800 p-1 flex items-center justify-center shadow-sm shrink-0">
          <LogoEmblem />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xs tracking-tight text-white uppercase leading-none font-sans">
            AI SMART RAILWAY
          </span>
          <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase mt-0.5">
            MANAGEMENT SYSTEM
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center gap-3 p-2 ${className}`}>
        <div className="w-9 h-9 rounded-xl bg-black border border-neutral-800 p-1 flex items-center justify-center shrink-0 shadow-sm">
          <LogoEmblem />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-bold text-sm tracking-tight text-white truncate font-sans">
            AI SMART RAILWAY
          </span>
          <span className="text-[10px] font-mono text-neutral-400 truncate uppercase">
            MANAGEMENT SYSTEM
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'login') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="w-16 h-16 rounded-2xl bg-black border border-neutral-800 p-2.5 mb-4 shadow-2xl flex items-center justify-center">
          <LogoEmblem />
        </div>
        <h1 className="text-xl font-bold text-white uppercase tracking-wider font-sans">
          AI SMART RAILWAY
        </h1>
        <p className="text-xs font-mono text-neutral-400 tracking-widest uppercase mt-1">
          MANAGEMENT SYSTEM
        </p>
      </div>
    );
  }

  // Full Brand Logo
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
        <LogoEmblem />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm md:text-base tracking-wide text-white uppercase font-sans">
            AI SMART RAILWAY
          </span>
          <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[9px] font-mono text-neutral-300 font-bold">
            PROD
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
          MANAGEMENT SYSTEM • REAL-TIME OPERATIONS
        </span>
      </div>
    </div>
  );
};
