'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import TimelineItem from './TimelineItem';
import type { Experience, Leadership, Education } from '@/data/resume';

gsap.registerPlugin(ScrollTrigger);

type TimelineEntry = Experience | Leadership | Education;

function getEntryKey(entry: TimelineEntry): string {
  if ('company' in entry) return `${entry.role}-${entry.company}`;
  if ('org' in entry)     return `${entry.role}-${entry.org}`;
  return `${entry.degree}-${entry.institution}`;
}

function getRole(entry: TimelineEntry): string {
  if ('company' in entry) return entry.role;
  if ('org' in entry)     return entry.role;
  return entry.degree;
}

function getOrg(entry: TimelineEntry): string {
  if ('company' in entry) return entry.company;
  if ('org' in entry)     return entry.org;
  return entry.institution;
}

function getStart(entry: TimelineEntry): string {
  if ('date' in entry) return entry.date;
  return entry.start;
}

function getEnd(entry: TimelineEntry): string {
  if ('date' in entry) return '';
  return entry.end;
}

function getTechs(entry: TimelineEntry): string[] | undefined {
  if ('technologies' in entry) return entry.technologies;
  if ('coursework' in entry)   return entry.coursework;
  return undefined;
}

interface TimelineProps {
  items: TimelineEntry[];
  icon: React.ReactNode;
  headingKey: string;
}

export default function Timeline({ items, icon, headingKey }: TimelineProps) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<SVGLineElement>(null);
  const itemsRef     = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          // Desktop: animations active (FR-423 – FR-426)
          isDesktop: '(min-width: 640px) and (prefers-reduced-motion: no-preference)',
          // Mobile or reduced-motion: static (FR-427, FR-429)
          isStatic:  '(max-width: 639px), (prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isDesktop } = ctx.conditions as { isDesktop: boolean };

          if (!isDesktop) {
            // Show everything statically — no animation
            if (lineRef.current) {
              const length = lineRef.current.getTotalLength?.() ?? 0;
              gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: 0 });
            }
            gsap.set(itemsRef.current, { opacity: 1, x: 0 });
            return;
          }

          // SVG connector draw (FR-423, FR-424)
          if (lineRef.current) {
            const length = lineRef.current.getTotalLength?.() ?? 500;
            gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(lineRef.current, {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true,
              },
            });
          }

          // Item stagger reveal (FR-425, FR-426)
          itemsRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(
              el,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: i * 0.1,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse',
                },
              },
            );
          });

          return () => mm.revert();
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <Section
      id={headingKey.replace(/\./g, '-')}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) 2rem',
      }}
    >
      {/* Section heading (FR-421) */}
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          color: 'var(--text-dark)',
          marginBottom: '2rem',
          lineHeight: 1.1,
        }}
      >
        {t(headingKey as Parameters<typeof t>[0])}
      </h2>

      {/* Timeline layout */}
      <div ref={containerRef} style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* SVG connector (FR-422, FR-423) — hidden on mobile via CSS */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 2,
            height: '100%',
            overflow: 'visible',
          }}
          className="timeline-connector"
        >
          <line
            ref={lineRef}
            x1="1" y1="0"
            x2="1" y2="100%"
            stroke="rgba(80, 125, 188, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Timeline items */}
        {items.map((entry, i) => (
          <div
            key={getEntryKey(entry)}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
          >
            <TimelineItem
              role={getRole(entry)}
              org={getOrg(entry)}
              start={getStart(entry)}
              end={getEnd(entry)}
              descKey={entry.descKey}
              technologies={getTechs(entry)}
              icon={icon}
            />
          </div>
        ))}
      </div>

      {/* Hide SVG connector on mobile (FR-427) */}
      <style>{`
        @media (max-width: 639px) {
          .timeline-connector { display: none; }
        }
      `}</style>
    </Section>
  );
}
