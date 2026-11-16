'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import {
  EVENT_DETAILS,
  AYODHYA_VIDEO_CLIPS,
  CLOTHESLINE_MEMORIES,
  ITINERARY_EVENTS,
} from '@/config/mediaAssets';
import {
  AyodhyaRamMandirClipPlayer,
  ScrollRoller3D,
  LotusScrollDivider,
  SacredGaneshaEmblem,
  RoyalCaparisonedElephant,
} from '@/components/illustrations/RoyalHeritageArt';
import GoldScratchCard from '@/components/canvas/GoldScratchCard';
import HostVaultModal from '@/components/modals/HostVaultModal';
import { soundController } from '@/lib/soundController';
import {
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  Download,
  ExternalLink,
  Phone,
  Sparkles,
  FolderLock,
} from 'lucide-react';

/**
 * UNIFIED AYODHYA RAM MANDIR SCROLLYTELLING INVITATION (`clip1-4.mp4` -> All 4 Temple Scenes)
 *
 * Solves Error 3 & User Improvement Request:
 * 1. Removes all filler quote cards ("Some journeys feel like prayer", "Every ordinary day...")
 *    and removes all stage badge pills / progress bars.
 * 2. Integrates the ENTIRE core invitation directly into the 4 continuous temple video stages
 *    of `clip1-4.mp4` (`0–10s`, `10–20s`, `20–30s`, `30–40s`) so the background video and
 *    the invitation scroll together as ONE cohesive experience:
 *    - Stage 1 (`0–25%` scroll | `0–10s` Ayodhya Ram Mandir Exterior): Floating Blessing & Couple Title (No box!)
 *    - Stage 2 (`25–50%` scroll | `10–20s` 392-Pillar Mandapam Corridor): The Unrolling Royal Farmaan Scroll
 *    - Stage 3 (`50–75%` scroll | `20–30s` Peacock Bridge & Twin Chhatris): Save the Date Flipper (2001 -> 2026) & Gold Scratch Pass + 4 Couple Memories
 *    - Stage 4 (`75–100%` scroll | `30–40s` Floral Royal Mandap & Sofa): Golden Dreams Banquets Venue, 7:00 PM Timeline, Google Maps & WhatsApp RSVP
 */
