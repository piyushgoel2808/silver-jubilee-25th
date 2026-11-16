'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT_DETAILS, ITINERARY_EVENTS } from '@/config/mediaAssets';
import {
  RoyalPeacock,
  LotusScrollDivider,
  RoyalCaparisonedElephant,
} from '@/components/illustrations/RoyalHeritageArt';
import {
  MapPin,
  Calendar,
  MessageSquare,
  Clock,
  ExternalLink,
  Download,
  Phone,
} from 'lucide-react';

/**
 * SCENE 5: Vintage Classic Car Divider & Peacock Scalloped Itinerary Arches
 */
export default function Scene5ItineraryPeacockArches() {
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (carRef.current && sectionRef.current) {
        gsap.fromTo(
          carRef.current,
          { x: '-45vw' },
          {
            x: '45vw',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = `https://wa.me/${EVENT_DETAILS.rsvp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    EVENT_DETAILS.rsvp.whatsappText
  )}`;

  return (
    <section
      id="scene-5"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 overflow-hidden z-10 bg-damask-maroon text-[#FFF8E7]"
    >
      <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#8D6214] via-[#FFF3B8] to-[#8D6214]" />

      {/* 1. GSAP SCROLL-DRIVEN VINTAGE 1960s ROYAL CONVERTIBLE CAR */}
      <div
        ref={carRef}
        className="w-60 sm:w-72 mb-4 pointer-events-none z-20 flex flex-col items-center animate-elephant-body"
      >
        <svg viewBox="0 0 340 120" className="w-full h-auto filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.75)]">
          <defs>
            <linearGradient id="carBodyTeal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E4D48" />
              <stop offset="50%" stopColor="#1B7A72" />
              <stop offset="100%" stopColor="#0A3834" />
            </linearGradient>
          </defs>
          <polygon points="295,68 340,46 340,94" fill="rgba(255, 243, 184, 0.48)" className="animate-pulse" />
          <path
            d="M18,82 Q24,58 58,56 L105,56 Q125,36 155,36 L220,36 Q262,50 296,62 L304,80 Q304,94 284,94 L264,94 Q258,72 236,72 Q214,72 208,94 L112,94 Q106,72 84,72 Q62,72 56,94 L28,94 Q18,94 18,82 Z"
            fill="url(#carBodyTeal)"
            stroke="#E5C158"
            strokeWidth="2.5"
          />
          <line x1="32" y1="74" x2="288" y2="74" stroke="#FFF3B8" strokeWidth="1.8" />
          <polygon points="195,36 218,16 232,16 220,36" fill="rgba(255,255,255,0.45)" stroke="#E5C158" strokeWidth="2" />
          <path d="M286,66 Q300,76 292,88" stroke="#FFA000" strokeWidth="4" strokeDasharray="3 2" fill="none" />
          <g transform="translate(84, 94)">
            <circle cx="0" cy="0" r="18" fill="#1F1F1F" stroke="#FFFDF9" strokeWidth="4" />
            <circle cx="0" cy="0" r="8" fill="#D4AF37" />
          </g>
          <g transform="translate(236, 94)">
            <circle cx="0" cy="0" r="18" fill="#1F1F1F" stroke="#FFFDF9" strokeWidth="4" />
            <circle cx="0" cy="0" r="8" fill="#D4AF37" />
          </g>
          <rect x="135" y="60" width="54" height="14" rx="3" fill="#4A0C19" stroke="#E5C158" strokeWidth="1" />
          <text x="162" y="70" textAnchor="middle" fill="#FFF3B8" fontSize="8" fontWeight="bold" fontFamily="serif">
            #NR25
          </text>
        </svg>
      </div>

      <div className="text-center mb-12 z-10 max-w-2xl">
        <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#E5C158] uppercase">
          CHAPTER 05 • THE CELEBRATION &amp; VENUE
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight gold-text-foil mt-1">
          The Silver Jubilee Evening
        </h2>
        <LotusScrollDivider className="w-60 sm:w-72 h-12 mx-auto mt-1" />
      </div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 z-10">
        {/* ARCH CARD 1 */}
        <div className="relative flex flex-col items-center">
          <div className="hidden sm:block absolute -top-12 -left-6 z-20 pointer-events-none">
            <RoyalPeacock className="w-28 h-32" mirrored={false} />
          </div>

          <div className="relative w-full rounded-t-[160px] rounded-b-xl bg-heritage-parchment text-[#4A0C19] p-6 sm:p-8 pt-12 border-4 border-[#D4AF37] shadow-[0_25px_55px_rgba(0,0,0,0.75)] flex flex-col items-center text-center">
            <div className="absolute inset-2.5 rounded-t-[150px] rounded-b-lg border border-[#C5932A]/60 pointer-events-none" />

            <svg viewBox="0 0 220 110" className="w-44 h-24 mb-2">
              <path
                d="M30 95 L30 45 Q110 5 190 45 L190 95"
                fill="rgba(212,175,55,0.12)"
                stroke="#C5932A"
                strokeWidth="2"
              />
              <path d="M30 45 Q70 65 110 30 Q150 65 190 45" fill="none" stroke="#9A1B1F" strokeWidth="2.5" />
              <line x1="110" y1="22" x2="110" y2="45" stroke="#8D6214" strokeWidth="1.5" />
              <circle cx="110" cy="48" r="7" fill="#FFD54F" stroke="#8D6214" strokeWidth="1.2" className="animate-pulse" />
              <rect x="75" y="72" width="70" height="18" rx="4" fill="#7C1529" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="15" y1="95" x2="205" y2="95" stroke="#8D6214" strokeWidth="2" />
            </svg>

            <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[#8A5A10] uppercase">
              AUSPICIOUS GATHERING
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0C19] mt-0.5">
              Gala Reception &amp; Feast
            </h3>

            <div className="w-full my-5 p-4 rounded-xl bg-[#FFFDF9] border border-[#C5932A]/60 text-left shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#4A0C19]">
                    {EVENT_DETAILS.venue.name}
                  </p>
                  <p className="font-sans text-xs text-[#5C3B09] leading-relaxed mt-0.5">
                    {EVENT_DETAILS.venue.addressLine1}, {EVENT_DETAILS.venue.area},{' '}
                    <span className="font-semibold">{EVENT_DETAILS.venue.city}</span>
                  </p>
                </div>
                <a
                  href={EVENT_DETAILS.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Golden Dreams Banquets in Google Maps"
                  className="w-10 h-10 rounded-xl bg-[#4A0C19] text-[#FFF3B8] border border-[#D4AF37] flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>

              <div className="pt-2.5 border-t border-[#C5932A]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-serif font-bold text-[#6E1125]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8A5A10]" />
                  25 November (Married 25 Nov 2003)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8A5A10]" />
                  {EVENT_DETAILS.celebrationTimeDisplay}
                </span>
              </div>

              <div className="pt-2 border-t border-[#C5932A]/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-[#5C3B09]">
                <a href={`tel:${EVENT_DETAILS.rsvp.phone}`} className="flex items-center gap-1 font-semibold hover:text-[#4A0C19]">
                  <Phone className="w-3 h-3 text-[#8A5A10]" />
                  Host Mob: {EVENT_DETAILS.rsvp.phoneDisplay}
                </a>
                <a href={`tel:${EVENT_DETAILS.venue.venuePhone}`} className="flex items-center gap-1 hover:text-[#4A0C19]">
                  Venue: {EVENT_DETAILS.venue.venuePhone}
                </a>
              </div>
            </div>

            <div className="w-full space-y-2.5 mt-auto">
              <a
                href={EVENT_DETAILS.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#4A0C19] hover:bg-[#631022] text-[#FFF3B8] border border-[#D4AF37] font-serif text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#E5C158]" />
                <span>See Route on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="/api/calendar"
                  download="Navneet-Ruby-25th-Silver-Jubilee.ics"
                  className="py-2.5 px-3 rounded-xl bg-[#FFFDF9] hover:bg-[#F3E5AB]/40 text-[#4A0C19] border border-[#C5932A] font-serif text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#8A5A10]" />
                  <span>Save the Date (.ics)</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white border border-[#D4AF37] font-serif text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp RSVP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ARCH CARD 2 */}
        <div className="relative flex flex-col items-center">
          <div className="hidden sm:block absolute -top-12 -right-6 z-20 pointer-events-none">
            <RoyalPeacock className="w-28 h-32" mirrored={true} />
          </div>

          <div className="relative w-full h-full rounded-t-[160px] rounded-b-xl bg-heritage-parchment text-[#4A0C19] p-6 sm:p-8 pt-12 border-4 border-[#D4AF37] shadow-[0_25px_55px_rgba(0,0,0,0.75)] flex flex-col items-center text-center">
            <div className="absolute inset-2.5 rounded-t-[150px] rounded-b-lg border border-[#C5932A]/60 pointer-events-none" />

            <svg viewBox="0 0 220 110" className="w-44 h-24 mb-2">
              <path
                d="M35 95 L35 45 Q110 5 185 45 L185 95"
                fill="rgba(212,175,55,0.12)"
                stroke="#C5932A"
                strokeWidth="2"
              />
              <circle cx="110" cy="42" r="14" fill="rgba(244,143,177,0.3)" stroke="#9A1B1F" strokeWidth="1.5" className="animate-pulse" />
              <path d="M90 78 L130 78 L124 95 L96 95 Z" fill="#6E1125" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="15" y1="95" x2="205" y2="95" stroke="#8D6214" strokeWidth="2" />
            </svg>

            <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[#8A5A10] uppercase">
              THE EVENING UNFOLDS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0C19] mt-0.5">
              What to Expect &amp; Attire
            </h3>

            <div className="w-full my-4 p-3 rounded-xl bg-[#4A0C19] text-[#FFF8E7] border border-[#D4AF37] shadow-sm">
              <span className="text-[10px] font-cinzel font-bold text-[#E5C158] tracking-[0.2em] uppercase">
                DRESS CODE • {EVENT_DETAILS.dressCode.theme}
              </span>
              <p className="text-[11px] font-sans text-[#F5E19C]/90 mt-1">
                {EVENT_DETAILS.dressCode.description}
              </p>
            </div>

            <div className="w-full my-2">
              <div className="relative flex items-center justify-between px-2 py-2">
                <div className="absolute inset-x-6 top-1/2 h-[1.5px] bg-[#C5932A]/50 -z-0" />
                {ITINERARY_EVENTS.map((ev, idx) => {
                  const isActive = activeSlot === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveSlot(idx)}
                      className="relative z-10 flex flex-col items-center group"
                    >
                      <span
                        className={`text-[10px] sm:text-xs font-serif font-bold mb-1.5 transition-colors ${
                          isActive ? 'text-[#6E1125] scale-110' : 'text-[#8A5A10]'
                        }`}
                      >
                        {ev.time}
                      </span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isActive
                            ? 'bg-[#6E1125] border-[#D4AF37] shadow-[0_0_10px_rgba(110,17,37,0.6)] scale-125'
                            : 'bg-[#FFFDF9] border-[#C5932A]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 space-y-2 text-left">
                {ITINERARY_EVENTS.map((ev, idx) => {
                  const isActive = activeSlot === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveSlot(idx)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-[#FFFDF9] border-[#6E1125] shadow-md'
                          : 'bg-[#FFFDF9]/60 border-[#C5932A]/40 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span className="px-2 py-0.5 rounded bg-[#4A0C19] text-[#FFF3B8] text-[10px] font-cinzel font-bold flex-shrink-0 mt-0.5">
                        {ev.time}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#4A0C19]">
                          {ev.title}
                        </h4>
                        <p className="text-xs font-sans text-[#5C3B09] leading-relaxed mt-0.5">
                          {ev.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. REALISTIC ROYAL PROCESSIONAL PATHWAY WITH CAPARISONED ELEPHANTS & PEACOCKS */}
      <div className="relative w-full max-w-5xl mt-12 rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.88)] z-10 bg-[#24030A]">
        <div className="relative w-full h-48 sm:h-64 overflow-hidden">
          <Image
            src="/images/royal-path.jpg"
            alt="Royal Palace Sandstone Processional Pathway"
            fill
            className="object-cover object-bottom filter brightness-95"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24030A] via-transparent to-[#24030A]/70 pointer-events-none" />

          {/* Border Zari Inset */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#D4AF37]/40 pointer-events-none z-10" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 sm:px-8 pb-3 z-20">
            <div className="flex items-end gap-1.5 sm:gap-3">
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={false} />
              <RoyalPeacock className="hidden sm:block w-16 h-20 mb-2" mirrored={false} />
            </div>

            <div className="text-center pb-2 px-2">
              <span className="font-cinzel text-[9px] sm:text-xs font-bold text-[#FFF3B8] uppercase tracking-widest bg-[#3D0714]/90 px-4 py-1.5 rounded-full border border-[#E5C158]/80 shadow-md backdrop-blur-sm">
                ✦ Royal Silver Jubilee Procession • 25 Nov 2028 ✦
              </span>
            </div>

            <div className="flex items-end gap-1.5 sm:gap-3">
              <RoyalPeacock className="hidden sm:block w-16 h-20 mb-2" mirrored={true} />
              <RoyalCaparisonedElephant className="w-24 sm:w-36 md:w-44 h-auto" mirrored={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
