import { describe, expect, it } from 'vitest';
import { buildMotion, buildParticles, PARTICLE_BOX } from '../../src/lib/particles';

// Verbatim copy of the mockup's algorithm, used as the reference output.
function mockupParticles() {
  let seed = 20261005;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const gauss = () => {
    const u = rnd() || 1e-6;
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const segs = [
    [150, 70, 35, 220],
    [35, 220, 150, 370],
    [325, 50, 205, 390],
    [380, 70, 495, 220],
    [495, 220, 380, 370],
  ];
  let total = 0;
  const lens = segs.map((s) => {
    const l = Math.hypot(s[2] - s[0], s[3] - s[1]);
    total += l;
    return l;
  });
  const pts: Array<{ x: number; y: number; s: number; r: number; o: string; k: number }> = [];
  segs.forEach((s, i) => {
    const n = Math.round((lens[i] / total) * 300);
    for (let k = 0; k < n; k++) {
      const t = rnd();
      pts.push({
        x: Math.round(s[0] + (s[2] - s[0]) * t + gauss() * 11),
        y: Math.round(s[1] + (s[3] - s[1]) * t + gauss() * 11),
        s: Math.round(5 + rnd() * 5),
        r: Math.round(rnd() * 360),
        o: (0.55 + rnd() * 0.45).toFixed(2),
        k: rnd(),
      });
    }
  });
  for (let a = 0; a < 70; a++) {
    pts.push({
      x: Math.round(rnd() * 510),
      y: Math.round(rnd() * 430),
      s: Math.round(3 + rnd() * 3),
      r: Math.round(rnd() * 360),
      o: (0.25 + rnd() * 0.3).toFixed(2),
      k: rnd(),
    });
  }
  return pts;
}

describe('buildParticles', () => {
  it('reproduces the mockup cloud exactly', () => {
    const expected = mockupParticles();
    const actual = buildParticles();
    expect(actual).toHaveLength(expected.length);
    actual.forEach((p, i) => {
      const e = expected[i];
      expect([p.x, p.y, p.size, p.rotate, p.opacity]).toEqual([e.x, e.y, e.s, e.r, Number(e.o)]);
    });
  });

  it('is deterministic', () => {
    expect(buildParticles()).toEqual(buildParticles());
  });

  it('keeps ambient particles inside the box', () => {
    const ambient = buildParticles().slice(-70);
    for (const p of ambient) {
      expect(p.x).toBeLessThanOrEqual(PARTICLE_BOX.width);
      expect(p.y).toBeLessThanOrEqual(PARTICLE_BOX.height);
    }
  });
});

describe('buildMotion', () => {
  const motion = buildMotion(buildParticles().length);

  it('gives every particle its own motion', () => {
    expect(motion).toHaveLength(buildParticles().length);
  });

  it('is deterministic', () => {
    expect(buildMotion(10)).toEqual(buildMotion(10));
  });

  it('keeps the idle drift subtle', () => {
    for (const m of motion) {
      expect(Math.abs(m.driftX)).toBeLessThanOrEqual(8);
      expect(Math.abs(m.driftY)).toBeLessThanOrEqual(8);
      expect(m.driftDelay).toBeLessThanOrEqual(0);
      expect(-m.driftDelay).toBeLessThanOrEqual(m.driftDuration);
    }
  });
});
