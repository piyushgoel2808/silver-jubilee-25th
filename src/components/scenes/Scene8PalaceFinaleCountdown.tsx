'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS, AYODHYA_VIDEO_CLIPS } from '@/config/mediaAssets';
import { AyodhyaRamMandirClipPlayer } from '@/components/illustrations/RoyalHeritageArt';
import { Share2, Check } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * FINALE: Sarayu Sunrise Lotus Pond, Sandstone Chhatri, Elephant & Live Countdown (`clip5.mp4`)
 * Floating directly in the open sunrise sky of `clip5.mp4` with ZERO box borders,
 * matching the `tabmandir` (`rammandir.framer.website`) reference video frames 15–18!
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
          text: 'Join us to celebrate the 25th Wedding Anniversary (Silver Jubilee) of Navneet Goel & Ruby Goel (25 Nov 2001 – 25 Nov 2026) at 7:00 PM at Golden Dreams Banquets, Kalkaji!',
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
      className="relative h-[100dvh] w-full flex flex-col items-center justify-between pt-8 pb-8 z-10 overflow-hidden bg-[#1B0906]"
    >
      {/* FULL-BLEED GENERATED CLIP 5 (`clip5.mp4` — Sarayu Sunrise Lotus Pond, Chhatri & Elephant Lifting a Lotus) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AyodhyaRamMandirClipPlayer
          src={AYODHYA_VIDEO_CLIPS.clip5LotusPondFinale.src}
          startTime={AYODHYA_VIDEO_CLIPS.clip5LotusPondFinale.startTime}
          endTime={AYODHYA_VIDEO_CLIPS.clip5LotusPondFinale.endTime}
          active={true}
        />
      </div>

      {/* Floating Editorial Countdown in the Open Sunrise Sky (No Box Borders — Matches `tabmandir` frame 17) */}
      <div className="relative z-20 flex flex-col items-center px-4 text-center max-w-xl mx-auto">
        <svg viewBox="0 0 260 44" className="w-40 sm:w-48 h-8 mb-0.5 text-[#5A2D0C]">
          <line x1="10" y1="6" x2="250" y2="6" stroke="currentColor" strokeWidth="1.5" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 130 + Math.cos(rad) * 34;
            const y2 = 6 + Math.sin(rad) * 34;
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

        <h2
          className="font-serif text-3xl sm:text-5xl font-bold text-[#3D1206]"
          style={{ textShadow: '0 1px 10px rgba(255,250,235,0.9)' }}
        >
          The countdown begins
        </h2>
        <p
          className="font-serif text-xs sm:text-sm text-[#4A1808] font-semibold mt-0.5 max-w-md"
          style={{ textShadow: '0 1px 8px rgba(255,250,235,0.9)' }}
        >
          Wednesday, 25 November 2026 • 7:00 PM Onwards • {EVENT_DETAILS.venue.name}
        </p>

        {/* Clean Floating Numbers in the Sky (Exact match to `tabmandir` frame 17!) */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-2">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span
                className="font-serif text-3xl sm:text-5xl font-bold text-[#3D1206] tabular-nums"
                style={{ textShadow: '0 2px 12px rgba(255,250,235,0.95)' }}
              >
                {isClient ? String(unit.val).padStart(2, '0') : '00'}
              </span>
              <span
                className="text-[8px] sm:text-[10px] font-cinzel font-bold tracking-[0.2em] text-[#5C2A08] uppercase"
                style={{ textShadow: '0 1px 6px rgba(255,250,235,0.9)' }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Share Button over the Pond */}
      <div className="relative z-20 flex flex-col items-center">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3D0714]/85 text-[#FFF3B8] border border-[#E5C158] font-cinzel text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl backdrop-blur-md"
        >
          <Share2 className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>{copiedLink ? 'Invitation Link Copied!' : 'Share Silver Jubilee Invitation'}</span>
          {copiedLink && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>
    </section>
  );
}
