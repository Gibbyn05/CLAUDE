// Audio generator for Reachr video
// Produces: background music + 8 SFX as 16-bit mono WAV files

'use strict';
const fs   = require('fs');
const path = require('path');

const SR = 44100; // sample rate

// ── WAV writer ────────────────────────────────────────────────────────────────
function writeWav(file, samples, sr = SR) {
  const data  = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);          // PCM chunk size
  header.writeUInt16LE(1,  20);          // PCM
  header.writeUInt16LE(1,  22);          // mono
  header.writeUInt32LE(sr, 24);
  header.writeUInt32LE(sr * 2, 28);      // byte rate
  header.writeUInt16LE(2, 32);           // block align
  header.writeUInt16LE(16, 34);          // bits
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);
  fs.writeFileSync(file, Buffer.concat([header, data]));
  console.log('  wrote', path.basename(file), `(${(data.length/2/sr).toFixed(2)}s)`);
}

// ── Simple filters ────────────────────────────────────────────────────────────
function highpass(s, alpha = 0.95) {
  let prev = 0;
  return s.map(v => { const out = alpha * (prev + v - prev); prev = v; return out; });
  // correct implementation:
}
function hpFilter(s, coef = 0.92) {
  const out = new Float32Array(s.length);
  let y = 0;
  for (let i = 0; i < s.length; i++) {
    y = coef * (y + s[i] - (i > 0 ? s[i-1] : 0));
    out[i] = y;
  }
  return out;
}
function lpFilter(s, coef = 0.15) {
  const out = new Float32Array(s.length);
  let y = 0;
  for (let i = 0; i < s.length; i++) {
    y += coef * (s[i] - y);
    out[i] = y;
  }
  return out;
}
// Simple reverb: a few comb delays summed
function reverb(s, decays = [[0.30, 1000], [0.22, 1500], [0.15, 2200]]) {
  const out = new Float32Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s[i] * 0.6;
  for (const [gain, delay] of decays) {
    for (let i = delay; i < s.length; i++) {
      out[i] += s[i - delay] * gain;
    }
  }
  // Normalize
  let peak = 0;
  for (let i = 0; i < out.length; i++) if (Math.abs(out[i]) > peak) peak = Math.abs(out[i]);
  if (peak > 0.9) for (let i = 0; i < out.length; i++) out[i] *= 0.9 / peak;
  return out;
}

// ── Background music ──────────────────────────────────────────────────────────
// Upbeat startup feel: C major, 124 BPM, pad + arpeggio + soft kick + bass
function genBgMusic(dur = 26) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);

  const BPM   = 124;
  const beat  = 60 / BPM;       // ~0.484s per beat
  const eighth = beat / 2;       // ~0.242s per 8th

  // Arpeggio pattern (Hz) — two-octave C major pentatonic ascent + descent
  const arpNotes = [
    261.63, 329.63, 392.00, 523.25,  // C4 E4 G4 C5
    523.25, 392.00, 329.63, 261.63,  // back down
    261.63, 392.00, 523.25, 659.25,  // C4 G4 C5 E5
    659.25, 523.25, 392.00, 261.63,  // back
  ];

  // Bass pattern: root on 1 & 3, fifth on 2 & 4
  const bassNotes = [130.81, 130.81, 196.00, 130.81]; // C3 C3 G3 C3

  for (let i = 0; i < n; i++) {
    const t = i / SR;

    // ── Pad (slow attack 2s) ───────────────────────────────────────────────
    const padAtt = Math.min(1, t / 2);
    const tremolo = 1 + 0.03 * Math.sin(2 * Math.PI * 0.4 * t);
    const pad = padAtt * tremolo * (
      0.065 * Math.sin(2 * Math.PI * 130.81 * t) +
      0.050 * Math.sin(2 * Math.PI * 196.00 * t) +
      0.040 * Math.sin(2 * Math.PI * 261.63 * t) +
      0.030 * Math.sin(2 * Math.PI * 329.63 * t) +
      0.020 * Math.sin(2 * Math.PI * 392.00 * t) +
      0.012 * Math.sin(2 * Math.PI * 523.25 * t)
    );

    // ── Arpeggio ───────────────────────────────────────────────────────────
    const arpIdx   = Math.floor((t / eighth) % arpNotes.length);
    const arpFreq  = arpNotes[arpIdx];
    const arpPhase = (t % eighth) / eighth;
    // 2ms linear attack, then exponential decay for a plucky feel
    const arpAtt   = Math.min(1, arpPhase / (0.002 / eighth));
    const arpEnv   = arpAtt * Math.exp(-arpPhase * 5);
    const arp = 0.10 * arpEnv * (
      Math.sin(2 * Math.PI * arpFreq * t) +
      0.3 * Math.sin(2 * Math.PI * arpFreq * 2 * t) +
      0.1 * Math.sin(2 * Math.PI * arpFreq * 3 * t)
    );

    // ── Bass ───────────────────────────────────────────────────────────────
    const bassIdx   = Math.floor((t / beat) % bassNotes.length);
    const bassFreq  = bassNotes[bassIdx];
    const bassPhase = (t % beat) / beat;
    const bassEnv   = Math.exp(-bassPhase * 3);
    const bass = 0.10 * bassEnv * (
      Math.sin(2 * Math.PI * bassFreq * t) +
      0.4 * Math.sin(2 * Math.PI * bassFreq * 2 * t)
    );

    // ── Soft kick (every beat) ─────────────────────────────────────────────
    const kickPhase = (t % beat) / beat;
    const kickFreq  = 60 * Math.exp(-kickPhase * 20); // pitch envelope 60→~0 Hz
    const kickEnv   = Math.exp(-kickPhase * 18);
    const kick = 0.12 * kickEnv * Math.sin(2 * Math.PI * kickFreq * t);

    // ── Soft hi-hat (every 8th) ────────────────────────────────────────────
    const hatPhase = (t % eighth) / eighth;
    const hatEnv   = Math.exp(-hatPhase * 80); // very fast decay
    // Simulate hi-hat with high-freq sine mix
    const hat = 0.03 * hatEnv * Math.sin(2 * Math.PI * 8000 * t) * (Math.random() * 0.3 + 0.7);

    // ── Mix ────────────────────────────────────────────────────────────────
    const fadeOut = t > dur - 1.5 ? (dur - t) / 1.5 : 1;
    s[i] = (pad + arp + bass + kick + hat) * fadeOut;
  }

  // Light reverb on the whole mix
  return reverb(s, [[0.20, 882], [0.14, 1323], [0.09, 1985]]);
}

