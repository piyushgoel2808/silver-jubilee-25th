import { EVENT_DETAILS } from '@/config/mediaAssets';

export function generateIcsCalendar(): string {
  const startDate = "20261125T190000";
  const endDate = "20261125T235900";
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `silver-jubilee-25th-${Date.now()}@navneetruby25.com`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Navneet & Ruby Goel//Silver Jubilee 25th Wedding Anniversary//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Navneet & Ruby 25th Silver Jubilee',
    'X-WR-TIMEZONE:Asia/Kolkata',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Kolkata:${startDate}`,
    `DTEND;TZID=Asia/Kolkata:${endDate}`,
    `SUMMARY:${EVENT_DETAILS.couple} - 25th Wedding Anniversary (Silver Jubilee)`,
    `DESCRIPTION:Celebrating 25 Years of Love, Laughter & Togetherness (25 Nov 2001 - 25 Nov 2026).\\n\\nTime: 7:00 PM Onwards\\nDress Code: ${EVENT_DETAILS.dressCode.theme}\\nVenue: ${EVENT_DETAILS.venue.fullAddress}\\nGoogle Maps: ${EVENT_DETAILS.venue.googleMapsUrl}\\n\\nHashtag: ${EVENT_DETAILS.hashtag}\\nRSVP Contact: ${EVENT_DETAILS.rsvp.contactName} (${EVENT_DETAILS.rsvp.phoneDisplay})`,
    `LOCATION:${EVENT_DETAILS.venue.fullAddress}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder: Navneet & Ruby 25th Silver Jubilee Tomorrow at 7:00 PM at Golden Dreams Banquets, Kalkaji',
    'ACTION:DISPLAY',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'DESCRIPTION:Navneet & Ruby 25th Silver Jubilee Starts at 7:00 PM Today at Golden Dreams Banquets!',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n');
}
