/* ========================================================
   SUNFLOWER BIRTHDAY WEBSITE - INTERACTIVE LOGIC & ENGINE
   Aesthetic: Golden Hour, Sunflower Theme, Pure Romance
   ======================================================== */

// ========================================================
// 1. EASY CONFIGURATION (Customizable)
// ========================================================
const CONFIG = {
  partnerName: "Coconut",          // Girlfriend's pet name / name
  partnerNickname: "My Sunshine",  // Affectionate nickname
  birthdayDate: "2026-10-01",      // Her birthday
  anniversaryDate: "2025-01-01",   // Starting date for the love counter
  audioPath: "music.mp3",          // Local audio file if provided
  initialBatchSize: 16,            // How many memories to show before "Load More"
  // Permanently hidden photos (never shown in gallery)
  excludedFiles: [
    "IMG_8545.JPG",
    "20261001_191815.jpg",
    "20261001_192241.jpg",
    "IMG_8485.JPG",
    "IMG_8486.JPG",
    "IMG_8487.JPG",
    "IMG_8494.JPG",
    "IMG_8495.JPG",
    "IMG_8496.JPG",
    "IMG_8500.JPG",
    "IMG_8501.JPG",
    "IMG_8502.JPG",
    "IMG_8503.JPG",
    "IMG_8504.JPG",
    "IMG_8505.JPG",
    "IMG_8506.JPG",
    "IMG_8507.JPG",
    "IMG_8508.JPG",
    "IMG_8509.JPG",
    "IMG_8510.JPG",
    "IMG_8511.JPG",
    "IMG_8512.JPG",
    "IMG_8514.JPG",
    "IMG_8515.JPG",
    "IMG_8516.JPG",
    "IMG_8517.JPG",
    "IMG_8519.JPG",
    "IMG_8520.JPG",
    "IMG_8521.JPG",
    "IMG_8523.JPG",
    "IMG_8532.JPG",
    "IMG_8533.JPG",
    "IMG_8534.JPG",
    "IMG_8535.JPG",
    "IMG_8538.JPG",
    "IMG_8539.JPG",
    "IMG_8540.JPG",
    "IMG_8541.JPG",
    "IMG_8542.JPG",
    "IMG_8543.JPG",
    "IMG_8544.JPG",
    "IMG_8546.JPG",
    "IMG_8547.JPG",
    "IMG_8548.JPG",
    "IMG_8549.JPG",
    "IMG_8550.JPG",
    "IMG_8551.JPG"
  ]
};

// Storage helper functions for interactive removal
function getRemovedFiles() {
  try {
    const saved = localStorage.getItem("bday_removed_photos");
    const arr = saved ? JSON.parse(saved) : [];
    // Only keep localStorage entries that are NOT already permanently excluded
    const permanentSet = new Set(CONFIG.excludedFiles || []);
    const filtered = arr.filter(f => !permanentSet.has(f));
    // Save back the cleaned list (removing permanently excluded ones)
    if (filtered.length !== arr.length) {
      try { localStorage.setItem("bday_removed_photos", JSON.stringify(filtered)); } catch(e) {}
    }
    const set = new Set(filtered);
    // Always add all permanent exclusions
    permanentSet.forEach(f => set.add(f));
    return set;
  } catch (e) {
    return new Set(CONFIG.excludedFiles || []);
  }
}

function saveRemovedFiles(set) {
  try {
    // Only save non-permanent removals to localStorage
    const permanentSet = new Set(CONFIG.excludedFiles || []);
    const toSave = [...set].filter(f => !permanentSet.has(f));
    localStorage.setItem("bday_removed_photos", JSON.stringify(toSave));
  } catch (e) {}
}

// Curated Romantic Captions for all memories
const ROMANTIC_CAPTIONS = [
  "My absolute favorite smile in the entire universe ✨",
  "The golden hour looks so much better with you 🌻",
  "Pure happiness captured in a single fleeting moment 💛",
  "Forever and always my favorite view 💫",
  "Every ordinary day feels like an adventure by your side 🍯",
  "You make everything around you blossom into sunshine ☀️",
  "Unfiltered, authentic joy with my favorite human 🌻",
  "The sweetest memories are the ones I spend with you 💖",
  "Falling in love with your laugh all over again ✨",
  "Just you and me creating a lifetime of memories 🌟",
  "That breathtaking sparkle in your eyes 💛",
  "A warmth that melts away every worry in the world 🌻",
  "My safe haven, my biggest cheerleader, my love 💫",
  "Cherishing every single second next to you 🍯",
  "Our cozy little corner of infinite love ✨",
  "The prettiest soul I have ever known 🌻",
  "You are my today and all of my tomorrows 💛",
  "Laughing until our stomachs hurt together 💫",
  "Thank you for being the sweetest part of my life 🍯",
  "Soft sunshine and endless love with you 🌻"
];

