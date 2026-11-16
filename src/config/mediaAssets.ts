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
  weddingDate: "2001-11-25",
  weddingDateDisplay: "25 November 2001",
  weddingYear: 2001,
  celebrationDate: "2026-11-25",
  celebrationYear: 2026,
  celebrationDateDisplay: "Wednesday, 25 November 2026",
  celebrationTimeDisplay: "7:00 PM Onwards (IST)",
  celebrationDateTimeIso: "2026-11-25T19:00:00+05:30",
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
      "Namaste! We are delighted to confirm our presence for the 25th Silver Jubilee celebration of Navneet Goel & Ruby Goel on Wednesday, 25 November 2026 at 7:00 PM at Golden Dreams Banquets, Kalkaji, New Delhi.",
  },
};

export const AUDIO_CONFIG = {
  themeUrl: "/flow/silver-jubilee-theme.mp3",
  title: "Ayodhya Ram Mandir Royal Shehnai & Sitar Symphony",
  artist: "Raag Yaman Classical Ensemble",
};

export const ITINERARY_EVENTS = [
  {
    time: "7:00 PM",
    title: "The Royal Welcome & Tilak",
    description:
      "Warm family welcome at Golden Dreams Banquets with classical notes, rose petal showers, and signature mocktails.",
    icon: "Flower2",
  },
  {
    time: "7:45 PM",
    title: "The Silver Varmala & Ring Exchange",
    description:
      "Exchange of silver-threaded mogra & rose garlands and commemoration of 25 years of sacred vows.",
    icon: "HeartHandshake",
  },
  {
    time: "8:30 PM",
    title: "Silver Jubilee Cake Cutting & Family Blessings",
    description:
      "Grand Silver Jubilee cake celebration, heartfelt toasts by children and family, and joyful dance performances.",
    icon: "Sparkles",
  },
  {
    time: "9:15 PM",
    title: "Musical Sangeet & Pure-Veg Royal Feast",
    description:
      "Soulful melodies, family games, and an opulent 100% pure-vegetarian royal culinary feast.",
    icon: "Music",
  },
];

export const CLOTHESLINE_MEMORIES: MemoryPhoto[] = [
  {
    id: "mem-2001-varmala",
    title: "The Sacred Varmala",
    year: "2001",
    dateStr: "25 November 2001",
    caption:
      "Where two souls met under a canopy of blessings, exchanging garlands and a promise of seven lifetimes.",
    src: "/fam/SAVE_20211122_010512.jpg",
    aspectRatio: "landscape",
    tag: "Wedding Day",
    hashtag: "#howitstarted",
  },
  {
    id: "mem-2001-throne",
    title: "The Royal Wedding Throne",
    year: "2001",
    dateStr: "25 November 2001",
    caption:
      "Seated side by side as bride and groom — the foundation of twenty-five years of unwavering companionship.",
    src: "/flow/asset-b-start-frame-2001.jpg",
    aspectRatio: "landscape",
    tag: "2001 Reception",
    hashtag: "#sacredbeginnings",
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
    id: "mem-2026-silver",
    title: "The Silver Jubilee Portrait",
    year: "2026",
    dateStr: "25 November 2026",
    caption:
      "Twenty-five years of grace, strength, and timeless togetherness — Navneet & Ruby Goel.",
    src: "/fam/DSC4214.jpg",
    aspectRatio: "portrait",
    tag: "Silver Jubilee",
    hashtag: "#25yearsoftogetherness",
  },
];

export const HOST_VAULT_ITEMS: MemoryPhoto[] = [
  {
    id: "vault-1",
    title: "The Sacred Varmala Ceremony (25 Nov 2001)",
    year: "2001",
    dateStr: "25 Nov 2001",
    caption: "Navneet & Ruby Goel on their wedding night, adorned in traditional bridal finery and floral garlands.",
    src: "/fam/SAVE_20211122_010512.jpg",
    aspectRatio: "landscape",
    tag: "2001 Wedding",
  },
  {
    id: "vault-2",
    title: "Wedding Reception Throne (25 Nov 2001)",
    year: "2001",
    dateStr: "25 Nov 2001",
    caption: "The beginning of a 25-year journey seated on the carved silver wedding thrones.",
    src: "/flow/asset-b-start-frame-2001.jpg",
    aspectRatio: "landscape",
    tag: "Archive 2001",
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
    title: "The Silver Jubilee Couple Portrait (2026)",
    year: "2026",
    dateStr: "25 Nov 2026",
    caption: "Navneet & Ruby Goel celebrating 25 glorious years of love and family.",
    src: "/fam/DSC4214.jpg",
    aspectRatio: "portrait",
    tag: "Silver Jubilee",
  },
];

export const DEMO_GUEST_WISHES: GuestWishItem[] = [];

export const AYODHYA_VIDEO_CLIPS = {
  prologueMorningSun: {
    src: '/videos/ayodhya/ram-mandir-morning-sun.mp4',
    startTime: 0.1,
    endTime: 13.9,
  },
  clip1HeroExterior: {
    src: '/videos/ayodhya/clip1-4.mp4',
    startTime: 0.1,
    endTime: 9.85,
  },
  clip2MandapamCorridor: {
    src: '/videos/ayodhya/clip1-4.mp4',
    startTime: 10.15,
    endTime: 19.85,
  },
  clip3PeacockBridge: {
    src: '/videos/ayodhya/clip1-4.mp4',
    startTime: 20.15,
    endTime: 29.85,
  },
  clip4RoyalMandapSofa: {
    src: '/videos/ayodhya/clip1-4.mp4',
    startTime: 30.15,
    endTime: 39.9,
  },
  clip5LotusPondFinale: {
    src: '/videos/ayodhya/clip5.mp4',
    startTime: 0.1,
    endTime: 9.9,
  },
};
