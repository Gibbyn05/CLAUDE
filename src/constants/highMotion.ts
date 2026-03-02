// High-motion composition constants
// Edit Norwegian copy, colors, and timing here — nowhere else.

export const FPS = 30;

export const HM_COLORS = {
  bg:          '#070710',
  bgDeep:      '#040408',
  card:        'rgba(255, 255, 255, 0.045)',
  cardBorder:  'rgba(255, 255, 255, 0.10)',
  primary:     '#00E5C8',   // neon teal
  secondary:   '#A78BFA',   // purple
  accent:      '#FF6B6B',   // warm coral (chaos scenes)
  text:        '#F8F8FF',
  muted:       '#7B7FA0',
  glowPrimary:   'rgba(0, 229, 200, 0.28)',
  glowSecondary: 'rgba(167, 139, 250, 0.28)',
  glowAccent:    'rgba(255, 107, 107, 0.22)',
};

// Duration of each scene in frames at 30 fps
export const HM_DURATIONS = {
  scene1:     60,   // 0–2s    Impact Hook
  scene2:    120,   // 2–6s    Chaos
  scene3:    120,   // 6–10s   Control Shift
  scene4:    180,   // 10–16s  Product Power
  scene5:    120,   // 16–20s  Benefit Burst
  scene6:    120,   // 20–24s  Strong CTA
  total:     720,   // 24s
  whip:       12,   // overlap frames for each WhipTransition overlay
};

// Absolute start offsets in the composition timeline
export const HM_OFFSETS = {
  scene1:   0,
  scene2:  60,
  scene3: 180,
  scene4: 300,
  scene5: 480,
  scene6: 600,
};

// Safe-area padding (px) for mobile
export const HM_SAFE = { h: 60, v: 80 };

// All Norwegian copy in one place
export const HM_COPY = {
  brand: 'Kling Vekst',
  site:  'klingvekst.no',

  scene1: {
    headline: 'Får du for\nfå leads?',
  },

  scene2: {
    line1: 'Manuelle oppgaver.',
    line2: 'Treg vekst.',
    cards: [
      { emoji: '📋', label: 'Sjekklister' },
      { emoji: '📧', label: 'E-post' },
      { emoji: '📅', label: 'Rapporter' },
      { emoji: '🔄', label: 'Manuell booking' },
    ],
  },

  scene3: {
    headline: 'Bytt til et system.',
    sub: 'Et system som jobber for deg — døgnet rundt.',
  },

  scene4: {
    panels: [
      { icon: '📣', title: 'Annonser',     sub: 'Automatiserte kampanjer' },
      { icon: '🔁', title: 'Oppfølging',   sub: 'CRM & e-post-flyt' },
      { icon: '📈', title: 'Analyse',      sub: 'Vekst i sanntid' },
    ],
    badge: '+XX%',  // placeholder — edit freely
  },

  scene5: {
    bullets: [
      { icon: '💬', text: 'Flere henvendelser' },
      { icon: '⚙️', text: 'Mindre manuelt arbeid' },
      { icon: '📊', text: 'Stabil vekst' },
    ],
  },

  scene6: {
    headline: 'Klar for vekst?',
    cta:      'Book strategiøkt',
    site:     'klingvekst.no',
  },
};
