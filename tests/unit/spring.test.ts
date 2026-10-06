import { describe, expect, it } from 'vitest';
import { Spring } from '../../src/lib/spring';

const run = (spring: Spring, seconds: number, fps = 60) => {
  const trace: number[] = [];
  for (let t = 0; t < seconds; t += 1 / fps) {
    spring.step(1 / fps);
    trace.push(spring.value);
  }
  return trace;
};

describe('Spring', () => {
  it('settles on the target', () => {
    const spring = new Spring(0);
    spring.target = 1;
    run(spring, 2);
    expect(spring.isSettled()).toBe(true);
    expect(spring.value).toBe(1);
  });

  it('does not overshoot when critically damped', () => {
    const spring = new Spring(0, { dampingRatio: 1 });
    spring.target = 1;
    expect(Math.max(...run(spring, 2))).toBeLessThanOrEqual(1 + 1e-6);
  });

  it('overshoots when under-damped', () => {
    const spring = new Spring(0, { dampingRatio: 0.5 });
    spring.target = 1;
    expect(Math.max(...run(spring, 2))).toBeGreaterThan(1.05);
  });

  it('keeps its velocity when retargeted mid-flight', () => {
    const spring = new Spring(0);
    spring.target = 1;
    run(spring, 0.1);
    const { value, velocity } = spring;
    spring.target = -1;
    expect(spring.value).toBe(value);
    expect(spring.velocity).toBe(velocity);
    expect(velocity).toBeGreaterThan(0);
  });

  it('stays stable through a long dropped frame', () => {
    const spring = new Spring(0);
    spring.target = 1;
    spring.step(0.5);
    expect(Number.isFinite(spring.value)).toBe(true);
    expect(Math.abs(spring.value)).toBeLessThan(2);
  });
});
