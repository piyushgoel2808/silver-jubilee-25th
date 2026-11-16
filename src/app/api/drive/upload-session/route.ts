import { NextRequest, NextResponse } from 'next/server';
import { createResumableUploadSession, isDriveConfigured } from '@/lib/googleDrive';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, mimeType, guestName, wish, fileSize } = body;

    if (!filename || !mimeType) {
      return NextResponse.json({ error: 'Missing filename or mimeType' }, { status: 400 });
    }

    if (!isDriveConfigured()) {
      // Free ₹0 simulated mode when .env.local keys are not provided
      return NextResponse.json({
        simulated: true,
        message: 'Google Drive credentials not set. Uploading via simulated direct mode.',
        uploadUrl: '/api/drive/upload',
      });
    }

    const session = await createResumableUploadSession({
      filename,
      mimeType,
      guestName: guestName || 'Loving Family Member',
      wish: wish || 'Heartiest congratulations on your 25th Silver Jubilee!',
      fileSize,
    });

    if (!session) {
      return NextResponse.json({
        simulated: true,
        uploadUrl: '/api/drive/upload',
      });
    }

    return NextResponse.json({
      simulated: false,
      uploadUrl: session.uploadUrl,
    });
  } catch (error: any) {
    console.error('Upload session error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize upload session' },
      { status: 500 }
    );
  }
}
