export interface ExplosionConfig {
  x: number;
  y: number;
  lifetime?: number;
  particleCount?: number;
  speed?: number;
  color?: string;
}

export class Explosion {
  private x: number;
  private y: number;
  private particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
  }[] = [];
  private startTime: number;
  private lifetime: number;
  private color: string;
  private _ended = false;

  constructor(config: ExplosionConfig) {
    this.x = config.x;
    this.y = config.y;
    this.lifetime = config.lifetime ?? 1000;
    this.color = config.color ?? "orange";
    this.startTime = performance.now();
    this.initParticles(config.particleCount ?? 50, config.speed ?? 4);
  }

  private initParticles(count: number, maxSpeed: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * maxSpeed + 1;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
      });
    }
  }

  update(deltaTime: number): boolean {
    const elapsed = performance.now() - this.startTime;
    if (elapsed > this.lifetime) {
      this._ended = true;
      return false;
    }
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= deltaTime / this.lifetime;
    });
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((p) => {
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  get ended(): boolean {
    return this._ended;
  }
}