// ── SFX generators ────────────────────────────────────────────────────────────

// Notification ping: 880Hz + harmonics, short pluck
function genPing(dur = 0.40) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 10) * 0.8;
    s[i] = env * (
      0.55 * Math.sin(2 * Math.PI * 880 * t) +
      0.20 * Math.sin(2 * Math.PI * 1760 * t) +
      0.10 * Math.sin(2 * Math.PI * 2640 * t) +
      0.05 * Math.sin(2 * Math.PI * 3520 * t)
    );
  }
  return s;
}

// Reveal whoosh: pink noise sweep with rising-then-falling envelope
function genWhoosh(dur = 0.55) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  let lpY = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = t < dur * 0.35
      ? t / (dur * 0.35)
      : 1 - (t - dur * 0.35) / (dur * 0.65);
    const noise = Math.random() * 2 - 1;
    // Band-pass: LP at sliding cutoff (~1000→4000 Hz) keeps it airy
    const lp = t / dur; // 0..1
    const cutoff = 0.02 + lp * 0.22;
    lpY += cutoff * (noise - lpY);
    s[i] = lpY * env * 0.7;
  }
  return hpFilter(s, 0.85);
}

// Reveal chime: C6 chord, soft bell
function genChime(dur = 0.65) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  const notes = [1046.50, 1318.51, 1567.98]; // C6 E6 G6
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const att = Math.min(1, t / 0.008); // 8ms attack
    const dec = Math.exp(-t * 5);
    const env = att * dec;
    s[i] = env * (
      0.45 * Math.sin(2 * Math.PI * notes[0] * t) +
      0.25 * Math.sin(2 * Math.PI * notes[1] * t) +
      0.15 * Math.sin(2 * Math.PI * notes[2] * t) +
      0.08 * Math.sin(2 * Math.PI * notes[0] * 3 * t)
    );
  }
  return reverb(s, [[0.25, 600], [0.15, 900]]);
}

// Bubble pop: pitch descent 350→60 Hz
function genPop(dur = 0.22) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  const f0 = 350, f1 = 60;
  for (let i = 0; i < n; i++) {
    const t  = i / SR;
    const env = Math.exp(-t * 14) * 0.9;
    // Correct frequency sweep (integrated phase)
    const phase = 2 * Math.PI * (f0 * t + (f1 - f0) * t * t / (2 * dur));
    s[i] = env * Math.sin(phase);
  }
  return s;
}

// Rubber stamp thud: 70 Hz low thud + brief noise impact
function genStamp(dur = 0.30) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    // Pitch envelope: 120→50 Hz
    const pEnv = Math.exp(-t * 10);
    const freq  = 50 + 70 * pEnv;
    const env   = Math.exp(-t * 14) * 0.85;
    const thud  = Math.sin(2 * Math.PI * freq * t);
    // Impact noise (very short)
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 60) * 0.4;
    s[i] = env * thud + noise;
  }
  return s;
}

