// Timing constants for ReachrDesktopChaos composition
// 750 frames @ 30fps = 25 seconds

export const DC_DUR = {
  s1: 180,  // 6s  — Desktop chaos
  s2: 120,  // 4s  — Lost lead
  s3: 150,  // 5s  — Reachr enters
  s4: 180,  // 6s  — Workflow clarity
  s5: 120,  // 4s  — CTA
  total: 750,
} as const;

export const DC_OFF = {
  s1:   0,
  s2: 180,
  s3: 300,
  s4: 450,
  s5: 630,
} as const;
