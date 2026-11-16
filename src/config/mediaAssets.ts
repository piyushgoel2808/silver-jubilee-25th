export interface MemoryPhoto {
  id: string;
  title: string;
  year: string;
  dateStr: string;
  caption: string;
  src: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  tag?: string;
  hashtag?: string;
  isVideo?: boolean;
  isNoteCard?: boolean;
  noteQuote?: string;
  noteSub?: string;
}

export interface GuestWishItem {
  id: string;
  name: string;
  relation?: string;
  message: string;
  imageUrl?: string;
  createdAt: string;
  reactions?: number;
  driveFileId?: string;
}

export const EVENT_DETAILS = {
  celebration: "25th Wedding Anniversary (Silver Jubilee)",
  couple: "Navneet Goel & Ruby Goel",
  groom: "Navneet Goel",
  bride: "Ruby Goel",
  weddingDate: "2003-11-25",
  weddingDateDisplay: "25 November 2003",
  weddingYear: 2003,
  celebrationDate: "2028-11-25",
  celebrationYear: 2028,
  celebrationDateDisplay: "Saturday, 25 November 2028",
  celebrationTimeDisplay: "7:30 PM Onwards (IST)",
  celebrationDateTimeIso: "2028-11-25T19:30:00+05:30",
  timezone: "Asia/Kolkata",
  utcOffset: "+05:30",
  sacredChant: "॥ ॐ श्री गणेशाय नमः ॥",
  sacredChantSub: "Om Shree Ganeshaya Namah",
  ganeshaShloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
  ramChant: "॥ श्री राम जय राम जय जय राम ॥",
  invitationLead: "With the divine blessings of Shri Ram Lalla & Lord Ganesha",
  hostsLead: "The Goel Family cordially invites you to celebrate the 25th Silver Jubilee of",
  complimentsFrom: [
    "Piyush Goel & Aadish Goel",
    "Goel Estates & Goel Fashion Mart",
    "All Near & Dear Relatives of the Goel Family",
  ],
  hashtag: "#25YearsOfNavneetAndRuby",
  venue: {
    name: "Golden Dreams Banquets",
    addressLine1: "Ajit Tower, 59/18, Guru Ravidas Marg",
    area: "Ami Chand Khand, Block AC, Block K, Kalkaji",
    city: "New Delhi, Delhi 110019",
    fullAddress:
      "Golden Dreams Banquets, Ajit Tower, 59/18, Guru Ravidas Marg, Ami Chand Khand, Block AC, Block K, Kalkaji, New Delhi, Delhi 110019",
    venuePhone: "088268 48864",
    country: "India",
    googleMapsUrl: "https://g.co/kgs/LZSEpF",
    lat: 28.5355,
    lng: 77.2610,
  },
  dressCode: {
    theme: "Royal Silver, Ivory & Pastels",
    description:
      "Gentlemen: Bandhgalas, Sherwanis or Suits in Silver, Ivory or Charcoal. Ladies: Silver-zari Sarees, Lehengas or Pastel Couture.",
  },
  weather: {
    expected: "Pleasant Delhi November Evening",
    temperature: "~18°C / 64°F",
    recommendation: "Crisp autumn-winter breeze — a light shawl or stole is recommended.",
  },
  parking: {
    title: "Complimentary Valet Parking",
    details:
      "Dedicated valet attendants will welcome you right at the main entrance of Golden Dreams Banquets, Ajit Tower, Kalkaji.",
  },
  rsvp: {
    contactName: "Goel Family (Piyush & Navneet Goel)",
    phone: "+917042636062",
    phoneDisplay: "+91 70426 36062",
    venuePhoneDisplay: "088268 48864",
    email: "navvnnitgoel@gmail.com",
    whatsappText:
      "Namaste! We are delighted to confirm our presence for the 25th Silver Jubilee celebration of Navneet Goel & Ruby Goel on 25 November at Golden Dreams Banquets, Kalkaji, New Delhi.",
  },
};

