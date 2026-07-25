// TODO (Phase 1 — Gemini 3.1 Pro): implement per SPEC-001
// Renders InteractiveBackground (fixed, z-0) + children (z-10)
export default function PageShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
