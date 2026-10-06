/**
 * Minimal spring driven by Apple's designer-facing parameters
 * (WWDC 2018, "Designing Fluid Interfaces"):
 *
 * - dampingRatio: 1 = critically damped (no overshoot), < 1 = bouncier.
 * - response: roughly how long (s) it takes to reach the target. Not a duration.
 *
 * It always animates from its current value and keeps its velocity when the
 * target changes, so it can be retargeted at any moment without a visible seam.
 */
export interface SpringOptions {
  dampingRatio?: number;
  response?: number;
}

export class Spring {
  value: number;
  velocity = 0;
  target: number;
  private readonly stiffness: number;
  private readonly damping: number;

  constructor(initial = 0, { dampingRatio = 1, response = 0.4 }: SpringOptions = {}) {
    this.value = initial;
    this.target = initial;
    // Unit mass: k = (2π / response)², c = 4π·ζ / response.
    this.stiffness = ((2 * Math.PI) / response) ** 2;
    this.damping = (4 * Math.PI * dampingRatio) / response;
  }

  /** Advances the simulation by `dt` seconds. Returns true once at rest. */
  step(dt: number): boolean {
    // Sub-step so a dropped frame (large dt) cannot make the integration explode.
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const force = -this.stiffness * (this.value - this.target) - this.damping * this.velocity;
      this.velocity += force * h;
      this.value += this.velocity * h;
    }
    return this.isSettled();
  }

  isSettled(epsilon = 1e-3): boolean {
    if (Math.abs(this.value - this.target) < epsilon && Math.abs(this.velocity) < epsilon) {
      this.value = this.target;
      this.velocity = 0;
      return true;
    }
    return false;
  }
}
