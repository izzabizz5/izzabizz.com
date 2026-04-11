<template>
  <div class="organic-bg">
    <svg
      class="bg-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="liq" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="62"/>
        </filter>
      </defs>

      <!-- Very dark magenta-black base -->
      <rect width="1920" height="1080" fill="#0E000C"/>

      <!-- Organic blobs — deep magenta, wine, hot pink -->
      <g filter="url(#liq)">
        <!-- Deep wine, lower-left mass -->
        <circle cx="200"  cy="820"  r="540" fill="#5A0038"/>
        <!-- Muted magenta, center-left -->
        <circle cx="560"  cy="440"  r="480" fill="#9C0055"/>
        <!-- Dark purple, upper-right -->
        <circle cx="1480" cy="240"  r="500" fill="#4A0040"/>
        <!-- Wine-magenta, lower-right -->
        <circle cx="1580" cy="820"  r="440" fill="#780040"/>
        <!-- Bright magenta, center -->
        <circle cx="920"  cy="560"  r="380" fill="#B8005A"/>
        <!-- Deep purple, far right -->
        <circle cx="1820" cy="480"  r="360" fill="#380030"/>
        <!-- Hot pink, top-center -->
        <circle cx="840"  cy="120"  r="300" fill="#A00050"/>
        <!-- Dark magenta, center-right -->
        <circle cx="1240" cy="680"  r="320" fill="#480038"/>
        <!-- Soft pink highlight, upper-left -->
        <circle cx="280"  cy="200"  r="280" fill="#C8005E" opacity="0.70"/>
        <!-- Warm wine, lower-center -->
        <circle cx="1060" cy="960"  r="320" fill="#620040" opacity="0.85"/>
        <!-- Muted rose, top-right -->
        <circle cx="1680" cy="120"  r="240" fill="#8A004C" opacity="0.80"/>
        <!-- Deep pink accent -->
        <circle cx="700"  cy="900"  r="260" fill="#900048" opacity="0.70"/>
      </g>

      <!-- Bubble layer -->
      <g>
        <g v-for="b in bubbles" :key="`b${b.cx}${b.cy}`">
          <circle
            :cx="b.cx" :cy="b.cy" :r="b.r"
            :fill="b.fill || 'rgba(255,255,255,0.06)'"
            stroke="rgba(255,255,255,0.14)"
            stroke-width="1.5"/>
          <circle
            :cx="b.cx" :cy="b.cy" :r="b.r * 0.84"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            :stroke-width="b.r * 0.13"/>
          <circle
            :cx="b.cx - b.r * 0.27"
            :cy="b.cy - b.r * 0.30"
            :r="b.r * 0.20"
            fill="rgba(255,255,255,0.40)"/>
          <circle
            :cx="b.cx - b.r * 0.17"
            :cy="b.cy - b.r * 0.19"
            :r="b.r * 0.07"
            fill="rgba(255,255,255,0.85)"/>
        </g>
      </g>
    </svg>

    <!-- Subtle grain/halftone overlay -->
    <div class="halftone"></div>
  </div>
</template>

<script setup>
const bubbles = [
  // Large
  { cx: 325,  cy: 182,  r: 118, fill: 'rgba(200,0,100,0.18)'   },
  { cx: 825,  cy: 418,  r: 95,  fill: 'rgba(255,255,255,0.07)' },
  { cx: 1285, cy: 288,  r: 128, fill: 'rgba(180,0,90,0.16)'    },
  { cx: 482,  cy: 698,  r: 86,  fill: 'rgba(220,0,120,0.14)'   },
  { cx: 1102, cy: 772,  r: 108, fill: 'rgba(255,255,255,0.07)' },
  { cx: 1648, cy: 518,  r: 90,  fill: 'rgba(160,0,80,0.18)'    },
  // Medium
  { cx: 172,  cy: 492,  r: 58,  fill: 'rgba(255,255,255,0.10)' },
  { cx: 658,  cy: 192,  r: 52,  fill: 'rgba(200,0,100,0.20)'   },
  { cx: 948,  cy: 145,  r: 64,  fill: 'rgba(255,255,255,0.08)' },
  { cx: 1402, cy: 168,  r: 46,  fill: 'rgba(180,0,90,0.20)'    },
  { cx: 238,  cy: 775,  r: 54,  fill: 'rgba(200,0,100,0.16)'   },
  { cx: 872,  cy: 618,  r: 60,  fill: 'rgba(255,255,255,0.08)' },
  { cx: 1188, cy: 565,  r: 45,  fill: 'rgba(160,0,80,0.14)'    },
  { cx: 1722, cy: 358,  r: 52,  fill: 'rgba(140,0,70,0.18)'    },
  { cx: 592,  cy: 858,  r: 48,  fill: 'rgba(255,255,255,0.08)' },
  { cx: 1462, cy: 822,  r: 58,  fill: 'rgba(200,0,100,0.16)'   },
  { cx: 1052, cy: 342,  r: 43,  fill: 'rgba(180,0,90,0.16)'    },
  { cx: 388,  cy: 548,  r: 50,  fill: 'rgba(255,255,255,0.10)' },
  { cx: 128,  cy: 288,  r: 36,  fill: 'rgba(200,0,100,0.20)'   },
  // Small
  { cx: 442,  cy: 322,  r: 28 },
  { cx: 722,  cy: 558,  r: 22 },
  { cx: 1352, cy: 442,  r: 30 },
  { cx: 1582, cy: 172,  r: 25 },
  { cx: 282,  cy: 628,  r: 18 },
  { cx: 982,  cy: 872,  r: 24 },
  { cx: 1202, cy: 152,  r: 20 },
  { cx: 752,  cy: 302,  r: 26 },
  { cx: 1482, cy: 682,  r: 19 },
  { cx: 368,  cy: 452,  r: 23 },
  { cx: 1102, cy: 468,  r: 17 },
  { cx: 782,  cy: 742,  r: 21 },
  { cx: 1352, cy: 732,  r: 27 },
  { cx: 1558, cy: 392,  r: 16 },
  { cx: 618,  cy: 438,  r: 20 },
]
</script>

<style scoped>
.organic-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.halftone {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.025) 1.2px, transparent 1.2px);
  background-size: 6px 6px;
  pointer-events: none;
}
</style>
