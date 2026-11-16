import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';
import { DEMO_GUEST_WISHES, HOST_VAULT_ITEMS, GuestWishItem, MemoryPhoto } from '@/config/mediaAssets';

let cachedDrive: drive_v3.Drive | null = null;

export function isDriveConfigured(): boolean {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  return Boolean(clientId && clientSecret && refreshToken && clientId.trim() !== '');
}

export function getDriveClient(): drive_v3.Drive | null {
  if (!isDriveConfigured()) {
    return null;
  }

  if (cachedDrive) {
    return cachedDrive;
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    cachedDrive = google.drive({ version: 'v3', auth: oauth2Client });
    return cachedDrive;
  } catch (error) {
    console.error('Failed to initialize Google Drive client:', error);
    return null;
  }
}

export async function listGuestWishes(): Promise<GuestWishItem[]> {
  const drive = getDriveClient();
  const guestFolderId = process.env.GOOGLE_DRIVE_GUEST_FOLDER_ID;

  if (!drive || !guestFolderId) {
    return DEMO_GUEST_WISHES;
  }

  try {
    const response = await drive.files.list({
      q: `'${guestFolderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, createdTime, description, size)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    });

    const files = response.data.files || [];
    if (files.length === 0) {
      return DEMO_GUEST_WISHES;
    }

    const driveWishes: GuestWishItem[] = files.map((file) => {
      let guestName = 'Loving Guest';
      let message = 'Heartiest congratulations on 25 glorious years of love and togetherness!';
      let reactions = Math.floor(Math.random() * 15) + 5;

      if (file.description) {
        try {
          const parsed = JSON.parse(file.description);
          if (parsed.guestName) guestName = parsed.guestName;
          if (parsed.wish) message = parsed.wish;
          if (typeof parsed.reactions === 'number') reactions = parsed.reactions;
        } catch {
          // Plain text fallback
          message = file.description;
        }
      }

      return {
        id: file.id || `drive-${Math.random()}`,
        name: guestName,
        message: message,
        imageUrl: `/api/drive/stream/${file.id}`,
        createdAt: file.createdTime || new Date().toISOString(),
        reactions: reactions,
        driveFileId: file.id || undefined,
      };
    });

    // Merge with demo wishes for an abundant wall
    return [...driveWishes, ...DEMO_GUEST_WISHES];
  } catch (err) {
    console.warn('Error fetching guest wishes from Google Drive, falling back to demo data:', err);
    return DEMO_GUEST_WISHES;
  }
}

export async function listHostVaultFiles(): Promise<MemoryPhoto[]> {
  const drive = getDriveClient();
  const hostFolderId = process.env.GOOGLE_DRIVE_HOST_FOLDER_ID;

  if (!drive || !hostFolderId) {
    return HOST_VAULT_ITEMS;
  }

  try {
    const response = await drive.files.list({
      q: `'${hostFolderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webViewLink, createdTime, description)',
      orderBy: 'name asc',
      pageSize: 50,
    });

    const files = response.data.files || [];
    if (files.length === 0) {
      return HOST_VAULT_ITEMS;
    }

    const driveVault: MemoryPhoto[] = files.map((file, idx) => {
      const isVideo = (file.mimeType || '').startsWith('video/');
      return {
        id: file.id || `vault-drive-${idx}`,
        title: file.name?.replace(/\.[^/.]+$/, '') || `Memory ${idx + 1}`,
        year: '2026',
        dateStr: 'Curated Vault',
        caption: file.description || 'Treasured silver jubilee milestone memory from our Google Drive vault.',
        src: `/api/drive/stream/${file.id}`,
        isVideo: isVideo,
        aspectRatio: isVideo ? 'landscape' : 'portrait',
        tag: isVideo ? 'AI Motion Video' : 'Vault Photo',
      };
    });

    return [...driveVault, ...HOST_VAULT_ITEMS];
  } catch (err) {
    console.warn('Error fetching host vault from Google Drive, falling back to local vault:', err);
    return HOST_VAULT_ITEMS;
  }
}

export async function uploadGuestPhotoDirect(options: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  guestName: string;
  wish: string;
}): Promise<{ fileId: string; webContentLink?: string }> {
  const drive = getDriveClient();
  const guestFolderId = process.env.GOOGLE_DRIVE_GUEST_FOLDER_ID;

  if (!drive || !guestFolderId) {
    // ₹0 Fallback simulation mode
    return {
      fileId: `simulated-${Date.now()}`,
    };
  }

  const metadataDescription = JSON.stringify({
    guestName: options.guestName || 'Loving Guest',
    wish: options.wish || 'Happy 25th Silver Jubilee!',
    uploadedAt: new Date().toISOString(),
    source: 'live-guest-wall',
  });

  const readableStream = Readable.from(options.buffer);

  const fileMetadata: drive_v3.Schema$File = {
    name: `guest-${Date.now()}-${options.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
    parents: [guestFolderId],
    description: metadataDescription,
  };

  const media = {
    mimeType: options.mimeType,
    body: readableStream,
  };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id, name, webContentLink',
  });

  return {
    fileId: res.data.id || '',
    webContentLink: res.data.webContentLink || undefined,
  };
}

export async function createResumableUploadSession(options: {
  filename: string;
  mimeType: string;
  guestName: string;
  wish: string;
  fileSize?: number;
}): Promise<{ uploadUrl: string } | null> {
  const guestFolderId = process.env.GOOGLE_DRIVE_GUEST_FOLDER_ID;
  if (!isDriveConfigured() || !guestFolderId) {
    return null;
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const tokenResponse = await oauth2Client.getAccessToken();
    const accessToken = tokenResponse.token;
    if (!accessToken) throw new Error('Could not obtain access token');

    const metadata = {
      name: `guest-${Date.now()}-${options.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
      parents: [guestFolderId],
      description: JSON.stringify({
        guestName: options.guestName,
        wish: options.wish,
        uploadedAt: new Date().toISOString(),
      }),
    };

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': options.mimeType,
        ...(options.fileSize ? { 'X-Upload-Content-Length': options.fileSize.toString() } : {}),
      },
      body: JSON.stringify(metadata),
    });

    const uploadUrl = res.headers.get('location');
    if (!uploadUrl) {
      throw new Error('Resumable session location header missing');
    }

    return { uploadUrl };
  } catch (err) {
    console.error('Failed to create resumable upload session:', err);
    return null;
  }
}