// Deeply Romantic Reasons for "The Sunshine Jar"
const SUNSHINE_NOTES = [
  "The way your eyes crinkle and light up whenever you start laughing genuinely.",
  "How you make the most mundane errands feel like a cozy Sunday morning adventure.",
  "Your pure kindness toward people and how gently you treat the world.",
  "The comforting warmth I feel every time you hold my hand in yours.",
  "How deeply passionate you get when you talk about the things you love.",
  "Your adorable little habits and expressions that only I get to witness.",
  "Because you are my safest place to land after the longest, hardest days.",
  "How you always believe in me, even when I forget to believe in myself.",
  "The contagious warmth of your hug that instantly fixes everything.",
  "Because loving you is the easiest, most natural thing I have ever done.",
  "The way you turn simple food, coffee, or car rides into core memories.",
  "Your brilliant mind and the unique way you see the beauty in small things.",
  "How soft and peaceful the world feels whenever your head rests on my chest.",
  "Your goofy, unfiltered humor that never fails to make me burst out laughing.",
  "Because being around you feels like sitting under warm golden sunshine.",
  "How patient and understanding you are, even when things get difficult.",
  "The sweet little messages you send that can turn my whole day around.",
  "Because you are not just my partner; you are my best friend and soulmate.",
  "The way you look at me that makes me feel like the luckiest person alive.",
  "Your beautiful, radiant smile that could light up a sky full of storms.",
  "How fiercely loyal, caring, and protective you are of the people you love.",
  "The soundtrack of your laughter—it is my absolute favorite sound on earth.",
  "Because no matter how chaotic life gets, your voice brings me instant calm.",
  "The quiet moments between our words where we just look at each other and smile.",
  "How proud I feel every single day to walk through this world by your side.",
  "Your gentle empathy and the huge, golden heart beating in your chest.",
  "Because you make me want to grow, learn, and be the best version of myself.",
  "The way you love sunflowers—turning toward warmth, joy, and light.",
  "Every silly selfie and spontaneous video we have ever taken together.",
  "Because my favorite place in the universe will always simply be next to you.",
  "The excitement in your voice whenever something sweet or funny happens.",
  "Because you love me for exactly who I am, without ever asking me to change.",
  "The sweet memories we have already made, and the countless ones still ahead.",
  "Because you are my favorite chapter in my whole life story.",
  "Quite simply: you are my eternal sunshine, today and forever 🌻"
];

// ========================================================
// 2. GENERATE ALL 110+ PHOTOS & VIDEOS MANIFEST
// ========================================================
function buildMediaCollection() {
  const mediaList = [];
  let id = 1;

  // Specific videos in Coconut & Me
  const videoFiles = [
    "20261001_132723.mp4",
    "20261001_132802.mp4",
    "20261001_132859.mp4",
    "20261001_140341.mp4",
    "20261001_163920.mp4",
    "20261001_191707.mp4",
    "20261001_191837.mp4",
    "20261001_192103.mp4",
    "VID-20260930-WA0009.mp4",
    "VID-20261001-WA0044.mp4"
  ];

  // Specific photos in Coconut & Me
  const specialPhotoFiles = [
    "20261001_140330.jpg",
    "20261001_140401.jpg",
    "20261001_140403.jpg",
    "20261001_140409.jpg",
    "20261001_140410.jpg",
    "20261001_140415.jpg",
    "20261001_140416.jpg",
    "20261001_140417.jpg",
    "20261001_140459.jpg",
    "20261001_140500.jpg",
    "20261001_140506.jpg",
    "20261001_140609.jpg",
    "20261001_140639.jpg",
    "20261001_191815.jpg",
    "20261001_192241.jpg",
    "IMG-20261001-WA0040.jpg",
    "IMG-20261001-WA0041.jpg",
    "IMG-20261001-WA0042.jpg",
    "IMG-20261001-WA0043.jpg",
    "IMG_20260930_215818_324.jpg",
    "IMG_20260930_215822_024.jpg",
    "IMG_20260930_215823_494.jpg",
    "IMG_20260930_215825_842.jpg",
    "IMG_20260930_215827_411.jpg",
    "IMG_20260930_215829_170.jpg",
    "IMG_20260930_215834_581.jpg",
    "IMG_20260930_215841_436.jpg"
  ];

  // Consecutive series IMG_8481.JPG through IMG_8558.JPG
  const seriesPhotoFiles = [];
  for (let num = 8481; num <= 8558; num++) {
    seriesPhotoFiles.push(`IMG_${num}.JPG`);
  }

  // Interleave and assemble with thoughtful ordering
  // We'll showcase a mix of standout photos and videos right from the start
  const allRawFiles = [
    // Highlight start
    { file: "IMG_8488.JPG", date: "Oct 1, 2026", fav: true },
    { file: "20261001_132723.mp4", date: "Oct 1, 2026", fav: true },
    { file: "IMG_8492.JPG", date: "Oct 1, 2026", fav: true },
    { file: "IMG_8497.JPG", date: "Oct 1, 2026", fav: true },
    { file: "20261001_140341.mp4", date: "Oct 1, 2026", fav: true },
    { file: "IMG_8518.JPG", date: "Oct 1, 2026", fav: true },
    { file: "20261001_140401.jpg", date: "Oct 1, 2026", fav: false },
    { file: "IMG_8531.JPG", date: "Oct 1, 2026", fav: true },
    { file: "20261001_163920.mp4", date: "Oct 1, 2026", fav: true },
    { file: "IMG_8545.JPG", date: "Oct 1, 2026", fav: true },
    { file: "IMG_8552.JPG", date: "Oct 1, 2026", fav: true },
    { file: "VID-20261001-WA0044.mp4", date: "Oct 1, 2026", fav: true }
  ];

  const addedFiles = new Set(allRawFiles.map(x => x.file));

  // Add remaining videos
  videoFiles.forEach(v => {
    if (!addedFiles.has(v)) {
      allRawFiles.push({ file: v, date: v.includes("20260930") ? "Sep 30, 2026" : "Oct 1, 2026", fav: true });
      addedFiles.add(v);
    }
  });

  // Add remaining special photos
  specialPhotoFiles.forEach(p => {
    if (!addedFiles.has(p)) {
      allRawFiles.push({ file: p, date: p.includes("20260930") ? "Sep 30, 2026" : "Oct 1, 2026", fav: false });
      addedFiles.add(p);
    }
  });

  // Add all remaining series photos
  seriesPhotoFiles.forEach(s => {
    if (!addedFiles.has(s)) {
      allRawFiles.push({ file: s, date: "Oct 1, 2026", fav: (id % 9 === 0) });
      addedFiles.add(s);
    }
  });

  // Format into final objects with tilt rotation & captions
  allRawFiles.forEach((item, index) => {
    const isVideo = item.file.toLowerCase().endsWith(".mp4");
    const caption = ROMANTIC_CAPTIONS[index % ROMANTIC_CAPTIONS.length];
    
    // Alternating natural rotation between -3.2deg and +3.2deg for authentic polaroid look
    const rotAngles = [-2.8, 2.4, -1.8, 3.1, -3.2, 1.9, -2.2, 2.7];
    const rot = rotAngles[index % rotAngles.length];

    mediaList.push({
      id: id++,
      type: isVideo ? "video" : "photo",
      fileName: item.file,
      src: `media/${item.file}`,
      title: isVideo ? `Video Moment #${index + 1}` : `Sweet Memory #${index + 1}`,
      caption: caption,
      date: item.date,
      favorite: item.fav || isVideo,
      rotation: rot
    });
  });

  return mediaList;
}

