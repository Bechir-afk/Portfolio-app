'use client';

import React from 'react';

// Static deterministic positions — SSR safe, no Math.random
// [keyword, x%, y%, rotationDeg, fontSize_rem, opacity, depthFactor]
const KEYWORDS_DATA: [string, number, number, number, number, number, number][] = [
  ['Python',      10,  20,  -6,  0.80, 0.12, 2],
  ['TypeScript',  78,  14,   8,  0.75, 0.11, 2],
  ['Docker',      30,  78,  -4,  0.78, 0.12, 2],
  ['Arduino',     88,  52,  10,  0.72, 0.10, 2],
  ['STM32',       18,  60,  -8,  0.76, 0.11, 2],
  ['LoRa',        60,  32,   5,  0.80, 0.13, 2],
  ['numpy',       44,  90,  -3,  0.74, 0.10, 2],
  ['stdlib',      92,  76,   7,  0.72, 0.11, 2],
  ['mathbot',      4,  86,  -9,  0.76, 0.10, 2],
  ['React',       55,  5,    4,  0.82, 0.12, 2],
  ['Kubernetes',  24,  42,  -5,  0.70, 0.09, 2],
  ['PostgreSQL',  72,  96,   6,  0.72, 0.10, 2],
];

const KW_COLORS = ['#507DBC', '#A1C6EA', '#507DBC', '#A1C6EA', '#507DBC', '#A1C6EA',
                   '#507DBC', '#A1C6EA', '#507DBC', '#A1C6EA', '#507DBC', '#A1C6EA'];

export interface KeywordItem {
  keyword: string;
  x: number;
  y: number;
  rotation: number;
  fontSize: number;
  opacity: number;
  depthFactor: number;
  color: string;
  id: string;
}

export function getTechKeywords(isMobile: boolean): KeywordItem[] {
  const data = isMobile ? KEYWORDS_DATA.slice(0, 6) : KEYWORDS_DATA;
  return data.map(([keyword, x, y, rotation, fontSize, opacity, depthFactor], i) => ({
    keyword,
    x,
    y,
    rotation,
    fontSize,
    opacity,
    depthFactor,
    color: KW_COLORS[i] ?? '#507DBC',
    id: `kw-${i}`,
  }));
}

interface Props {
  items: KeywordItem[];
  refs: React.RefObject<(HTMLSpanElement | null)[]>;
}

export default function TechKeywords({ items, refs }: Props) {
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
            left:       `${item.x}%`,
            top:        `${item.y}%`,
            transform:  `rotate(${item.rotation}deg)`,
            opacity:    item.opacity,
            color:      item.color,
            fontSize:   `${item.fontSize}rem`,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
          aria-hidden="true"
        >
          {item.keyword}
        </span>
      ))}
    </>
  );
}
