'use client';

import React, { useEffect, useRef } from 'react';

/**
 * 0. PURE HTML5 AYODHYA RAM MANDIR VIDEO PLAYER (Zero SVG Fallback Blocks)
 *
 * Fixes Error 2 ("first page looks broken"):
 * - Never renders any fallback SVG above the video that could stack or break layout.
 * - Uses explicit inline positioning styles (`position: absolute; inset: 0`) in addition
 *   to Tailwind classes so layout is 100% immune to CSS hydration delays.
 * - Seamless segment looping (`startTime` -> `endTime`) for `clip1-4.mp4` (`0–10s`, `10–20s`, `20–30s`, `30–40s`).
 * - Responsive Full-Bleed on Mobile + Seamless Blurred Ambient Wings on Widescreen Laptop.
 */
export function AyodhyaRamMandirClipPlayer({
  src,
  startTime = 0,
  endTime,
  active = true,
  className = '',
}: {
  src: string;
  startTime?: number;
  endTime?: number;
  active?: boolean;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const ambientVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const syncAndPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      try {
        if (
          startTime !== undefined &&
          (v.currentTime < startTime - 0.2 || (endTime !== undefined && v.currentTime >= endTime))
        ) {
          v.currentTime = startTime;
        }
        if (active) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      } catch {}
    };

    syncAndPlay(mainVideoRef.current);
    syncAndPlay(ambientVideoRef.current);
  }, [src, startTime, endTime, active]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (endTime !== undefined && v.currentTime >= endTime - 0.12) {
      v.currentTime = startTime;
      if (ambientVideoRef.current) {
        ambientVideoRef.current.currentTime = startTime;
      }
    } else if (startTime > 0 && v.currentTime < startTime - 0.3) {
      v.currentTime = startTime;
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    try {
      if (startTime > 0) {
        v.currentTime = startTime;
      }
      if (active) {
        v.play().catch(() => {});
      }
    } catch {}
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-[#1B0906] ${className}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* Widescreen Ambient Fill Layer (Fills 100vw on Laptop/Desktop with warm golden temple atmosphere) */}
      <video
        ref={ambientVideoRef}
        src={src}
        autoPlay={active}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden md:block w-full h-full object-cover object-center scale-125 blur-2xl brightness-[0.72] saturate-125 pointer-events-none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Main Crisp Video Stage (Uncropped on Mobile & Soft-Feathered Center Stage on Laptop) */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          className="relative w-full h-full md:w-auto md:h-full md:aspect-[9/16] md:min-w-[540px] lg:min-w-[640px] overflow-hidden"
          style={{
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <video
            ref={mainVideoRef}
            src={src}
            autoPlay={active}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover object-center scale-[1.06] origin-top-left"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * SACRED LORD GANESHA EMBLEM
 */
export function SacredGaneshaEmblem({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ganeshaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#C5932A" />
          <stop offset="100%" stopColor="#F9E596" />
        </linearGradient>
        <radialGradient id="ganeshaHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E5C158" stopOpacity="0.38" />
          <stop offset="65%" stopColor="#C5932A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="115" r="95" fill="url(#ganeshaHalo)" />
      <circle
        cx="120"
        cy="115"
        r="86"
        stroke="url(#ganeshaGold)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        opacity="0.75"
        className="animate-spin-slow"
      />
      <circle
        cx="120"
        cy="115"
        r="78"
        stroke="url(#ganeshaGold)"
        strokeWidth="1.6"
        opacity="0.9"
      />

      <g stroke="url(#ganeshaGold)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 30 L125 42 L115 42 Z" fill="url(#ganeshaGold)" />
        <path d="M104 56 C106 44, 134 44, 136 56 Z" fill="rgba(212,175,55,0.22)" strokeWidth="2" />
        <path d="M96 68 C98 54, 142 54, 144 68 Z" fill="rgba(212,175,55,0.28)" strokeWidth="2.2" />
        <path d="M90 74 L150 74" strokeWidth="2.8" />
        <circle cx="120" cy="50" r="2.5" fill="#E53935" stroke="url(#ganeshaGold)" strokeWidth="1" />
        <circle cx="120" cy="63" r="3" fill="#FFF4C2" />

        <path
          d="M92 76 C62 66, 52 96, 68 118 C75 126, 86 122, 92 114"
          fill="rgba(212,175,55,0.14)"
          strokeWidth="2.4"
        />
        <path
          d="M148 76 C178 66, 188 96, 172 118 C165 126, 154 122, 148 114"
          fill="rgba(212,175,55,0.14)"
          strokeWidth="2.4"
        />

        <path
          d="M92 75 C90 95, 96 112, 108 122 C112 136, 110 154, 124 158 C138 161, 146 150, 142 140 C139 134, 132 136, 133 142 C134 146, 128 148, 124 144 C120 138, 124 122, 132 112 C144 104, 150 92, 148 75"
          fill="rgba(212,175,55,0.18)"
          strokeWidth="2.5"
        />
        <path d="M111 84 Q120 87 129 84" strokeWidth="1.6" />
        <path d="M109 89 Q120 92 131 89" strokeWidth="1.8" />
        <circle cx="120" cy="89" r="2.2" fill="#E53935" />

        <path d="M101 98 Q107 94 112 99" strokeWidth="1.8" />
        <path d="M128 99 Q133 94 139 98" strokeWidth="1.8" />
        <circle cx="136" cy="142" r="4.5" fill="url(#ganeshaGold)" />

        <path
          d="M94 128 C88 150, 96 172, 120 172 C144 172, 152 150, 146 128"
          fill="rgba(212,175,55,0.14)"
          strokeWidth="2.2"
        />
        <path
          d="M84 174 C76 164, 96 160, 120 172 C144 160, 164 164, 156 174 C146 184, 94 184, 84 174 Z"
          fill="rgba(212,175,55,0.22)"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  );
}

/**
 * CONTINUOUSLY ANIMATED ROYAL CAPARISONED PICHWAI ELEPHANT (100% Transparent & Articulated)
 */
export function RoyalCaparisonedElephant({
  className = 'w-44 h-44',
  mirrored = false,
  holdingLotus = true,
}: {
  className?: string;
  mirrored?: boolean;
  holdingLotus?: boolean;
}) {
  return (
    <div className={`${className} ${mirrored ? 'scale-x-[-1]' : ''} select-none`}>
      <svg
        viewBox="0 0 320 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-elephant-body filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)]"
      >
        <defs>
          <linearGradient id="ivoryBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="55%" stopColor="#F3E8D2" />
            <stop offset="100%" stopColor="#D9C39E" />
          </linearGradient>
          <linearGradient id="royalGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B8" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="80%" stopColor="#9A6F18" />
            <stop offset="100%" stopColor="#F5E19C" />
          </linearGradient>
          <linearGradient id="velvetMaroon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A152B" />
            <stop offset="50%" stopColor="#5E0B1C" />
            <stop offset="100%" stopColor="#3B0510" />
          </linearGradient>
        </defs>

        <g>
          <path d="M138 18 L142 28 L134 28 Z" fill="url(#royalGold)" />
          <circle cx="138" cy="15" r="3.5" fill="url(#royalGold)" />
          <path
            d="M96 58 C96 32, 180 32, 180 58 Z"
            fill="url(#royalGold)"
            stroke="#5C3B09"
            strokeWidth="1.5"
          />
          <rect x="90" y="57" width="96" height="6" rx="3" fill="url(#royalGold)" stroke="#5C3B09" strokeWidth="1.2" />
          <path
            d="M102 63 L102 108 L174 108 L174 63 Z"
            fill="rgba(94, 11, 28, 0.55)"
            stroke="url(#royalGold)"
            strokeWidth="2"
          />
          <path
            d="M108 108 L108 76 C108 68, 124 66, 138 74 C152 66, 168 68, 168 76 L168 108"
            fill="none"
            stroke="url(#royalGold)"
            strokeWidth="2"
          />
          <rect x="96" y="104" width="84" height="10" rx="3" fill="url(#royalGold)" stroke="#5C3B09" strokeWidth="1.2" />
        </g>

        <g className="animate-elephant-leg-b">
          <path
            d="M84 195 L78 266 C78 272, 98 272, 100 266 L106 202 Z"
            fill="#DECAA6"
            stroke="#8A6938"
            strokeWidth="1.5"
          />
          <path
            d="M174 195 L182 266 C182 272, 202 272, 202 266 L194 195 Z"
            fill="#DECAA6"
            stroke="#8A6938"
            strokeWidth="1.5"
          />
        </g>

        <g className="animate-elephant-leg-a">
          <path
            d="M72 190 L68 268 C68 274, 94 274, 96 268 L104 198 Z"
            fill="url(#ivoryBody)"
            stroke="#7A5B2B"
            strokeWidth="2"
          />
          <rect x="66" y="254" width="32" height="6" rx="3" fill="url(#royalGold)" />
          <path
            d="M196 196 L206 268 C208 274, 234 274, 234 268 L226 184 Z"
            fill="url(#ivoryBody)"
            stroke="#7A5B2B"
            strokeWidth="2"
          />
          <rect x="204" y="254" width="32" height="6" rx="3" fill="url(#royalGold)" />
        </g>

        <path
          d="M64 156 C58 124, 86 108, 140 108 C184 108, 206 116, 224 106 C244 96, 266 108, 270 132 C264 166, 242 184, 218 192 C178 206, 120 206, 74 192 C64 182, 66 168, 64 156 Z"
          fill="url(#ivoryBody)"
          stroke="#7A5B2B"
          strokeWidth="2"
        />

        <path
          d="M64 146 C48 162, 44 190, 48 214"
          stroke="#7A5B2B"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-elephant-leg-b"
        />

        <path
          d="M84 112 L196 112 L202 198 C202 204, 194 208, 186 208 L94 208 C86 208, 78 204, 78 198 Z"
          fill="url(#velvetMaroon)"
          stroke="url(#royalGold)"
          strokeWidth="3"
        />
        <rect
          x="90"
          y="120"
          width="100"
          height="78"
          rx="4"
          fill="none"
          stroke="url(#royalGold)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle cx="140" cy="158" r="22" fill="rgba(212,175,55,0.15)" stroke="url(#royalGold)" strokeWidth="1.2" />
        <path
          d="M140 138 C134 148, 134 158, 140 166 C146 158, 146 148, 140 138 Z"
          fill="#F48FB1"
          stroke="url(#royalGold)"
          strokeWidth="1.2"
        />
        {[86, 98, 110, 122, 134, 146, 158, 170, 182, 194].map((xPos) => (
          <circle key={xPos} cx={xPos} cy="213" r="3.2" fill="url(#royalGold)" />
        ))}

        <g className="animate-elephant-ear">
          <path
            d="M214 114 C192 114, 186 144, 198 164 C208 176, 226 168, 232 152 C236 136, 230 114, 214 114 Z"
            fill="#F6ECDC"
            stroke="url(#royalGold)"
            strokeWidth="2.5"
          />
        </g>

        <path
          d="M232 106 C248 102, 264 114, 270 132 L252 140 C244 128, 236 118, 232 106 Z"
          fill="url(#velvetMaroon)"
          stroke="url(#royalGold)"
          strokeWidth="2"
        />
        <circle cx="256" cy="104" r="6" fill="url(#royalGold)" stroke="#5C3B09" strokeWidth="1" />
        <ellipse cx="246" cy="128" rx="4" ry="2.8" fill="#2A0810" />

        <g className="animate-elephant-trunk">
          <path
            d="M256 130 C272 138, 274 166, 284 176 C294 186, 308 178, 304 164 C302 158, 294 160, 295 166 C296 170, 289 172, 286 166 C282 156, 284 138, 268 124 Z"
            fill="url(#ivoryBody)"
            stroke="#7A5B2B"
            strokeWidth="2"
          />
          {holdingLotus && (
            <g transform="translate(282, 118)">
              <path d="M16 42 C16 28, 12 20, 16 10" stroke="#4E6E3A" strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M16 2 C10 10, 10 18, 16 24 C22 18, 22 10, 16 2 Z"
                fill="#F48FB1"
                stroke="url(#royalGold)"
                strokeWidth="1.2"
              />
              <path
                d="M16 24 C6 20, 2 12, 8 6 C12 10, 14 18, 16 24 Z"
                fill="#EC407A"
                stroke="url(#royalGold)"
                strokeWidth="1.2"
              />
              <path
                d="M16 24 C26 20, 30 12, 24 6 C20 10, 18 18, 16 24 Z"
                fill="#EC407A"
                stroke="url(#royalGold)"
                strokeWidth="1.2"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

/**
 * BLOOMING PICHWAI LOTUS CREST
 */
export function PichwaiLotusCrest({ className = 'w-72 h-36' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="crimsonPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D84339" />
          <stop offset="55%" stopColor="#9A1B1F" />
          <stop offset="100%" stopColor="#4E070C" />
        </linearGradient>
        <linearGradient id="pinkBud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCE4EC" />
          <stop offset="60%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#880E4F" />
        </linearGradient>
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5C0" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8D6214" />
        </linearGradient>
      </defs>

      <g stroke="#556B44" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M210 165 L210 24" />
        <path d="M210 160 C165 160, 130 135, 95 95 C75 72, 48 75, 35 95" />
        <path d="M150 142 C132 115, 128 85, 142 62" />
        <path d="M110 112 C82 118, 60 138, 48 158" />
        <path d="M210 160 C255 160, 290 135, 325 95 C345 72, 372 75, 385 95" />
        <path d="M270 142 C288 115, 292 85, 278 62" />
        <path d="M310 112 C338 118, 360 138, 372 158" />
      </g>

      {[
        { cx: 210, cy: 22, rot: 0, scale: 1 },
        { cx: 142, cy: 58, rot: -20, scale: 0.9 },
        { cx: 278, cy: 58, rot: 20, scale: 0.9 },
        { cx: 88, cy: 84, rot: -38, scale: 0.85 },
        { cx: 332, cy: 84, rot: 38, scale: 0.85 },
      ].map((b, idx) => (
        <g key={idx} transform={`translate(${b.cx}, ${b.cy}) rotate(${b.rot}) scale(${b.scale})`}>
          <path
            d="M0 -16 C-10 -4, -10 10, 0 18 C10 10, 10 -4, 0 -16 Z"
            fill="url(#pinkBud)"
            stroke="url(#crestGold)"
            strokeWidth="1.5"
          />
        </g>
      ))}

      <g transform="translate(210, 128)" className="animate-lotus-bob">
        <path
          d="M0 36 C-42 36, -68 12, -56 -12 C-36 -6, -18 12, 0 36 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.2"
        />
        <path
          d="M0 36 C42 36, 68 12, 56 -12 C36 -6, 18 12, 0 36 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.2"
        />
        <path
          d="M0 -52 C-20 -24, -20 12, 0 36 C20 12, 20 -24, 0 -52 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.6"
        />
      </g>
    </svg>
  );
}

/**
 * 3D CYLINDRICAL MAROON & GOLD ROYAL SCROLL ROLLER
 */
export function ScrollRoller3D({
  label,
  showBottomOrnament = false,
}: {
  label?: string;
  showBottomOrnament?: boolean;
}) {
  return (
    <div className="relative w-[106%] sm:w-[108%] flex flex-col items-center select-none z-20">
      <div className="relative w-full flex items-center filter drop-shadow-[0_12px_18px_rgba(26,4,10,0.55)]">
        <div className="flex items-center flex-shrink-0">
          <div
            className="w-3 sm:w-4 h-4 sm:h-5 rounded-l-full"
            style={{
              background: 'linear-gradient(180deg, #FFF5C0 0%, #D4AF37 45%, #7A5210 85%, #C5932A 100%)',
            }}
          />
          <div
            className="w-3.5 sm:w-5 h-7 sm:h-9 rounded-l-md -ml-0.5"
            style={{
              background: 'linear-gradient(180deg, #FFF8D6 0%, #E5C158 35%, #8D6214 80%, #D4AF37 100%)',
              border: '1px solid rgba(255,245,192,0.6)',
            }}
          />
          <div
            className="w-4 sm:w-6 h-10 sm:h-12 rounded-sm -ml-0.5"
            style={{
              background: 'linear-gradient(180deg, #FFF5C0 0%, #D4AF37 40%, #6E4B0C 85%, #C5932A 100%)',
              borderRight: '2px solid #4A3005',
            }}
          />
        </div>

        <div
          className="flex-1 h-9 sm:h-11 relative overflow-hidden flex items-center justify-center"
          style={{
            background:
              'linear-gradient(180deg, #3D0713 0%, #7C192E 22%, #A92944 36%, #6E1225 65%, #2B040C 100%)',
            boxShadow:
              'inset 0 2px 4px rgba(255,210,220,0.35), inset 0 -4px 8px rgba(0,0,0,0.7)',
            borderTop: '1px solid rgba(212,175,55,0.45)',
            borderBottom: '1px solid rgba(212,175,55,0.35)',
          }}
        >
          <div className="absolute inset-x-0 top-[28%] h-[1px] bg-white/15" />
          <div className="absolute inset-x-0 bottom-[24%] h-[1px] bg-black/40" />
          {label && (
            <span className="font-cinzel text-[9px] sm:text-[11px] tracking-[0.28em] text-gold-200/85 uppercase font-bold drop-shadow">
              {label}
            </span>
          )}
        </div>

        <div className="flex items-center flex-shrink-0">
          <div
            className="w-4 sm:w-6 h-10 sm:h-12 rounded-sm"
            style={{
              background: 'linear-gradient(180deg, #FFF5C0 0%, #D4AF37 40%, #6E4B0C 85%, #C5932A 100%)',
              borderLeft: '2px solid #4A3005',
            }}
          />
          <div
            className="w-3.5 sm:w-5 h-7 sm:h-9 rounded-r-md -ml-0.5"
            style={{
              background: 'linear-gradient(180deg, #FFF8D6 0%, #E5C158 35%, #8D6214 80%, #D4AF37 100%)',
              border: '1px solid rgba(255,245,192,0.6)',
            }}
          />
          <div
            className="w-3 sm:w-4 h-4 sm:h-5 rounded-r-full -ml-0.5"
            style={{
              background: 'linear-gradient(180deg, #FFF5C0 0%, #D4AF37 45%, #7A5210 85%, #C5932A 100%)',
            }}
          />
        </div>
      </div>

      {showBottomOrnament && (
        <svg viewBox="0 0 120 70" className="w-24 sm:w-28 h-14 -mt-1 pointer-events-none animate-sway-1">
          <path d="M60 0 L60 45" stroke="#6E8658" strokeWidth="2" />
          <path d="M45 38 C52 50, 68 50, 75 38 C68 56, 52 56, 45 38 Z" fill="#D4AF37" />
          <path d="M60 44 L66 56 L60 66 L54 56 Z" fill="#D4AF37" stroke="#7A5210" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}

/**
 * LOTUS & GOLD ZARI SCROLL DIVIDER
 */
export function LotusScrollDivider({ className = 'w-64 sm:w-80 h-14' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9A6F18" />
          <stop offset="50%" stopColor="#FFF3B8" />
          <stop offset="100%" stopColor="#9A6F18" />
        </linearGradient>
      </defs>
      <path
        d="M20 38 C55 38, 70 22, 95 28 C115 34, 125 48, 150 40"
        stroke="url(#divGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M340 38 C305 38, 290 22, 265 28 C245 34, 235 48, 210 40"
        stroke="url(#divGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g transform="translate(180, 38)">
        <path d="M0 10 C-22 10, -34 -4, -24 -16 C-14 -10, -6 0, 0 10 Z" fill="#F48FB1" stroke="#FFF3B8" strokeWidth="1.2" />
        <path d="M0 10 C22 10, 34 -4, 24 -16 C14 -10, 6 0, 0 10 Z" fill="#F48FB1" stroke="#FFF3B8" strokeWidth="1.2" />
        <path d="M0 -30 C-10 -14, -10 2, 0 12 C10 2, 10 -14, 0 -30 Z" fill="#FCE4EC" stroke="#FFF3B8" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * ANIMATED ROYAL PEACOCK
 */
export function RoyalPeacock({
  className = 'w-24 h-28',
  mirrored = false,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <div className={`${className} ${mirrored ? 'scale-x-[-1]' : ''} select-none`}>
      <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="peacockBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ACC1" />
            <stop offset="50%" stopColor="#0D47A1" />
            <stop offset="100%" stopColor="#00332C" />
          </linearGradient>
          <linearGradient id="peacockGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5C0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8D6214" />
          </linearGradient>
        </defs>
        <g className="animate-peacock-plume">
          <path
            d="M78 96 C48 112, 20 148, 12 192 C42 188, 76 160, 96 112 Z"
            fill="#1B5E20"
            stroke="url(#peacockGold)"
            strokeWidth="1.8"
          />
        </g>
        <g className="animate-elephant-body">
          <path
            d="M76 96 C76 74, 96 66, 114 78 C118 62, 114 44, 120 32 C126 22, 140 24, 142 34 C144 42, 134 46, 130 56 C126 68, 136 86, 126 102 C114 118, 86 114, 76 96 Z"
            fill="url(#peacockBody)"
            stroke="url(#peacockGold)"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
