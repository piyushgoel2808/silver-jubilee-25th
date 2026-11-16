'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT_DETAILS } from '@/config/mediaAssets';
import {
  ScrollRoller3D,
  LotusScrollDivider,
  SacredGaneshaEmblem,
} from '@/components/illustrations/RoyalHeritageArt';

/**
 * SCENE 2: Unrolling Royal Velvet & Silver-Gold Scroll
 * Directly modeled on Reference Video 1 (`itsbalcony.com` frames 6–11 & 23–26):
 * Warm ivory-sandstone parchment backdrop where two 3D cylindrical maroon-and-gold
 * rollers physically unroll vertically via GSAP ScrollTrigger as the guest scrolls.
 */
export default function Scene2RoyalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (scrollBodyRef.current && scrollContentRef.current && sectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'center center',
            scrub: 0.8,
          },
        });

        tl.fromTo(
          scrollBodyRef.current,
          { maxHeight: 16, opacity: 0.75 },
          { maxHeight: 920, opacity: 1, ease: 'power2.out' }
        ).fromTo(
          scrollContentRef.current,
          { opacity: 0, y: -24 },
          { opacity: 1, y: 0, ease: 'power1.out' },
          0.15
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-2"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 z-10 bg-heritage-parchment text-[#4A0C19] overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-4 zari-patti-horizontal border-b border-[#C5932A]/40" />
      <div className="absolute bottom-0 inset-x-0 h-4 zari-patti-horizontal border-t border-[#C5932A]/40" />

      <div className="text-center mb-8 max-w-xl mx-auto">
        <p className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#8A5A10] uppercase">
          CHAPTER 02 • THE ROYAL FARMAAN
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A0C19] mt-1">
          A Quarter Century of Sacred Blessings
        </h2>
      </div>

      <div className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[640px] lg:max-w-[700px] flex flex-col items-center fold-stage-center">
        <ScrollRoller3D label="॥ श्री राम जय राम जय जय राम ॥" />

        <div
          ref={scrollBodyRef}
          className="relative w-full overflow-hidden bg-damask-maroon shadow-[0_25px_55px_rgba(42,5,13,0.65)] border-x-4 border-[#D4AF37]"
          style={{ maxHeight: '920px' }}
        >
          <div className="absolute inset-y-0 left-1.5 sm:left-2.5 w-3 sm:w-4 zari-patti-vertical opacity-90 pointer-events-none" />
          <div className="absolute inset-y-0 right-1.5 sm:right-2.5 w-3 sm:w-4 zari-patti-vertical opacity-90 pointer-events-none" />

          <div className="absolute inset-y-3 left-6 right-6 sm:left-8 sm:right-8 border border-[#E5C158]/60 pointer-events-none" />

          <div
            ref={scrollContentRef}
            className="relative z-10 px-8 sm:px-14 md:px-16 py-10 sm:py-14 text-center text-[#FFF8E7]"
          >
            <div className="flex flex-col items-center mb-4">
              <SacredGaneshaEmblem className="w-16 h-16 sm:w-20 sm:h-20 -mb-2" />
              <p className="font-serif text-sm sm:text-base font-bold text-[#FFF3B8] tracking-[0.2em] uppercase">
                {EVENT_DETAILS.sacredChant}
              </p>
            </div>

            <p className="text-xs sm:text-sm font-serif italic text-[#F5E19C] leading-relaxed max-w-md mx-auto">
              &ldquo;{EVENT_DETAILS.invitationLead}, we rejoice in celebrating twenty-five glorious years of love, devotion, and togetherness.&rdquo;
            </p>

            <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.22em] text-[#E5C158] font-semibold mt-5">
              {EVENT_DETAILS.hostsLead}
            </p>

            <div className="my-4">
              <h3 className="font-serif text-3xl sm:text-5xl font-bold gold-text-foil tracking-wide">
                Navneet Goel
              </h3>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#FFF3B8] my-0.5">
                &amp;
              </p>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold gold-text-foil tracking-wide">
                Ruby Goel
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-serif text-[#FCEFD2]/90 max-w-lg mx-auto leading-relaxed">
              Married on <span className="text-[#FFF3B8] font-semibold">25 November 2003</span>, as they complete 25 glorious years of their sacred journey, we cordially request the honour of your presence and blessings at the Silver Jubilee celebration.
            </p>

            <div className="my-6 py-3.5 px-5 rounded-xl bg-[#2B040C]/85 border border-[#E5C158]/60 max-w-md mx-auto shadow-inner">
              <p className="font-cinzel text-xs sm:text-sm font-bold text-[#FFF3B8] uppercase tracking-[0.16em]">
                25 November • {EVENT_DETAILS.celebrationTimeDisplay}
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-[#E5C158] mt-1">
                {EVENT_DETAILS.venue.name}
              </p>
              <p className="font-sans text-[10px] sm:text-xs text-[#F5E19C]/85 mt-0.5">
                {EVENT_DETAILS.venue.addressLine1}, {EVENT_DETAILS.venue.area}, {EVENT_DETAILS.venue.city}
              </p>
            </div>

            <div className="pt-2">
              <p className="font-serif text-sm sm:text-base font-bold text-[#FFF3B8] tracking-wide">
                With Best Compliments &amp; Warm Regards From:
              </p>
              <div className="mt-1.5 space-y-0.5 text-xs sm:text-sm font-serif text-[#FCEFD2]">
                {EVENT_DETAILS.complimentsFrom.map((line, idx) => (
                  <p key={idx} className="font-semibold">
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-[11px] font-sans text-[#E5C158] mt-2 tracking-wider">
                RSVP: {EVENT_DETAILS.rsvp.phoneDisplay}
              </p>
            </div>

            <div className="mt-4 flex justify-center">
              <LotusScrollDivider className="w-60 sm:w-72 h-14" />
            </div>
          </div>
        </div>

        <ScrollRoller3D
          label="MARRIED 25 • 11 • 2003 — 25TH SILVER JUBILEE"
          showBottomOrnament={true}
        />
      </div>
    </section>
  );
}
