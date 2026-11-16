import { NextRequest, NextResponse } from 'next/server';
import { uploadGuestPhotoDirect, isDriveConfigured } from '@/lib/googleDrive';
import { GuestWishItem } from '@/config/mediaAssets';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const guestName = (formData.get('guestName') as string) || 'Loving Guest';
    const wish = (formData.get('wish') as string) || 'Happy 25th Silver Jubilee Anniversary!';

    let imageUrl = '/fam/DSC4214.jpg'; // fallback image
    let driveFileId = undefined;

    if (file && typeof file !== 'string') {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (isDriveConfigured()) {
        const uploadResult = await uploadGuestPhotoDirect({
          buffer,
          filename: file.name,
          mimeType: file.type || 'image/jpeg',
          guestName,
          wish,
        });
        driveFileId = uploadResult.fileId;
        imageUrl = `/api/drive/stream/${uploadResult.fileId}`;
      } else {
        // Convert small compressed client image into base64 data URL for instant live display in ₹0 demo mode
        if (buffer.length < 3 * 1024 * 1024) {
          imageUrl = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
        }
      }
    }

    const newItem: GuestWishItem = {
      id: driveFileId || `guest-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: guestName,
      message: wish,
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
      reactions: 1,
      driveFileId,
    };

    return NextResponse.json({
      success: true,
      message: 'Wish and photograph shared successfully with Navneet & Ruby!',
      item: newItem,
    });
  } catch (error: any) {
    console.error('Direct upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload photo and wish' },
      { status: 500 }
    );
  }
}
