// ReachrVideo timing constants — 9:16, 25s @ 30fps = 750 frames
// S1 Hook 5s | S2 Problem 4s | S3 Solution 6s | S4 Features 7s | S5 CTA 3s

export const RV2_DUR = {
  s1: 150,   // 5s  — Hook
  s2: 120,   // 4s  — Problem
  s3: 180,   // 6s  — Solution
  s4: 210,   // 7s  — Features  (3 × 70f)
  s5: 90,    // 3s  — CTA
  total: 750,
} as const;

export const RV2_OFF = {
  s1: 0,
  s2: 150,
  s3: 270,
  s4: 450,
  s5: 660,
} as const;
