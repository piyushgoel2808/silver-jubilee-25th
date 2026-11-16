'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT_DETAILS, AYODHYA_VIDEO_CLIPS } from '@/config/mediaAssets';
import {
  AyodhyaRamMandirClipPlayer,
  AyodhyaFloralToranArch,
  GrandTemplePanorama,
  RameswaramPillaredCorridor,
  AyodhyaPeacockBridgePanorama,
  SacredGaneshaEmblem,
  RoyalCaparisonedElephant,
  RoyalPeacock,
} from '@/components/illustrations/RoyalHeritageArt';
import { ChevronDown, MapPin, Sparkles } from 'lucide-react';

/**
 * SCENE 1: 3-Stage Scroll-Unfold Shri Ram Janmabhoomi Mandir, Ayodhya Walkthrough
 * Modeled directly on the `tabmandir` (`rammandir.framer.website`) + `rameswaram` reference videos:
 *
 * Key Fixes:
 * 1. Uses GSAP ScrollTrigger `pin: stageRef.current` + native `sticky top-0 h-[100dvh]` fallback
 *    so it NEVER gets stuck, NEVER produces a black split screen, and NEVER bleeds over downstream chapters in Safari.
 * 2. Dedicated 10-second Ayodhya Ram Mandir AI video clip slots (`clip1HeroExterior`,
 *    `clip2MandapamCorridor`, `clip3PeacockBridge`) backed by 60fps animated Ayodhya Ram Mandir panoramas.
 * 3. Photorealistic caparisoned white elephants walking on a real sandstone processional pathway.
 */
