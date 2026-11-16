import { NextRequest, NextResponse } from 'next/server';
import { getDriveClient, isDriveConfigured } from '@/lib/googleDrive';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const { fileId } = params;

  if (!fileId) {
    return NextResponse.json({ error: 'Missing fileId' }, { status: 400 });
  }

  const drive = getDriveClient();

  if (!drive || !isDriveConfigured() || fileId.startsWith('simulated-') || fileId.startsWith('wish-')) {
    // Return standard family photo redirect as fallback
    return NextResponse.redirect(new URL('/fam/DSC4214.jpg', req.url));
  }

  try {
    const metaRes = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size',
    });

    const mimeType = metaRes.data.mimeType || 'image/jpeg';

    const fileStreamRes = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const stream = fileStreamRes.data as unknown as NodeJS.ReadableStream;

    return new Response(stream as any, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Content-Disposition': `inline; filename="${metaRes.data.name || 'jubilee-media'}"`,
      },
    });
  } catch (err: any) {
    console.error('Error streaming file from Google Drive:', err);
    // Graceful fallback to default celebratory image
    return NextResponse.redirect(new URL('/fam/DSC4214.jpg', req.url));
  }
}
