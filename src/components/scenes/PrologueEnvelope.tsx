'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_DETAILS, AYODHYA_VIDEO_CLIPS } from '@/config/mediaAssets';
import { soundController } from '@/lib/soundController';
import {
  AyodhyaRamMandirClipPlayer,
  AyodhyaFloralToranArch,
  GrandTemplePanorama,
  SacredGaneshaEmblem,
  RoyalCaparisonedElephant,
  RoyalPeacock,
} from '@/components/illustrations/RoyalHeritageArt';
import { Sparkles, Heart } from 'lucide-react';

interface PrologueEnvelopeProps {
  onOpen: () => void;
  guestNameParam?: string;
}

/**
 * PROLOGUE (FIRST PAGE):
 * Full-Bleed Shri Ram Janmabhoomi Mandir, Ayodhya (UP, India) Vista & Video Backdrop
 * modeled on the `tabmandir` (`rammandir.framer.website`) reference video:
 * - Top Scalloped Floral & 8 Swinging Brass Temple Bells Toran Arch
 * - Towering Pink Bansi Paharpur Sandstone Nagara Shikhara with fluttering Saffron Dhwaja & flying birds
 * - Sacred Ganesha Emblem + 3D Royal Velvet `#NR25` Wax-Sealed Envelope
 * - Articulated walking caparisoned elephants & fanning peacocks in the foreground courtyard
 */
