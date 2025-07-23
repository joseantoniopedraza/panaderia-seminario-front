import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #fef7f0 0%, #fbbf24 100%)',
          fontSize: 24,
          borderRadius: 4,
        }}
      >
        🥖
      </div>
    ),
    size
  )
}
