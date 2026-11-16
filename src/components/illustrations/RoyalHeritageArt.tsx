'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * 0. SMART AYODHYA RAM MANDIR MULTI-CLIP VIDEO PLAYER (16:9 Desktop + 9:16 Mobile)
 * Plays high-quality Ayodhya Ram Mandir & Sacred Mandapam video clips from
 * `/public/videos/ayodhya/...` responsively on both 16:9 desktop and 9:16 mobile.
 */
export function AyodhyaRamMandirClipPlayer({
  desktopSrc,
  mobileSrc,
  fallback,
  className = '',
}: {
  desktopSrc: string;
  mobileSrc: string;
  fallback: React.ReactNode;
  className?: string;
}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeSrc, setActiveSrc] = useState(desktopSrc);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateSrc = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setActiveSrc(isMobile ? mobileSrc : desktopSrc);
    };
    updateSrc();
    window.addEventListener('resize', updateSrc);
    return () => window.removeEventListener('resize', updateSrc);
  }, [desktopSrc, mobileSrc]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activeSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-[#2B050D] ${className}`}>
      {/* Fallback vista displayed smoothly while video loads */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {fallback}
      </div>

      {/* Responsive HD Video (9:16 Mobile & 16:9 Desktop) */}
      <video
        ref={videoRef}
        src={activeSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onPlaying={() => setVideoLoaded(true)}
        onError={() => setVideoLoaded(false)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
          videoLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
}

/**
 * 0B. TOP SCALLOPED FLORAL & HANGING BRASS BELL TORAN ARCH
 * Exact match to the `tabmandir` (`rammandir.framer.website`) reference video frames 2–6:
 * Ornate cream-and-gold scalloped Mughlai/Temple arch framing the top of the screen,
 * draped with pink lotus/roses, orange marigolds, jasmine garlands, and 10 swinging brass temple bells.
 */
export function AyodhyaFloralToranArch({ className = 'w-full' }: { className?: string }) {
  const bells = [
    { left: '6%', chainH: 88, delay: '0s', scale: 0.92 },
    { left: '14%', chainH: 145, delay: '0.45s', scale: 1.08 },
    { left: '22%', chainH: 72, delay: '0.85s', scale: 0.82 },
    { left: '30%', chainH: 112, delay: '0.25s', scale: 0.92 },
    { left: '70%', chainH: 112, delay: '0.65s', scale: 0.92 },
    { left: '78%', chainH: 72, delay: '0.15s', scale: 0.82 },
    { left: '86%', chainH: 145, delay: '0.55s', scale: 1.08 },
    { left: '94%', chainH: 88, delay: '0.95s', scale: 0.92 },
  ];

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* Scalloped Temple Arch Spandrels (Left & Right Corners + Top Floral Border) */}
      <svg
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-24 sm:h-36 md:h-44 drop-shadow-[0_10px_20px_rgba(42,5,13,0.45)]"
      >
        <defs>
          <linearGradient id="toranCream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A0C19" />
            <stop offset="55%" stopColor="#6E1125" />
            <stop offset="100%" stopColor="#3D0713" />
          </linearGradient>
          <linearGradient id="toranGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9A6F18" />
            <stop offset="25%" stopColor="#FFF3B8" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#FFF3B8" />
            <stop offset="100%" stopColor="#9A6F18" />
          </linearGradient>
        </defs>

        {/* Scalloped Arch Cutout Shape matching Reference Video 4 (`tabmandir` frames 2–5) */}
        <path
          d="M0 0 L1440 0 L1440 215 C1350 215, 1310 155, 1240 145 C1175 135, 1140 85, 1065 78 C990 70, 945 32, 860 28 C795 24, 755 8, 720 8 C685 8, 645 24, 580 28 C495 32, 450 70, 375 78 C300 85, 265 135, 200 145 C130 155, 90 215, 0 215 Z"
          fill="url(#toranCream)"
          stroke="url(#toranGold)"
          strokeWidth="4"
        />
        <path
          d="M0 198 C90 198, 130 138, 200 128 C265 118, 300 68, 375 61 C450 53, 495 18, 580 14 C645 10, 685 2, 720 2 C755 2, 795 10, 860 14 C945 18, 990 53, 1065 61 C1140 68, 1175 118, 1240 128 C1310 138, 1350 198, 1440 198"
          stroke="#FFF3B8"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.75"
        />

        {/* Hand-Painted Floral Clusters in Left & Right Arch Spandrels */}
        {[
          { x: 55, y: 48, r: 16, c: '#F48FB1' },
          { x: 92, y: 36, r: 14, c: '#FFB300' },
          { x: 135, y: 42, r: 15, c: '#EC407A' },
          { x: 180, y: 30, r: 13, c: '#FFF59D' },
          { x: 235, y: 26, r: 14, c: '#FF7043' },
          { x: 75, y: 95, r: 14, c: '#FFA000' },
          { x: 120, y: 82, r: 13, c: '#F8BBD0' },
          { x: 35, y: 135, r: 15, c: '#E91E63' },
          { x: 1385, y: 48, r: 16, c: '#F48FB1' },
          { x: 1348, y: 36, r: 14, c: '#FFB300' },
          { x: 1305, y: 42, r: 15, c: '#EC407A' },
          { x: 1260, y: 30, r: 13, c: '#FFF59D' },
          { x: 1205, y: 26, r: 14, c: '#FF7043' },
          { x: 1365, y: 95, r: 14, c: '#FFA000' },
          { x: 1320, y: 82, r: 13, c: '#F8BBD0' },
          { x: 1405, y: 135, r: 15, c: '#E91E63' },
        ].map((f, i) => (
          <g key={i}>
            <circle cx={f.x} cy={f.y} r={f.r} fill={f.c} stroke="#FFF3B8" strokeWidth="1" />
            <circle cx={f.x} cy={f.y} r={f.r * 0.42} fill="#FFF59D" />
          </g>
        ))}
      </svg>

      {/* Swinging Brass Temple Bells on Golden Chains */}
      {bells.map((b, i) => (
        <div
          key={i}
          style={{ left: b.left, animationDelay: b.delay }}
          className={`absolute top-0 -translate-x-1/2 flex flex-col items-center z-20 ${
            i % 2 === 0 ? 'animate-sway-1' : 'animate-sway-2'
          }`}
        >
          <div
            style={{ height: `${b.chainH}px` }}
            className="w-[2.5px] bg-gradient-to-b from-[#FFF3B8] via-[#D4AF37] to-[#8D6214] shadow-sm"
          />
          <svg
            viewBox="0 0 50 60"
            style={{ transform: `scale(${b.scale})` }}
            className="w-9 sm:w-10 h-11 sm:h-12 -mt-1 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]"
          >
            <defs>
              <linearGradient id={`ayodhyaBellGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF6C4" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="85%" stopColor="#7A5210" />
                <stop offset="100%" stopColor="#C5932A" />
              </linearGradient>
            </defs>
            <circle cx="25" cy="6" r="4" fill={`url(#ayodhyaBellGrad-${i})`} />
            <rect x="20" y="9" width="10" height="5" rx="2" fill={`url(#ayodhyaBellGrad-${i})`} />
            <path
              d="M12 38 C12 20, 17 14, 25 14 C33 14, 38 20, 38 38 L44 46 L6 46 Z"
              fill={`url(#ayodhyaBellGrad-${i})`}
              stroke="#5C3B09"
              strokeWidth="1"
            />
            <line x1="8" y1="43" x2="42" y2="43" stroke="#FFF6C4" strokeWidth="1.2" />
            <circle cx="25" cy="49" r="3.5" fill="#8D6214" stroke="#FFF6C4" strokeWidth="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/**
 * 1. FULL-BLEED ANIMATED SHRI RAM JANMABHOOMI MANDIR, AYODHYA (UP, INDIA) VISTA
 * Modeled directly on the `tabmandir` (`rammandir.framer.website`) reference video frames 2–6:
 * - Warm golden sunrise sky (`#FFF8E7` -> `#F5D491` -> `#D88A44`)
 * - Towering 161-foot Nagara-style Pink Bansi Paharpur Sandstone Main Shikhara with Urushringas
 * - 5 Stepped Mandapa Domes (Nritya, Rang, Sabha, Kirtan, Prarthana Mandapas)
 * - 360 Carvings & Two-Storey Colonnaded Pink Sandstone Temple Facade
 * - Animated fluttering Saffron Suryavanshi Dhwaja Flag at the peak
 * - Animated flocks of birds gliding across the Ayodhya sunrise sky
 * - 32 Singhdwar Marble Steps, Royal White-and-Gold Aisle, Brass Deepstambhs, and Rose/Marigold Urns
 */
export function GrandTemplePanorama({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ayodhyaSkyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFBF0" />
            <stop offset="28%" stopColor="#FCE7B2" />
            <stop offset="62%" stopColor="#E6A55E" />
            <stop offset="88%" stopColor="#7A2218" />
            <stop offset="100%" stopColor="#2B050D" />
          </linearGradient>
          <linearGradient id="bansiPinkSandstone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE6B8" />
            <stop offset="40%" stopColor="#E29E56" />
            <stop offset="78%" stopColor="#A85C24" />
            <stop offset="100%" stopColor="#D4883E" />
          </linearGradient>
          <linearGradient id="sandstoneShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B86B25" />
            <stop offset="100%" stopColor="#5C2A08" />
          </linearGradient>
          <linearGradient id="singhdwarSteps" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="45%" stopColor="#F7EBD2" />
            <stop offset="100%" stopColor="#D5B377" />
          </linearGradient>
          <radialGradient id="suryaHaloAyodhya" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#FFD54F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warm Golden Ayodhya Sunrise Sky Backdrop */}
        <rect width="1440" height="900" fill="url(#ayodhyaSkyGrad)" />

        {/* Rotating Sacred Suryavanshi Sunburst Behind Main Ram Mandir Shikhara */}
        <g transform="translate(720, 310)">
          <circle cx="0" cy="0" r="360" fill="url(#suryaHaloAyodhya)" />
          <g className="animate-spin-slow" opacity="0.42" stroke="#FFF4B8" strokeWidth="1.8">
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map(
              (deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1="0"
                    y1="0"
                    x2={Math.cos(rad) * 380}
                    y2={Math.sin(rad) * 380}
                    strokeDasharray="12 6"
                  />
                );
              }
            )}
          </g>
        </g>

        {/* Soft Misty Sarayu River Horizon & Foliage */}
        <path
          d="M0 540 Q180 465 360 515 Q540 450 720 500 Q900 450 1080 515 Q1260 465 1440 540 L1440 720 L0 720 Z"
          fill="#B36A2E"
          opacity="0.28"
        />

        {/* ANIMATED FLOCKS OF BIRDS GLIDING ACROSS THE AYODHYA SKY (Matches `tabmandir` frames 2–5) */}
        <g className="animate-bird-glide">
          {[
            { x: 210, y: 170, s: 1.05 },
            { x: 250, y: 152, s: 0.9 },
            { x: 285, y: 178, s: 0.8 },
            { x: 325, y: 146, s: 0.95 },
            { x: 540, y: 120, s: 0.75 },
            { x: 575, y: 108, s: 0.85 },
            { x: 920, y: 162, s: 1.05 },
            { x: 965, y: 144, s: 0.9 },
            { x: 1005, y: 170, s: 0.85 },
            { x: 1045, y: 152, s: 0.75 },
          ].map((b, i) => (
            <path
              key={i}
              d={`M${b.x} ${b.y} Q${b.x + 8 * b.s} ${b.y - 10 * b.s} ${b.x + 16 * b.s} ${b.y} Q${b.x + 24 * b.s} ${b.y - 10 * b.s} ${b.x + 32 * b.s} ${b.y}`}
              stroke="#5C2A08"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </g>

        {/* =========================================================================
            SHRI RAM JANMABHOOMI MANDIR, AYODHYA — NAGARA ARCHITECTURE
            (Matches `tabmandir` / `rammandir.framer.website` frames 2–6)
           ========================================================================= */}
        <g transform="translate(0, 28)">
          {/* 1. WAVING SAFFRON DHWAJA (SURYA EMBLEM FLAG) ON MAIN 161-FT SHIKHARA */}
          <g transform="translate(720, 68)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="#5C2A08" strokeWidth="3.8" />
            <circle cx="0" cy="0" r="6" fill="#FFF3B8" stroke="#5C2A08" strokeWidth="1.5" />
            <g className="animate-dhwaja">
              <path
                d="M2 4 C34 0, 66 14, 102 6 L80 25 L102 44 C66 36, 34 48, 2 40 Z"
                fill="#FF6F00"
                stroke="#FFF3B8"
                strokeWidth="2"
              />
              {/* Sacred Suryavanshi Sun Emblem on Flag */}
              <circle cx="34" cy="23" r="7.5" fill="#FFF3B8" />
              <circle cx="34" cy="23" r="4" fill="#FF6F00" />
            </g>
          </g>

          {/* 2. CENTRAL 161-FT NAGARA SHIKHARA SPIRE WITH KALASH & URUSHRINGAS */}
          <g>
            <ellipse cx="720" cy="136" rx="26" ry="9" fill="url(#bansiPinkSandstone)" stroke="#5C2A08" strokeWidth="1.8" />
            <path
              d="M598 430 C625 235, 670 152, 720 136 C770 152, 815 235, 842 430 Z"
              fill="url(#bansiPinkSandstone)"
              stroke="#5C2A08"
              strokeWidth="2.6"
            />
            {[172, 206, 240, 274, 308, 342, 376, 406].map((yPos, idx) => {
              const halfW = 24 + idx * 12;
              return (
                <g key={yPos}>
                  <line
                    x1={720 - halfW}
                    y1={yPos}
                    x2={720 + halfW}
                    y2={yPos}
                    stroke="#5C2A08"
                    strokeWidth="2.2"
                  />
                  <line
                    x1={720 - halfW + 4}
                    y1={yPos + 8}
                    x2={720 + halfW - 4}
                    y2={yPos + 8}
                    stroke="#FFF3B8"
                    strokeWidth="1.2"
                    opacity="0.8"
                  />
                </g>
              );
            })}
            {/* Subsidiary Urushringa Turrets */}
            <path
              d="M548 430 C564 305, 592 245, 622 234 C646 245, 665 305, 675 430 Z"
              fill="url(#bansiPinkSandstone)"
              stroke="#5C2A08"
              strokeWidth="2"
            />
            <path
              d="M765 430 C775 305, 794 245, 818 234 C848 245, 876 305, 892 430 Z"
              fill="url(#bansiPinkSandstone)"
              stroke="#5C2A08"
              strokeWidth="2"
            />
          </g>

          {/* 3. FIVE STEPPED MANDAPA DOMES (Kudu, Nritya, Rang, Kirtan & Prarthana Mandapas) */}
          {[
            { cx: 455, topY: 262, w: 170 },
            { cx: 985, topY: 262, w: 170 },
            { cx: 280, topY: 312, w: 155 },
            { cx: 1160, topY: 312, w: 155 },
            { cx: 125, topY: 355, w: 135 },
            { cx: 1315, topY: 355, w: 135 },
          ].map((dome, i) => (
            <g key={i}>
              <circle cx={dome.cx} cy={dome.topY - 8} r="5.5" fill="#FFF3B8" stroke="#5C2A08" strokeWidth="1.3" />
              <path
                d={`M${dome.cx - dome.w / 2} 430 C${dome.cx - dome.w / 2.4} ${dome.topY + 25}, ${dome.cx - 25} ${dome.topY}, ${dome.cx} ${dome.topY} C${dome.cx + 25} ${dome.topY}, ${dome.cx + dome.w / 2.4} ${dome.topY + 25}, ${dome.cx + dome.w / 2} 430 Z`}
                fill="url(#bansiPinkSandstone)"
                stroke="#5C2A08"
                strokeWidth="2.2"
              />
              {[0.25, 0.5, 0.75].map((t, j) => {
                const y = dome.topY + t * (430 - dome.topY);
                const w = dome.w * (0.4 + t * 0.55);
                return (
                  <line
                    key={j}
                    x1={dome.cx - w / 2}
                    y1={y}
                    x2={dome.cx + w / 2}
                    y2={y}
                    stroke="#5C2A08"
                    strokeWidth="1.8"
                  />
                );
              })}
            </g>
          ))}

          {/* 4. THREE-STOREY CARVED COLONNADED AYODHYA RAM MANDIR FACADE */}
          <rect
            x="45"
            y="425"
            width="1350"
            height="152"
            fill="url(#bansiPinkSandstone)"
            stroke="#5C2A08"
            strokeWidth="2.5"
          />
          <rect
            x="30"
            y="418"
            width="1380"
            height="12"
            rx="4"
            fill="url(#sandstoneShadow)"
            stroke="#FFF3B8"
            strokeWidth="1.2"
          />
          <rect x="35" y="495" width="1370" height="8" fill="url(#sandstoneShadow)" />

          {/* Carved Temple Pillars & Torana Arches Across Facade */}
          {[90, 165, 240, 315, 390, 465, 540, 608, 832, 900, 975, 1050, 1125, 1200, 1275, 1350].map((px) => (
            <g key={px}>
              <rect x={px - 22} y="435" width="44" height="54" rx="22" fill="#4A1F04" stroke="#FFF3B8" strokeWidth="1.1" />
              <rect x={px - 22} y="506" width="44" height="62" rx="22" fill="#3A1502" stroke="#FFF3B8" strokeWidth="1.1" />
            </g>
          ))}

          {/* Central Glowing Garbhagriha Sanctum Portal with Golden Arch */}
          <path
            d="M646 577 L646 458 C646 414, 794 414, 794 458 L794 577 Z"
            fill="#2B050D"
            stroke="#FFF3B8"
            strokeWidth="3.8"
          />
          <path
            d="M664 577 L664 468 C664 434, 776 434, 776 468 L776 577 Z"
            fill="url(#suryaHaloAyodhya)"
            opacity="0.88"
          />

          {/* 5. 32 SINGHDWAR MARBLE STEPS & ROYAL WHITE-GOLD AISLE (Matches `tabmandir` frames 3–7) */}
          <polygon
            points="510,577 930,577 1210,880 230,880"
            fill="url(#singhdwarSteps)"
            stroke="#8E5416"
            strokeWidth="2.5"
          />
          {[600, 628, 660, 696, 738, 785, 835].map((sy, idx) => {
            const spread = 212 + idx * 36;
            return (
              <line
                key={sy}
                x1={720 - spread}
                y1={sy}
                x2={720 + spread}
                y2={sy}
                stroke="#B8860B"
                strokeWidth="1.6"
                opacity="0.65"
              />
            );
          })}

          {/* Central White & Gold Mandala Carpet Runner Down the Temple Steps */}
          <polygon
            points="655,577 785,577 890,880 550,880"
            fill="#FFFDF9"
            stroke="#D4AF37"
            strokeWidth="2.5"
          />
          <ellipse cx="720" cy="735" rx="75" ry="32" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Left & Right Carved Sandstone Balustrades, Brass Deepstambhs & Floral Urns */}
          {[
            { x: 470, y: 590, s: 0.82 },
            { x: 970, y: 590, s: 0.82 },
            { x: 390, y: 680, s: 1.0 },
            { x: 1050, y: 680, s: 1.0 },
            { x: 290, y: 780, s: 1.2 },
            { x: 1150, y: 780, s: 1.2 },
          ].map((urn, idx) => (
            <g key={idx} transform={`translate(${urn.x}, ${urn.y}) scale(${urn.s})`}>
              <path d="M-28 20 L28 20 L20 55 L-20 55 Z" fill="url(#bansiPinkSandstone)" stroke="#5C2A08" strokeWidth="1.5" />
              <circle cx="-18" cy="12" r="12" fill="#EC407A" />
              <circle cx="0" cy="6" r="14" fill="#FFA000" />
              <circle cx="18" cy="12" r="12" fill="#F48FB1" />
              <circle cx="-8" cy="18" r="10" fill="#FFD54F" />
              <circle cx="10" cy="18" r="10" fill="#D81B60" />
              {/* Flickering Brass Deepam */}
              <path d="M-45 48 Q-35 58 -25 48 Z" fill="#D4AF37" />
              <circle cx="-35" cy="42" r="5" fill="#FFF59D" className="animate-pulse" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * 1B. 3D PERSPECTIVE AYODHYA KOLIYA / RAMESWARAM PILLARED MANDAPAM CORRIDOR
 * Matches Reference Video 3 (`demos.riwaaz.in/rameswaram` frames 4–10) & Ayodhya Ram Mandir's
 * 392-pillar carved pink sandstone Mandapam corridor:
 */
export function RameswaramPillaredCorridor({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="corridorStone" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5C3A1B" />
            <stop offset="35%" stopColor="#D69A56" />
            <stop offset="70%" stopColor="#F0C98D" />
            <stop offset="100%" stopColor="#6E451F" />
          </linearGradient>
          <linearGradient id="ceilingMurals" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#8E5416" />
            <stop offset="50%" stopColor="#D69A43" />
            <stop offset="100%" stopColor="#5C3208" />
          </linearGradient>
          <radialGradient id="sanctumLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#FFE082" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#3E1E08" stopOpacity="0.94" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#sanctumLight)" />

        {/* Perspective Marble & Sandstone Floor Slabs */}
        <polygon points="0,900 1440,900 920,540 520,540" fill="#4E3422" stroke="#D4AF37" strokeWidth="1.5" />
        {[600, 670, 750, 835].map((fy) => (
          <line key={fy} x1="150" y1={fy} x2="1290" y2={fy} stroke="#D4AF37" strokeWidth="1" opacity="0.35" />
        ))}

        {/* Perspective Carved Temple Ceiling with Ornate Lotus Mandala Chakras */}
        <polygon points="0,0 1440,0 920,330 520,330" fill="url(#ceilingMurals)" stroke="#FFF3B8" strokeWidth="2" />
        {[
          { cy: 75, rx: 145, ry: 36 },
          { cy: 165, rx: 105, ry: 26 },
          { cy: 235, rx: 72, ry: 18 },
          { cy: 290, rx: 46, ry: 12 },
        ].map((c, idx) => (
          <g key={idx}>
            <ellipse cx="720" cy={c.cy} rx={c.rx} ry={c.ry} fill="#7B162B" stroke="#FFF3B8" strokeWidth="2" />
            <ellipse cx="720" cy={c.cy} rx={c.rx * 0.68} ry={c.ry * 0.68} fill="#1B5E20" stroke="#FFD54F" strokeWidth="1.5" />
            <ellipse cx="720" cy={c.cy} rx={c.rx * 0.32} ry={c.ry * 0.32} fill="#FFD54F" />
          </g>
        ))}

        {/* 4 PAIRS OF PERSPECTIVE CARVED SANDSTONE TEMPLE PILLARS ON LEFT & RIGHT */}
        {[
          { leftX: 40, rightX: 1270, w: 130, topY: 0, botY: 900, opacity: 1 },
          { leftX: 195, rightX: 1135, w: 110, topY: 75, botY: 820, opacity: 0.95 },
          { leftX: 330, rightX: 1020, w: 90, topY: 165, botY: 735, opacity: 0.9 },
          { leftX: 440, rightX: 930, w: 70, topY: 245, botY: 650, opacity: 0.85 },
        ].map((p, idx) => (
          <g key={idx} opacity={p.opacity}>
            <rect
              x={p.leftX}
              y={p.topY}
              width={p.w}
              height={p.botY - p.topY}
              fill="url(#corridorStone)"
              stroke="#5C3208"
              strokeWidth="2"
            />
            <rect x={p.leftX - 10} y={p.topY + 35} width={p.w + 25} height="22" rx="4" fill="#8E5416" stroke="#FFF3B8" strokeWidth="1.2" />
            <rect x={p.leftX + 10} y={(p.topY + p.botY) / 2 - 40} width={p.w - 20} height="80" rx="6" fill="#5C3208" stroke="#FFD54F" strokeWidth="1.2" />
            <rect x={p.leftX - 10} y={p.botY - 55} width={p.w + 20} height="28" rx="4" fill="#8E5416" stroke="#FFF3B8" strokeWidth="1.2" />

            <rect
              x={p.rightX}
              y={p.topY}
              width={p.w}
              height={p.botY - p.topY}
              fill="url(#corridorStone)"
              stroke="#5C3208"
              strokeWidth="2"
            />
            <rect x={p.rightX - 15} y={p.topY + 35} width={p.w + 25} height="22" rx="4" fill="#8E5416" stroke="#FFF3B8" strokeWidth="1.2" />
            <rect x={p.rightX + 10} y={(p.topY + p.botY) / 2 - 40} width={p.w - 20} height="80" rx="6" fill="#5C3208" stroke="#FFD54F" strokeWidth="1.2" />
            <rect x={p.rightX - 10} y={p.botY - 55} width={p.w + 20} height="28" rx="4" fill="#8E5416" stroke="#FFF3B8" strokeWidth="1.2" />
          </g>
        ))}

        {/* Volumetric Golden Sunbeams Streaming Through the Pillars */}
        <polygon points="170,120 720,480 720,620 170,320" fill="rgba(255, 244, 184, 0.22)" />
        <polygon points="1270,120 720,480 720,620 1270,320" fill="rgba(255, 244, 184, 0.22)" />
      </svg>
    </div>
  );
}

/**
 * 1C. TWIN SANDSTONE CHHATRIS & PEACOCK BRIDGE PANORAMA
 * Exact match to the `tabmandir` (`rammandir.framer.website`) reference video frames 8–9:
 * Left and right domed Bansi Paharpur sandstone Chhatri pavilions framing a carved jali
 * sandstone bridge over a lush marigold/jasmine temple garden, with twin royal peacocks
 * perched on the bridge balustrade fanning their iridescent tail plumes.
 */
export function AyodhyaPeacockBridgePanorama({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="bridgeSky" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FDF6E4" />
            <stop offset="45%" stopColor="#F5DCB0" />
            <stop offset="100%" stopColor="#3B0813" />
          </linearGradient>
          <linearGradient id="chhatriStone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE6B8" />
            <stop offset="50%" stopColor="#D69448" />
            <stop offset="100%" stopColor="#8A4B16" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#bridgeSky)" />

        {/* Left & Right Carved Sandstone Chhatri Pavilions (Matches `tabmandir` frames 8–9) */}
        {[
          { x: 150, y: 260 },
          { x: 1050, y: 260 },
        ].map((ch, idx) => (
          <g key={idx} transform={`translate(${ch.x}, ${ch.y})`}>
            <line x1="120" y1="0" x2="120" y2="28" stroke="#8A4B16" strokeWidth="3.5" />
            <circle cx="120" cy="18" r="6" fill="#D4AF37" />
            <path d="M25 115 C25 32, 215 32, 215 115 Z" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="2.5" />
            <rect x="10" y="115" width="220" height="14" rx="4" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="2" />
            <rect x="35" y="129" width="18" height="180" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="1.5" />
            <rect x="85" y="129" width="15" height="180" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="1.5" />
            <rect x="140" y="129" width="15" height="180" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="1.5" />
            <rect x="187" y="129" width="18" height="180" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="1.5" />
            <path d="M53 165 Q85 130 120 155 Q155 130 187 165" stroke="#FFF3B8" strokeWidth="2.5" fill="none" />
            <rect x="15" y="309" width="210" height="32" rx="4" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="2" />
          </g>
        ))}

        {/* Arched Sandstone Bridge with Carved Jali Balustrade in Center */}
        <path
          d="M120 650 Q720 510 1320 650 L1320 790 Q720 640 120 790 Z"
          fill="url(#chhatriStone)"
          stroke="#5C2A08"
          strokeWidth="3"
        />
        <path
          d="M180 615 Q720 485 1260 615 L1260 660 Q720 530 180 660 Z"
          fill="#FFF3D6"
          stroke="#8A4B16"
          strokeWidth="2.2"
        />

        {/* Bridge Pillars */}
        <rect x="470" y="610" width="38" height="230" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="2" />
        <rect x="932" y="610" width="38" height="230" fill="url(#chhatriStone)" stroke="#5C2A08" strokeWidth="2" />

        {/* Lush Temple Garden Foliage & Marigold/Rose Blooms Beneath the Bridge */}
        <path d="M0 720 Q360 660 720 710 Q1080 660 1440 720 L1440 900 L0 900 Z" fill="#1F4422" />
        {[180, 260, 340, 440, 540, 640, 740, 840, 940, 1040, 1140, 1240].map((fx, i) => (
          <g key={i}>
            <circle cx={fx} cy={740 + (i % 3) * 22} r="10" fill={i % 2 === 0 ? '#FFA000' : '#EC407A'} />
            <circle cx={fx + 22} cy={765 + (i % 2) * 18} r="8" fill="#FFF59D" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * 2. SACRED LORD GANESHA EMBLEM
 */
export function SacredGaneshaEmblem({ className = 'w-24 h-24' }: { className?: string }) {
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
        <path
          d="M120 176 C112 186, 114 198, 120 202 C126 198, 128 186, 120 176 Z"
          fill="rgba(229,193,88,0.4)"
          strokeWidth="1.8"
        />
        <path
          d="M114 178 C98 182, 92 194, 104 200 C112 198, 116 190, 114 178 Z"
          fill="rgba(229,193,88,0.3)"
          strokeWidth="1.8"
        />
        <path
          d="M126 178 C142 182, 148 194, 136 200 C128 198, 124 190, 126 178 Z"
          fill="rgba(229,193,88,0.3)"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}

/**
 * 3. REALISTIC ROYAL CAPARISONED WHITE ELEPHANT (Transparent PNG with Drop Shadow & Cadence)
 * Uses high-resolution transparent royal white elephant with golden chhatri howdah and maroon velvet jhool.
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
    <div
      className={`relative inline-block select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{
        transform: mirrored ? 'scaleX(-1)' : undefined,
      }}
    >
      <img
        src="/images/royal-elephant.png"
        alt="Royal Caparisoned White Elephant"
        className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] animate-elephant-body"
      />
    </div>
  );
}

/**
 * 3B. VECTOR FALLBACK (ALIAS TO REALISTIC ROYAL CAPARISONED ELEPHANT)
 */
export function RoyalCaparisonedElephantSVG(props: {
  className?: string;
  mirrored?: boolean;
  holdingLotus?: boolean;
}) {
  return <RoyalCaparisonedElephant {...props} />;
}

/**
 * 4. BLOOMING PICHWAI LOTUS CREST
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
        { cx: 48, cy: 152, rot: -65, scale: 0.78 },
        { cx: 372, cy: 152, rot: 65, scale: 0.78 },
      ].map((b, idx) => (
        <g key={idx} transform={`translate(${b.cx}, ${b.cy}) rotate(${b.rot}) scale(${b.scale})`}>
          <path
            d="M0 -16 C-10 -4, -10 10, 0 18 C10 10, 10 -4, 0 -16 Z"
            fill="url(#pinkBud)"
            stroke="url(#crestGold)"
            strokeWidth="1.5"
          />
          <path d="M-8 10 Q0 20 8 10" fill="#556B44" stroke="url(#crestGold)" strokeWidth="1" />
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
          d="M0 36 C-28 24, -44 -8, -28 -36 C-12 -20, -6 4, 0 36 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.4"
        />
        <path
          d="M0 36 C28 24, 44 -8, 28 -36 C12 -20, 6 4, 0 36 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.4"
        />
        <path
          d="M0 -52 C-20 -24, -20 12, 0 36 C20 12, 20 -24, 0 -52 Z"
          fill="url(#crimsonPetal)"
          stroke="url(#crestGold)"
          strokeWidth="2.6"
        />
        <path d="M-32 36 Q0 52 32 36 Q0 42 -32 36 Z" fill="url(#crestGold)" />
        <circle cx="0" cy="44" r="4" fill="#9A1B1F" stroke="url(#crestGold)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * 5. 3D CYLINDRICAL MAROON & GOLD ROYAL SCROLL ROLLER
 */
export function ScrollRoller3D({
  label,
  showBottomOrnament = false,
}: {
  label?: string;
  showBottomOrnament?: boolean;
}) {
  return (
    <div className="relative w-[108%] sm:w-[110%] flex flex-col items-center select-none z-20">
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
          <path d="M60 15 C45 15, 35 25, 30 35" stroke="#6E8658" strokeWidth="1.8" fill="none" />
          <path d="M60 15 C75 15, 85 25, 90 35" stroke="#6E8658" strokeWidth="1.8" fill="none" />
          <circle cx="30" cy="35" r="5" fill="#F48FB1" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="90" cy="35" r="5" fill="#F48FB1" stroke="#D4AF37" strokeWidth="1" />
          <path d="M45 38 C52 50, 68 50, 75 38 C68 56, 52 56, 45 38 Z" fill="#D4AF37" />
          <path d="M60 44 L66 56 L60 66 L54 56 Z" fill="#D4AF37" stroke="#7A5210" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}

/**
 * 6. LOTUS & GOLD ZARI SCROLL DIVIDER
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
      <circle cx="20" cy="38" r="3" fill="#FFF3B8" />
      <circle cx="340" cy="38" r="3" fill="#FFF3B8" />
      <g transform="translate(180, 38)">
        <path d="M0 10 C-22 10, -34 -4, -24 -16 C-14 -10, -6 0, 0 10 Z" fill="#F48FB1" stroke="#FFF3B8" strokeWidth="1.2" />
        <path d="M0 10 C22 10, 34 -4, 24 -16 C14 -10, 6 0, 0 10 Z" fill="#F48FB1" stroke="#FFF3B8" strokeWidth="1.2" />
        <path d="M0 -30 C-10 -14, -10 2, 0 12 C10 2, 10 -14, 0 -30 Z" fill="#FCE4EC" stroke="#FFF3B8" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * 7. HANGING BRASS TEMPLE BELLS & FLORAL TORAN ARCH (Alias to AyodhyaFloralToranArch)
 */
export function HangingTempleBellsToran({ className = 'w-full' }: { className?: string }) {
  return <AyodhyaFloralToranArch className={className} />;
}

/**
 * 8. ANIMATED ROYAL PEACOCK (Fanning Plume & Graceful Neck Bob)
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
      <svg
        viewBox="0 0 180 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
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
          {[
            { cx: 56, cy: 132 },
            { cx: 40, cy: 154 },
            { cx: 28, cy: 174 },
            { cx: 66, cy: 148 },
            { cx: 50, cy: 170 },
          ].map((eye, idx) => (
            <g key={idx}>
              <ellipse cx={eye.cx} cy={eye.cy} rx="6" ry="8" transform={`rotate(30 ${eye.cx} ${eye.cy})`} fill="url(#peacockGold)" />
              <ellipse cx={eye.cx} cy={eye.cy} rx="3.5" ry="5" transform={`rotate(30 ${eye.cx} ${eye.cy})`} fill="#00838F" />
              <circle cx={eye.cx} cy={eye.cy} r="2" fill="#1A237E" />
            </g>
          ))}
        </g>

        <g className="animate-elephant-body">
          <path
            d="M76 96 C76 74, 96 66, 114 78 C118 62, 114 44, 120 32 C126 22, 140 24, 142 34 C144 42, 134 46, 130 56 C126 68, 136 86, 126 102 C114 118, 86 114, 76 96 Z"
            fill="url(#peacockBody)"
            stroke="url(#peacockGold)"
            strokeWidth="2"
          />
          <path
            d="M86 86 C98 82, 114 88, 114 100 C100 106, 86 98, 86 86 Z"
            fill="rgba(212,175,55,0.28)"
            stroke="url(#peacockGold)"
            strokeWidth="1.5"
          />
          <polygon points="142,32 154,36 142,39" fill="url(#peacockGold)" />
          <circle cx="134" cy="33" r="2" fill="#FFFFFF" />
          <line x1="126" y1="24" x2="120" y2="12" stroke="url(#peacockGold)" strokeWidth="1.5" />
          <line x1="130" y1="24" x2="128" y2="10" stroke="url(#peacockGold)" strokeWidth="1.5" />
          <line x1="134" y1="25" x2="136" y2="12" stroke="url(#peacockGold)" strokeWidth="1.5" />
          <circle cx="120" cy="11" r="2" fill="url(#peacockGold)" />
          <circle cx="128" cy="9" r="2" fill="url(#peacockGold)" />
          <circle cx="136" cy="11" r="2" fill="url(#peacockGold)" />
        </g>
        <line x1="104" y1="112" x2="104" y2="132" stroke="url(#peacockGold)" strokeWidth="2" />
        <line x1="114" y1="110" x2="114" y2="132" stroke="url(#peacockGold)" strokeWidth="2" />
      </svg>
    </div>
  );
}

/**
 * 9. SARAYU LOTUS POND, SANDSTONE CHHATRI & ELEPHANT FINALE PANORAMA
 * Matches `tabmandir` (`rammandir.framer.website`) frames 14–18
 */
export function LotusPondFinalePanorama({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="pondWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B2A38" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#102526" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#071214" />
          </linearGradient>
          <linearGradient id="sandstoneDome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5DEB3" />
            <stop offset="50%" stopColor="#D4A359" />
            <stop offset="100%" stopColor="#8C5A2B" />
          </linearGradient>
          <linearGradient id="lotusPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCE4EC" />
            <stop offset="55%" stopColor="#F06292" />
            <stop offset="100%" stopColor="#AD1457" />
          </linearGradient>
        </defs>

        {/* Distant Ayodhya Ram Mandir Silhouette on Horizon */}
        <g opacity="0.58" fill="url(#sandstoneDome)">
          <path d="M460 280 L460 220 L480 180 L500 220 L500 280 Z" />
          <path d="M520 280 L520 190 Q570 110 620 190 L620 280 Z" />
          <path d="M640 280 L640 150 Q720 45 800 150 L800 280 Z" />
          <path d="M820 280 L820 190 Q870 110 920 190 L920 280 Z" />
          <rect x="420" y="275" width="560" height="12" />
        </g>

        {/* Left Bank Carved Sandstone Chhatri Pavilion */}
        <g transform="translate(80, 70)">
          <line x1="130" y1="0" x2="130" y2="25" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="130" cy="18" r="5" fill="#D4AF37" />
          <path d="M50 95 C50 30, 210 30, 210 95 Z" fill="url(#sandstoneDome)" stroke="#D4AF37" strokeWidth="2" />
          <rect x="35" y="95" width="190" height="10" rx="4" fill="url(#sandstoneDome)" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="55" y="105" width="14" height="115" fill="url(#sandstoneDome)" />
          <rect x="95" y="105" width="12" height="115" fill="url(#sandstoneDome)" />
          <rect x="153" y="105" width="12" height="115" fill="url(#sandstoneDome)" />
          <rect x="191" y="105" width="14" height="115" fill="url(#sandstoneDome)" />
          <path d="M69 135 Q100 105 130 125 Q160 105 191 135" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
          <rect x="30" y="220" width="200" height="24" rx="3" fill="url(#sandstoneDome)" stroke="#D4AF37" strokeWidth="1.5" />
        </g>

        {/* Shimmering Lotus Pond Water Surface */}
        <rect x="0" y="285" width="1440" height="235" fill="url(#pondWater)" />

        {/* Animated Golden Water Reflection Ripples */}
        <g stroke="#E5C158" strokeLinecap="round" opacity="0.55" className="animate-pulse">
          <line x1="120" y1="315" x2="310" y2="315" strokeWidth="1.5" strokeDasharray="12 18" />
          <line x1="480" y1="310" x2="940" y2="310" strokeWidth="1.5" strokeDasharray="8 16" />
          <line x1="390" y1="345" x2="1050" y2="345" strokeWidth="1.2" strokeDasharray="16 24" />
          <line x1="220" y1="390" x2="1220" y2="390" strokeWidth="1" strokeDasharray="20 30" />
          <line x1="520" y1="435" x2="920" y2="435" strokeWidth="1.4" strokeDasharray="10 20" />
        </g>

        {/* Bobbing Lily Pads & Floating Blooming Pink Lotuses */}
        {[
          { x: 160, y: 430, scale: 1.25 },
          { x: 350, y: 465, scale: 1.45 },
          { x: 560, y: 410, scale: 0.95 },
          { x: 740, y: 455, scale: 1.15 },
          { x: 960, y: 470, scale: 1.4 },
          { x: 1220, y: 435, scale: 1.2 },
        ].map((lotus, idx) => (
          <g key={idx} transform={`translate(${lotus.x}, ${lotus.y}) scale(${lotus.scale})`} className="animate-lotus-bob">
            <ellipse cx="0" cy="12" rx="46" ry="12" fill="#2E4E32" stroke="#D4AF37" strokeWidth="0.8" />
            <ellipse cx="0" cy="22" rx="28" ry="6" fill="#F48FB1" opacity="0.25" />
            <path d="M0 10 C-28 10, -42 -4, -30 -18 C-16 -10, -8 0, 0 10 Z" fill="url(#lotusPink)" stroke="#FFF3B8" strokeWidth="0.8" />
            <path d="M0 10 C28 10, 42 -4, 30 -18 C16 -10, 8 0, 0 10 Z" fill="url(#lotusPink)" stroke="#FFF3B8" strokeWidth="0.8" />
            <path d="M0 10 C-18 2, -24 -14, -14 -26 C-6 -16, -2 -4, 0 10 Z" fill="#F8BBD0" stroke="#FFF3B8" strokeWidth="0.9" />
            <path d="M0 10 C18 2, 24 -14, 14 -26 C6 -16, 2 -4, 0 10 Z" fill="#F8BBD0" stroke="#FFF3B8" strokeWidth="0.9" />
            <path d="M0 -32 C-10 -16, -10 0, 0 10 C10 0, 10 -16, 0 -32 Z" fill="#FCE4EC" stroke="#FFF3B8" strokeWidth="1" />
            <circle cx="0" cy="-2" r="4" fill="#FFD54F" />
          </g>
        ))}
      </svg>

      {/* Continuously Animated Caparisoned Royal Elephant Wading in Lotus Pond Lifting a Pink Lotus */}
      <div className="absolute bottom-6 right-[4%] sm:right-[8%] md:right-[10%] w-36 sm:w-48 md:w-60 pointer-events-none">
        <RoyalCaparisonedElephant className="w-full h-auto" mirrored={true} holdingLotus={true} />
      </div>
    </div>
  );
}
