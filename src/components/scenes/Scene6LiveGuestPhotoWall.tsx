'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import imageCompression from 'browser-image-compression';
import { DEMO_GUEST_WISHES, GuestWishItem } from '@/config/mediaAssets';
import { LotusScrollDivider } from '@/components/illustrations/RoyalHeritageArt';
import { soundController } from '@/lib/soundController';
import {
  Camera,
  Upload,
  Heart,
  Send,
  Sparkles,
  Download,
  X,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

/**
 * SCENE 6: Live Guest Photo Capture, Shared Drive Wall & Wish Book
 * Styled after Reference Video 2 (`#Shaya` frames 25–27: Luxury Cream Stationery Card
 * with Burgundy & Gold Typography "Send a Wish") + Live Masonry Polaroid Wall.
 */
export default function Scene6LiveGuestPhotoWall() {
  const [wishes, setWishes] = useState<GuestWishItem[]>(DEMO_GUEST_WISHES);
  const [guestName, setGuestName] = useState<string>('');
  const [relation, setRelation] = useState<string>('To: Both Navneet & Ruby');
  const [wishText, setWishText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GuestWishItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const fetchWishes = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/drive/media?type=guest');
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setWishes(data.items);
      }
    } catch (err) {
      console.warn('Error fetching live wishes:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    try {
      setIsCompressing(true);
      if (soundController) {
        soundController.playCameraShutter();
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
      };

      const compressed = await imageCompression(file, options);
      setSelectedFile(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
    } catch {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('guestName', guestName.trim());
      formData.append(
        'wish',
        wishText.trim() || 'Heartiest congratulations on your 25th Silver Jubilee!'
      );
      if (selectedFile) {
        formData.append('file', selectedFile, selectedFile.name);
      }

      const res = await fetch('/api/drive/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.item) {
        setWishes((prev) => [data.item, ...prev]);
        setUploadSuccess(true);
        setSelectedFile(null);
        setPreviewUrl(null);
        setWishText('');

        if (soundController) {
          soundController.playTasselBell();
        }

        confetti({
          particleCount: 95,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF3B8', '#8A152B'],
        });

        setTimeout(() => setUploadSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Failed to submit guest wish:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, reactions: (item.reactions || 0) + 1 } : item
      )
    );
  };

  return (
    <section
      id="scene-6"
      className="relative min-h-screen w-full flex flex-col items-center py-24 px-4 z-10 bg-heritage-parchment text-[#4A0C19]"
    >
      {/* Top Section Header */}
      <div className="text-center mb-10 z-10 max-w-2xl mx-auto">
        <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#8A5A10] uppercase">
          CHAPTER 06 • BLESSINGS &amp; LIVE PHOTO WALL
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#4A0C19] mt-1">
          Send a Wish &amp; Capture the Moment
        </h2>
        <p className="font-serif italic text-[#6E4B0C] text-sm sm:text-base mt-1">
          Leave your wishes &amp; candid snapshots for Navneet &amp; Ruby ✨
        </p>
      </div>

      {/* =========================================================================
          1. LUXURY CREAM STATIONERY WISH & CAMERA CARD (Matches Video 2 frames 25–27)
         ========================================================================= */}
      <div className="w-full max-w-xl rounded-3xl bg-[#FFFDF9] border-2 border-[#C5932A] p-6 sm:p-10 shadow-[0_20px_50px_rgba(74,12,25,0.16)] mb-16 z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name (e.g. Sharma Family)"
              className="w-full px-4 py-3.5 rounded-xl bg-[#F9F3E5] border border-[#C5932A]/60 text-[#4A0C19] placeholder-[#8A6D3B] font-serif text-base focus:outline-none focus:border-[#6E1125]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F9F3E5] border border-[#C5932A]/60 text-[#4A0C19] font-serif text-sm sm:text-base focus:outline-none focus:border-[#6E1125]"
            >
              <option>To: Both Navneet &amp; Ruby</option>
              <option>From: Family &amp; Relatives</option>
              <option>From: Friends &amp; Colleagues</option>
            </select>

            {/* Camera & Gallery Upload Triggers */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 py-3 px-3 rounded-xl bg-[#4A0C19]/10 hover:bg-[#4A0C19]/20 text-[#4A0C19] border border-[#C5932A] text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Camera className="w-4 h-4 text-[#6E1125]" />
                <span>Snap Photo</span>
              </button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3 px-3 rounded-xl bg-[#4A0C19]/10 hover:bg-[#4A0C19]/20 text-[#4A0C19] border border-[#C5932A] text-xs font-serif font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Upload className="w-4 h-4 text-[#6E1125]" />
                <span>Add Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {previewUrl && (
            <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-[#6E1125] shadow-md">
              <Image src={previewUrl} alt="Upload preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#4A0C19] text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
              {isCompressing && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-[10px] text-gold-300">
                  Compressing...
                </div>
              )}
            </div>
          )}

          <div>
            <textarea
              rows={4}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Write your heartfelt wish for the couple..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#F9F3E5] border border-[#C5932A]/60 text-[#4A0C19] placeholder-[#8A6D3B] font-serif text-base focus:outline-none focus:border-[#6E1125] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading || isCompressing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7B162B] via-[#5E0B1C] to-[#7B162B] text-[#FFF4C2] border border-[#D4AF37] font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-lg hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Posting to Silver Jubilee Wall...</span>
              </>
            ) : (
              <>
                <span>Send Your Wishes</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-xl bg-emerald-900/15 border border-emerald-700/40 flex items-center gap-2 text-emerald-950 text-xs sm:text-sm font-serif font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Thank you! Your blessing has been added to Navneet &amp; Ruby&apos;s Silver Jubilee wall.</span>
          </motion.div>
        )}
      </div>

      {/* =========================================================================
          2. LIVE FAMILY & GUEST WISHES GALLERY (Framed Polaroid Cards)
         ========================================================================= */}
      <div className="w-full max-w-5xl z-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#C5932A]/40">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-sm sm:text-lg font-bold text-[#4A0C19] uppercase tracking-wider">
              Family Blessings &amp; Memories ({wishes.length})
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          </div>

          <button
            onClick={fetchWishes}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#4A0C19] px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#C5932A] shadow-sm hover:bg-[#4A0C19] hover:text-[#FFF3B8] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Wall</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishes.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              onClick={() => setLightboxItem(item)}
              className="rounded-2xl bg-[#FFFDF9] border-2 border-[#C5932A] overflow-hidden shadow-[0_12px_28px_rgba(74,12,25,0.14)] cursor-pointer flex flex-col justify-between p-3"
            >
              {item.imageUrl && (
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#2A050D] mb-3 border border-[#C5932A]/40">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 340px"
                  />
                </div>
              )}

              <div className="px-2 pb-1 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#4A0C19]">
                    {item.name}
                  </h4>
                  <p className="font-serif italic text-sm text-[#5C3B09] mt-1 leading-relaxed">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#C5932A]/30 text-xs font-sans text-[#8A5A10]">
                  <span>Silver Jubilee Wish</span>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="flex items-center gap-1 text-[#7B162B] font-bold hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4 fill-[#7B162B]" />
                    <span>{item.reactions || 1}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FFFDF9] text-[#4A0C19] rounded-2xl border-4 border-[#D4AF37] p-6 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#4A0C19] text-[#FFF3B8] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            {lightboxItem.imageUrl && (
              <div className="relative w-full h-72 rounded-xl overflow-hidden mb-4 border border-[#C5932A]">
                <Image
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.name}
                  fill
                  className="object-contain bg-[#1B0308]"
                  sizes="600px"
                />
              </div>
            )}
            <h3 className="font-serif text-2xl font-bold text-[#4A0C19]">
              {lightboxItem.name}
            </h3>
            <p className="font-serif italic text-base text-[#5C3B09] mt-2">
              &ldquo;{lightboxItem.message}&rdquo;
            </p>
            {lightboxItem.imageUrl && (
              <div className="mt-4 pt-3 border-t border-[#C5932A]/30 flex justify-end">
                <a
                  href={lightboxItem.imageUrl}
                  download={`navneet-ruby-wish-${lightboxItem.id}.jpg`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4A0C19] text-[#FFF3B8] font-serif font-bold text-xs uppercase"
                >
                  <Download className="w-3.5 h-3.5" /> Download Photo
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
