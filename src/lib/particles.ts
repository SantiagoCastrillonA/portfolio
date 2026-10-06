/**
 * Deterministic particle cloud that draws a "</>" glyph out of small triangles.
 * Ported from the mockup's buildParticles(): same seed, same LCG, same output,
 * so the hero renders identically on every build with zero client-side JS.
 */

export type ParticleColor = 'accent' | 'yellow' | 'violet' | 'blue' | 'fg';

export interface Particle {
  x: number;
  y: number;
  /** Side of the triangle's bounding box, in px. */
  size: number;
  /** Rotation in degrees. */
  rotate: number;
  opacity: number;
  color: ParticleColor;
}

export const PARTICLE_BOX = { width: 520, height: 440 } as const;

const SEED = 20261005;

// Strokes of "</>" as [x1, y1, x2, y2] inside PARTICLE_BOX.
const SEGMENTS: ReadonlyArray<readonly [number, number, number, number]> = [
  [150, 70, 35, 220],
  [35, 220, 150, 370],
  [325, 50, 205, 390],
  [380, 70, 495, 220],
  [495, 220, 380, 370],
];

const GLYPH_PARTICLES = 300;
const AMBIENT_PARTICLES = 70;

function colorFor(k: number): ParticleColor {
  if (k < 0.45) return 'accent';
  if (k < 0.62) return 'yellow';
  if (k < 0.78) return 'violet';
  if (k < 0.9) return 'blue';
  return 'fg';
}

export function buildParticles(seed = SEED): Particle[] {
  let state = seed;
  const rnd = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const gauss = () => {
    const u = rnd() || 1e-6;
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  const lengths = SEGMENTS.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1));
  const total = lengths.reduce((sum, l) => sum + l, 0);
  const particles: Particle[] = [];

  SEGMENTS.forEach(([x1, y1, x2, y2], i) => {
    const n = Math.round((lengths[i] / total) * GLYPH_PARTICLES);
    for (let j = 0; j < n; j++) {
      const t = rnd();
      // Evaluation order matters: it must match the mockup to reproduce the same cloud.
      const x = Math.round(x1 + (x2 - x1) * t + gauss() * 11);
      const y = Math.round(y1 + (y2 - y1) * t + gauss() * 11);
      const size = Math.round(5 + rnd() * 5);
      const rotate = Math.round(rnd() * 360);
      const opacity = Number((0.55 + rnd() * 0.45).toFixed(2));
      particles.push({ x, y, size, rotate, opacity, color: colorFor(rnd()) });
    }
  });

  for (let a = 0; a < AMBIENT_PARTICLES; a++) {
    const x = Math.round(rnd() * 510);
    const y = Math.round(rnd() * 430);
    const size = Math.round(3 + rnd() * 3);
    const rotate = Math.round(rnd() * 360);
    const opacity = Number((0.25 + rnd() * 0.3).toFixed(2));
    particles.push({ x, y, size, rotate, opacity, color: colorFor(rnd()) });
  }

  return particles;
}

/** Per-particle animation parameters, in SVG user units (px), degrees and milliseconds. */
export interface ParticleMotion {
  /** Offset the particle flies in from when the glyph assembles. */
  fromX: number;
  fromY: number;
  assembleDelay: number;
  /** Idle drift: amplitude, spin and timing of the endless float loop. */
  driftX: number;
  driftY: number;
  spin: number;
  driftDuration: number;
  /** Negative so every particle starts mid-loop, out of phase with the rest. */
  driftDelay: number;
}

const MOTION_SEED = 5102026;

/**
 * Deterministic motion for `count` particles. Uses its own PRNG so the
 * particle layout (buildParticles) stays identical to the mockup.
 */
export function buildMotion(count: number, seed = MOTION_SEED): ParticleMotion[] {
  let state = seed;
  const rnd = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const between = (min: number, max: number) => min + rnd() * (max - min);
  const sign = () => (rnd() < 0.5 ? -1 : 1);

  return Array.from({ length: count }, () => {
    const angle = rnd() * 2 * Math.PI;
    const distance = between(80, 220);
    const driftDuration = Math.round(between(4500, 9500));
    return {
      fromX: Math.round(Math.cos(angle) * distance),
      fromY: Math.round(Math.sin(angle) * distance),
      assembleDelay: Math.round(between(0, 700)),
      driftX: Math.round(between(2, 8) * sign()),
      driftY: Math.round(between(2, 8) * sign()),
      spin: Math.round(between(15, 60) * sign()),
      driftDuration,
      driftDelay: -Math.round(rnd() * driftDuration),
    };
  });
}
