'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS, AYODHYA_VIDEO_CLIPS } from '@/config/mediaAssets';
import {
  AyodhyaRamMandirClipPlayer,
  LotusPondFinalePanorama,
  RoyalCaparisonedElephant,
} from '@/components/illustrations/RoyalHeritageArt';
import { Share2, Check } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * CHAPTER 06 (FINALE): Sarayu Lotus-Pond, Sandstone Chhatri, Elephant & Live Countdown
 * Matches Reference Video 4 (`tabmandir` / `rammandir.framer.website` frames 14–18):
 * "The countdown begins — DD : HH : MM : SS" above the animated Lotus Pond with
 * Sandstone Chhatri, distant Ayodhya Ram Mandir silhouette, and Royal Elephant lifting a pink lotus.
 */
export default function Scene8PalaceFinaleCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date(EVENT_DETAILS.celebrationDateTimeIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Navneet & Ruby Goel • 25th Silver Jubilee Invitation',
          text: 'Join us to celebrate the 25th Wedding Anniversary (Silver Jubilee) of Navneet Goel & Ruby Goel (Married 25 Nov 2003) at Golden Dreams Banquets, Kalkaji!',
          url: url,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section
      id="scene-8"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-20 pb-0 z-10 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #F9F3E5 0%, #EED8C0 32%, #C99E87 62%, #1B2A38 100%)',
      }}
    >
      {/* Top Sunburst Heritage Divider (Matches `tabmandir` frame 15) */}
      <div className="flex flex-col items-center px-4 text-center max-w-2xl mx-auto z-10">
        <svg viewBox="0 0 260 50" className="w-48 sm:w-56 h-10 mb-2 text-[#8A5A10]">
          <line x1="10" y1="6" x2="250" y2="6" stroke="currentColor" strokeWidth="1.5" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 130 + Math.cos(rad) * 38;
            const y2 = 6 + Math.sin(rad) * 38;
            return (
              <line
                key={deg}
                x1="130"
                y1="6"
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.2"
              />
            );
          })}
        </svg>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A0C19]">
          The countdown begins
        </h2>
        <p className="font-serif text-sm sm:text-base text-[#5C3B09] mt-2 max-w-md leading-relaxed">
          Our family is excited that you are able to join us in celebrating 25 glorious years of love and togetherness (Married 25 Nov 2003).
        </p>

        {/* Live Hydration-Safe Ticking Countdown */}
        <div className="grid grid-cols-4 gap-4 sm:gap-8 my-8">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center px-3 sm:px-5 py-3 rounded-2xl bg-[#FFFDF9]/85 border-2 border-[#C5932A] shadow-md"
            >
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#6E1125] tabular-nums">
                {isClient ? String(unit.val).padStart(2, '0') : '00'}
              </span>
              <span className="text-[9px] sm:text-[11px] font-cinzel font-bold tracking-[0.18em] text-[#8A5A10] uppercase mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ornate Royal Golden Easel Frame */}
      <div className="relative z-20 mx-4 mb-6 w-full max-w-md sm:max-w-lg">
        <div className="mx-auto w-12 h-8 -mb-1 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#FFF3B8] to-[#8D6214] border border-[#4A0C19]" />
          <div className="w-10 h-4 rounded-t-full bg-gradient-to-r from-[#8D6214] via-[#FFF3B8] to-[#8D6214]" />
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-[#FFF3B8] via-[#D4AF37] to-[#7A5210] shadow-[0_20px_50px_rgba(0,0,0,0.65)] border-2 border-[#4A0C19]">
          <div className="bg-[#FFFDF9] border-2 border-[#C5932A] p-6 sm:p-8 text-center relative">
            <span className="absolute top-2 left-2 text-[#9A1B1F] text-sm">❦</span>
            <span className="absolute top-2 right-2 text-[#9A1B1F] text-sm">❦</span>
            <span className="absolute bottom-2 left-2 text-[#9A1B1F] text-sm">❦</span>
            <span className="absolute bottom-2 right-2 text-[#9A1B1F] text-sm">❦</span>

            <p className="font-serif italic text-lg sm:text-2xl text-[#4A0C19] font-semibold">
              &ldquo;Your Presence Means the World to Us&rdquo;
            </p>
            <p className="font-handwriting text-3xl sm:text-4xl text-[#6E1125] mt-2">
              Navneet &amp; Ruby Goel
            </p>
            <p className="text-[11px] sm:text-xs font-sans font-semibold text-[#5C3B09] uppercase tracking-wider mt-2">
              {EVENT_DETAILS.venue.name} • Kalkaji, New Delhi
            </p>
            <p className="text-[11px] font-sans text-[#8A5A10] mt-0.5">
              Hashtag: {EVENT_DETAILS.hashtag} • RSVP: {EVENT_DETAILS.rsvp.phoneDisplay}
            </p>

            <div className="mt-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4A0C19] text-[#FFF3B8] border border-[#D4AF37] font-serif text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{copiedLink ? 'Invitation Link Copied!' : 'Share Invitation'}</span>
                {copiedLink && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-BLEED ANIMATED LOTUS POND, CHHATRI & ELEPHANT PANORAMA (Plus 10s AI Video Slot 5) */}
      <div className="relative w-full mt-auto pb-16 sm:pb-12">
        <AyodhyaRamMandirClipPlayer
          desktopSrc={AYODHYA_VIDEO_CLIPS.clip5LotusPondFinale.desktop}
          mobileSrc={AYODHYA_VIDEO_CLIPS.clip5LotusPondFinale.mobile}
          fallback={<LotusPondFinalePanorama />}
        />
        <div className="absolute inset-x-0 bottom-16 flex items-end justify-between px-4 sm:px-12 pointer-events-none z-20">
          <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={false} />
          <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={true} />
        </div>
      </div>
    </section>
  );
}
