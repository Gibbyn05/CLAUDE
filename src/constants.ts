// Shared constants — edit copy, colors, and timing here

export const FPS = 30;

export const COLORS = {
  bg: '#08080E',
  card: 'rgba(255, 255, 255, 0.05)',
  cardBorder: 'rgba(255, 255, 255, 0.10)',
  primary: '#00E5C8',       // neon teal
  secondary: '#A78BFA',     // purple
  text: '#F8F8FF',          // off-white
  muted: '#8B8FA8',
  danger: '#FF5C5C',
  glowPrimary: 'rgba(0, 229, 200, 0.20)',
  glowSecondary: 'rgba(167, 139, 250, 0.20)',
};

// All durations in frames at 30 fps
export const DURATIONS = {
  scene1: 90,   // 0–3s   Hook
  scene2: 120,  // 3–7s   Pain
  scene3: 90,   // 7–10s  Shift
  scene4: 150,  // 10–15s Solution
  scene5: 210,  // 15–22s Benefits
  scene6: 90,   // 22–25s Proof
  scene7: 90,   // 25–28s CTA
  total:  840,  // 28s
};

// Absolute start offsets
export const OFFSETS = {
  scene1: 0,
  scene2: 90,
  scene3: 210,
  scene4: 300,
  scene5: 450,
  scene6: 660,
  scene7: 750,
};

// Safe-area padding (px) for mobile
export const SAFE = { h: 60, v: 80 };

// All Norwegian copy in one place — easy to edit
export const COPY = {
  brand: 'Kling Vekst',
  site:  'klingvekst.no',

  scene1: {
    headline: 'Får du for\nfå leads?',
    sub:      'Du er ikke alene.',
  },

  scene2: {
    line1: 'Manuelle oppgaver',
    line2: '= treg vekst',
    icons: [
      { emoji: '📋', label: 'Sjekklister' },
      { emoji: '📧', label: 'E-post' },
      { emoji: '📅', label: 'Booking' },
      { emoji: '📊', label: 'Rapporter' },
    ],
  },

  scene3: {
    headline: 'Bytt til et\nvekstsystem',
  },

  scene4: {
    headline: 'Kling Vekst',
    sub:      'Automatiserer markedsføring\nog oppfølging.',
    cardA: { icon: '📣', title: 'Annonser' },
    cardB: { icon: '🔁', title: 'Oppfølging' },
  },

  scene5: {
    bullets: [
      { icon: '📡', text: 'Mer synlighet' },
      { icon: '💬', text: 'Flere henvendelser' },
      { icon: '⏰', text: 'Mer tid i hverdagen' },
    ],
  },

  scene6: {
    headline: 'Se veksten\ni tall',
    badge:    '+XX%',  // placeholder — edit freely
  },

  scene7: {
    headline: 'Klar for vekst?',
    cta:      'Book gratis strategiøkt',
  },
};
