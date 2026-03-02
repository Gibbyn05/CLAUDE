// Dark premium theme — NO neon, NO electric colors.
// One muted accent: warm sand. All text is warm off-white.

export const T = {
  // ── Backgrounds ─────────────────────────────────────────────────────────
  bg:       '#0A0A0C',   // near-black (main)
  bgDeep:   '#060608',   // deepest (CTA scene)
  surface1: '#131315',   // card background
  surface2: '#1A1A1D',   // elevated card
  surface3: '#212125',   // active / hovered state

  // ── Text ─────────────────────────────────────────────────────────────────
  text:     '#EDE9E3',   // warm off-white (headings)
  textSub:  '#C4BFB8',   // slightly dimmer (subheadlines)
  muted:    '#807A73',   // body / muted labels
  dim:      '#4A4843',   // very dim / disabled

  // ── Accent (warm sand — one color only) ──────────────────────────────────
  accent:   '#B8A98A',   // warm sand / gold
  accentDim:'rgba(184,169,138,0.30)',

  // ── Borders / dividers ───────────────────────────────────────────────────
  border:   'rgba(255,255,255,0.07)',
  divider:  'rgba(255,255,255,0.04)',

  // ── Font stacks ──────────────────────────────────────────────────────────
  font: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // ── Type scale (px) ──────────────────────────────────────────────────────
  size: {
    hero:   118,   // impact headline
    h1:      88,   // large headline
    h2:      64,   // section title
    h3:      50,   // tile title
    body:    40,   // body / benefit text
    label:   26,   // eyebrow / chip labels
    micro:   22,   // tiny legal / site label
  },

  // ── Letter spacing ────────────────────────────────────────────────────────
  tracking: {
    hero:  '-0.04em',
    h1:    '-0.035em',
    h2:    '-0.025em',
    body:  '-0.015em',
    label: '0.12em',
  },

  // ── Safe-area margins ─────────────────────────────────────────────────────
  safe: { h: 80, v: 120 },

  // ── Spring configs ────────────────────────────────────────────────────────
  spring: {
    snappy:   { damping: 16, stiffness: 180, mass: 0.8 },
    smooth:   { damping: 22, stiffness: 110, mass: 0.9 },
    depth:    { damping: 18, stiffness: 130, mass: 0.85 },
    push:     { damping: 30, stiffness: 140, mass: 1.0 },
  },
};