// Keyboard typing: burst of high-freq clicks at ~8 Hz
function genTyping(dur = 2.40) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);

  // Place keystrokes with slight jitter at ~9 keys/sec average
  let t = 0.04;
  while (t < dur - 0.08) {
    const kf  = Math.floor(t * SR);
    const bLen = Math.floor(0.018 * SR); // 18ms burst
    for (let j = 0; j < bLen; j++) {
      if (kf + j >= n) break;
      const bt  = j / SR;
      const env = Math.exp(-bt * 200); // 5ms decay
      s[kf + j] += (Math.random() * 2 - 1) * env * 0.45;
    }
    t += 0.085 + (Math.random() - 0.5) * 0.04; // 65–105ms interval
  }

  // Bandpass at ~3.5 kHz: HP then LP
  return lpFilter(hpFilter(s, 0.80), 0.40);
}

// Email send swoosh: 440→1320 Hz ascending sweep, bright
function genSend(dur = 0.48) {
  const n   = Math.ceil(dur * SR);
  const s   = new Float32Array(n);
  const f0  = 440, f1 = 1320;
  for (let i = 0; i < n; i++) {
    const t    = i / SR;
    const att  = Math.min(1, t / 0.008);
    const dec  = t > dur * 0.65 ? 1 - (t - dur * 0.65) / (dur * 0.35) : 1;
    const env  = att * dec * 0.75;
    const phase = 2 * Math.PI * (f0 * t + (f1 - f0) * t * t / (2 * dur));
    s[i] = env * (
      0.7 * Math.sin(phase) +
      0.2 * Math.sin(2 * phase) +
      0.07 * Math.sin(3 * phase)
    );
  }
  return s;
}

// Card drag soft thud: 130 Hz, very short
function genDrag(dur = 0.28) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t   = i / SR;
    const env = Math.exp(-t * 22) * 0.7;
    s[i] = env * (
      Math.sin(2 * Math.PI * 130 * t) +
      0.3 * Math.sin(2 * Math.PI * 260 * t)
    );
  }
  return s;
}

// Mouse click: short mechanical click (2kHz transient + click body)
function genClick(dur = 0.12) {
  const n = Math.ceil(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t   = i / SR;
    // Initial transient: very short noise burst
    const transient = (Math.random() * 2 - 1) * Math.exp(-t * 400) * 0.7;
    // Body: 1.8kHz tone with fast decay
    const body = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 70) * 0.4;
    // Release click
    const release = (Math.random() * 2 - 1) * Math.exp(-Math.max(0, t - 0.04) * 300) * 0.3;
    s[i] = transient + body + release;
  }
  return lpFilter(hpFilter(s, 0.75), 0.55);
}

// Error tone: descending minor 3rd (A4→F#4), dissonant
function genError(dur = 0.22) {
  const n  = Math.ceil(dur * SR);
  const s  = new Float32Array(n);
  const f0 = 440, f1 = 369.99; // A4 → F#4 (descending)
  for (let i = 0; i < n; i++) {
    const t    = i / SR;
    const att  = Math.min(1, t / 0.006);
    const dec  = t > dur * 0.55 ? 1 - (t - dur * 0.55) / (dur * 0.45) : 1;
    const env  = att * dec * 0.8;
    // First note full dur, second overlaps from 40ms
    const phase1 = 2 * Math.PI * f0 * t;
    const phase2 = 2 * Math.PI * f1 * Math.max(0, t - 0.04);
    const mix2   = Math.min(1, Math.max(0, (t - 0.04) / 0.01));
    s[i] = env * (Math.sin(phase1) * 0.5 + Math.sin(phase2) * mix2 * 0.5);
  }
  return s;
}

// ── Write all files ───────────────────────────────────────────────────────────
const OUT = path.join(__dirname, '..', 'public', 'audio');
fs.mkdirSync(OUT, { recursive: true });

console.log('Generating audio...');
writeWav(path.join(OUT, 'bg_music.wav'),  genBgMusic(26));
writeWav(path.join(OUT, 'sfx_ping.wav'),  genPing());
writeWav(path.join(OUT, 'sfx_whoosh.wav'),genWhoosh());
writeWav(path.join(OUT, 'sfx_chime.wav'), genChime());
writeWav(path.join(OUT, 'sfx_pop.wav'),   genPop());
writeWav(path.join(OUT, 'sfx_stamp.wav'), genStamp());
writeWav(path.join(OUT, 'sfx_type.wav'),  genTyping());
writeWav(path.join(OUT, 'sfx_send.wav'),  genSend());
writeWav(path.join(OUT, 'sfx_drag.wav'),  genDrag());
writeWav(path.join(OUT, 'sfx_click.wav'), genClick());
writeWav(path.join(OUT, 'sfx_error.wav'), genError());
console.log('Done.');