export const AUDIO_CONFIG = {
  themeUrl: "/flow/silver-jubilee-theme.mp3",
  title: "Ayodhya Ram Mandir Royal Shehnai & Sitar Symphony",
  artist: "Raag Yaman Classical Ensemble",
};

export const ITINERARY_EVENTS = [
  {
    time: "7:30 PM",
    title: "The Royal Welcome & Tilak",
    description:
      "Warm family welcome at Golden Dreams Banquets with classical notes, rose petal showers, and signature mocktails.",
    icon: "Flower2",
  },
  {
    time: "8:15 PM",
    title: "The Silver Varmala & Ring Exchange",
    description:
      "Exchange of silver-threaded mogra & rose garlands and commemoration of 25 years of sacred vows.",
    icon: "HeartHandshake",
  },
  {
    time: "9:00 PM",
    title: "Silver Jubilee Cake Cutting & Family Blessings",
    description:
      "Grand Silver Jubilee cake celebration, heartfelt toasts by children and family, and joyful dance performances.",
    icon: "Sparkles",
  },
  {
    time: "9:45 PM",
    title: "Musical Sangeet & Pure-Veg Royal Feast",
    description:
      "Soulful melodies, family games, and an opulent 100% pure-vegetarian royal culinary feast.",
    icon: "Music",
  },
];

/**
 * Curated Clothesline Track (4 best couple photos interleaved with 3 royal parchment story notes)
 */
export const CLOTHESLINE_MEMORIES: MemoryPhoto[] = [
  {
    id: "mem-2003-varmala",
    title: "The Sacred Varmala",
    year: "2003",
    dateStr: "25 November 2003",
    caption:
      "Where two souls met under a canopy of blessings, exchanging garlands and a promise of seven lifetimes.",
    src: "/fam/SAVE_20211122_010512.jpg",
    aspectRatio: "landscape",
    tag: "Wedding Day",
    hashtag: "#howitstarted",
  },
  {
    id: "note-1",
    title: "A Promise Written in the Stars",
    year: "2003",
    dateStr: "Chapter I",
    caption: "",
    src: "",
    isNoteCard: true,
    noteQuote:
      "Some stories begin with grand gestures. Ours started on 25 November 2003 with a simple smile, sacred vows, and an unspoken promise to walk every mile hand in hand.",
    noteSub: "25 • 11 • 2003",
  },
  {
    id: "mem-2003-throne",
    title: "The Royal Wedding Throne",
    year: "2003",
    dateStr: "25 November 2003",
    caption:
      "Seated side by side as bride and groom — the foundation of twenty-five years of unwavering companionship.",
    src: "/flow/asset-b-start-frame-2001.jpg",
    aspectRatio: "landscape",
    tag: "2003 Reception",
    hashtag: "#sacredbeginnings",
  },
  {
    id: "note-2",
    title: "Growing Together",
    year: "2015",
    dateStr: "Chapter II",
    caption: "",
    src: "",
    isNoteCard: true,
    noteQuote:
      "Friendship grew into something deeper, and we realized life's richest treasures were the quiet morning teas, family laughter, and dreams we built together.",
    noteSub: "A Home Filled With Grace",
  },
  {
    id: "mem-2019-sentosa",
    title: "Adventures Hand in Hand",
    year: "2019",
    dateStr: "August 2019",
    caption:
      "Exploring the world together with the same youthful joy, warmth, and effortless harmony.",
    src: "/fam/IMG-20190811-WA0033.jpg",
    aspectRatio: "landscape",
    tag: "Travel Memories",
    hashtag: "#adventures",
  },
  {
    id: "note-3",
    title: "Twenty-Five Glorious Years",
    year: "25th",
    dateStr: "Chapter III",
    caption: "",
    src: "",
    isNoteCard: true,
    noteQuote:
      "Quarter of a century later, the silver shine of our journey reflects every blessing, every shared triumph, and a love that only grows brighter with time.",
    noteSub: "25 Years of Togetherness",
  },
  {
    id: "mem-silver-jubilee",
    title: "The Silver Jubilee Portrait",
    year: "25th",
    dateStr: "25 November",
    caption:
      "Twenty-five years of grace, strength, and timeless togetherness — Navneet & Ruby Goel.",
    src: "/fam/DSC4214.jpg",
    aspectRatio: "portrait",
    tag: "Silver Jubilee",
    hashtag: "#25yearsoftogetherness",
  },
];

