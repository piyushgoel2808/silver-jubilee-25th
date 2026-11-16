import { NextRequest, NextResponse } from 'next/server';
import { listGuestWishes, listHostVaultFiles, isDriveConfigured } from '@/lib/googleDrive';

export const revalidate = 60; // Cache for 60 seconds

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'guest';

    if (type === 'vault') {
      const items = await listHostVaultFiles();
      return NextResponse.json({
        success: true,
        isDriveConnected: isDriveConfigured(),
        items,
      });
    }

    const items = await listGuestWishes();
    return NextResponse.json({
      success: true,
      isDriveConnected: isDriveConfigured(),
      items,
    });
  } catch (error: any) {
    console.error('Fetch media error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
