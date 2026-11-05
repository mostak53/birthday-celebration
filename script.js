// ====================================================
// HAPPY BIRTHDAY WEBSITE INTERACTIVITY & ANIMATIONS
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle & Confetti Canvas Engine
  initParticleCanvas();

  // 2. Birthday Countdown Timer (Default set to November 9 or configurable)
  initCountdown();

  // 3. Audio Music Controller
  initAudioPlayer();

  // 4. Interactive Candle & Cake
  initCandleInteraction();

  // 5. Polaroid Lightbox
  initLightbox();

  // 6. Birthday Compliments / Wishes Jar
  initWishesJar();

  // 7. Wax Seal Letter Envelope
  initEnvelope();
});

/* ----------------------------------------------------
   1. CANVAS PARTICLES & CONFETTI SYSTEM
   ---------------------------------------------------- */
let confettiPieces = [];
let particles = [];
let canvas, ctx;

function initParticleCanvas() {
  canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Background floating glitter particles
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color: ['#ff75a0', '#ffbe0b', '#c77dff', '#fff'][Math.floor(Math.random() * 4)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw & update floating ambient particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) p.y = canvas.height;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    });

    // Draw & update confetti pieces
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const c = confettiPieces[i];
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.globalAlpha = c.opacity;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      ctx.restore();

      c.x += c.speedX;
      c.y += c.speedY;
      c.speedY += c.gravity;
      c.rotation += c.rotationSpeed;
      c.opacity -= 0.006;

      if (c.opacity <= 0 || c.y > canvas.height + 50) {
        confettiPieces.splice(i, 1);
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

// Trigger Confetti Explosion
function launchConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2, amount = 100) {
  const colors = ['#ff4d88', '#ffbe0b', '#06d6a0', '#4cc9f0', '#9d4edd', '#ffd166', '#ffffff'];
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    confettiPieces.push({
      x: x,
      y: y,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed - 4,
      gravity: 0.28,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 14,
      opacity: 1
    });
  }
}

/* ----------------------------------------------------
   2. BIRTHDAY COUNTDOWN TIMER
   ---------------------------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const statusEl = document.getElementById('timer-status');

  // Next birthday date: Default target is November 9 of current or upcoming year
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetDate = new Date(targetYear, 10, 9, 0, 0, 0); // Month is 0-indexed (10 = November)

  // If already passed this year, count to next year
  if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
    targetYear += 1;
    targetDate = new Date(targetYear, 10, 9, 0, 0, 0);
  }

  function updateTimer() {
    const current = new Date();
    const diff = targetDate - current;

    // Is it birthday day today?
    if (current.getMonth() === 10 && current.getDate() === 9) {
      if (statusEl) statusEl.textContent = "🎉 IT'S YOUR BIRTHDAY TODAY! 🎉";
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    if (diff <= 0) {
      if (statusEl) statusEl.textContent = "🎂 The celebration is happening now! 🎂";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ----------------------------------------------------
   3. AUDIO PLAYER
   ---------------------------------------------------- */
function initAudioPlayer() {
  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');

  if (!musicBtn || !bgMusic) return;

  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      musicText.textContent = 'Play Music';
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicIcon.textContent = '⏸️';
        musicText.textContent = 'Pause Music';
        isPlaying = true;
      }).catch(err => {
        console.log('Audio autoplay prevented or error:', err);
      });
    }
  });
}

/* ----------------------------------------------------
   4. CANDLE BLOW OUT INTERACTION
   ---------------------------------------------------- */
function initCandleInteraction() {
  const blowBtn = document.getElementById('blow-candle-btn');
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  const wishMsg = document.getElementById('wish-unlocked-msg');
  const cakeWrapper = document.getElementById('cake-wrapper');

  let blownOut = false;

  function blowCandle() {
    if (blownOut) return;
    blownOut = true;

    // Animate flame out & smoke
    if (flame) flame.classList.add('blown-out');
    if (smoke) smoke.classList.add('active');

    // Launch celebratory confetti bursts
    const rect = (cakeWrapper || blowBtn).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    launchConfetti(x, y, 120);

    // Second wave of confetti
    setTimeout(() => {
      launchConfetti(window.innerWidth * 0.3, window.innerHeight * 0.4, 70);
      launchConfetti(window.innerWidth * 0.7, window.innerHeight * 0.4, 70);
    }, 400);

    // Show unlocked message
    if (wishMsg) wishMsg.classList.remove('hidden');
    if (blowBtn) {
      blowBtn.textContent = '✨ Wish Made! ✨';
      blowBtn.disabled = true;
      blowBtn.style.opacity = '0.85';
    }
  }

  if (blowBtn) blowBtn.addEventListener('click', blowCandle);
  if (cakeWrapper) cakeWrapper.addEventListener('click', blowCandle);
}

/* ----------------------------------------------------
   5. POLAROID LIGHTBOX
   ---------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!lightbox) return;

  const cards = document.querySelectorAll('.polaroid-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.polaroid-img');
      const caption = card.querySelector('.caption-text');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }
        lightbox.style.display = 'flex';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

/* ----------------------------------------------------
   6. WISHES / COMPLIMENTS JAR
   ---------------------------------------------------- */
const quotes = [
  "“You make the world brighter just by being in it.”",
  "“Thank you for being my constant rock and favorite cheerleader.”",
  "“Nobody gets my jokes or weird thoughts quite like you do!”",
  "“May this year give back to you all the kindness and love you put into the world.”",
  "“Here's to a billion more late-night chats, spontaneous trips, and memories.”",
  "“You are capable of achieving anything your heart envisions.”",
  "“Your smile is literally infectious. Never stop being you!”",
  "“The world is lucky to have you, and I am luckiest to call you my best friend.”"
];

function initWishesJar() {
  const display = document.getElementById('quote-display');
  const btn = document.getElementById('new-quote-btn');
  let lastIndex = 0;

  if (!btn || !display) return;

  btn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === lastIndex && quotes.length > 1);

    lastIndex = nextIndex;

    // Fade out and in animation
    display.style.opacity = '0';
    display.style.transform = 'translateY(10px)';
    display.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      display.textContent = quotes[nextIndex];
      display.style.opacity = '1';
      display.style.transform = 'translateY(0)';
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.7, 30);
    }, 300);
  });
}

/* ----------------------------------------------------
   7. WAX SEAL LETTER ENVELOPE
   ---------------------------------------------------- */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const seal = document.getElementById('wax-seal');

  if (!envelope) return;

  function toggleEnvelope() {
    envelope.classList.toggle('open');
    if (envelope.classList.contains('open')) {
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 60);
    }
  }

  envelope.addEventListener('click', toggleEnvelope);
  if (seal) seal.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEnvelope();
  });
}
