'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '@/config/mediaAssets';
import { soundController } from '@/lib/soundController';
import { Sparkles, MapPin, Clock, PhoneCall } from 'lucide-react';

/**
 * Interactive HTML5 Gold-Foil Scratch Card (25 Nov 2001 -> 25 Nov 2026, 7:00 PM)
 */
export default function GoldScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4AF37');
    grad.addColorStop(0.25, '#FFF3B8');
    grad.addColorStop(0.5, '#C5932A');
    grad.addColorStop(0.75, '#F9E596');
    grad.addColorStop(1, '#9A6F18');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let x = 8; x < width; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    ctx.strokeStyle = '#5A0E1E';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.fillStyle = '#4A0C19';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ RUB GOLD FOIL TO REVEAL VENUE & TIME ✦', width / 2, height / 2 - 10);

    ctx.font = '600 11px Montserrat, sans-serif';
    ctx.fillStyle = '#5A0E1E';
    ctx.fillText('WED, 25 NOV 2026 • 7:00 PM ONWARDS', width / 2, height / 2 + 12);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isScratched) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isScratched]);

  const checkScratchedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount += 4;
        }
      }

      const percent = Math.round((transparentCount / totalPixels) * 100);

      if (percent >= 35 && !isScratched) {
        setIsScratched(true);
        if (soundController) {
          soundController.playTasselBell();
        }
        confetti({
          particleCount: 80,
          spread: 65,
          origin: { y: 0.72 },
          colors: ['#D4AF37', '#FFF3B8', '#8A152B'],
        });
      }
    } catch {}
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    if (soundController && Math.random() > 0.7) {
      soundController.playScratchFoilSound();
    }

    checkScratchedPercentage();
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[175px] sm:h-[185px] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] border-2 border-[#C5932A] select-none mx-auto bg-[#4A0C19]">
      <div className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-between bg-damask-maroon text-[#FFF8E7]">
        <div className="flex items-center justify-between border-b border-[#E5C158]/35 pb-1.5">
          <div className="flex items-center gap-1.5 text-[#FFF3B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="font-cinzel text-[10px] font-bold tracking-widest uppercase">
              SILVER JUBILEE PASS (2001 – 2026)
            </span>
          </div>
          <span className="text-[9px] font-sans px-2 py-0.5 rounded-full bg-[#E5C158]/20 text-[#FFF3B8] border border-[#E5C158]/50 font-bold">
            25 NOV 2026
          </span>
        </div>

        <div className="space-y-1.5 my-auto text-left">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#E5C158] flex-shrink-0" />
            <span className="font-serif font-bold text-[#FFF3B8]">
              {EVENT_DETAILS.celebrationDateDisplay} • {EVENT_DETAILS.celebrationTimeDisplay}
            </span>
          </div>

          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E5C158] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-serif font-bold text-sm text-[#FFF4C2] leading-tight">
                {EVENT_DETAILS.venue.name}
              </p>
              <p className="text-[10px] text-[#F5E19C]/90 font-sans leading-snug">
                {EVENT_DETAILS.venue.addressLine1}, {EVENT_DETAILS.venue.area}, {EVENT_DETAILS.venue.city}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[#E5C158]/25 text-[10px] font-sans text-[#FFF3B8]">
          <span className="flex items-center gap-1 font-semibold">
            <PhoneCall className="w-3 h-3 text-[#E5C158]" /> RSVP: {EVENT_DETAILS.rsvp.phoneDisplay}
          </span>
          <a
            href={EVENT_DETAILS.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#E5C158] font-bold uppercase tracking-wider"
          >
            Open Maps →
          </a>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          setIsDrawing(true);
          scratch(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (isDrawing) scratch(e.clientX, e.clientY);
        }}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onTouchStart={(e) => {
          setIsDrawing(true);
          scratch(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (isDrawing) scratch(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={() => setIsDrawing(false)}
        className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 touch-none ${
          isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
    </div>
  );
}
