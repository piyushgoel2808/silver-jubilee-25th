'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_DETAILS, AYODHYA_VIDEO_CLIPS } from '@/config/mediaAssets';
import { soundController } from '@/lib/soundController';
import {
  AyodhyaRamMandirClipPlayer,
  SacredGaneshaEmblem,
} from '@/components/illustrations/RoyalHeritageArt';
import { Sparkles, Heart } from 'lucide-react';

interface PrologueEnvelopeProps {
  onOpen: () => void;
  guestNameParam?: string;
}

/**
 * PROLOGUE (FIRST PAGE):
 * Clean, Unbroken Full-Screen Ayodhya Ram Mandir Morning Sun Video (`ram-mandir-morning-sun.mp4`)
 * with Floating Editorial Blessing Typography & 3D `#NR25` Wax-Sealed Royal Envelope (`2001 – 2026`).
 * Zero cartoon SVG top arches or unstyled SVG blocks!
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
    }, 1250);

    setTimeout(() => {
      setStage('done');
      onOpen();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none bg-[#1B0906]"
          style={{ position: 'fixed', inset: 0, zIndex: 50 }}
        >
          {/* 1. FULL-BLEED GENERATED AYODHYA RAM MANDIR VIDEO (`ram-mandir-morning-sun.mp4`) */}
          <motion.div
            animate={
              stage === 'entering-temple'
                ? { scale: 2.1, opacity: 0.15 }
                : stage === 'opening-envelope'
                ? { scale: 1.05, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
            style={{ position: 'absolute', inset: 0 }}
          >
            <AyodhyaRamMandirClipPlayer
              src={AYODHYA_VIDEO_CLIPS.prologueMorningSun.src}
              startTime={AYODHYA_VIDEO_CLIPS.prologueMorningSun.startTime}
              endTime={AYODHYA_VIDEO_CLIPS.prologueMorningSun.endTime}
              active={true}
            />
            {/* Soft cinematic radial gradient so floating text blends naturally into the video */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,6,4,0.62) 0%, rgba(20,6,4,0.18) 45%, rgba(20,6,4,0.78) 100%)',
              }}
            />
          </motion.div>

          {/* 2. FLOATING EDITORIAL SACRED OPENING (No Pasted Box Borders!) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="relative z-20 text-center pt-8 sm:pt-10 px-4"
          >
            <div className="mx-auto flex items-center justify-center mb-1">
              <SacredGaneshaEmblem className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]" />
            </div>

            <p
              className="font-serif text-sm sm:text-base font-bold tracking-[0.25em] text-[#FFF5C0] uppercase"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}
            >
              {EVENT_DETAILS.sacredChant}
            </p>

            <p
              className="mt-2 text-[10px] sm:text-xs font-sans uppercase tracking-[0.26em] text-[#F5E19C] font-semibold"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}
            >
              With Shri Ram&apos;s Blessings • Specially Invited
            </p>
            <h1
              className="font-cinzel text-2xl sm:text-4xl font-black text-white gold-text-foil tracking-wide uppercase mt-0.5"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.9))' }}
            >
              {guestName}
            </h1>
          </motion.div>

          {/* 3. 3D ROYAL VELVET WAX-SEAL ENVELOPE STAGE */}
          <div className="relative z-20 my-auto w-full max-w-[335px] sm:max-w-[410px] h-[215px] sm:h-[250px] perspective-envelope px-3">
            <div className="relative w-full h-full rounded-2xl shadow-[0_25px_65px_rgba(0,0,0,0.92)] bg-gradient-to-br from-[#681023] via-[#4A0C19] to-[#2D060F] border-2 border-[#E5C158]/90 overflow-visible">
              <div className="absolute inset-2 rounded-xl bg-damask-maroon opacity-40 pointer-events-none" />

              {/* RISING SHIMMERING GOLD INVITATION CARD INSIDE */}
              <motion.div
                initial={false}
                animate={
                  stage === 'opening-envelope' || stage === 'entering-temple'
                    ? { y: -120, opacity: 1, scale: 1.03 }
                    : { y: 0, opacity: 0.9 }
                }
                transition={{ duration: 1.05, ease: 'easeOut' }}
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
                  25TH SILVER JUBILEE (2003 – 2028)
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#681023] my-0.5 gold-text-foil">
                  Navneet &amp; Ruby Goel
                </h2>
                <div className="w-16 h-[1.5px] bg-[#C5932A] my-1" />
                <p className="font-sans text-[10px] sm:text-xs text-[#4A0C19] font-bold tracking-wider uppercase">
                  Sat, 25 Nov 2028 • 7:30 PM • <span className="text-[#8A5A10] font-semibold">{EVENT_DETAILS.venue.name}</span>
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
                      SILVER
                    </span>
                    <span className="font-cinzel text-base sm:text-lg font-black text-[#2D060F] leading-none">
                      #NR25
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-sans font-bold text-[#3D0713] tracking-wider">
                      2003 • 2028
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 4. BOTTOM OPEN INVITATION BUTTON */}
          <div className="relative z-20 w-full flex flex-col items-center pb-8 sm:pb-10 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={triggerOpen}
            >
              <button className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#FFF3B8] via-[#E5C158] to-[#C5932A] text-[#2D060F] font-cinzel font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(229,193,88,0.75)] hover:scale-105 active:scale-95 transition-all">
                <Sparkles className="w-4 h-4 text-[#2D060F] group-hover:rotate-45 transition-transform" />
                <span>TAP TO OPEN INVITATION</span>
                <Heart className="w-4 h-4 fill-[#2D060F] text-[#2D060F]" />
              </button>
              <span
                className="text-[#FFF3B8] text-[10px] sm:text-[11px] font-sans mt-2 tracking-widest uppercase"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}
              >
                Tap the #NR25 wax seal to enter Shri Ram Mandir
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