const ALL_MEMORIES = buildMediaCollection();

// ========================================================
// 3. APPLICATION STATE
// ========================================================
const state = {
  activeFilter: "all",
  displayedCount: CONFIG.initialBatchSize,
  removedFiles: getRemovedFiles(),
  isRemoveMode: false,
  filteredMemories: [],
  activeLightboxIndex: 0,
  drawnNoteIndices: new Set(),
  activeNoteIndex: 0,
  isMusicPlaying: false,
  synthAudioActive: false,
  audioCtx: null,
  candleBlown: false
};

// ========================================================
// 4. FLOATING PETALS CANVAS ENGINE (Fluttering Sunflowers)
// ========================================================
class PetalsSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.petals = [];
    this.maxPetals = 45;
    this.mouse = { x: -1000, y: -1000 };

    this.resize();
    this.initPetals();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: Math.random() * 12 + 10,
      speedX: Math.random() * 1.5 - 0.5,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * 2 + 1,
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? "#f59e0b" : (Math.random() > 0.5 ? "#fbbf24" : "#fef08a"),
      opacity: Math.random() * 0.45 + 0.35
    };
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);
    this.ctx.globalAlpha = p.opacity;

    // Sunflower petal geometry
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size * 1.2);
    this.ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.4, p.size * 0.5, p.size * 0.6, 0, p.size);
    this.ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.6, -p.size * 0.6, -p.size * 0.4, 0, -p.size * 1.2);
    this.ctx.fillStyle = p.color;
    this.ctx.fill();

    // Subtle petal center vein
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size * 0.9);
    this.ctx.lineTo(0, p.size * 0.7);
    this.ctx.strokeStyle = "rgba(180, 83, 9, 0.4)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      // Physics & drift
      p.swayAngle += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.swayAngle) * p.sway;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Mouse gentle breeze reaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= (dx / dist) * 2;
        p.y -= (dy / dist) * 2;
      }

      this.drawPetal(p);

      // Recycle petals at bottom
      if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
        this.petals[i] = this.createPetal(false);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ========================================================
