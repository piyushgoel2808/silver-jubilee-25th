// Navneet & Ruby Goel 25th Silver Jubilee - 25 Nov 2003 to 25 Nov 2028
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PrologueEnvelope from '@/components/scenes/PrologueEnvelope';
import Scene1PalaceHero from '@/components/scenes/Scene1PalaceHero';
import Scene8PalaceFinaleCountdown from '@/components/scenes/Scene8PalaceFinaleCountdown';
import FloatingControls from '@/components/scenes/FloatingControls';

/**
 * UNIFIED 25TH SILVER JUBILEE INVITATION PAGE:
 * - Prologue: Full-screen Ayodhya Ram Mandir Morning Sun (`ram-mandir-morning-sun.mp4`) + 3D `#NR25` Wax-Seal Envelope
 * - Main World (`Scene1PalaceHero`): Unified 4-stage temple video journey (`clip1-4.mp4`) where
 *   the Blessing Title, Unrolling Royal Farmaan Scroll, Date Flipper (`2001 -> 2026`),
 *   Gold Scratch Card, 4 Couple Photos, and Golden Dreams Banquets (7:00 PM) Venue & RSVP
 *   scroll directly over the moving temple video!
 * - Finale (`Scene8PalaceFinaleCountdown`): Sarayu Lotus Pond & Royal Elephant (`clip5.mp4`)
 *   with floating borderless countdown timer in the sunrise sky.
 * - Progress Bar (`GlassmorphicHud`) removed per user request.
 */
export default function Home() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isInvitationOpened) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isInvitationOpened]);

  return (
    <main className="relative min-h-screen w-full bg-[#1B0906] text-slate-100">
      {/* 0. Prologue: Full-Screen Ayodhya Ram Mandir Video + 3D Wax-Seal Royal Envelope */}
      <PrologueEnvelope onOpen={() => setIsInvitationOpened(true)} />

      {/* Unified Scrollytelling Invitation World (Progress Bar Removed) */}
      {isInvitationOpened && (
        <>
          <FloatingControls />

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Unified 4-Stage Ayodhya Ram Mandir Video + Scroll + Date Flipper + Memories + Venue */}
            <Scene1PalaceHero />

            {/* Finale: Lotus Pond & Royal Elephant Video (`clip5.mp4`) + Floating Sky Countdown */}
            <Scene8PalaceFinaleCountdown />
          </div>
        </>
      )}
    </main>
  );
}
