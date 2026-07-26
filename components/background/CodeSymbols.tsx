'use client';

import React from 'react';

// ─── Static deterministic positions (SSR-safe, no Math.random) ───────────────
// Each entry: [x%, y%, rotationDeg, scale, opacity, depthFactor]
// depthFactor: 1 = slow (large), 2 = medium, 3 = fast (small)
const LARGE_SYMBOLS: [string, number, number, number, number, number, number][] = [
  ['{',   8,  12,  -15, 2.4, 0.18, 1],
  ['}',  88,  18,   12, 2.2, 0.16, 1],
  ['=>', 22,  72,   -8, 1.8, 0.14, 1],
  [';',  72,  65,   20, 2.6, 0.20, 1],
  ['//', 45,  30,   -5, 1.6, 0.13, 1],
  ['&&', 14,  48,   18, 2.0, 0.15, 1],
  ['||', 80,  82,  -12, 2.1, 0.17, 1],
  ['{',  58,  10,    8, 2.3, 0.14, 1],
  ['}',  35,  88,  -18, 2.0, 0.16, 1],
  ['=>', 92,  44,   15, 1.9, 0.13, 1],
  ['//', 5,   78,   -6, 2.2, 0.15, 1],
  ['&&', 68,  36,   22, 1.7, 0.14, 1],
  [';',  25,  55,  -10, 2.5, 0.19, 1],
  ['||', 50,  95,    4, 2.0, 0.15, 1],
  ['{',  78,  58,  -20, 1.8, 0.13, 1],
  ['=>', 3,   32,   10, 2.1, 0.16, 1],
  [';',  95,  70,   -7, 2.3, 0.18, 1],
  ['}',  42,  20,   14, 1.9, 0.14, 1],
];

const SMALL_SYMBOLS: [string, number, number, number, number, number, number][] = [
  ['{',  18,  25,  -12, 0.9, 0.09, 3],
  ['}',  76,  30,   16, 0.8, 0.08, 3],
  [';',  33,  62,   -8, 1.0, 0.10, 3],
  ['//', 62,  48,    5, 0.7, 0.08, 3],
  ['&&', 48,  78,  -15, 0.9, 0.09, 3],
  ['||', 84,  15,   12, 0.8, 0.08, 3],
  ['=>', 12,  90,   -4, 0.7, 0.07, 3],
  ['{',  55,  22,   18, 1.0, 0.09, 3],
  ['}',  28,  40,  -10, 0.8, 0.08, 3],
  [';',  90,  55,    8, 0.9, 0.10, 3],
  ['//', 7,   68,  -14, 0.7, 0.07, 3],
  ['&&', 70,  85,    6, 0.8, 0.08, 3],
  ['=>', 40,  5,   -18, 0.9, 0.09, 3],
  ['||', 20,  75,   10, 0.7, 0.08, 3],
  ['{',  95,  28,  -6,  0.8, 0.07, 3],
  ['}',  52,  60,   14, 0.9, 0.09, 3],
  [';',  6,   45,  -8,  1.0, 0.10, 3],
  ['//', 82,  70,    4, 0.7, 0.08, 3],
  ['&&', 38,  92,  -12, 0.8, 0.08, 3],
  ['||', 65,  8,    16, 0.9, 0.09, 3],
  ['{',  44,  38,   -5, 0.7, 0.07, 3],
  ['}',  15,  58,   10, 0.8, 0.08, 3],
  [';',  78,  42,  -16, 0.9, 0.09, 3],
];

// Palette accent colors for symbols
const COLORS = ['#507DBC', '#A1C6EA', '#04080F'];
const COLOR_CYCLE = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1];

export interface SymbolItem {
  symbol: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  depthFactor: number;
  color: string;
  id: string;
}

export function getCodeSymbols(isMobile: boolean): SymbolItem[] {
  const large = isMobile ? LARGE_SYMBOLS.slice(0, 9) : LARGE_SYMBOLS;
  const small = isMobile ? SMALL_SYMBOLS.slice(0, 12) : SMALL_SYMBOLS;
  const all = [...large, ...small];
  return all.map(([symbol, x, y, rotation, scale, opacity, depthFactor], i) => ({
    symbol,
    x,
    y,
    rotation,
    scale,
    opacity,
    depthFactor,
    color: COLORS[COLOR_CYCLE[i % COLOR_CYCLE.length] ?? 0] ?? '#507DBC',
    id: `sym-${i}`,
  }));
}

interface Props {
  items: SymbolItem[];
  refs: React.RefObject<(HTMLSpanElement | null)[]>;
}

export default function CodeSymbols({ items, refs }: Props) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={item.id}
          ref={(el) => {
            if (refs.current) refs.current[i] = el;
          }}
          className="bg-item"
          style={{
            left:      `${item.x}%`,
            top:       `${item.y}%`,
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
            opacity:   item.opacity,
            color:     item.color,
            fontSize:  item.scale > 1.5 ? 'clamp(1.5rem, 3vw, 2.8rem)' : 'clamp(0.75rem, 1.5vw, 1.1rem)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {item.symbol}
        </span>
      ))}
    </>
  );
}
