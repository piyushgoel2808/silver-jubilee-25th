'use client';

import React, { useState } from 'react';
import { EVENT_DETAILS } from '@/config/mediaAssets';
import { ScrollRoller3D, LotusScrollDivider } from '@/components/illustrations/RoyalHeritageArt';
import { Hash, CloudSun, Car, Copy, Check, MapPin, Calendar } from 'lucide-react';

/**
 * SCENE 7: Things To Know Strip
 * Directly modeled on Reference Video 1 (`itsbalcony.com` frames 25–27:
 * Second Maroon Royal Scroll "Things to Note" + 3 Floral Heritage Medallion Icons below).
 */
export default function Scene7ThingsToKnow() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="scene-7"
      className="relative w-full py-20 px-4 z-10 bg-heritage-parchment text-[#4A0C19] flex flex-col items-center overflow-hidden"
    >
      {/* Top Ornamental Border */}
      <div className="absolute top-0 inset-x-0 h-3 zari-patti-horizontal opacity-75" />

      {/* =========================================================================
          1. MAROON & GOLD ROYAL SCROLL FOR "THINGS TO NOTE" (Matches Video 1 frame 25)
         ========================================================================= */}
      <div className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[620px] flex flex-col items-center">
        <ScrollRoller3D label="CHAPTER 07 • THINGS TO NOTE" />

        <div className="relative w-full bg-damask-maroon border-x-4 border-[#D4AF37] px-7 sm:px-12 py-10 text-center text-[#FFF8E7] shadow-[0_20px_45px_rgba(42,5,13,0.55)]">
          {/* Left & Right Zari Patti Borders */}
          <div className="absolute inset-y-0 left-1.5 sm:left-2.5 w-3 zari-patti-vertical opacity-85" />
          <div className="absolute inset-y-0 right-1.5 sm:right-2.5 w-3 zari-patti-vertical opacity-85" />

          <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-text-foil mb-6">
            Things to Note
          </h2>

          <div className="space-y-5 text-xs sm:text-sm font-serif text-[#FFF3B8]/95 leading-relaxed max-w-md mx-auto">
            <div>
              <p className="font-cinzel text-[11px] text-[#E5C158] uppercase tracking-widest mb-1">
                • Complimentary Valet Parking •
              </p>
              <p>
                {EVENT_DETAILS.parking.details}
              </p>
            </div>

            <div>
              <p className="font-cinzel text-[11px] text-[#E5C158] uppercase tracking-widest mb-1">
                • November Evening Weather (~18°C) •
              </p>
              <p>
                {EVENT_DETAILS.weather.expected}. {EVENT_DETAILS.weather.recommendation}
              </p>
            </div>

            <div>
              <p className="font-cinzel text-[11px] text-[#E5C158] uppercase tracking-widest mb-1">
                • Official Celebration Hashtag •
              </p>
              <button
                onClick={copyHashtag}
                className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B040C] border border-[#E5C158] text-[#FFF3B8] font-sans font-bold text-xs hover:scale-105 transition-transform"
              >
                <span>{EVENT_DETAILS.hashtag}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#E5C158]" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <LotusScrollDivider className="w-56 sm:w-64 h-12" />
          </div>
        </div>

        <ScrollRoller3D />
      </div>

      {/* =========================================================================
          2. THREE FLORAL HERITAGE QUICK-ACTION MEDALLIONS (Matches Video 1 frame 26)
         ========================================================================= */}
      <div className="mt-10 flex items-center justify-center gap-6 sm:gap-10">
        <button
          onClick={copyHashtag}
          title="Copy Celebration Hashtag"
          className="group flex flex-col items-center gap-1.5"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border-2 border-[#6E1125] shadow-md flex items-center justify-center text-[#6E1125] group-hover:bg-[#6E1125] group-hover:text-[#FFF3B8] transition-all">
            <Hash className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-cinzel font-bold text-[#4A0C19] uppercase tracking-wider">
            {copied ? 'Copied!' : 'Hashtag'}
          </span>
        </button>

        <a
          href={EVENT_DETAILS.venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Golden Dreams Banquets in Google Maps"
          className="group flex flex-col items-center gap-1.5"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border-2 border-[#6E1125] shadow-md flex items-center justify-center text-[#6E1125] group-hover:bg-[#6E1125] group-hover:text-[#FFF3B8] transition-all">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-cinzel font-bold text-[#4A0C19] uppercase tracking-wider">
            Venue Route
          </span>
        </a>

        <a
          href="/api/calendar"
          download="Navneet-Ruby-25th-Silver-Jubilee.ics"
          title="Save to Calendar"
          className="group flex flex-col items-center gap-1.5"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border-2 border-[#6E1125] shadow-md flex items-center justify-center text-[#6E1125] group-hover:bg-[#6E1125] group-hover:text-[#FFF3B8] transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-cinzel font-bold text-[#4A0C19] uppercase tracking-wider">
            Calendar
          </span>
        </a>
      </div>
    </section>
  );
}
