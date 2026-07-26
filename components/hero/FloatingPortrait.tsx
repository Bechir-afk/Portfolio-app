'use client';

import Image from 'next/image';

/**
 * Above-the-fold portrait image.
 * priority: true — marks as LCP, disables lazy load.
 * No frame, no clip-path, no border — free-floating silhouette.
 * CSS filter provides the glowing drop-shadow halo.
 */
export default function FloatingPortrait() {
  return (
    <Image
      src="/photo.png"
      alt="Bechir Ben Rabia"
      priority
      width={420}
      height={520}
      sizes="(max-width: 768px) 70vw, 420px"
      style={{
        filter:
          'drop-shadow(0 0 20px rgba(80,125,188,0.55))'
          + ' drop-shadow(0 0 60px rgba(161,198,234,0.3))',
        borderRadius: 0,
        border: 'none',
        clipPath: 'none',
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