// 5. GOLDEN CONFETTI & SPARKLES ENGINE
// ========================================================
class GoldenConfetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.colors = ["#f59e0b", "#fbbf24", "#fde047", "#fffbeb", "#d97706", "#ffffff"];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  burst(originX = this.width / 2, originY = this.height / 2, count = 90) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      const size = Math.random() * 8 + 4;
      const type = Math.random() > 0.4 ? "rect" : (Math.random() > 0.5 ? "star" : "circle");

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
        vy: Math.sin(angle) * speed - Math.random() * 6,
        size: size,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        type: type,
        gravity: 0.25,
        drag: 0.96,
        alpha: 1,
        fadeSpeed: Math.random() * 0.008 + 0.004
      });
    }
  }

  shower(count = 120) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        size: Math.random() * 10 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        type: "rect",
        gravity: 0.12,
        drag: 0.98,
        alpha: 1,
        fadeSpeed: Math.random() * 0.005 + 0.003
      });
    }
  }

  drawStar(x, y, radius, points = 5) {
    this.ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? radius : radius / 2;
      const a = (i * Math.PI) / points;
      this.ctx.lineTo(x + r * Math.sin(a), y - r * Math.cos(a));
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= p.fadeSpeed;

      if (p.alpha <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;

      if (p.type === "star") {
        this.drawStar(p.x, p.y, p.size);
      } else if (p.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Global Confetti Instance
let confettiEngine = null;

// ========================================================
// 6. ROMANTIC AUDIO SYNTHESIZER & MUSIC ENGINE
// ========================================================
class RomanticAudioEngine {
  constructor() {
    this.audioElement = document.getElementById("bgMusic");
    this.isPlaying = false;
    this.audioCtx = null;
    this.synthInterval = null;
    this.step = 0;

    // Peaceful Romantic arpeggio chords: Cmaj7, G, Am7, Fmaj7
    this.chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [196.00, 246.94, 293.66, 392.00], // G (G3, B3, D4, G4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63]  // Fmaj7 (F3, A3, C4, E4)
    ];

    this.toggleBtn = document.getElementById("musicToggleBtn");
    this.statusText = document.getElementById("musicStatusText");
    this.waves = document.getElementById("musicWaves");
    this.bindEvents();
  }

  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }
  }

  initSynth() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  // Play a soft, music-box / acoustic tone
  playNote(freq, time, duration = 1.4) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.12, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  playSparkleChime() {
    this.initSynth();
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.08, 0.9);
    });
  }

  startSynthMelody() {
    this.initSynth();
    let chordIdx = 0;
    let noteIdx = 0;

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const currentChord = this.chords[chordIdx];
      const freq = currentChord[noteIdx];
      const now = this.audioCtx.currentTime;

      this.playNote(freq, now, 1.2);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % this.chords.length;
      }
    }, 420);
  }

  stopSynthMelody() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  async toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play() {
    this.isPlaying = true;
    if (this.toggleBtn) this.toggleBtn.classList.add("playing");
    if (this.statusText) this.statusText.textContent = "Playing: Marakkavillayae 🎶";

    if (this.audioElement) {
      if (!this.audioElement.src || this.audioElement.src === window.location.href) {
        this.audioElement.src = "music.mp3";
      }
      try {
        await this.audioElement.play();
        return;
      } catch (err) {
        console.log("Audio play error, using synth fallback:", err);
        this.startSynthMelody();
      }
    } else {
      this.startSynthMelody();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.toggleBtn) this.toggleBtn.classList.remove("playing");
    if (this.statusText) this.statusText.textContent = "Music Paused ⏸️";
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthMelody();
  }
}

let romanticAudio = null;

// ========================================================
// 7. ENVELOPE OPENING STAGE LOGIC
// ========================================================
function initEnvelopeStage() {
  const envelopeStage = document.getElementById("envelope-stage");
  const mainSite = document.getElementById("main-site");
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openSurpriseBtn");
  const seal = document.getElementById("sunflowerSeal");

  function triggerOpening() {
    if (envelope.classList.contains("is-opening")) return;

    envelope.classList.add("is-opening");
    if (romanticAudio) romanticAudio.playSparkleChime();

    // Burst golden sparkles from seal position
    const rect = seal.getBoundingClientRect();
    if (confettiEngine) {
      confettiEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
    }

    // After animation unfolds, transition smoothly into main site
    setTimeout(() => {
      envelopeStage.classList.add("stage-hidden");
      mainSite.classList.remove("main-hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Celebration confetti cascade on site reveal
      if (confettiEngine) {
        confettiEngine.shower(100);
      }

      // Friendly auto-prompt for music
      setTimeout(() => {
        if (!state.isMusicPlaying && romanticAudio) {
          romanticAudio.play();
        }
      }, 800);
    }, 1400);
  }

  if (openBtn) openBtn.addEventListener("click", triggerOpening);
  if (seal) seal.addEventListener("click", triggerOpening);
}

// ========================================================
// 8. BIRTHDAY COUNTDOWN (Today to Tomorrow)
// ========================================================
function initLoveCounter() {
  const hoursEl = document.getElementById("counterHours");
  if (!hoursEl) return; // Countdown removed
  const daysBox = document.getElementById("daysBox");
  const daysEl = document.getElementById("counterDays");
  const minutesEl = document.getElementById("counterMinutes");
  const secondsEl = document.getElementById("counterSeconds");
  const labelEl = document.getElementById("counterLabel");
  const celebrationMsg = document.getElementById("countdownCelebrationMsg");

  // Calculate target: Start of Tomorrow (midnight tonight, 00:00:00)
  function getTomorrowMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime();
  }

  const targetDate = getTomorrowMidnight();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (daysBox) daysBox.style.display = "none";
      if (labelEl) labelEl.textContent = "✨ Today Is The Special Day! ✨";
      if (celebrationMsg) celebrationMsg.classList.remove("hidden");
      return;
    }

    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (days > 0) {
      if (daysBox) daysBox.style.display = "flex";
      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    } else {
      if (daysBox) daysBox.style.display = "none";
      // Today to tomorrow countdown: display hours left directly
      if (hoursEl) hoursEl.textContent = String(totalHours).padStart(2, "0");
    }

    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ========================================================
