<template>
  <div class="collage-bg" aria-hidden="true" role="presentation">

    <!-- Ghost large letterforms -->
    <span class="g-xl" style="bottom:2%;right:-4%;transform:rotate(5deg)">IZ</span>
    <span class="g-lg" style="top:22%;left:-1.5%;transform:rotate(-90deg);transform-origin:left top">PROJECTS</span>
    <span class="g-lg" style="bottom:28%;right:-1%;transform:rotate(90deg);transform-origin:right bottom">NOTES</span>

    <!-- Top-left cluster -->
    <span class="frag" style="top:3.5%;left:2%;transform:rotate(-7deg)">//001</span>
    <span class="frag red" style="top:7.5%;left:1.2%;transform:rotate(4deg)">◈</span>
    <span class="frag" style="top:2%;left:11%;transform:rotate(-1.5deg)">SEC_</span>
    <span class="frag" style="top:5%;left:7%;transform:rotate(3deg)">×</span>

    <!-- Top-right cluster -->
    <span class="frag" style="top:3%;right:3%;transform:rotate(5deg)">[PSU]</span>
    <span class="frag red" style="top:7%;right:7%;transform:rotate(-9deg)">✦</span>
    <span class="frag" style="top:2%;right:15%;transform:rotate(2deg)">26/04</span>
    <span class="frag" style="top:6%;right:12%;transform:rotate(-3deg)">//↗</span>

    <!-- Left margin -->
    <span class="frag-vert" style="top:30%;left:0.4%">CTF · CYB · SEC</span>
    <span class="frag red" style="top:58%;left:1.5%;transform:rotate(-5deg)">×</span>
    <span class="frag" style="top:64%;left:2%;transform:rotate(8deg)">//002</span>
    <span class="frag" style="top:78%;left:1%;transform:rotate(-4deg)">[02]</span>

    <!-- Right margin -->
    <span class="frag-vert" style="top:42%;right:0.5%">RADIO · WEB · PSU</span>
    <span class="frag red" style="top:36%;right:2%;transform:rotate(6deg)">◈</span>
    <span class="frag" style="top:70%;right:3%;transform:rotate(-5deg)">[EOF]</span>
    <span class="frag" style="top:82%;right:1.5%;transform:rotate(4deg)">→→</span>

    <!-- Scattered interior marks -->
    <span class="mark" style="top:24%;left:22%;transform:rotate(12deg)">+</span>
    <span class="mark red" style="top:46%;left:54%;transform:rotate(-6deg)">+</span>
    <span class="mark green" style="top:60%;left:34%;transform:rotate(18deg)">●</span>
    <span class="mark" style="top:33%;right:22%;transform:rotate(-14deg)">×</span>
    <span class="mark green" style="bottom:32%;right:30%;transform:rotate(8deg)">◈</span>
    <span class="mark red" style="top:55%;left:16%;transform:rotate(-3deg)">✦</span>

    <!-- Ghost phrases -->
    <span class="g-phrase" style="top:37%;left:43%;transform:rotate(-1.5deg)">words that resonate</span>
    <span class="g-phrase" style="bottom:40%;left:28%;transform:rotate(0.8deg)">izzabizz_ · 2026</span>
    <span class="g-phrase" style="top:16%;left:35%;transform:rotate(2deg)">// penn state university</span>

    <!-- Bottom cluster -->
    <span class="frag" style="bottom:16%;left:2%;transform:rotate(-4deg)">// end</span>
    <span class="frag red" style="bottom:20%;right:2%;transform:rotate(7deg)">◈</span>
    <span class="frag" style="bottom:11%;right:8%;transform:rotate(-3deg)">[EOF]</span>
    <span class="frag" style="bottom:28%;left:47%;transform:rotate(2.5deg)">0 1 2 3</span>
    <span class="frag" style="bottom:8%;left:45%;transform:rotate(-1deg)">— fin —</span>

    <!-- Structural lines -->
    <span class="ln-h" style="top:18%;left:0;width:4%"></span>
    <span class="ln-h" style="top:18%;left:0;width:4%;top:82%;right:0;left:auto;width:5%"></span>
    <span class="ln-v" style="top:52%;left:43.5%;height:11%"></span>
    <span class="ln-v" style="top:20%;right:22%;height:7%"></span>

  </div>
</template>

<style scoped>
.collage-bg {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

/* Ghost large letterforms */
.g-xl {
  position: absolute;
  font-family: 'ttnp-round', sans-serif;
  font-size: 22vw;
  font-weight: 900;
  color: #0D1A05;
  opacity: 0.028;
  line-height: 1;
  letter-spacing: -0.05em;
  user-select: none;
  white-space: nowrap;
}

.g-lg {
  position: absolute;
  font-family: 'ttnp-round', sans-serif;
  font-size: 4.5vw;
  font-weight: 700;
  color: #0D1A05;
  opacity: 0.03;
  letter-spacing: 0.12em;
  user-select: none;
  white-space: nowrap;
}

/* Ghost phrases */
.g-phrase {
  position: absolute;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #0D1A05;
  opacity: 0.055;
  user-select: none;
  white-space: nowrap;
}

/* Small typographic fragments */
.frag {
  position: absolute;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0D1A05;
  opacity: 0.1;
  user-select: none;
  white-space: nowrap;
}
.frag.red   { color: #FF2FA4; opacity: 0.22; font-size: 0.72rem; }
.frag.green { color: #2A5C1E; opacity: 0.13; }

/* Vertical running text */
.frag-vert {
  position: absolute;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.48rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #0D1A05;
  opacity: 0.08;
  user-select: none;
  writing-mode: vertical-rl;
  white-space: nowrap;
}

/* Decorative marks */
.mark {
  position: absolute;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  color: #0D1A05;
  opacity: 0.09;
  user-select: none;
  line-height: 1;
}
.mark.red   { color: #FF2FA4; opacity: 0.2; }
.mark.green { color: #2A5C1E; opacity: 0.15; }

/* Lines */
.ln-h {
  position: absolute;
  height: 1px;
  background: #0D1A05;
  opacity: 0.08;
  display: block;
}
.ln-v {
  position: absolute;
  width: 1px;
  background: #0D1A05;
  opacity: 0.07;
  display: block;
}
</style>