export default function PrologueEnvelope({ onOpen, guestNameParam }: PrologueEnvelopeProps) {
  const [guestName, setGuestName] = useState<string>('Dear Family & Friends');
  const [stage, setStage] = useState<'sealed' | 'opening-envelope' | 'entering-temple' | 'done'>('sealed');

  useEffect(() => {
    if (guestNameParam && guestNameParam.trim() !== '') {
      setGuestName(guestNameParam.replace(/\+/g, ' '));
    } else if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam && toParam.trim() !== '') {
        setGuestName(toParam.replace(/\+/g, ' '));
      }
    }
  }, [guestNameParam]);

  const triggerOpen = () => {
    if (stage !== 'sealed') return;
    setStage('opening-envelope');

    if (soundController) {
      soundController.playWaxSealCrack();
      soundController.playTasselBell();
      setTimeout(() => {
        soundController.startMusic();
      }, 250);
    }

    const defaults = {
      origin: { y: 0.58 },
      colors: ['#FFF4B8', '#D4AF37', '#FF9800', '#FCE4EC', '#FFFFFF'],
    };

    confetti({
      ...defaults,
      particleCount: 110,
      spread: 80,
      startVelocity: 45,
    });
    confetti({
      ...defaults,
      particleCount: 70,
      spread: 120,
      startVelocity: 55,
      decay: 0.92,
    });

    setTimeout(() => {
      setStage('entering-temple');
    }, 1300);

    setTimeout(() => {
      setStage('done');
      onOpen();
    }, 2350);
  };

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none bg-[#2B050D]"
        >
          {/* =========================================================================
              1. FULL-BLEED SHRI RAM JANMABHOOMI MANDIR, AYODHYA VISTA + 10s AI VIDEO SLOT
                 (100vw x 100dvh, Responsive on both Mobile 9:16 and Laptop 16:9)
             ========================================================================= */}
          <motion.div
            animate={
              stage === 'entering-temple'
                ? { scale: 2.35, y: 50, opacity: 0.2 }
                : stage === 'opening-envelope'
                ? { scale: 1.08, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          >
            <AyodhyaRamMandirClipPlayer
              desktopSrc={AYODHYA_VIDEO_CLIPS.clip1HeroExterior.desktop}
              mobileSrc={AYODHYA_VIDEO_CLIPS.clip1HeroExterior.mobile}
              fallback={<GrandTemplePanorama className="w-full h-full" />}
            />
            {/* Warm Golden Temple Sunlight & Subtle Bottom Vignette for Readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(43,5,13,0.38) 0%, rgba(43,5,13,0.12) 45%, rgba(43,5,13,0.82) 100%)',
              }}
            />
          </motion.div>

          {/* =========================================================================
              2. TOP SCALLOPED FLORAL & HANGING BRASS BELLS TORAN ARCH (`tabmandir`)
             ========================================================================= */}
          <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
            <AyodhyaFloralToranArch />
          </div>

          {/* =========================================================================
              3. SACRED OPENING: OM SHREE GANESHAYA NAMAH & GUEST DEDICATION
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative z-20 text-center pt-12 sm:pt-14 px-4"
          >
            <div className="mx-auto flex items-center justify-center mb-1">
              <SacredGaneshaEmblem className="w-14 h-14 sm:w-18 sm:h-18 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3D0714]/85 border border-[#E5C158]/80 backdrop-blur-md shadow-md">
              <p className="font-serif text-xs sm:text-sm font-bold tracking-[0.22em] text-[#FFF3B8] uppercase">
                {EVENT_DETAILS.sacredChant}
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center px-6 py-2 rounded-2xl bg-[#3D0714]/88 border-2 border-[#E5C158]/85 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.22em] text-[#FFF3B8] font-semibold">
                With Shri Ram &amp; Bappa&apos;s Blessings • Specially Crafted For
              </span>
              <h1 className="font-cinzel text-lg sm:text-2xl font-black text-white gold-text-foil tracking-wide uppercase mt-0.5">
                {guestName}
              </h1>
            </div>
          </motion.div>

          {/* =========================================================================
              4. 3D ROYAL VELVET WAX-SEAL ENVELOPE STAGE
             ========================================================================= */}
          <div className="relative z-20 my-auto w-full max-w-[335px] sm:max-w-[420px] md:max-w-[450px] h-[220px] sm:h-[260px] perspective-envelope px-3">
            <div className="relative w-full h-full rounded-2xl shadow-[0_25px_65px_rgba(0,0,0,0.88)] bg-gradient-to-br from-[#681023] via-[#4A0C19] to-[#2D060F] border-2 border-[#E5C158]/90 overflow-visible">
              <div className="absolute inset-2 rounded-xl bg-damask-maroon opacity-40 pointer-events-none" />

              <div className="absolute top-2 left-2 text-[#E5C158] text-xs">✦</div>
              <div className="absolute top-2 right-2 text-[#E5C158] text-xs">✦</div>
              <div className="absolute bottom-2 left-2 text-[#E5C158] text-xs">✦</div>
              <div className="absolute bottom-2 right-2 text-[#E5C158] text-xs">✦</div>

              {/* RISING SHIMMERING GOLD INVITATION CARD INSIDE */}
              <motion.div
                initial={false}
                animate={
                  stage === 'opening-envelope' || stage === 'entering-temple'
                    ? { y: -125, opacity: 1, scale: 1.03 }
                    : { y: 0, opacity: 0.9 }
                }
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-xl text-[#3D0713] p-4 flex flex-col items-center justify-center text-center z-10 border border-[#D4AF37] shadow-xl"
                style={{
                  background:
                    'linear-gradient(145deg, #FFFDF9 0%, #F9F1DC 55%, #EDDCB2 100%)',
                }}
              >
                <span className="text-[10px] font-serif italic text-[#6E4B0C]">
                  {EVENT_DETAILS.invitationLead}
                </span>
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#4A0C19] mt-0.5 tracking-wider uppercase">
                  25TH SILVER JUBILEE (married 25 Nov 2003)
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#681023] my-0.5 gold-text-foil">
                  Navneet &amp; Ruby Goel
                </h2>
                <div className="w-16 h-[1.5px] bg-[#C5932A] my-1" />
                <p className="font-sans text-[10px] sm:text-xs text-[#4A0C19] font-bold tracking-wider uppercase">
                  25 November • <span className="text-[#8A5A10] font-semibold">{EVENT_DETAILS.venue.name}</span>, Kalkaji
                </p>
              </motion.div>

              {/* ENVELOPE TRIANGLES */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 55%, 100% 100%)',
                  background: 'linear-gradient(180deg, #681023 0%, #3D0713 100%)',
                  borderBottom: '2px solid rgba(229, 193, 88, 0.65)',
                }}
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 50% 55%, 0% 100%)',
                  background: 'linear-gradient(90deg, #580C1C 0%, #3D0713 100%)',
                }}
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0%, 50% 55%, 100% 100%)',
                  background: 'linear-gradient(270deg, #580C1C 0%, #3D0713 100%)',
                }}
              />

              {/* TOP FLAP */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={
                  stage === 'opening-envelope' || stage === 'entering-temple'
                    ? { rotateX: 180, zIndex: 0 }
                    : { rotateX: 0, zIndex: 25 }
                }
                transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: 'top center',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 60%)',
                  background: 'linear-gradient(180deg, #8A152B 0%, #580C1C 100%)',
                  borderTop: '2px solid #E5C158',
                }}
                className="absolute inset-0 transform-style-3d cursor-pointer shadow-md"
                onClick={triggerOpen}
              />

              {/* 3D EMBOSSED METALLIC #NR25 WAX SEAL */}
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                animate={
                  stage === 'opening-envelope' || stage === 'entering-temple'
                    ? { scale: [1, 1.35, 0], opacity: [1, 1, 0], rotate: 45 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.55 }}
                onClick={triggerOpen}
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.85)]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF3B8] via-[#C5932A] to-[#6E4B0C] p-[3px] shadow-[0_0_25px_rgba(229,193,88,0.7)] animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#8A5A10] via-[#D4AF37] to-[#FFF4C2] flex flex-col items-center justify-center border border-[#FFF3B8]">
                    <span className="text-[8px] sm:text-[9px] font-serif font-black tracking-widest text-[#2D060F] uppercase">
                      25 YEARS
                    </span>
                    <span className="font-cinzel text-base sm:text-lg font-black text-[#2D060F] leading-none">
                      #NR25
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-sans font-bold text-[#3D0713] tracking-wider">
                      25 NOV 2003
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* =========================================================================
              5. BOTTOM COURTYARD WITH WALKING ELEPHANTS, PEACOCKS & OPEN CTA
             ========================================================================= */}
          <div className="relative z-20 w-full max-w-6xl mx-auto flex items-end justify-between px-3 sm:px-10 pb-5 sm:pb-7">
            <div className="flex items-end gap-1 sm:gap-2">
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={false} />
              <RoyalPeacock className="hidden md:block w-16 h-20 mb-2" mirrored={false} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col items-center cursor-pointer mb-2"
              onClick={triggerOpen}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerOpen();
                }}
                className="group relative inline-flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#FFF3B8] via-[#E5C158] to-[#C5932A] text-[#2D060F] font-cinzel font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(229,193,88,0.75)] hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#2D060F] group-hover:rotate-45 transition-transform" />
                <span>ENTER SHRI RAM MANDIR STORY</span>
                <Heart className="w-4 h-4 fill-[#2D060F] text-[#2D060F]" />
              </button>
              <span className="text-[#FFF3B8] text-[10px] sm:text-[11px] font-sans mt-1.5 tracking-widest uppercase bg-black/65 px-3 py-0.5 rounded-full border border-[#E5C158]/40 backdrop-blur-sm">
                Tap the #NR25 wax seal to step inside Ayodhya Dham
              </span>
            </motion.div>

            <div className="flex items-end gap-1 sm:gap-2">
              <RoyalPeacock className="hidden md:block w-16 h-20 mb-2" mirrored={true} />
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={true} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
