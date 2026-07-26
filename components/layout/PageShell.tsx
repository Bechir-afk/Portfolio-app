'use client';

import React from 'react';
import InteractiveBackground from '@/components/background/InteractiveBackground';

interface PageShellProps {
  children: React.ReactNode;
}

/**
 * Root layout wrapper.
 * Renders InteractiveBackground as a fixed z-0 layer behind all content.
 * Content is rendered in a relative z-10 wrapper.
 *
 * SPEC-001 FR-001 to FR-006
 */
export default function PageShell({ children }: PageShellProps) {
  return (
    <>
      {/* Fixed background layer — z-0, pointer-events none, aria-hidden */}
      <InteractiveBackground />

      {/* Content layer — z-10, relative positioning */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </>
  );
}
