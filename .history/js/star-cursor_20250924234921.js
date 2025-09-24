// Embedded code from Codepen
(function () {
  const header = document.querySelector(".header__container");
  const canvas = document.getElementById("starCanvas");
  if (!header || !canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });

  // -----------------------
  // CONFIG
  // -----------------------
  const UPWARD = true; // set to false if you want falling stars
  const MAX_STARS = 20; // cap particle count
  const SPAWN_THROTTLE = 10; // ms between spawns (approx 60 FPS)
  const DURATION_MS = 1000; // time to shrink to final size

  // -----------------------
  // SIZE / DPR HANDLING
  // -----------------------
  let cssW = 0,
    cssH = 0,
    dpr = Math.max(1, window.devicePixelRatio || 1);

  function resizeCanvas() {
    const rect = header.getBoundingClientRect();
    cssW = Math.max(1, rect.width);
    cssH = Math.max(1, rect.height);
    dpr = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // map CSS pixels to canvas
  }

  // Call on load & on resize
  resizeCanvas();
  addEventListener("resize", resizeCanvas);

  // -----------------------
  // STAR PARTICLES
  // -----------------------
  let stars = [];
  let lastSpawn = 0;

  class Star {
    constructor(x, y, vx, vy) {
      this.x = x; // CSS pixel space (mapped via ctx transform)
      this.y = y;
      this.finalSize = Math.random() * 2 + 0.6; // 0.6..2.6 px
      this.size = this.finalSize * 2; // start bigger, then shrink
      this.alpha = 1;

      // initial velocity (slowed a bit)
      this.vx = (vx || 0) * 0.06 + (Math.random() * 0.6 - 0.3);
      this.vy =
        (vy || 0) * 0.06 + (UPWARD ? -(1 + Math.random()) : 1 + Math.random());

      // gravity / drag
      this.gravity = UPWARD ? -0.02 : 0.02; // up = negative gravity
      this.drag = 0.97;

      // slight horizontal wiggle
      this.turbulence = () => Math.random() * 0.5 - 0.25;

      this.age = 0; // ms
      // silver-ish shades
      const greys = ["#c0c4c9", "#c8ccd1", "#d0d4d9", "#d8dde2"];
      this.color = greys[(Math.random() * greys.length) | 0];
    }

    update(dt) {
      this.x += this.vx + this.turbulence();
      this.vx *= this.drag;

      this.y += this.vy;
      this.vy += this.gravity;

      // fade
      this.alpha = Math.max(0, this.alpha - 0.005);

      // shrink over DURATION_MS
      this.age += dt;
      if (this.age < DURATION_MS) {
        this.size =
          this.finalSize * 2 - (this.finalSize * this.age) / DURATION_MS;
      } else {
        this.size = this.finalSize;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${hexToRgb(this.color)}, ${this.alpha})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    get alive() {
      const out =
        this.alpha <= 0 ||
        this.x < -20 ||
        this.x > cssW + 20 ||
        this.y < -40 ||
        this.y > cssH + 40;
      return !out;
    }
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  // -----------------------
  // MOUSE HANDLING (header only)
  // -----------------------
  let lastX = 0,
    lastY = 0,
    lastT = 0;

  function spawnAt(evt) {
    const rect = header.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    const now = performance.now();
    if (now - lastSpawn < SPAWN_THROTTLE) return;
    lastSpawn = now;

    const vx = x - lastX;
    const vy = y - lastY;
    lastX = x;
    lastY = y;
    lastT = now;

    // cap star count
    if (stars.length > MAX_STARS) stars.splice(0, stars.length - MAX_STARS);

    // spawn 1–3 stars per move for a nice trail
    const count = (1 + Math.random() * 2) | 0;
    for (let i = 0; i < count; i++) {
      stars.push(
        new Star(
          x,
          y,
          vx + (Math.random() - 0.5) * 60,
          vy + (Math.random() - 0.5) * 60
        )
      );
    }
  }

  header.addEventListener("mousemove", spawnAt, { passive: true });

  // Optional: light touch support
  header.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      if (t) spawnAt(t);
    },
    { passive: true }
  );

  // -----------------------
  // RENDER LOOP
  // -----------------------
  let lastTime = 0;

  function frame(t = 0) {
    const dt = t - lastTime;
    lastTime = t;

    ctx.clearRect(0, 0, cssW, cssH);

    for (let i = 0; i < stars.length; i++) stars[i].update(dt);
    for (let i = 0; i < stars.length; i++) stars[i].draw(ctx);
    stars = stars.filter((s) => s.alive);

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
