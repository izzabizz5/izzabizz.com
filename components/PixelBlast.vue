<template>
  <canvas ref="canvas" class="w-full h-full" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  particleCount?: number;
  colors?: string[];
  speed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 100,
  colors: () => ['#193650', '#194462', '#FFFBA9'],
  speed: 1
});

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animationId: number | null = null;
let clusters: Cluster[] = [];

class Cluster {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = 50 + Math.random() * 100;
  }

  update(width: number, height: number, speed: number) {
    this.x += this.vx * speed;
    this.y += this.vy * speed;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Keep within bounds
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));
  }
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  clusterId: number;

  constructor(width: number, height: number, colors: string[], clusterId: number) {
    this.baseX = Math.random() * width;
    this.baseY = Math.random() * height;
    this.x = this.baseX;
    this.y = this.baseY;
    this.size = Math.random() * 2.5 + 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)] || '#FFFBA9';
    this.clusterId = clusterId;
  }

  update(clusters: Cluster[], speed: number) {
    const cluster = clusters[this.clusterId];
    if (!cluster) return;

    // Move towards cluster center
    const dx = cluster.x - this.x;
    const dy = cluster.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      this.x += (dx / distance) * speed * 0.5;
      this.y += (dy / distance) * speed * 0.5;
    }

    // Add some randomness
    this.x += (Math.random() - 0.5) * speed * 0.3;
    this.y += (Math.random() - 0.5) * speed * 0.3;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
  }
}

const resize = () => {
  if (!canvas.value) return;
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.value.getBoundingClientRect();
  
  canvas.value.width = rect.width * dpr;
  canvas.value.height = rect.height * dpr;
  canvas.value.style.width = `${rect.width}px`;
  canvas.value.style.height = `${rect.height}px`;
  
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
};

const createParticle = () => {
  if (!canvas.value) return;
  const clusterId = Math.floor(Math.random() * clusters.length);
  particles.push(new Particle(
    canvas.value.width,
    canvas.value.height,
    props.colors,
    clusterId
  ));
};

const animate = () => {
  if (!canvas.value || !ctx) return;

  const rect = canvas.value.getBoundingClientRect();
  
  // Clear with background color
  ctx.fillStyle = '#193650';
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Update clusters
  clusters.forEach(cluster => {
    cluster.update(rect.width, rect.height, props.speed);
  });

  // Update and draw particles
  particles.forEach(particle => {
    particle.update(clusters, props.speed);
    particle.draw(ctx!);
  });

  // Maintain particle count
  while (particles.length < props.particleCount) {
    createParticle();
  }
  if (particles.length > props.particleCount) {
    particles = particles.slice(0, props.particleCount);
  }

  animationId = requestAnimationFrame(animate);
};

const init = () => {
  if (!canvas.value) return;

  ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  resize();

  const rect = canvas.value.getBoundingClientRect();
  
  // Create clusters
  const clusterCount = Math.floor(props.particleCount / 50);
  for (let i = 0; i < clusterCount; i++) {
    clusters.push(new Cluster(rect.width, rect.height));
  }

  // Initialize particles
  for (let i = 0; i < props.particleCount; i++) {
    createParticle();
  }

  animate();
};

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  particles = [];
  clusters = [];
};

onMounted(() => {
  init();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  cleanup();
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  display: block;
}
</style>