/**
 * Curated Host Vault Items (Focused strictly on the 4 best couple portraits)
 */
export const HOST_VAULT_ITEMS: MemoryPhoto[] = [
  {
    id: "vault-1",
    title: "The Sacred Varmala Ceremony (25 Nov 2003)",
    year: "2003",
    dateStr: "25 Nov 2003",
    caption: "Navneet & Ruby Goel on their wedding night, adorned in traditional bridal finery and floral garlands.",
    src: "/fam/SAVE_20211122_010512.jpg",
    aspectRatio: "landscape",
    tag: "2003 Wedding",
  },
  {
    id: "vault-2",
    title: "Wedding Reception Throne (25 Nov 2003)",
    year: "2003",
    dateStr: "25 Nov 2003",
    caption: "The beginning of a 25-year journey seated on the carved silver wedding thrones.",
    src: "/flow/asset-b-start-frame-2001.jpg",
    aspectRatio: "landscape",
    tag: "Archive 2003",
  },
  {
    id: "vault-3",
    title: "Adventures Together — Sentosa",
    year: "2019",
    dateStr: "August 2019",
    caption: "Cherished travel memories together across the years.",
    src: "/fam/IMG-20190811-WA0033.jpg",
    aspectRatio: "landscape",
    tag: "Travel",
  },
  {
    id: "vault-4",
    title: "The Silver Jubilee Couple Portrait",
    year: "25th",
    dateStr: "25 November",
    caption: "Navneet & Ruby Goel celebrating 25 glorious years of love and family.",
    src: "/fam/DSC4214.jpg",
    aspectRatio: "portrait",
    tag: "Silver Jubilee",
  },
];

export const DEMO_GUEST_WISHES: GuestWishItem[] = [];

/**
 * Drop-in 10-Second AI Video Clip Slots for Shri Ram Janmabhoomi Mandir, Ayodhya (UP, India).
 * When you generate the 10-second clips using the prompts in `AI_VIDEO_PROMPTS_AYODHYA_RAM_MANDIR.md`
 * and place them into `public/videos/ayodhya/`, the website automatically plays them in sequence
 * (with responsive 16:9 desktop and 9:16 mobile variants).
 * Until those files are dropped in, the website renders the 60fps Animated Ayodhya Ram Mandir
 * Scrollytelling Panorama (never showing broken or unrelated stock videos).
 */
export const AYODHYA_VIDEO_CLIPS = {
  clip1HeroExterior: {
    desktop: '/videos/ayodhya/clip1-ram-mandir-hero-16x9.mp4',
    mobile: '/videos/ayodhya/clip1-ram-mandir-hero-9x16.mp4',
  },
  clip2MandapamCorridor: {
    desktop: '/videos/ayodhya/clip2-ram-mandir-corridor-16x9.mp4',
    mobile: '/videos/ayodhya/clip2-ram-mandir-corridor-9x16.mp4',
  },
  clip3PeacockBridge: {
    desktop: '/videos/ayodhya/clip3-ram-mandir-peacock-bridge-16x9.mp4',
    mobile: '/videos/ayodhya/clip3-ram-mandir-peacock-bridge-9x16.mp4',
  },
  clip4RoyalMandapSofa: {
    desktop: '/videos/ayodhya/clip4-ram-mandir-royal-mandap-16x9.mp4',
    mobile: '/videos/ayodhya/clip4-ram-mandir-royal-mandap-9x16.mp4',
  },
  clip5LotusPondFinale: {
    desktop: '/videos/ayodhya/clip5-ram-mandir-lotus-pond-16x9.mp4',
    mobile: '/videos/ayodhya/clip5-ram-mandir-lotus-pond-9x16.mp4',
  },
};
