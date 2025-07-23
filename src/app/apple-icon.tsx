import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 120,
          borderRadius: 20,
        }}
      >
        🥖
      </div>
    ),
    size
  )
}
