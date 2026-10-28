import { skillLogoSpec } from "./skills-icons";

// One logo for any skill: its brand mark in brand colour, or its area glyph.
export function SkillLogo({ name, area, size = 16 }: { name: string; area: string; size?: number }) {
  const s = skillLogoSpec(name, area);
  if (!s) return null;
  if (s.kind === "brand") {
    return (
      <svg className="sk-logo brand" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={s.color ? { color: s.color } : undefined}>
        <path fill="currentColor" d={s.path} />
      </svg>
    );
  }
  return (
    <svg className="sk-logo glyph" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d={s.path} />
    </svg>
  );
}