// 9. MEMORY GALLERY RENDERING & 3D POLAROIDS
// ========================================================
function initMemoryGallery() {
  const grid = document.getElementById("polaroidGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreText = document.getElementById("loadMoreText");
  const showAllBtn = document.getElementById("showAllBtn");
  const shuffleBtn = document.getElementById("shuffleMemoriesBtn");
  const toggleManageBtn = document.getElementById("toggleManageBtn");
  const manageBtnText = document.getElementById("manageBtnText");
  const restoreBtn = document.getElementById("restoreHiddenBtn");
  const hiddenCountText = document.getElementById("hiddenCountText");

  // Counter badge elements
  const countAll = document.getElementById("countAll");
  const countPhotos = document.getElementById("countPhotos");
  const countVideos = document.getElementById("countVideos");
  const countFavs = document.getElementById("countFavs");

  function refreshFilteredMemories() {
    const available = ALL_MEMORIES.filter(m => !state.removedFiles.has(m.fileName));

    if (state.activeFilter === "photo") {
      state.filteredMemories = available.filter(m => m.type === "photo");
    } else if (state.activeFilter === "video") {
      state.filteredMemories = available.filter(m => m.type === "video");
    } else if (state.activeFilter === "favorite") {
      state.filteredMemories = available.filter(m => m.favorite);
    } else {
      state.filteredMemories = [...available];
    }

    // Update count badges
    if (countAll) countAll.textContent = available.length;
    if (countPhotos) countPhotos.textContent = available.filter(m => m.type === "photo").length;
    if (countVideos) countVideos.textContent = available.filter(m => m.type === "video").length;
    if (countFavs) countFavs.textContent = available.filter(m => m.favorite).length;

    // Update restore button state (only show for non-permanent user removals)
    if (restoreBtn && hiddenCountText) {
      const permanentSet = new Set(CONFIG.excludedFiles || []);
      const userRemovedCount = [...state.removedFiles].filter(f => !permanentSet.has(f)).length;
      if (userRemovedCount > 0) {
        restoreBtn.classList.remove("hidden");
        hiddenCountText.textContent = `Removed (${userRemovedCount})`;
      } else {
        restoreBtn.classList.add("hidden");
      }
    }
  }

  function removePhoto(fileName) {
    state.removedFiles.add(fileName);
    saveRemovedFiles(state.removedFiles);
    refreshFilteredMemories();
    renderGrid();
    if (romanticAudio) romanticAudio.playSparkleChime();
  }

  window.removePhoto = removePhoto;
  window.refreshFilteredMemories = refreshFilteredMemories;

  function renderGrid() {
    grid.innerHTML = "";

    const itemsToShow = state.filteredMemories.slice(0, state.displayedCount);

    if (itemsToShow.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: var(--text-secondary);">
          <p style="font-size: 1.4rem; font-family: var(--font-heading); margin-bottom: 10px;">No memories in this view 🌻</p>
          <p style="font-size: 0.95rem;">If photos were removed, you can click "Removed (${state.removedFiles.size})" above to restore them anytime.</p>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }

    itemsToShow.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "polaroid-card animate-fade-in";
      card.style.transform = `rotate(${item.rotation}deg)`;
      card.setAttribute("data-index", index);

      const isVideo = item.type === "video";

      card.innerHTML = `
        <div class="polaroid-tape"></div>
        <div class="polaroid-media-box">
          ${isVideo ? `
            <video preload="metadata" muted playsinline>
              <source src="${item.src}" type="video/mp4">
              <source src="Coconut & Me/${item.fileName}" type="video/mp4">
            </video>
            <div class="play-overlay-icon"><span>▶</span></div>
          ` : `
            <img src="${item.src}" alt="I love you" loading="lazy" decoding="async" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='Coconut & Me/${item.fileName}';}">
          `}
        </div>
        <div class="polaroid-caption-area">
          <p class="polaroid-caption">I love you 🌻</p>
        </div>
      `;

      // 3D Perspective Tilt Effect on Mouse Move
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.04)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `rotate(${item.rotation}deg)`;
      });

      // Video preview hover
      if (isVideo) {
        const vid = card.querySelector("video");
        card.addEventListener("mouseenter", () => {
          if (vid && vid.paused) {
            vid.play().catch(() => {});
          }
        });
        card.addEventListener("mouseleave", () => {
          if (vid && !vid.paused) {
            vid.pause();
            vid.currentTime = 0;
          }
        });
      }

      // Open in Lightbox on click
      card.addEventListener("click", () => {
        openLightbox(index);
      });

      grid.appendChild(card);
    });

    // Update Load More button state
    const remaining = state.filteredMemories.length - state.displayedCount;
    if (loadMoreBtn && loadMoreText) {
      if (remaining > 0) {
        loadMoreBtn.style.display = "inline-flex";
        loadMoreText.textContent = `Load More Memories (${remaining} remaining)`;
      } else {
        loadMoreBtn.style.display = "none";
      }
    }
  }

  // Toggle Remove Mode button
  if (toggleManageBtn) {
    toggleManageBtn.addEventListener("click", () => {
      state.isRemoveMode = !state.isRemoveMode;
      toggleManageBtn.classList.toggle("active", state.isRemoveMode);
      grid.classList.toggle("remove-mode", state.isRemoveMode);
      if (manageBtnText) {
        manageBtnText.textContent = state.isRemoveMode ? "Done Removing" : "Remove Mode";
      }
    });
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      state.activeFilter = btn.getAttribute("data-filter");
      state.displayedCount = CONFIG.initialBatchSize;
      refreshFilteredMemories();
      renderGrid();
    });
  });

  // Load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      state.displayedCount += 16;
      renderGrid();
    });
  }

  // Show all button
  if (showAllBtn) {
    showAllBtn.addEventListener("click", () => {
      state.displayedCount = state.filteredMemories.length;
      renderGrid();
    });
  }

  // Shuffle memories button
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      for (let i = state.filteredMemories.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.filteredMemories[i], state.filteredMemories[j]] = [state.filteredMemories[j], state.filteredMemories[i]];
      }
      renderGrid();
      if (romanticAudio) romanticAudio.playSparkleChime();
    });
  }

  // Initial calculation and render
  refreshFilteredMemories();
  renderGrid();
}

