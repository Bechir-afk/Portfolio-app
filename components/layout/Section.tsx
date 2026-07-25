// TODO (Phase 1 — Gemini 3.1 Pro): implement per SPEC-001 FR-070–073
// GSAP ScrollTrigger entrance + reverse on scroll-up
export default function Section({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
