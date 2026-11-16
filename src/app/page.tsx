'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PrologueEnvelope from '@/components/scenes/PrologueEnvelope';
import Scene1PalaceHero from '@/components/scenes/Scene1PalaceHero';
import Scene2RoyalScroll from '@/components/scenes/Scene2RoyalScroll';
import Scene3MechanicalDateFlipper from '@/components/scenes/Scene3MechanicalDateFlipper';
import Scene4ClotheslineGallery from '@/components/scenes/Scene4ClotheslineGallery';
import Scene5ItineraryPeacockArches from '@/components/scenes/Scene5ItineraryPeacockArches';
import Scene8PalaceFinaleCountdown from '@/components/scenes/Scene8PalaceFinaleCountdown';
import GlassmorphicHud from '@/components/scenes/GlassmorphicHud';
import FloatingControls from '@/components/scenes/FloatingControls';
import { soundController } from '@/lib/soundController';

const ThreeBackground = dynamic(() => import('@/components/canvas/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState('01 • The Temple Walkthrough');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
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

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }

      const scenes = [
        { id: 'scene-1', title: '01 • The Temple Walkthrough' },
        { id: 'scene-2', title: '02 • The Royal Farmaan' },
        { id: 'scene-3', title: '03 • Save the Date' },
        { id: 'scene-4', title: '04 • 25 Years on a String' },
        { id: 'scene-5', title: '05 • Celebration & Venue' },
        { id: 'scene-8', title: '06 • The Grand Countdown' },
      ];

      for (let i = scenes.length - 1; i >= 0; i--) {
        const el = document.getElementById(scenes[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentChapter(scenes[i].title);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, [isInvitationOpened]);

  useEffect(() => {
    if (soundController) {
      const unsub = soundController.subscribe((playing: boolean) => {
        setIsPlayingMusic(playing);
      });
      setIsPlayingMusic(soundController.isPlaying());
      return () => unsub();
    }
  }, []);

  const jumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleToggleMusic = () => {
    if (soundController) {
      const state = soundController.toggle();
      setIsPlayingMusic(state);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#160307] text-slate-100 overflow-x-clip">
      {/* 0. Prologue: Full-Screen Temple Vista + 3D Wax-Seal Royal Envelope */}
      <PrologueEnvelope onOpen={() => setIsInvitationOpened(true)} />

      {/* Main Scrollytelling World Revealed After Envelope Break */}
      {isInvitationOpened && (
        <>
          {/* Background WebGL 3D Sky Lanterns and Twinkling Starfield */}
          <ThreeBackground scrollProgress={scrollProgress} />

          {/* Persistent Floating Audio & Top Controls */}
          <FloatingControls />

          {/* Interactive Narrative Flow (With Wishes Tab & Chapter 7 Removed per Request) */}
          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Chapter 1: 3-Stage Scroll-Unfold Temple Gopuram & Pillared Mandapam Walkthrough */}
            <Scene1PalaceHero />

            {/* Chapter 2: Unrolling Royal Velvet & Silver-Gold Scroll */}
            <Scene2RoyalScroll />

            {/* Chapter 3: Walking Elephants, Mechanical Date Flipper & Gold-Foil Scratch Card */}
            <Scene3MechanicalDateFlipper />

            {/* Chapter 4: "25 Years on a String" Horizontal Clothesline Gallery */}
            <Scene4ClotheslineGallery />

            {/* Chapter 5: Scroll-Driven Vintage Car & Peacock Scalloped Itinerary Arches */}
            <Scene5ItineraryPeacockArches />

            {/* Chapter 6: Lotus-Pond Palace, Animated Elephant & Live Countdown Finale */}
            <Scene8PalaceFinaleCountdown />
          </div>

          {/* Bottom Glassmorphic HUD Bar */}
          <GlassmorphicHud
            currentChapter={currentChapter}
            scrollProgress={scrollProgress}
            onJumpToSection={jumpToSection}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={handleToggleMusic}
          />
        </>
      )}
    </main>
  );
}
