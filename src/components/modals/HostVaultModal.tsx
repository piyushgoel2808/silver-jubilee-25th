'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HOST_VAULT_ITEMS, MemoryPhoto } from '@/config/mediaAssets';
import { X, Play, Image as ImageIcon, Sparkles, ExternalLink } from 'lucide-react';

interface HostVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HostVaultModal({ isOpen, onClose }: HostVaultModalProps) {
  const [items, setItems] = useState<MemoryPhoto[]>(HOST_VAULT_ITEMS);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<MemoryPhoto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    fetch('/api/drive/media?type=vault')
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch((err) => console.warn('Vault fetch fallback:', err))
      .finally(() => setIsLoading(false));
  }, [isOpen]);

  const filteredItems = items.filter((item) => {
    if (filter === 'photo') return !item.isVideo;
    if (filter === 'video') return item.isVideo;
    return true;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl"
      >
        <div className="relative w-full max-w-5xl h-[90vh] rounded-3xl royal-glass border border-gold-400/50 flex flex-col overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-gold-500/20 flex items-center justify-between bg-burgundy-950/70">
            <div>
              <div className="flex items-center gap-2 text-gold-300">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <h3 className="font-cinzel text-base sm:text-xl font-bold uppercase tracking-wider text-white">
                  Family Vault &amp; Google Flow AI Cinema
                </h3>
              </div>
              <p className="text-xs text-gold-200/80 font-serif italic mt-0.5">
                Archival milestones and AI-motion portraits spanning 2001 to 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter tabs */}
              <div className="hidden sm:flex rounded-full bg-black/50 p-1 border border-gold-500/30">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-xs rounded-full font-serif tracking-wider transition-all ${
                    filter === 'all' ? 'bg-gold-500 text-burgundy-950 font-bold' : 'text-slate-300'
                  }`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setFilter('photo')}
                  className={`px-3 py-1 text-xs rounded-full font-serif tracking-wider transition-all ${
                    filter === 'photo' ? 'bg-gold-500 text-burgundy-950 font-bold' : 'text-slate-300'
                  }`}
                >
                  Photos
                </button>
                <button
                  onClick={() => setFilter('video')}
                  className={`px-3 py-1 text-xs rounded-full font-serif tracking-wider transition-all ${
                    filter === 'video' ? 'bg-gold-500 text-burgundy-950 font-bold' : 'text-slate-300'
                  }`}
                >
                  AI Videos
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-burgundy-950 text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gold-300 gap-3">
                <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-cinzel">Loading Vault Archives...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-xl overflow-hidden bg-burgundy-950 border border-gold-500/30 cursor-pointer shadow-md flex flex-col"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {item.isVideo ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gold-500/90 text-burgundy-950 flex items-center justify-center shadow-gold-glow">
                            <Play className="w-5 h-5 fill-burgundy-950 ml-0.5" />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-gold-300 font-sans backdrop-blur-sm border border-gold-500/30">
                          {item.tag || 'Photo'}
                        </div>
                      )}

                      <div className="absolute bottom-2 left-2 right-2 text-left">
                        <span className="text-[10px] font-sans font-bold text-gold-400 uppercase tracking-wider">
                          {item.year}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full-Screen Cinema Lightbox */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-white hover:text-gold-400 p-2 text-sm uppercase tracking-widest font-sans flex items-center gap-1"
            >
              <X className="w-6 h-6" /> Close
            </button>
            <div
              className="relative max-w-3xl max-h-[80vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] max-h-[600px] rounded-2xl overflow-hidden border-2 border-gold-400 shadow-gold-glow-lg">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-serif text-2xl font-bold text-gold-200">
                  {selectedItem.title} ({selectedItem.year})
                </h3>
                <p className="text-sm font-serif italic text-slate-300 mt-1 max-w-lg">
                  {selectedItem.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
