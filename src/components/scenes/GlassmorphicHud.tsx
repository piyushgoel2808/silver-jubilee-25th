'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronUp, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface GlassmorphicHudProps {
  currentChapter: string;
  scrollProgress: number;
  onJumpToSection: (sectionId: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

const CHAPTERS = [
  { id: 'scene-1', title: '01 • The Temple Walkthrough' },
  { id: 'scene-2', title: '02 • The Royal Farmaan Scroll' },
  { id: 'scene-3', title: '03 • Date Flipper & Scratch Pass' },
  { id: 'scene-4', title: '04 • 25 Years on a String' },
  { id: 'scene-5', title: '05 • Celebration & Venue' },
  { id: 'scene-8', title: '06 • Lotus Pond & Countdown' },
];

export default function GlassmorphicHud({
  currentChapter,
  scrollProgress,
  onJumpToSection,
  isPlayingMusic,
  onToggleMusic,
}: GlassmorphicHudProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const percent = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md p-4 rounded-2xl royal-glass shadow-2xl border border-gold-metallic/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gold-500/20 mb-3">
              <span className="font-cinzel text-xs text-gold-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                Select Chapter
              </span>
              <button
                onClick={() => setIsOpenMenu(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-white/10"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onJumpToSection(ch.id);
                    setIsOpenMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-serif tracking-wider transition-all flex items-center justify-between ${
                    currentChapter.includes(ch.title.split(' ')[0])
                      ? 'bg-gold-500/20 text-gold-200 border border-gold-500/40 font-bold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{ch.title}</span>
                  <Sparkles className="w-3 h-3 text-gold-400/60" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-3 inset-x-3 sm:inset-x-6 md:max-w-xl md:mx-auto z-40 safe-bottom">
        <div className="relative rounded-full royal-glass px-4 py-2.5 sm:px-6 sm:py-3 shadow-2xl border border-gold-metallic/40 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="flex items-center gap-2 text-left group overflow-hidden max-w-[200px] sm:max-w-[280px]"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse flex-shrink-0" />
            <div className="flex flex-col truncate">
              <span className="text-[9px] uppercase font-sans tracking-widest text-gold-300/80 leading-none">
                Chapter
              </span>
              <span className="font-serif font-bold text-xs sm:text-sm text-gold-100 truncate group-hover:text-gold-300 transition-colors">
                {currentChapter || '01 • The Temple Walkthrough'}
              </span>
            </div>
            <ChevronUp className={`w-3.5 h-3.5 text-gold-400 transition-transform ${isOpenMenu ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-16 sm:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-gold-500/20">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-200 transition-all duration-200"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-xs font-sans text-gold-200 font-semibold min-w-[28px]">
              {percent}%
            </span>
          </div>

          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Mute Music' : 'Play Theme Music'}
            className="p-1.5 sm:p-2 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 transition-all active:scale-95"
          >
            {isPlayingMusic ? (
              <Volume2 className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </footer>
    </>
  );
}
