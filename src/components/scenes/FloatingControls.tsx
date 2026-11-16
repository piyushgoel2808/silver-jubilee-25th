'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { soundController } from '@/lib/soundController';

export default function FloatingControls() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    if (soundController) {
      const unsubscribe = soundController.subscribe((playing: boolean) => {
        setIsPlaying(playing);
      });
      setIsPlaying(soundController.isPlaying());
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    if (soundController) {
      const state = soundController.toggle();
      setIsPlaying(state);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-3 select-none">
      {/* Spinning Golden Vinyl Audio Player */}
      <button
        onClick={handleToggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Theme Music'}
        className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full royal-glass border border-gold-400/50 shadow-gold-glow hover:scale-105 transition-transform"
      >
        <div
          className={`relative w-9 h-9 rounded-full bg-gradient-to-tr from-black via-zinc-900 to-black border-2 border-gold-400 shadow-md flex items-center justify-center ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <div className="w-6 h-6 rounded-full border border-gold-500/30 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-gold-400 border border-gold-200 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-black" />
            </div>
          </div>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[9px] font-cinzel font-bold text-gold-300 tracking-wider uppercase">
            {isPlaying ? 'Playing' : 'Music'}
          </span>
          <span className="text-[8px] font-sans text-slate-300">
            {isPlaying ? 'Silver Theme' : 'Tap to Play'}
          </span>
        </div>
      </button>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          title="Return to Top"
          className="p-2.5 rounded-full royal-glass border border-gold-400/40 text-gold-300 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
