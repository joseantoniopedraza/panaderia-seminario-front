import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(135deg, #fef7f0 0%, #fbbf24 100%)',
          fontSize: 120,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 160, marginBottom: 30 }}>🥖</div>
        <div style={{ color: '#92400e' }}>Panadería Delicias</div>
        <div style={{ fontSize: 40, color: '#d97706', marginTop: 10 }}>
          Horneado con amor
        </div>
      </div>
    ),
    size
  )
}
