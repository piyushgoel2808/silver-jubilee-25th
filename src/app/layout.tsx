import type { Metadata, Viewport } from 'next';
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Great_Vibes,
  Montserrat,
} from 'next/font/google';
import './globals.css';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-greatvibes',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Navneet & Ruby Goel | 25th Wedding Anniversary (Silver Jubilee)',
  description:
    'Celebrating 25 Years of Love & Togetherness (25 November 2001 - 25 November 2026). Join the Goel Family at Golden Dreams Banquets, Kalkaji, New Delhi for the Silver Jubilee Gala.',
  keywords: [
    'Navneet Goel',
    'Ruby Goel',
    '25th Wedding Anniversary',
    'Silver Jubilee',
    'Goel Family',
    'Golden Dreams Banquets Kalkaji',
    'New Delhi',
  ],
  authors: [{ name: 'The Goel Family' }],
  openGraph: {
    title: 'Navneet & Ruby Goel • 25th Silver Jubilee Invitation',
    description:
      'Celebrating 25 Years of Eternal Love & Togetherness. Wednesday, 25 November 2026 at Golden Dreams Banquets, Kalkaji, New Delhi.',
    type: 'website',
    images: [
      {
        url: '/fam/DSC4214.jpg',
        width: 1200,
        height: 630,
        alt: 'Navneet & Ruby Goel 25th Anniversary',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#2B050D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} dark scroll-smooth`}
    >
      <body className="bg-[#160307] text-[#F8F1E5] antialiased overflow-x-hidden selection:bg-gold-500 selection:text-burgundy-950">
        {children}
      </body>
    </html>
  );
}
