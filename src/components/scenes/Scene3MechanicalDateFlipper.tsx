'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import GoldScratchCard from '@/components/canvas/GoldScratchCard';
import {
  PichwaiLotusCrest,
  RoyalCaparisonedElephant,
} from '@/components/illustrations/RoyalHeritageArt';
import { EVENT_DETAILS } from '@/config/mediaAssets';
import { soundController } from '@/lib/soundController';
import { Sparkles, Calendar } from 'lucide-react';

/**
 * SCENE 3: Save The Date — Walking Royal Procession & Mechanical Date Flipper
 * Flips from the wedding date `25 | NOV | 2003` -> 25th Silver Jubilee (`25 | NOV | 2028`)
 * with articulated transparent walking elephants and an interactive Gold-Foil Scratch Card.
 */
export default function Scene3MechanicalDateFlipper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftElephantRef = useRef<HTMLDivElement>(null);
  const rightElephantRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const [dayVal, setDayVal] = useState<string>('25');
  const [monthVal, setMonthVal] = useState<string>('NOV');
  const [yearVal, setYearVal] = useState<number>(EVENT_DETAILS.weddingYear);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !leftElephantRef.current || !rightElephantRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftElephantRef.current,
        { x: -65 },
        {
          x: 15,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 1.1,
          },
        }
      );

      gsap.fromTo(
        rightElephantRef.current,
        { x: 65 },
        {
          x: -15,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 1.1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const runDateFlipAnimation = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const years = [2003, 2008, 2012, 2016, 2020, 2024, 2026, EVENT_DETAILS.celebrationYear];
    const months = ['JAN', 'MAR', 'JUN', 'AUG', 'OCT', 'NOV', 'NOV', 'NOV'];
    const days = ['04', '11', '18', '21', '23', '24', '25', '25'];
    let step = 0;

    const timer = setInterval(() => {
      if (step < years.length) {
        setYearVal(years[step]);
        setMonthVal(months[step]);
        setDayVal(days[step]);
        if (soundController) {
          soundController.playWaxSealCrack();
        }
        step++;
      } else {
        clearInterval(timer);
        setIsSpinning(false);
        setIsRevealed(true);
        if (soundController) {
          soundController.playTasselBell();
        }
        confetti({
          particleCount: 95,
          spread: 90,
          origin: { y: 0.52 },
          colors: ['#FFB300', '#FFD54F', '#D4AF37', '#E65100', '#FFF3B8'],
          shapes: ['circle'],
        });
      }
    }, 200);
  };

  useEffect(() => {
    if (isInView && !isRevealed) {
      const timeout = setTimeout(() => {
        runDateFlipAnimation();
      }, 450);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <section
      id="scene-3"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 z-10 bg-[#160307] text-[#FFF8E7] overflow-hidden select-none"
    >
      <div className="absolute top-0 inset-x-0 h-3 zari-patti-horizontal opacity-85" />

      <div className="flex flex-col items-center mb-6 max-w-xl text-center z-10">
        <PichwaiLotusCrest className="w-56 sm:w-72 md:w-80 h-auto" />
        <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#E5C158] uppercase mt-2">
          CHAPTER 03 • SAVE THE AUSPICIOUS DATE
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white gold-text-foil mt-1">
          25 Years Since 25 Nov 2003
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#F5E19C] mt-2">
          From our wedding vows on 25 November 2003 to our Silver Jubilee celebration
        </p>
      </div>

      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col items-center z-10 bg-[#24030A]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="/images/royal-path.jpg"
            alt="Royal Palace Sandstone Processional Pathway"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-90 contrast-105"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160307] via-[#24030A]/60 to-[#160307]/80 pointer-events-none" />
        </div>

        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#D4AF37]/50 pointer-events-none z-10" />

        <div className="relative z-20 pt-6 sm:pt-8 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3D0714]/85 border border-[#E5C158]/70 backdrop-blur-md shadow-md">
            <span className="font-cinzel text-[10px] sm:text-xs font-bold text-[#FFF3B8] tracking-widest uppercase">
              ✦ Married 25 Nov 2003 • 25th Silver Jubilee Mandap ✦
            </span>
          </div>
        </div>

        <div className="relative z-20 w-full flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-8 my-6">
          <div
            ref={leftElephantRef}
            className="flex-shrink-0 w-24 sm:w-44 md:w-52 flex flex-col items-center transition-transform"
          >
            <RoyalCaparisonedElephant className="w-full h-auto" mirrored={false} />
          </div>

          <div className="flex-1 max-w-md mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3.5">
              {[
                { label: 'DATE', value: dayVal },
                { label: 'MONTH', value: monthVal },
                { label: 'YEAR', value: String(yearVal) },
              ].map((box) => (
                <div key={box.label} className="relative flex flex-col items-center">
                  <div className="relative z-20 -mb-2.5 px-2.5 sm:px-3.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#C5932A] shadow-md">
                    <span className="font-serif text-[8px] sm:text-[10px] font-bold tracking-[0.16em] text-[#4A0C19] uppercase">
                      {box.label}
                    </span>
                  </div>

                  <div
                    className="relative w-20 sm:w-28 md:w-32 h-20 sm:h-24 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.85)] border-2 border-[#D4AF37]"
                    style={{
                      background:
                        'linear-gradient(180deg, #7B162B 0%, #4A0C19 55%, #2B050D 100%)',
                    }}
                  >
                    <div className="absolute inset-1.5 rounded-xl border border-[#FFF3B8]/40 pointer-events-none" />
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/40 pointer-events-none" />

                    <motion.span
                      key={`${box.label}-${box.value}`}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="font-cinzel text-xl sm:text-3xl md:text-4xl font-black text-white gold-text-foil select-none"
                    >
                      {box.value}
                    </motion.span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={runDateFlipAnimation}
                disabled={isSpinning}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A0C19] hover:bg-[#681023] text-[#FFF3B8] text-[10px] sm:text-xs font-cinzel font-bold tracking-wider uppercase border border-[#E5C158] transition-all shadow-md active:scale-95 disabled:opacity-50 hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{isRevealed ? 'Replay 2003 → 25th Flip' : 'Spin from 2003'}</span>
              </button>
            </div>
          </div>

          <div
            ref={rightElephantRef}
            className="flex-shrink-0 w-24 sm:w-44 md:w-52 flex flex-col items-center transition-transform"
          >
            <RoyalCaparisonedElephant className="w-full h-auto" mirrored={true} />
          </div>
        </div>

        <div className="relative z-20 w-full max-w-lg mb-6 pt-5 border-t border-[#D4AF37]/45 flex flex-col items-center px-4">
          <div className="text-center mb-3">
            <span className="font-cinzel text-[10px] sm:text-xs font-bold text-[#E5C158] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
              ✦ Interactive Celebration Pass ✦
            </span>
            <p className="font-serif italic text-xs text-[#FFF8E7] mt-1">
              Rub the brushed gold foil below with your finger or cursor to uncover timings &amp; venue pass
            </p>
          </div>

          <GoldScratchCard />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-3 zari-patti-horizontal opacity-85" />
    </section>
  );
}