export default function Scene1PalaceHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Mechanical Date Flipper State (25 NOV 2001 -> 25 NOV 2026)
  const [dayVal, setDayVal] = useState<string>('25');
  const [monthVal, setMonthVal] = useState<string>('NOV');
  const [yearVal, setYearVal] = useState<number>(2001);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hasFlipped, setHasFlipped] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.22) {
            setActiveStage(1);
          } else if (p < 0.50) {
            setActiveStage(2);
          } else if (p < 0.76) {
            setActiveStage(3);
          } else {
            setActiveStage(4);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const runDateFlipAnimation = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const years = [2001, 2005, 2010, 2014, 2018, 2022, 2025, 2026];
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
        setHasFlipped(true);
        if (soundController) {
          soundController.playTasselBell();
        }
        confetti({
          particleCount: 85,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#FFB300', '#FFD54F', '#D4AF37', '#FFF3B8'],
        });
      }
    }, 180);
  };

  useEffect(() => {
    if (activeStage === 3 && !hasFlipped) {
      const t = setTimeout(() => {
        runDateFlipAnimation();
      }, 350);
      return () => clearTimeout(t);
    }
  }, [activeStage, hasFlipped]);

  const currentClipConfig =
    activeStage === 1
      ? AYODHYA_VIDEO_CLIPS.clip1HeroExterior
      : activeStage === 2
      ? AYODHYA_VIDEO_CLIPS.clip2MandapamCorridor
      : activeStage === 3
      ? AYODHYA_VIDEO_CLIPS.clip3PeacockBridge
      : AYODHYA_VIDEO_CLIPS.clip4RoyalMandapSofa;

  const whatsappUrl = `https://wa.me/${EVENT_DETAILS.rsvp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    EVENT_DETAILS.rsvp.whatsappText
  )}`;

  return (
    <section
      id="scene-1"
      ref={containerRef}
      className="relative w-full z-10 select-none bg-[#1B0906]"
    >
      {/* =========================================================================
          STICKY FULL-SCREEN AYODHYA RAM MANDIR VIDEO WORLD (`100vw x 100dvh`)
          Stays pinned in the background while the unified invitation scrolls over it!
         ========================================================================= */}
      <div className="sticky top-0 left-0 h-[100dvh] w-full overflow-hidden z-0 pointer-events-none">
        <AyodhyaRamMandirClipPlayer
          src={currentClipConfig.src}
          startTime={currentClipConfig.startTime}
          endTime={currentClipConfig.endTime}
          active={true}
        />
        {/* Soft atmospheric gradient so floating typography and scrolls blend naturally */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,6,4,0.35) 0%, rgba(20,6,4,0.12) 40%, rgba(20,6,4,0.35) 75%, rgba(20,6,4,0.82) 100%)',
          }}
        />
      </div>

      {/* =========================================================================
          FOREGROUND SCROLLING INVITATION STREAM (Flows directly over the video!)
         ========================================================================= */}
      <div className="relative z-10 -mt-[100dvh] w-full flex flex-col items-center">
        {/* -----------------------------------------------------------------------
            BEAT 1 (0% – 22% Scroll | Clip 1: Ayodhya Ram Mandir Exterior & Steps):
            Pure Floating Editorial Typography — ZERO Pasted Box Borders!
           ----------------------------------------------------------------------- */}
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-end pb-14 sm:pb-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center max-w-2xl mx-auto"
          >
            <SacredGaneshaEmblem className="w-14 h-14 sm:w-16 sm:h-16 mb-1 filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]" />

            <p
              className="font-serif text-xs sm:text-sm font-bold tracking-[0.26em] text-[#FFF5C0] uppercase"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
            >
              {EVENT_DETAILS.sacredChant}
            </p>

            <p
              className="font-serif italic text-sm sm:text-lg text-[#FFF8E7] mt-2"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}
            >
              {EVENT_DETAILS.invitationLead}
            </p>

            <h1
              className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white gold-text-foil mt-1 leading-none"
              style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.95))' }}
            >
              Navneet &amp; Ruby
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#FFF3B8]" />
              <span
                className="font-cinzel text-xs sm:text-base font-bold tracking-[0.26em] text-[#FFF3B8] uppercase"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
              >
                25 • 11 • 2001 — 25 • 11 • 2026
              </span>
              <div className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#FFF3B8]" />
            </div>

            <p
              className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#F5E19C] uppercase mt-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95)' }}
            >
              Wednesday, 25 November 2026 • 7:00 PM Onwards • {EVENT_DETAILS.venue.name}
            </p>
          </motion.div>
        </div>

        {/* -----------------------------------------------------------------------
            BEAT 2 (22% – 50% Scroll | Clip 2: 392-Pillar Carved Mandapam Corridor):
            The Unrolling Royal Farmaan Scroll Emerges Directly Over the Corridor Video!
           ----------------------------------------------------------------------- */}
        <div
          id="scene-2"
          className="min-h-[105dvh] w-full flex flex-col items-center justify-center py-16 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] flex flex-col items-center"
          >
            <ScrollRoller3D label="॥ श्री गणेशाय नमः ॥" />

            <div className="relative w-full overflow-hidden bg-damask-maroon/92 backdrop-blur-md shadow-[0_25px_65px_rgba(0,0,0,0.88)] border-x-4 border-[#D4AF37]">
              <div className="absolute inset-y-0 left-1.5 sm:left-2.5 w-2.5 sm:w-3.5 zari-patti-vertical opacity-90 pointer-events-none" />
              <div className="absolute inset-y-0 right-1.5 sm:right-2.5 w-2.5 sm:w-3.5 zari-patti-vertical opacity-90 pointer-events-none" />
              <div className="absolute inset-y-2.5 left-5 right-5 sm:left-7 sm:right-7 border border-[#E5C158]/55 pointer-events-none" />

              <div className="relative z-10 px-7 sm:px-12 py-8 sm:py-10 text-center text-[#FFF8E7]">
                <SacredGaneshaEmblem className="w-12 h-12 sm:w-14 sm:h-14 mx-auto -mb-1" />
                <p className="font-serif text-xs sm:text-sm font-bold text-[#FFF3B8] tracking-wide">
                  {EVENT_DETAILS.ganeshaShloka}
                </p>

                <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#E5C158] font-semibold mt-4">
                  {EVENT_DETAILS.hostsLead}
                </p>

                <div className="my-2.5">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text-foil tracking-wide">
                    Navneet Goel &amp; Ruby Goel
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-serif text-[#FCEFD2]/95 max-w-md mx-auto leading-relaxed">
                  As they complete 25 glorious years of marriage (<span className="text-[#FFF3B8] font-semibold">25 November 2001 – 25 November 2026</span>), we cordially invite you to grace the Silver Jubilee celebration with your blessings.
                </p>

                <div className="my-4 py-3 px-4 rounded-xl bg-[#2B040C]/85 border border-[#E5C158]/60 max-w-sm mx-auto">
                  <p className="font-cinzel text-xs sm:text-sm font-bold text-[#FFF3B8] uppercase tracking-[0.14em]">
                    {EVENT_DETAILS.celebrationDateDisplay}
                  </p>
                  <p className="font-cinzel text-xs font-bold text-[#E5C158] mt-0.5">
                    {EVENT_DETAILS.celebrationTimeDisplay}
                  </p>
                  <p className="font-serif text-sm sm:text-base font-bold text-[#FFF4C2] mt-1">
                    {EVENT_DETAILS.venue.name}
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#F5E19C]/90">
                    {EVENT_DETAILS.venue.addressLine1}, {EVENT_DETAILS.venue.area}, {EVENT_DETAILS.venue.city}
                  </p>
                </div>

                <div className="pt-1">
                  <p className="font-serif text-xs sm:text-sm font-bold text-[#FFF3B8]">
                    With Best Compliments From:
                  </p>
                  <div className="mt-1 space-y-0.5 text-xs font-serif text-[#FCEFD2]">
                    {EVENT_DETAILS.complimentsFrom.map((line, idx) => (
                      <p key={idx} className="font-semibold">
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="text-[11px] font-sans text-[#E5C158] mt-1.5 font-semibold">
                    RSVP: {EVENT_DETAILS.rsvp.phoneDisplay}
                  </p>
                </div>

                <div className="mt-2 flex justify-center">
                  <LotusScrollDivider className="w-48 sm:w-56 h-10" />
                </div>
              </div>
            </div>

            <ScrollRoller3D
              label="25 • 11 • 2001 — 25 • 11 • 2026"
              showBottomOrnament={true}
            />
          </motion.div>
        </div>

        {/* -----------------------------------------------------------------------
            BEAT 3 (50% – 76% Scroll | Clip 3: Twin Sandstone Chhatris & Peacock Bridge):
            Save the Date Flipper (2001 -> 2026), Gold Scratch Pass & 4 Couple Memories
           ----------------------------------------------------------------------- */}
        <div
          id="scene-3"
          className="min-h-[115dvh] w-full flex flex-col items-center justify-end py-16 px-4"
        >
          {/* Leave upper viewport open so the two fanning peacocks on the sandstone bridge in Clip 3 shine clearly! */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center mt-40 sm:mt-48">
            {/* Floating Editorial Save the Date Header */}
            <p
              className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.26em] text-[#FFF5C0] uppercase"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
            >
              Save The Auspicious Date
            </p>

            {/* 3 Scalloped Date Flipper Boxes + Walking Elephants */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-6 my-4">
              <RoyalCaparisonedElephant className="hidden sm:block w-28 md:w-36 h-auto" mirrored={false} />

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                  {[
                    { label: 'DATE', value: dayVal },
                    { label: 'MONTH', value: monthVal },
                    { label: 'YEAR', value: String(yearVal) },
                  ].map((box) => (
                    <div key={box.label} className="relative flex flex-col items-center">
                      <div className="relative z-20 -mb-2 px-2.5 py-0.5 rounded-full bg-[#FFFDF9] border border-[#C5932A] shadow">
                        <span className="font-serif text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#4A0C19] uppercase">
                          {box.label}
                        </span>
                      </div>

                      <div
                        className="relative w-20 sm:w-24 md:w-28 h-20 sm:h-24 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.88)] border-2 border-[#D4AF37]"
                        style={{
                          background:
                            'linear-gradient(180deg, #7B162B 0%, #4A0C19 55%, #2B050D 100%)',
                        }}
                      >
                        <motion.span
                          key={`${box.label}-${box.value}`}
                          initial={{ rotateX: -90, opacity: 0 }}
                          animate={{ rotateX: 0, opacity: 1 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="font-cinzel text-xl sm:text-3xl font-black text-white gold-text-foil"
                        >
                          {box.value}
                        </motion.span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={runDateFlipAnimation}
                  disabled={isSpinning}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#4A0C19]/90 hover:bg-[#681023] text-[#FFF3B8] text-[10px] font-cinzel font-bold tracking-wider uppercase border border-[#E5C158] transition-all shadow-md"
                >
                  <Sparkles className="w-3 h-3 text-[#E5C158]" />
                  <span>{hasFlipped ? 'Replay 2001 → 2026 Flip' : 'Flip 2001 → 2026'}</span>
                </button>
              </div>

              <RoyalCaparisonedElephant className="hidden sm:block w-28 md:w-36 h-auto" mirrored={true} />
            </div>

            {/* Interactive Gold-Foil Scratch Pass */}
            <div className="w-full mt-2">
              <GoldScratchCard />
            </div>

            {/* Compact 4-Photo Couple Memory Strip on Silk Cord */}
            <div id="scene-4" className="w-full mt-10">
              <div className="text-center mb-4">
                <p
                  className="font-serif text-2xl sm:text-4xl font-bold text-white gold-text-foil"
                  style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.95))' }}
                >
                  25 Years of Memories (2001 – 2026)
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
                {CLOTHESLINE_MEMORIES.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-xl bg-[#4A0C19]/90 border-2 border-[#D4AF37] shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md ${
                      idx % 2 === 0 ? 'animate-sway-1' : 'animate-sway-2'
                    }`}
                  >
                    <div className="bg-[#FFFDF9] p-2 rounded-lg">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-[#2A050D]">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 45vw, 240px"
                        />
                        <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#4A0C19]/90 border border-[#E5C158] text-[9px] font-cinzel font-bold text-[#FFF3B8]">
                          {item.year}
                        </span>
                      </div>
                      <div className="pt-2 text-center">
                        <p className="font-serif font-bold text-xs sm:text-sm text-[#4A0C19] truncate">
                          {item.title}
                        </p>
                        <p className="font-serif italic text-[10px] text-[#8A5A10]">
                          {item.hashtag}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsVaultOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4A0C19]/90 text-[#FFF3B8] border border-[#D4AF37] font-cinzel font-bold text-[11px] tracking-wider uppercase shadow-lg hover:scale-105 transition-transform"
                >
                  <FolderLock className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>View Full-Screen Couple Portraits</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            BEAT 4 (76% – 100% Scroll | Clip 4: Floral-Draped Royal Mandap & Sofa):
            Venue, 7:00 PM Evening Flow, Google Maps Route & 1-Tap WhatsApp RSVP
           ----------------------------------------------------------------------- */}
        <div
          id="scene-5"
          className="min-h-[105dvh] w-full flex flex-col items-center justify-end py-16 px-4"
        >
          {/* Leave upper viewport open so the sparkling chandelier & maroon velvet Royal Mandap in Clip 4 shine clearly! */}
          <div className="w-full max-w-4xl mx-auto mt-36 sm:mt-44 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scalloped Arch 1: Venue & 1-Tap RSVP */}
            <div className="relative rounded-t-[110px] rounded-b-2xl bg-[#FFFDF9]/92 text-[#4A0C19] p-6 pt-10 border-2 border-[#D4AF37] shadow-[0_25px_55px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col items-center text-center">
              <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[#8A5A10] uppercase">
                THE CELEBRATION VENUE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0C19] mt-0.5">
                {EVENT_DETAILS.venue.name}
              </h3>

              <div className="w-full my-4 p-3.5 rounded-xl bg-white border border-[#C5932A]/50 text-left space-y-2.5 shadow-sm">
                <p className="font-sans text-xs text-[#5C3B09] leading-relaxed">
                  {EVENT_DETAILS.venue.addressLine1}, {EVENT_DETAILS.venue.area},{' '}
                  <span className="font-semibold">{EVENT_DETAILS.venue.city}</span>
                </p>

                <div className="pt-2 border-t border-[#C5932A]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-serif font-bold text-[#6E1125]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8A5A10]" />
                    Wed, 25 Nov 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8A5A10]" />
                    7:00 PM Onwards
                  </span>
                </div>

                <div className="pt-2 border-t border-[#C5932A]/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-[#5C3B09]">
                  <a href={`tel:${EVENT_DETAILS.rsvp.phone}`} className="flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3 text-[#8A5A10]" />
                    RSVP: {EVENT_DETAILS.rsvp.phoneDisplay}
                  </a>
                  <a href={`tel:${EVENT_DETAILS.venue.venuePhone}`}>
                    Venue: {EVENT_DETAILS.venue.venuePhone}
                  </a>
                </div>
              </div>

              <div className="w-full space-y-2 mt-auto">
                <a
                  href={EVENT_DETAILS.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#4A0C19] hover:bg-[#631022] text-[#FFF3B8] border border-[#D4AF37] font-serif text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4 text-[#E5C158]" />
                  <span>See Route on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/api/calendar"
                    download="Navneet-Ruby-25th-Silver-Jubilee.ics"
                    className="py-2 px-3 rounded-xl bg-white hover:bg-[#F3E5AB]/40 text-[#4A0C19] border border-[#C5932A] font-serif text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8A5A10]" />
                    <span>Save (.ics)</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white border border-[#D4AF37] font-serif text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp RSVP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Scalloped Arch 2: 7:00 PM Evening Program & Dress Code */}
            <div className="relative rounded-t-[110px] rounded-b-2xl bg-[#FFFDF9]/92 text-[#4A0C19] p-6 pt-10 border-2 border-[#D4AF37] shadow-[0_25px_55px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col items-center text-center">
              <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[#8A5A10] uppercase">
                WEDNESDAY, 25 NOV 2026 • 7:00 PM
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0C19] mt-0.5">
                Evening Flow &amp; Attire
              </h3>

              <div className="w-full my-3 p-2.5 rounded-xl bg-[#4A0C19] text-[#FFF8E7] border border-[#D4AF37]">
                <span className="text-[10px] font-cinzel font-bold text-[#E5C158] tracking-[0.18em] uppercase">
                  DRESS CODE • {EVENT_DETAILS.dressCode.theme}
                </span>
              </div>

              <div className="w-full space-y-2 text-left mt-1">
                {ITINERARY_EVENTS.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-[#C5932A]/45 flex items-center gap-3 shadow-sm"
                  >
                    <span className="px-2 py-0.5 rounded bg-[#4A0C19] text-[#FFF3B8] text-[10px] font-cinzel font-bold flex-shrink-0">
                      {ev.time}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#4A0C19]">
                        {ev.title}
                      </h4>
                      <p className="text-[11px] font-sans text-[#5C3B09] line-clamp-1">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HostVaultModal isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
    </section>
  );
}