// ========================================================
// 10. LIGHTBOX FULLSCREEN MEDIA VIEWER
// ========================================================
function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const mediaContainer = document.getElementById("lightboxMediaContainer");
  const titleEl = document.getElementById("lightboxTitle");
  const captionEl = document.getElementById("lightboxCaption");
  const dateEl = document.getElementById("lightboxDateBadge");
  const counterEl = document.getElementById("lightboxCounter");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");
  const deleteBtn = document.getElementById("lightboxDeleteBtn");

  window.openLightbox = function(index) {
    state.activeLightboxIndex = index;
    updateLightboxContent();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  function closeLightbox() {
    modal.classList.add("hidden");
    mediaContainer.innerHTML = "";
    document.body.style.overflow = "";
  }

  window.closeLightbox = closeLightbox;

  function updateLightboxContent() {
    const memory = state.filteredMemories[state.activeLightboxIndex];
    if (!memory) return;

    mediaContainer.innerHTML = "";

    if (memory.type === "video") {
      const video = document.createElement("video");
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.style.maxWidth = "100%";
      video.style.maxHeight = "100%";
      video.onerror = () => {
        if (!video.dataset.tried) {
          video.dataset.tried = "1";
          video.src = `Coconut & Me/${memory.fileName}`;
        }
      };
      video.src = memory.src;
      mediaContainer.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.alt = memory.caption;
      img.onerror = () => {
        if (!img.dataset.tried) {
          img.dataset.tried = "1";
          img.src = `Coconut & Me/${memory.fileName}`;
        }
      };
      img.src = memory.src;
      mediaContainer.appendChild(img);
    }

    if (titleEl) titleEl.textContent = "I love you 🌻";
    if (captionEl) captionEl.textContent = "Every single moment with you is precious.";
    if (dateEl) dateEl.style.display = "none";
    if (counterEl) counterEl.textContent = `${state.activeLightboxIndex + 1} / ${state.filteredMemories.length}`;
  }

  function nextMedia() {
    if (state.filteredMemories.length === 0) return;
    state.activeLightboxIndex = (state.activeLightboxIndex + 1) % state.filteredMemories.length;
    updateLightboxContent();
  }

  function prevMedia() {
    if (state.filteredMemories.length === 0) return;
    state.activeLightboxIndex = (state.activeLightboxIndex - 1 + state.filteredMemories.length) % state.filteredMemories.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", nextMedia);
  if (prevBtn) prevBtn.addEventListener("click", prevMedia);

  // Lightbox Remove button
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const memory = state.filteredMemories[state.activeLightboxIndex];
      if (!memory) return;

      if (window.removePhoto) {
        window.removePhoto(memory.fileName);
      }

      if (state.filteredMemories.length === 0) {
        closeLightbox();
      } else {
        if (state.activeLightboxIndex >= state.filteredMemories.length) {
          state.activeLightboxIndex = 0;
        }
        updateLightboxContent();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextMedia();
    if (e.key === "ArrowLeft") prevMedia();
  });
}