export default function Scene1PalaceHero() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageBgRef = useRef<HTMLDivElement>(null);
  const leftWalkRef = useRef<HTMLDivElement>(null);
  const rightWalkRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: stageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pinSpacing: false,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.34) {
            setActiveStage(1);
          } else if (p < 0.68) {
            setActiveStage(2);
          } else {
            setActiveStage(3);
          }

          // Subtle continuous 3D camera dolly zoom on the active temple vista
          if (stageBgRef.current) {
            const localProgress = (p * 3) % 1;
            const scaleVal = 1 + localProgress * 0.12;
            stageBgRef.current.style.transform = `scale(${scaleVal.toFixed(3)})`;
          }

          // Scroll-linked horizontal walk for the foreground elephants & peacocks
          if (leftWalkRef.current && rightWalkRef.current) {
            const offset = Math.sin(p * Math.PI) * 45;
            leftWalkRef.current.style.transform = `translateX(${offset.toFixed(1)}px)`;
            rightWalkRef.current.style.transform = `translateX(${(-offset).toFixed(1)}px)`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-1"
      ref={containerRef}
      className="relative h-[320dvh] w-full z-10 select-none bg-[#2B050D]"
    >
      {/* Sticky Full-Screen Viewport Stage (`100vw x 100dvh`) with GSAP Pinning */}
      <div
        ref={stageRef}
        className="sticky top-0 left-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#2B050D]"
      >
        {/* =========================================================================
            BACKGROUND MULTI-CLIP AYODHYA RAM MANDIR LAYERS (100vw x 100dvh)
           ========================================================================= */}
        <div
          ref={stageBgRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-0 transition-transform duration-150 ease-out will-change-transform"
        >
          {/* CLIP 1 (0% - 34%): Shri Ram Janmabhoomi Mandir, Ayodhya Grand Exterior Vista */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              activeStage === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <AyodhyaRamMandirClipPlayer
              desktopSrc={AYODHYA_VIDEO_CLIPS.clip1HeroExterior.desktop}
              mobileSrc={AYODHYA_VIDEO_CLIPS.clip1HeroExterior.mobile}
              fallback={<GrandTemplePanorama className="w-full h-full" />}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24030A]/92 via-transparent to-[#24030A]/50 pointer-events-none" />
          </div>

          {/* CLIP 2 (34% - 68%): Ayodhya Koliya / Mandapam Carved Pillared Corridor */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              activeStage === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <AyodhyaRamMandirClipPlayer
              desktopSrc={AYODHYA_VIDEO_CLIPS.clip2MandapamCorridor.desktop}
              mobileSrc={AYODHYA_VIDEO_CLIPS.clip2MandapamCorridor.mobile}
              fallback={<RameswaramPillaredCorridor className="w-full h-full" />}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24030A]/92 via-[#24030A]/30 to-[#24030A]/60 pointer-events-none" />
          </div>

          {/* CLIP 3 (68% - 100%): Twin Sandstone Chhatris & Peacock Bridge (`tabmandir` frames 8-9) */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              activeStage === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <AyodhyaRamMandirClipPlayer
              desktopSrc={AYODHYA_VIDEO_CLIPS.clip3PeacockBridge.desktop}
              mobileSrc={AYODHYA_VIDEO_CLIPS.clip3PeacockBridge.mobile}
              fallback={<AyodhyaPeacockBridgePanorama className="w-full h-full" />}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24030A]/92 via-[#24030A]/25 to-[#24030A]/55 pointer-events-none" />
          </div>
        </div>

        {/* Top Scalloped Floral & Swinging Brass Bells Toran Arch (`tabmandir` frames 2–5) */}
        <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
          <AyodhyaFloralToranArch />
        </div>

        {/* =========================================================================
            STAGE 01: SHRI RAM JANMABHOOMI MANDIR, AYODHYA VISTA & BLESSINGS ARCH
            Matches `tabmandir` (`rammandir.framer.website`) frames 3–7
           ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-between transition-all duration-500 ease-out z-20 ${
            activeStage === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 -translate-y-10 pointer-events-none invisible'
          }`}
        >
          <div className="relative z-20 pt-14 sm:pt-18 text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0714]/90 border border-[#E5C158]/80 backdrop-blur-md shadow-lg text-[#FFF3B8] text-xs sm:text-sm font-serif tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>{EVENT_DETAILS.sacredChant}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            </div>
          </div>

          {/* Center Scalloped Royal Cream-and-Gold Temple Arch Plaque (`tabmandir` frame 7) */}
          <div className="relative z-20 my-auto flex flex-col items-center text-center max-w-2xl mx-4 px-6 sm:px-12 py-7 sm:py-9 rounded-t-[140px] rounded-b-3xl bg-[#FFFDF9]/95 text-[#4A0C19] border-4 border-[#D4AF37] backdrop-blur-md shadow-[0_25px_65px_rgba(0,0,0,0.85)]">
            <div className="absolute inset-2 rounded-t-[130px] rounded-b-2xl border border-[#C5932A]/60 pointer-events-none" />

            <SacredGaneshaEmblem className="w-12 h-12 sm:w-14 sm:h-14 -mt-2 mb-1" />

            <p className="font-serif text-[11px] sm:text-xs font-bold text-[#7C1529] tracking-wide max-w-md">
              {EVENT_DETAILS.ganeshaShloka}
            </p>

            <p className="font-sans text-[9px] sm:text-[11px] tracking-[0.24em] text-[#8A5A10] uppercase font-bold mt-2">
              CELEBRATING 25 GLORIOUS YEARS OF MARRIAGE
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#4A0C19] mt-1 leading-none">
              Navneet <span className="font-handwriting text-3xl sm:text-5xl text-[#8A5A10]">&amp;</span> Ruby
            </h1>

            <p className="font-serif italic text-sm sm:text-lg text-[#5C3B09] mt-2 max-w-lg">
              &ldquo;Married on 25 November 2003 — walking twenty-five sacred years hand in hand with the blessings of Shri Ram.&rdquo;
            </p>

            <div className="mt-4 inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-[#4A0C19] border border-[#D4AF37] text-[#FFF3B8] font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] shadow-md">
              <span>25 • 11 • 2003</span>
              <span className="text-[#E5C158]">✦</span>
              <span>25TH SILVER JUBILEE</span>
            </div>

            <p className="text-[11px] sm:text-xs font-sans font-bold tracking-widest text-[#7C1529] uppercase mt-2.5">
              {EVENT_DETAILS.venue.name} • Kalkaji, New Delhi
            </p>
          </div>

          <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 pb-24 sm:pb-14 text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.16em] text-[#FFF3B8] uppercase">
            <span className="bg-[#2B050D]/90 px-3.5 py-1.5 rounded-full border border-[#E5C158]/70 backdrop-blur-sm shadow-md">
              01 • SHRI RAM MANDIR, AYODHYA
            </span>
            <span className="bg-[#2B050D]/90 px-3.5 py-1.5 rounded-full border border-[#E5C158]/70 backdrop-blur-sm flex items-center gap-1.5 animate-bounce text-[#FFF3B8] shadow-md">
              SCROLL TO ENTER MANDAPAM <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* =========================================================================
            STAGE 02: THE AYODHYA PILLARED MANDAPAM WALKTHROUGH
            Matches Reference Video 3 (`demos.riwaaz.in/rameswaram` frames 4–8)
           ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-between transition-all duration-500 ease-out z-20 ${
            activeStage === 2
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 translate-y-10 pointer-events-none invisible'
          }`}
        >
          <div className="relative z-20 pt-14 sm:pt-18 text-center px-4">
            <span className="text-xs font-cinzel font-bold tracking-[0.25em] text-[#FFF3B8] uppercase bg-[#3D0714]/90 px-4 py-1.5 rounded-full border border-[#E5C158]/75 backdrop-blur-sm shadow-md">
              The 392-Pillar Sacred Mandapam
            </span>
          </div>

          <div className="relative z-20 my-auto flex flex-col items-center text-center max-w-2xl mx-4 px-6 sm:px-10 py-8 sm:py-10 rounded-3xl bg-[#2B050D]/92 border-2 border-[#E5C158]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.92)]">
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.28em] text-[#E5C158] uppercase font-bold">
              SINCE 25 NOVEMBER 2003 • IN THE SACRED QUIET
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFF8E7] mt-3 leading-tight">
              Some journeys <br />
              <span className="italic font-normal gold-text-foil">feel like prayer.</span>
            </h2>

            <p className="font-serif text-sm sm:text-lg text-[#F5E19C] mt-4 max-w-md leading-relaxed">
              With grateful hearts and our elders&apos; blessings, we celebrate twenty-five years of sacred vows, resilience, and family grace.
            </p>
          </div>

          <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 pb-24 sm:pb-14 text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.16em] text-[#FFF3B8] uppercase">
            <span className="bg-[#2B050D]/90 px-3.5 py-1.5 rounded-full border border-[#E5C158]/70 backdrop-blur-sm shadow-md">
              02 • THE SACRED MANDAPAM
            </span>
            <span className="bg-[#2B050D]/90 px-3.5 py-1.5 rounded-full border border-[#E5C158]/70 backdrop-blur-sm flex items-center gap-1.5 animate-bounce text-[#FFF3B8] shadow-md">
              SCROLL TO PEACOCK BRIDGE <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* =========================================================================
            STAGE 03: THE PEACOCK BRIDGE, TWIN CHHATRIS & COUPLE PORTRAIT
            Matches `tabmandir` (`rammandir.framer.website` frames 8–9)
           ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-between transition-all duration-500 ease-out z-20 ${
            activeStage === 3
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 translate-y-10 pointer-events-none invisible'
          }`}
        >
          <div className="relative z-20 pt-14 sm:pt-18 text-center px-4">
            <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#FFF3B8] uppercase bg-[#3D0714]/90 px-4 py-1.5 rounded-full border border-[#E5C158]/75 shadow-md">
              03 • THE PEACOCK BRIDGE &amp; ROYAL JHAROKHA
            </p>
          </div>

          {/* Couple Portrait in Ornate Carved Golden Jharokha */}
          <div className="relative z-20 my-auto flex flex-col items-center text-center max-w-xl mx-auto px-4">
            <div className="relative p-2.5 rounded-t-[130px] rounded-b-2xl bg-gradient-to-b from-[#FFF4B8] via-[#D4AF37] to-[#7A5210] shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-3">
              <div className="relative w-44 h-56 sm:w-56 sm:h-68 rounded-t-[120px] rounded-b-xl overflow-hidden border-2 border-[#3D0713] bg-[#2B050D]">
                <Image
                  src="/fam/DSC4214.jpg"
                  alt="Navneet Goel & Ruby Goel — 25th Silver Jubilee Portrait"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 240px, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24030A] via-transparent to-transparent opacity-65" />
                <div className="absolute bottom-2 inset-x-2 py-1 px-2 rounded-lg bg-[#3D0713]/90 border border-[#E5C158]/60 text-center">
                  <span className="text-[10px] sm:text-xs font-cinzel font-bold text-[#FFF4B8] tracking-wider uppercase">
                    MARRIED 25 NOV 2003 • SILVER JUBILEE
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-[#2B050D]/90 border border-[#E5C158]/75 backdrop-blur-md shadow-xl">
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white gold-text-foil">
                Every ordinary day. With you.
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#F5E19C] mt-1 max-w-md">
                &ldquo;The morning chai. The family laughter. Small moments that became our everything.&rdquo;
              </p>

              <a
                href={EVENT_DETAILS.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A0C19] hover:bg-[#681023] border border-[#E5C158] text-[#FFF4B8] font-cinzel text-xs font-bold tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Golden Dreams Banquets, Kalkaji • 25 November</span>
              </a>
            </div>
          </div>

          {/* Walking Elephants & Peacocks Along the Sandstone Processional Balustrade */}
          <div className="relative z-20 w-full max-w-6xl mx-auto flex items-end justify-between px-3 sm:px-10 pb-20 sm:pb-12">
            <div ref={leftWalkRef} className="flex items-end gap-1 sm:gap-3 transition-transform duration-150">
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={false} />
              <RoyalPeacock className="w-16 sm:w-24 h-auto mb-2" mirrored={false} />
            </div>

            <div className="text-center pb-2">
              <span className="text-[9px] sm:text-xs font-cinzel font-bold text-[#FFF3B8] uppercase tracking-widest bg-[#2B050D]/90 px-3.5 py-1.5 rounded-full border border-[#E5C158]/70 shadow-md">
                SCROLL FOR ROYAL FARMAAN ↓
              </span>
            </div>

            <div ref={rightWalkRef} className="flex items-end gap-1 sm:gap-3 transition-transform duration-150">
              <RoyalPeacock className="w-16 sm:w-24 h-auto mb-2" mirrored={true} />
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
