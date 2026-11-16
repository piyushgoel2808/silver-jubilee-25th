import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: 'linear-gradient(135deg, #3d0714 0%, #1a0309 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4af37',
          borderRadius: '50%',
          border: '1.5px solid #d4af37',
          fontWeight: 'bold',
          fontFamily: 'serif',
        }}
      >
        25
      </div>
    ),
    {
      ...size,
    }
  );
}
