// Reachr video constants — 16:9, 25s @ 30fps = 750 frames

export const R_COLORS = {
  beige: '#f2efe3',
  green: '#09fe94',
  dark: '#171717',
  cream: '#faf8f2',
  muted: '#8a8075',
  red: '#e63946',
  grey: '#c8c4bc',
};

// All durations in frames at 30fps
export const R_DURATIONS = {
  s1: 120,   // 0–4s    Hook
  s2: 90,    // 4–7s    Pain (3×30f)
  s3: 120,   // 7–11s   Reveal
  s4: 270,   // 11–20s  Features (3×90f)
  s5: 60,    // 20–22s  Social Proof
  s6: 90,    // 22–25s  CTA
  total: 750,
};

export const R_OFFSETS = {
  s1: 0,
  s2: 120,
  s3: 210,
  s4: 330,
  s5: 600,
  s6: 660,
};
