import { NextResponse } from 'next/server';
import { generateIcsCalendar } from '@/lib/calendar';

export async function GET() {
  const icsData = generateIcsCalendar();

  return new Response(icsData, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Navneet-Ruby-25th-Silver-Jubilee.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
