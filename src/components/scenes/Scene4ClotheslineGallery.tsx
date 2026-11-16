'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLOTHESLINE_MEMORIES } from '@/config/mediaAssets';
import HostVaultModal from '@/components/modals/HostVaultModal';
import { LotusScrollDivider } from '@/components/illustrations/RoyalHeritageArt';
import { Sparkles, ChevronLeft, ChevronRight, FolderLock } from 'lucide-react';

/**
 * SCENE 4: "25 Years on a String": Horizontal Clothesline Memory Gallery + Host Vault
 * Directly modeled on Reference Video 1 (`itsbalcony.com` frames 13–20):
 * - Cream floral Pichwai damask wall with arched palace fountain vignette at top
 * - Taut crimson-and-gold silk cord across the viewport
 * - Triangular wire hangers + clips holding maroon-and-gold museum frames
 * - Alternating the 4 curated couple photos with 3 poetic parchment story notes
 * - GSAP ScrollTrigger horizontal glide + manual navigation controls
 */
export default function Scene4ClotheslineGallery() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (trackRef.current && sectionRef.current && window.innerWidth >= 768) {
        const totalScrollWidth = trackRef.current.scrollWidth - window.innerWidth + 120;
        if (totalScrollWidth > 0) {
          gsap.fromTo(
            trackRef.current,
            { x: 40 },
            {
              x: -Math.min(totalScrollWidth, 680),
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                end: 'bottom 25%',
                scrub: 1,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTrack = (dir: 'left' | 'right') => {
    const container = document.getElementById('clothesline-scroll-viewport');
    if (container) {
      container.scrollBy({
        left: dir === 'left' ? -360 : 360,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="scene-4"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-20 overflow-hidden z-10 bg-damask-cream text-[#4A0C19]"
    >
      {/* Top Ornamental Lotus Divider (Matches Video 1 frame 13) */}
      <div className="flex flex-col items-center px-4 mb-8 z-10 max-w-2xl mx-auto text-center">
        <LotusScrollDivider className="w-64 sm:w-80 h-14 mb-2" />
        <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.26em] text-[#8A5A10] uppercase">
          CHAPTER 04 • 25 YEARS ON A STRING
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#4A0C19] mt-1">
          Our Silver Jubilee Storyline
        </h2>
        <p className="font-serif italic text-[#6E4B0C] text-sm sm:text-base mt-1">
          Four cherished couple milestones &amp; love notes suspended along our 25-year journey
        </p>
      </div>

      {/* =========================================================================
          TAUT CRIMSON & GOLD SILK CORD + SWAYING MAROON MUSEUM FRAMES
          (Exact visual match to Reference Video 1 frames 14–19)
         ========================================================================= */}
      <div className="relative w-full my-2">
        {/* Continuous Taut Crimson-Maroon & Gold Silk Cord Across Viewport */}
        <div
          className="absolute top-[22px] inset-x-0 h-[5px] z-10 shadow-md"
          style={{
            background: 'linear-gradient(180deg, #D4AF37 0%, #7C1529 50%, #3D0713 100%)',
          }}
        />

        {/* Scrollable Viewport */}
        <div
          id="clothesline-scroll-viewport"
          className="w-full overflow-x-auto no-scrollbar py-4 px-6 sm:px-14"
        >
          <div
            ref={trackRef}
            className="flex items-start gap-7 sm:gap-10 w-max mx-auto"
          >
            {CLOTHESLINE_MEMORIES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex-shrink-0 flex flex-col items-center ${
                    isEven ? 'animate-sway-1' : 'animate-sway-2'
                  }`}
                >
                  {/* TRIANGULAR WIRE HANGER & GOLD RING PIN ON CORD (Matches Video 1 frame 15) */}
                  <svg viewBox="0 0 120 48" className="w-28 h-12 -mb-1 z-20 pointer-events-none">
                    {/* Gold Ring on Rope */}
                    <circle
                      cx="60"
                      cy="6"
                      r="5"
                      fill="#FFF3B8"
                      stroke="#7C1529"
                      strokeWidth="2"
                    />
                    {/* Left & Right Triangular Hanging Wires */}
                    <line
                      x1="60"
                      y1="10"
                      x2="18"
                      y2="46"
                      stroke="#7C1529"
                      strokeWidth="1.6"
                    />
                    <line
                      x1="60"
                      y1="10"
                      x2="102"
                      y2="46"
                      stroke="#7C1529"
                      strokeWidth="1.6"
                    />
                  </svg>

                  {/* EITHER POETIC STORY NOTE CARD OR FRAMED COUPLE PHOTOGRAPH (Matches Video 1 frames 14–19) */}
                  {item.isNoteCard ? (
                    <div
                      className="relative w-[240px] sm:w-[270px] h-[320px] sm:h-[350px] p-3 rounded-sm shadow-[0_18px_38px_rgba(42,5,13,0.32)] flex flex-col"
                      style={{
                        background:
                          'linear-gradient(145deg, #6E1125 0%, #4A0C19 50%, #330610 100%)',
                        border: '2px solid #C5932A',
                      }}
                    >
                      {/* Inner Cream Museum Mat */}
                      <div className="w-full h-full bg-[#FBF8F1] border border-[#C5932A]/60 p-6 flex flex-col items-center justify-center text-center shadow-inner">
                        <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[#8A5A10] uppercase mb-3">
                          {item.dateStr}
                        </span>
                        <p className="font-serif italic text-base sm:text-lg text-[#4A0C19] leading-relaxed">
                          &ldquo;{item.noteQuote}&rdquo;
                        </p>
                        <div className="w-12 h-[1px] bg-[#C5932A] my-4" />
                        <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] text-[#6E1125] uppercase">
                          {item.noteSub}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative w-[270px] sm:w-[310px] p-3 rounded-sm shadow-[0_18px_38px_rgba(42,5,13,0.35)] transition-transform duration-300 hover:scale-[1.03]"
                      style={{
                        background:
                          'linear-gradient(145deg, #6E1125 0%, #4A0C19 50%, #330610 100%)',
                        border: '2px solid #C5932A',
                      }}
                    >
                      {/* Inner White Polaroid Mat */}
                      <div className="bg-[#FFFDF9] p-3 pb-4 border border-[#C5932A]/50 shadow-inner">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2A050D]">
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 270px, 310px"
                          />
                          <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#4A0C19]/90 border border-[#E5C158] text-[10px] font-cinzel font-bold text-[#FFF3B8]">
                            {item.year}
                          </div>
                        </div>

                        {/* Polaroid Hashtag & Title Below Photo (Matches Video 1 `#howitstarted`, `#adventures`) */}
                        <div className="pt-3 text-center">
                          <p className="font-serif italic text-sm sm:text-base text-[#6E1125] font-semibold">
                            {item.hashtag || `#${item.year}`}
                          </p>
                          <h3 className="font-serif font-bold text-base text-[#3D0713] mt-0.5">
                            {item.title}
                          </h3>
                          <p className="text-xs font-serif text-[#6E4B0C] mt-1 line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Left / Right Scroll Controls */}
        <button
          onClick={() => scrollTrack('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#4A0C19] text-[#FFF3B8] shadow-xl border-2 border-[#D4AF37] items-center justify-center hover:scale-110 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollTrack('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#4A0C19] text-[#FFF3B8] shadow-xl border-2 border-[#D4AF37] items-center justify-center hover:scale-110 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Open Full Curated Couple Vault Button */}
      <div className="text-center mt-8 z-10 px-4">
        <button
          onClick={() => setIsVaultOpen(true)}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#4A0C19] text-[#FFF3B8] border-2 border-[#D4AF37] font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-royal hover:bg-[#631022] hover:scale-105 active:scale-95 transition-all"
        >
          <FolderLock className="w-4 h-4 text-[#E5C158]" />
          <span>Open Curated Couple Photo Vault</span>
          <Sparkles className="w-4 h-4 text-[#E5C158]" />
        </button>
      </div>

      <HostVaultModal isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
    </section>
  );
}