// ========================================================
// 10B. RESTORE / MANAGE REMOVED PHOTOS MODAL
// ========================================================
function initRestoreModal() {
  const modal = document.getElementById("restore-modal");
  const openBtn = document.getElementById("restoreHiddenBtn");
  const closeBtn = document.getElementById("restoreModalCloseBtn");
  const backdrop = document.getElementById("restoreModalBackdrop");
  const gridEl = document.getElementById("removedItemsGrid");
  const restoreAllBtn = document.getElementById("restoreAllBtn");
  const copyBtn = document.getElementById("copyExcludedListBtn");

  function renderRemovedList() {
    gridEl.innerHTML = "";
    const permanentSet = new Set(CONFIG.excludedFiles || []);
    // Only show user-initiated removals (not permanently excluded ones)
    const userRemoved = [...state.removedFiles].filter(f => !permanentSet.has(f));

    if (userRemoved.length === 0) {
      gridEl.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 35px 20px;">No removed photos right now! 🌻</p>`;
      return;
    }

    userRemoved.forEach(fileName => {
      const item = ALL_MEMORIES.find(m => m.fileName === fileName) || { fileName, src: `media/${fileName}`, type: fileName.toLowerCase().endsWith('.mp4') ? 'video' : 'photo' };
      const card = document.createElement("div");
      card.className = "restore-item-card";
      card.innerHTML = `
        <div class="restore-thumb-box">
          ${item.type === 'video' ? `
            <video preload="metadata" muted playsinline src="${item.src}"></video>
          ` : `
            <img src="${item.src}" alt="${item.fileName}">
          `}
        </div>
        <div class="restore-item-meta">
          <span style="font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px;" title="${item.fileName}">${item.fileName}</span>
          <button class="btn-restore-single" data-file="${item.fileName}">Restore 🌻</button>
        </div>
      `;

      const btn = card.querySelector(".btn-restore-single");
      btn.addEventListener("click", () => {
        state.removedFiles.delete(fileName);
        saveRemovedFiles(state.removedFiles);
        if (window.refreshFilteredMemories) window.refreshFilteredMemories();
        const grid = document.getElementById("polaroidGrid");
        if (grid && window.initMemoryGallery) {
          // Re-render
          const event = new Event("click");
          const activeFilter = document.querySelector(".filter-btn.active");
          if (activeFilter) activeFilter.dispatchEvent(event);
        }
        renderRemovedList();
      });

      gridEl.appendChild(card);
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      renderRemovedList();
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  if (restoreAllBtn) {
    restoreAllBtn.addEventListener("click", () => {
      // Only restore user-initiated removals, keep permanent exclusions
      const permanentSet = new Set(CONFIG.excludedFiles || []);
      permanentSet.forEach(f => state.removedFiles.add(f)); // ensure permanents remain
      // Remove only user-removed (non-permanent) entries
      [...state.removedFiles].forEach(f => {
        if (!permanentSet.has(f)) state.removedFiles.delete(f);
      });
      saveRemovedFiles(state.removedFiles);
      if (window.refreshFilteredMemories) window.refreshFilteredMemories();
      const activeFilter = document.querySelector(".filter-btn.active");
      if (activeFilter) activeFilter.click();
      renderRemovedList();
      closeModal();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const list = JSON.stringify([...state.removedFiles], null, 2);
      navigator.clipboard.writeText(list).then(() => {
        copyBtn.textContent = "Copied to Clipboard! ✓";
        setTimeout(() => copyBtn.textContent = "Copy Removed List 📋", 2000);
      });
    });
  }
}

// ========================================================
// 11. THE SUNSHINE JAR (INTERACTIVE LOVE NOTES)
// ========================================================
function initSunshineJar() {
  const jar = document.getElementById("virtualJar");
  const drawBtn = document.getElementById("drawNoteBtn");
  const noteText = document.getElementById("activeNoteText");
  const noteNum = document.getElementById("activeNoteNumber");
  const drawnCountEl = document.getElementById("notesDrawnCount");
  const totalCountEl = document.getElementById("notesTotalCount");
  const noteCard = document.getElementById("activeNoteCard");
  const viewAllBtn = document.getElementById("viewAllNotesBtn");
  const allNotesModal = document.getElementById("all-notes-modal");
  const allNotesBackdrop = document.getElementById("notesModalBackdrop");
  const allNotesCloseBtn = document.getElementById("notesModalCloseBtn");
  const allNotesGrid = document.getElementById("allNotesGrid");
  const likeBtn = document.getElementById("loveThisNoteBtn");

  if (totalCountEl) totalCountEl.textContent = SUNSHINE_NOTES.length;

  function drawNote() {
    // Jar shake animation
    jar.classList.add("shake");
    setTimeout(() => jar.classList.remove("shake"), 600);

    // Audio chime
    if (romanticAudio) romanticAudio.playSparkleChime();

    // Confetti burst from jar center
    const rect = jar.getBoundingClientRect();
    if (confettiEngine) {
      confettiEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 55);
    }

    // Pick a note without immediate repetition
    let noteIndex;
    if (state.drawnNoteIndices.size >= SUNSHINE_NOTES.length) {
      state.drawnNoteIndices.clear();
    }

    do {
      noteIndex = Math.floor(Math.random() * SUNSHINE_NOTES.length);
    } while (state.drawnNoteIndices.has(noteIndex) && state.drawnNoteIndices.size < SUNSHINE_NOTES.length);

    state.drawnNoteIndices.add(noteIndex);

    // Smooth note flip / pop-in
    noteCard.style.transform = "scale(0.95) rotate(-3deg)";
    noteCard.style.opacity = "0.4";

    setTimeout(() => {
      if (noteNum) noteNum.textContent = `Reason #${noteIndex + 1}`;
      if (noteText) noteText.textContent = `"${SUNSHINE_NOTES[noteIndex]}"`;
      if (drawnCountEl) drawnCountEl.textContent = state.drawnNoteIndices.size;

      noteCard.style.transform = "scale(1) rotate(-1deg)";
      noteCard.style.opacity = "1";
    }, 200);
  }

  if (jar) jar.addEventListener("click", drawNote);
  if (drawBtn) drawBtn.addEventListener("click", drawNote);

  // Love button on note
  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      likeBtn.innerHTML = "<span>💖</span> Loved!";
      if (confettiEngine) {
        const rect = likeBtn.getBoundingClientRect();
        confettiEngine.burst(rect.left + rect.width / 2, rect.top, 25);
      }
      setTimeout(() => {
        likeBtn.innerHTML = "<span>❤️</span> Love this";
      }, 2000);
    });
  }

  // Populate and open All Notes Library modal
  function openAllNotesLibrary() {
    allNotesGrid.innerHTML = "";
    SUNSHINE_NOTES.forEach((note, index) => {
      const card = document.createElement("div");
      card.className = "library-note-card";
      card.innerHTML = `
        <div class="lib-num">🌻 Reason #${index + 1}</div>
        <div class="lib-text">"${note}"</div>
      `;
      allNotesGrid.appendChild(card);
    });

    allNotesModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeAllNotesLibrary() {
    allNotesModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (viewAllBtn) viewAllBtn.addEventListener("click", openAllNotesLibrary);
  if (allNotesCloseBtn) allNotesCloseBtn.addEventListener("click", closeAllNotesLibrary);
  if (allNotesBackdrop) allNotesBackdrop.addEventListener("click", closeAllNotesLibrary);
}

// ========================================================
// 12. BIRTHDAY CANDLE & MAKE A WISH
// ========================================================
function initCandleWish() {
  const candle = document.getElementById("birthdayCandle");
  const flame = document.getElementById("candleFlame");
  const smoke = document.getElementById("candleSmoke");
  const instruction = document.getElementById("wishInstruction");
  const message = document.getElementById("wishGrantedMessage");
  const relightBtn = document.getElementById("relightCandleBtn");

  function blowCandle() {
    if (state.candleBlown) return;
    state.candleBlown = true;

    // Extinguish flame
    flame.classList.add("blown-out");
    smoke.classList.add("active");

    // Sound chime
    if (romanticAudio) romanticAudio.playSparkleChime();

    // Celebration burst
    const rect = candle.getBoundingClientRect();
    if (confettiEngine) {
      confettiEngine.burst(rect.left + rect.width / 2, rect.top, 80);
    }

    if (instruction) instruction.style.display = "none";
    if (message) message.classList.remove("hidden");
  }

  function relightCandle() {
    state.candleBlown = false;
    flame.classList.remove("blown-out");
    smoke.classList.remove("active");
    if (instruction) instruction.style.display = "block";
    if (message) message.classList.add("hidden");
  }

  if (candle) candle.addEventListener("click", blowCandle);
  if (relightBtn) relightBtn.addEventListener("click", relightCandle);
}

// ========================================================
// 13. FINALE CELEBRATION BUTTONS
// ========================================================
function initFinaleCelebration() {
  const celebrateBtn = document.getElementById("celebrateBtn");
  const petalBurstBtn = document.getElementById("petalBurstBtn");

  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      if (confettiEngine) {
        confettiEngine.burst(window.innerWidth * 0.25, window.innerHeight * 0.5, 80);
        confettiEngine.burst(window.innerWidth * 0.75, window.innerHeight * 0.5, 80);
        setTimeout(() => confettiEngine.shower(120), 300);
      }
      if (romanticAudio) romanticAudio.playSparkleChime();
    });
  }

  if (petalBurstBtn) {
    petalBurstBtn.addEventListener("click", () => {
      if (confettiEngine) {
        confettiEngine.shower(140);
      }
      if (romanticAudio) romanticAudio.playSparkleChime();
    });
  }
}

// ========================================================
// 14. INITIALIZATION ENTRY POINT
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Canvas Engines
  new PetalsSimulation("petals-canvas");
  confettiEngine = new GoldenConfetti("confetti-canvas");

  // 2. Initialize Audio Engine
  romanticAudio = new RomanticAudioEngine();

  // 3. Initialize Interactive Components
  initEnvelopeStage();
  initLoveCounter();
  initMemoryGallery();
  initLightbox();
  initRestoreModal();
  initSunshineJar();
  initCandleWish();
  initFinaleCelebration();

  console.log(`🌻 Happy Birthday Website Initialized with ${ALL_MEMORIES.length} memories for ${CONFIG.partnerName}!`);
});
