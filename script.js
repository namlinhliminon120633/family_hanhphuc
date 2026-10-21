// 20/10 - Món Quà Yêu Thương Gia Đình Script
function initApp() {
  // DOM Elements with safe fallbacks
  const introOverlay = document.getElementById('introOverlay');
  const startBtn = document.getElementById('startBtn');
  const introBadgeIcon = document.getElementById('introBadgeIcon') || document.querySelector('.intro-heart');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const autoWipeBtn = document.getElementById('autoWipeBtn');
  const refogBtn = document.getElementById('refogBtn');
  const letterBtn = document.getElementById('letterBtn');
  const letterModal = document.getElementById('letterModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const enjoyLetterBtn = document.getElementById('enjoyLetterBtn');
  const modalEnvelope = document.getElementById('modalEnvelope') || (letterModal ? letterModal.querySelector('.modal-envelope') : null);
  const sealEmblemIcon = document.getElementById('sealEmblemIcon');
  const wipeHint = document.getElementById('wipeHint');
  const dropletsContainer = document.getElementById('dropletsContainer');
  const toast = document.getElementById('toast');

  // Dynamic Content Elements
  const greetingSubtitle = document.getElementById('greetingSubtitle');
  const sparkleTag = document.getElementById('sparkleTag');
  const heartEmblem = document.getElementById('heartEmblem');
  const poemLine1 = document.getElementById('poemLine1');
  const poemLine2 = document.getElementById('poemLine2');
  const poemLine3 = document.getElementById('poemLine3');
  const letterStamp = document.getElementById('letterStamp');
  const letterTitle = document.getElementById('letterTitle');
  const letterGreeting = document.getElementById('letterGreeting');
  const letterBodyContainer = document.getElementById('letterBodyContainer');
  const letterSign = document.getElementById('letterSign');

  // SVG stops
  const gradStop0 = document.getElementById('gradStop0') || document.querySelector('#heartGrad stop:nth-child(1)');
  const gradStop50 = document.getElementById('gradStop50') || document.querySelector('#heartGrad stop:nth-child(2)');
  const gradStop100 = document.getElementById('gradStop100') || document.querySelector('#heartGrad stop:nth-child(3)');

  const recipientChips = document.querySelectorAll('.recipient-chip');
  const switchPills = document.querySelectorAll('.switch-pill');

  // Canvases
  const mistCanvas = document.getElementById('mistCanvas');
  const mistCtx = mistCanvas ? mistCanvas.getContext('2d') : null;

  const petalCanvas = document.getElementById('petalCanvas');
  const petalCtx = petalCanvas ? petalCanvas.getContext('2d') : null;

  let confettiCanvas = document.getElementById('letterConfettiCanvas');
  if (!confettiCanvas && letterModal) {
    try {
      confettiCanvas = document.createElement('canvas');
      confettiCanvas.id = 'letterConfettiCanvas';
      confettiCanvas.className = 'letter-confetti-canvas';
      letterModal.insertBefore(confettiCanvas, letterModal.firstChild);
    } catch (e) {}
  }
  const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

  let width = (mistCanvas ? (mistCanvas.width = window.innerWidth) : window.innerWidth);
  let height = (mistCanvas ? (mistCanvas.height = window.innerHeight) : window.innerHeight);
  if (petalCanvas) {
    petalCanvas.width = width;
    petalCanvas.height = height;
  }
  let confettiWidth = confettiCanvas ? (confettiCanvas.width = window.innerWidth) : window.innerWidth;
  let confettiHeight = confettiCanvas ? (confettiCanvas.height = window.innerHeight) : window.innerHeight;

  let isWiping = false;
  let lastPoint = null;
  let isAutoWiping = false;
  let hasShownLetterAuto = false;
  let currentWipedPercent = 0;
  let lastCheckTime = 0;
  let toastTimer = null;

  // Floating Particles & Petals arrays
  const petals = [];
  const sparkles = [];

  // --- RECIPIENTS DATA WITH DISTINCT VISUAL THEMES ---
  const recipientsData = {
    me: {
      name: 'Mẹ Yêu Dấu',
      shortName: 'Mẹ',
      themeClass: 'theme-me',
      emblem: '🌸',
      gradStops: ['#ffd166', '#ff7e40', '#e11d48'],
      mistGrad: ['rgba(44, 15, 8, 0.985)', 'rgba(24, 7, 5, 0.992)', 'rgba(10, 2, 3, 0.998)'],
      particleTheme: {
        petals: ['#ff7e40', '#f59e0b', '#fb7185', '#ffd166', '#f43f5e'],
        sparkles: ['#fef08a', '#fde047', '#fed7aa', '#ffedd5'],
        type: 'lotus'
      },
      subtitle: "Happy Vietnamese Women's Day",
      sparkleTag: 'Chúc Mẹ luôn dồi dào sức khỏe, bình an và hạnh phúc ✨',
      poem: [
        'Đằng sau sương mờ là tất cả',
        'dịu dàng và lòng biết ơn con muốn',
        'gửi trao trọn vẹn cho Mẹ yêu ❤️'
      ],
      stamp: '20/10 • Gửi Mẹ',
      title: 'Gửi Mẹ Yêu Dấu Của Con 🌸',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Con muốn gửi đến Mẹ lời chúc sức khỏe, bình an và trọn vẹn niềm vui nhất. Cảm ơn Mẹ vì cả một đời tần tảo, hy sinh thầm lặng để chăm lo cho gia đình và nuôi nấng chúng con khôn lớn nên người.',
        'Đối với con, Mẹ luôn là người phụ nữ đẹp nhất, vĩ đại nhất và là điểm tựa bình yên nhất trong cuộc đời. Con chỉ mong Mẹ luôn bớt đi những âu lo, luôn nở nụ cười rạng rỡ và sống vui khỏe mỗi ngày bên con cháu.',
        'Chúc Mẹ một ngày 20/10 thật ấm áp, ngập tràn tình yêu thương và niềm tự hào từ cả gia đình! Con yêu Mẹ rất nhiều! ❤️'
      ],
      sign: 'Con của Mẹ, Vnamm! 🌸'
    },
    thuthuy: {
      name: 'Chị Dâu Thu Thủy',
      shortName: 'Chị Thủy',
      themeClass: 'theme-thuthuy',
      emblem: '🌊',
      gradStops: ['#67e8f9', '#00f2fe', '#0369a1'],
      mistGrad: ['rgba(4, 44, 58, 0.985)', 'rgba(3, 20, 32, 0.992)', 'rgba(1, 8, 14, 0.998)'],
      particleTheme: {
        petals: ['#00f2fe', '#38bdf8', '#2dd4bf', '#67e8f9', '#a5f3fc'],
        sparkles: ['#e0f2fe', '#bae6fd', '#38bdf8', '#ffffff'],
        type: 'waves'
      },
      subtitle: "Happy Vietnamese Women's Day",
      sparkleTag: 'Chúc Chị luôn tươi trẻ, rạng rỡ, thành công và hạnh phúc viên mãn ✨',
      poem: [
        'Gửi đến Chị Dâu ngàn lời chúc',
        'luôn rạng rỡ, thành công và ngập tràn',
        'nụ cười hạnh phúc mỗi ngày 🌊✨'
      ],
      stamp: '20/10 • Thu Thủy',
      title: 'Gửi Chị Dâu Của Em 🌊',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Em chúc chị Thủy luôn ngập tràn niềm vui, nụ cười rạng rỡ và hạnh phúc trong từng khoảnh khắc của cuộc sống.',
        'Chúc chị luôn giữ trọn nét duyên dáng, xinh đẹp, công việc luôn hanh thông, thuận buồm xuôi gió và gặt hái thật nhiều thành công mới rực rỡ.',
        'Chúc chị có một ngày 20/10 thật ngọt ngào, ý nghĩa và nhận được thật nhiều tình cảm yêu thương từ cả gia đình! ✨'
      ],
      sign: 'Em Nam 🌊✨'
    },
    thuhuong: {
      name: 'Chị Gái Thu Hương',
      shortName: 'Chị Hương',
      themeClass: 'theme-thuhuong',
      emblem: '💜',
      gradStops: ['#f5d0fe', '#c084fc', '#7e22ce'],
      mistGrad: ['rgba(40, 9, 56, 0.985)', 'rgba(18, 4, 28, 0.992)', 'rgba(8, 1, 14, 0.998)'],
      particleTheme: {
        petals: ['#c084fc', '#a855f7', '#f472b6', '#e879f9', '#d8b4fe'],
        sparkles: ['#fae8ff', '#f5d0fe', '#fbcfe8', '#ffffff'],
        type: 'stardust'
      },
      subtitle: "Happy Vietnamese Women's Day",
      sparkleTag: 'Chúc Chị luôn xinh đẹp, tỏa sáng và ngập tràn niềm vui yêu đời ✨',
      poem: [
        'Chúc Chị Gái mãi luôn tươi trẻ',
        'xinh đẹp, duyên dáng và thăng hoa',
        'trong vạn điều may mắn 💜🌸'
      ],
      stamp: '20/10 • Thu Hương',
      title: 'Gửi Chị Gái Yêu Quý 💜',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Em chúc chị Hương luôn xinh đẹp, trẻ trung, rạng ngời và tràn đầy nguồn năng lượng tích cực mỗi ngày.',
        'Cảm ơn chị vì đã luôn là một người chị gái tuyệt vời, luôn quan tâm, chia sẻ và đồng hành cùng em. Chúc cho mọi dự định và ước mơ sắp tới của chị sẽ đều thành hiện thực rực rỡ.',
        'Chúc chị hôm nay nhận được thật nhiều hoa, nhiều quà và có một ngày 20/10 thật hạnh phúc, trọn vẹn nhé! 💜'
      ],
      sign: 'Em zai Nammm! 💜✨'
    }
  };

  let currentRecipient = 'me';

  // Apply recipient content and theme
  function applyRecipient(key) {
    if (!recipientsData[key]) return;
    currentRecipient = key;
    const data = recipientsData[key];

    // 1. Change body theme class for smooth CSS transitions
    document.body.className = data.themeClass;

    // 2. Update emblem and badge icons
    if (heartEmblem) heartEmblem.textContent = data.emblem;
    if (introBadgeIcon) introBadgeIcon.textContent = data.emblem;
    if (sealEmblemIcon) sealEmblemIcon.textContent = data.emblem;

    // 3. Update SVG heart gradient colors
    if (gradStop0 && gradStop50 && gradStop100) {
      gradStop0.setAttribute('stop-color', data.gradStops[0]);
      gradStop50.setAttribute('stop-color', data.gradStops[1]);
      gradStop100.setAttribute('stop-color', data.gradStops[2]);
    }

    // 4. Update texts
    greetingSubtitle.textContent = data.subtitle;
    sparkleTag.textContent = data.sparkleTag;

    poemLine1.textContent = data.poem[0];
    poemLine2.textContent = data.poem[1];
    poemLine3.textContent = data.poem[2];

    letterStamp.textContent = data.stamp;
    letterTitle.textContent = data.title;
    letterGreeting.textContent = data.greeting;
    letterSign.textContent = data.sign;

    letterBodyContainer.innerHTML = '';
    data.paragraphs.forEach((pText, idx) => {
      const p = document.createElement('p');
      p.classList.add('letter-body');
      p.style.setProperty('--delay', `${0.44 + idx * 0.12}s`);
      p.textContent = pText;
      letterBodyContainer.appendChild(p);
    });

    // 5. Update active chip / switch pill states
    recipientChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.recipient === key);
    });
    switchPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === key);
    });

    // 6. Update particle colors smoothly
    updateParticlesPalette(data.particleTheme);
  }



  // Selector handlers
  recipientChips.forEach(chip => {
    chip.addEventListener('click', () => {
      applyRecipient(chip.dataset.recipient);
    });
  });

  switchPills.forEach(pill => {
    pill.addEventListener('click', () => {
      applyRecipient(pill.dataset.target);
      showToast(`Đã chuyển sang giao diện: ${recipientsData[pill.dataset.target].name}`);
      playTone(pill.dataset.target);
    });
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    if (mistCanvas) {
      mistCanvas.width = width;
      mistCanvas.height = height;
    }
    if (petalCanvas) {
      petalCanvas.width = width;
      petalCanvas.height = height;
    }
    if (confettiCanvas) {
      confettiWidth = confettiCanvas.width = width;
      confettiHeight = confettiCanvas.height = height;
    }
    initMist();
    initPetals();
  });

  // --- AUDIO LOGIC ---
  function playMusic() {
    if (!bgMusic) return;
    try {
      const p = bgMusic.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          if (musicToggle) musicToggle.classList.add('playing');
        }).catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      } else {
        if (musicToggle) musicToggle.classList.add('playing');
      }
    } catch (err) {
      console.log('Audio error:', err);
    }
  }

  function toggleMusic() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      bgMusic.play();
      if (musicToggle) musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      if (musicToggle) musicToggle.classList.remove('playing');
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // Gentle Web Audio tone for tactile button feedback
  let audioCtx = null;
  function playTone(target) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      const freqMap = { me: 523.25, thuthuy: 659.25, thuhuong: 783.99 }; // C5, E5, G5 chords
      osc.frequency.setValueAtTime(freqMap[target] || 587.33, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (introOverlay) introOverlay.classList.add('hidden');
      playMusic();
      setTimeout(() => {
        generateDroplets();
      }, 400);
    });
  }

  // Toast
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- MIST CANVAS LOGIC ---
  function initMist() {
    mistCtx.globalCompositeOperation = 'source-over';
    
    const themeMist = recipientsData[currentRecipient].mistGrad;
    const grad = mistCtx.createRadialGradient(
      width / 2, height * 0.4, 50,
      width / 2, height * 0.4, Math.max(width, height) * 0.8
    );
    grad.addColorStop(0, themeMist[0]);
    grad.addColorStop(0.5, themeMist[1]);
    grad.addColorStop(1, themeMist[2]);

    mistCtx.fillStyle = grad;
    mistCtx.fillRect(0, 0, width, height);

    addFrostTexture();
  }

  function addFrostTexture() {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 160;
    offCanvas.height = 160;
    const offCtx = offCanvas.getContext('2d');
    const imgData = offCtx.createImageData(160, 160);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 50;
      data[i] = 230 + v;
      data[i + 1] = 215 + v;
      data[i + 2] = 225 + v;
      data[i + 3] = 16 + Math.random() * 42; // dense condensation frost grain
    }
    offCtx.putImageData(imgData, 0, 0);

    mistCtx.globalCompositeOperation = 'source-over';
    const pattern = mistCtx.createPattern(offCanvas, 'repeat');
    mistCtx.fillStyle = pattern;
    mistCtx.fillRect(0, 0, width, height);
  }

  // Erase/Wipe mist function
  function wipeAt(x, y, radius = 42) {
    mistCtx.globalCompositeOperation = 'destination-out';

    const brushGrad = mistCtx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
    brushGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    brushGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.85)');
    brushGrad.addColorStop(0.9, 'rgba(0, 0, 0, 0.3)');
    brushGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    mistCtx.fillStyle = brushGrad;
    mistCtx.beginPath();
    mistCtx.arc(x, y, radius, 0, Math.PI * 2);
    mistCtx.fill();
  }

  // Calculate actual wiped percentage
  function getWipedPercentage() {
    const sampleStep = 16;
    const imgData = mistCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let clearedCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const idx = (y * width + x) * 4 + 3;
        if (data[idx] < 120) {
          clearedCount++;
        }
        totalSampled++;
      }
    }
    return totalSampled > 0 ? (clearedCount / totalSampled) * 100 : 0;
  }

  // Check progress and trigger letter at exactly >= 60%
  function checkWipedProgress() {
    currentWipedPercent = Math.min(100, Math.round(getWipedPercentage()));

    if (currentWipedPercent < 60) {
      wipeHint.style.opacity = '1';
      wipeHint.innerHTML = `<span class="hand-icon">👆</span><span>Đã lau: <b>${currentWipedPercent}%</b> / 60% (Lau tiếp để mở thư ✨)</span>`;
    } else {
      wipeHint.innerHTML = `<span class="hand-icon">💌</span><span>Đã lau được <b>${currentWipedPercent}%</b>! Bức thư bí mật đang mở... ❤️</span>`;
      setTimeout(() => {
        wipeHint.style.opacity = '0';
      }, 2500);

      if (!hasShownLetterAuto) {
        hasShownLetterAuto = true;
        // Celebration chime & stardust burst right away
        playCelebrationChime();
        launchConfettiBurst();
        setTimeout(() => {
          openModal();
        }, 450);
      }
    }
  }

  function wipeLine(p1, p2, radius = 42) {
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.ceil(dist / 4);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;
      wipeAt(x, y, radius);
    }
  }

  function getPos(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function handleStart(e) {
    isWiping = true;
    const pos = getPos(e);
    lastPoint = pos;
    wipeAt(pos.x, pos.y);
  }

  function handleMove(e) {
    if (!isWiping) return;
    const pos = getPos(e);
    if (lastPoint) {
      wipeLine(lastPoint, pos);
    }
    lastPoint = pos;

    const now = Date.now();
    if (now - lastCheckTime > 200) {
      lastCheckTime = now;
      checkWipedProgress();
    }
  }

  function handleEnd() {
    if (isWiping) {
      isWiping = false;
      lastPoint = null;
      checkWipedProgress();
    }
  }

  mistCanvas.addEventListener('mousedown', handleStart);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);

  mistCanvas.addEventListener('touchstart', handleStart, { passive: false });
  window.addEventListener('touchmove', (e) => {
    if (isWiping) {
      e.preventDefault();
      handleMove(e);
    }
  }, { passive: false });
  window.addEventListener('touchend', handleEnd);

  // --- AUTO WIPE ANIMATION ---
  function autoWipe() {
    if (isAutoWiping) return;
    isAutoWiping = true;
    wipeHint.style.opacity = '1';
    wipeHint.innerHTML = `<span class="hand-icon">✨</span><span>Đang tự động lau sương...</span>`;

    const cx = width / 2;
    const cy = height * 0.42;
    const scale = Math.min(width, height) / 450;

    const strokes = [];

    function addNum2(ox, oy, s) {
      for (let a = Math.PI * 0.8; a >= -Math.PI * 0.2; a -= 0.12) {
        strokes.push({ x: ox + Math.cos(a) * 25 * s, y: oy - 25 * s + Math.sin(a) * 22 * s, r: 30 });
      }
      strokes.push({ x: ox + 18 * s, y: oy - 10 * s, r: 30 });
      strokes.push({ x: ox - 18 * s, y: oy + 25 * s, r: 30 });
      strokes.push({ x: ox + 22 * s, y: oy + 25 * s, r: 30 });
    }

    function addNum0(ox, oy, s) {
      for (let a = 0; a <= Math.PI * 2; a += 0.12) {
        strokes.push({ x: ox + Math.cos(a) * 18 * s, y: oy + Math.sin(a) * 28 * s, r: 30 });
      }
    }

    function addHeart(ox, oy, s) {
      for (let t = 0; t <= Math.PI * 2; t += 0.04) {
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        strokes.push({ x: ox + hx * 9.5 * s, y: oy + hy * 9.5 * s, r: 44 });
      }
    }

    function addWideClearing(ox, oy, maxRadius) {
      for (let r = 0; r <= maxRadius; r += 16) {
        for (let a = 0; a < Math.PI * 2; a += 0.25) {
          strokes.push({ x: ox + Math.cos(a) * r, y: oy + Math.sin(a) * (r * 0.95), r: 46 });
        }
      }
    }

    addWideClearing(cx, cy, Math.min(width, height) * 0.48);
    addHeart(cx, cy, scale);
    addNum2(cx - 80 * scale, cy - 90 * scale, scale);
    addNum0(cx - 32 * scale, cy - 90 * scale, scale);
    addNum0(cx + 80 * scale, cy - 90 * scale, scale);

    let idx = 0;
    function playNextStroke() {
      if (idx < strokes.length) {
        for (let step = 0; step < 3 && idx < strokes.length; step++) {
          const pt = strokes[idx];
          const next = strokes[Math.min(idx + 1, strokes.length - 1)];
          wipeLine(pt, next, pt.r);
          idx++;
        }
        if (idx % 15 === 0) {
          checkWipedProgress();
        }
        requestAnimationFrame(playNextStroke);
      } else {
        isAutoWiping = false;
        checkWipedProgress();
      }
    }
    playNextStroke();
  }

  autoWipeBtn.addEventListener('click', autoWipe);

  // Refog Button
  refogBtn.addEventListener('click', () => {
    initMist();
    currentWipedPercent = 0;
    hasShownLetterAuto = false;
    wipeHint.style.opacity = '1';
    wipeHint.innerHTML = '<span class="hand-icon">👆</span><span>Dùng tay hoặc chuột lau nhẹ lớp sương mờ... (Cần 60%)</span>';
    showToast('Đã phủ lại sương mờ! Hãy lau lại để khám phá.');
  });

  // --- WATER DROPLETS GENERATION ---
  function generateDroplets() {
    dropletsContainer.innerHTML = '';
    const numDroplets = Math.floor((width * height) / 18000);

    for (let i = 0; i < numDroplets; i++) {
      const drop = document.createElement('div');
      drop.classList.add('water-droplet');

      const size = 3 + Math.random() * 8;
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      drop.style.width = `${size}px`;
      drop.style.height = `${size * (1 + Math.random() * 0.4)}px`;
      drop.style.left = `${left}%`;
      drop.style.top = `${top}%`;
      drop.style.opacity = (0.4 + Math.random() * 0.5).toString();

      if (Math.random() < 0.12) {
        drop.classList.add('drip');
        drop.style.animationDelay = `${Math.random() * 8}s`;
        drop.style.animationDuration = `${3 + Math.random() * 4}s`;
      }

      dropletsContainer.appendChild(drop);
    }
  }

  // --- FLOATING PARTICLES & PETALS CANVAS ---
  class Petal {
    constructor(colors = ['#ff7e40', '#f59e0b', '#fb7185']) {
      this.colors = colors;
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.size = 9 + Math.random() * 14;
      this.speedY = 0.8 + Math.random() * 1.5;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.angle = Math.random() * 360;
      this.spinSpeed = (Math.random() - 0.5) * 2;
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.opacity = 0.65 + Math.random() * 0.35;
      this.sway = Math.random() * 2;
      this.swaySpeed = 0.02 + Math.random() * 0.02;
    }
    setColors(newColors) {
      this.colors = newColors;
      this.color = newColors[Math.floor(Math.random() * newColors.length)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * this.swaySpeed) * 0.85;
      this.angle += this.spinSpeed;

      if (this.y > height + 30) {
        this.reset();
      }
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 9;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size * 0.7, -this.size * 0.5, this.size, 0);
      ctx.quadraticCurveTo(this.size * 0.7, this.size * 0.5, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor(colors = ['#fef08a', '#fed7aa']) {
      this.colors = colors;
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 1 + Math.random() * 2.4;
      this.alpha = Math.random();
      this.speed = 0.012 + Math.random() * 0.02;
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    setColors(newColors) {
      this.colors = newColors;
      this.color = newColors[Math.floor(Math.random() * newColors.length)];
    }
    update() {
      this.alpha += this.speed;
      if (this.alpha > 1 || this.alpha < 0) {
        this.speed = -this.speed;
      }
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.abs(Math.sin(this.alpha));
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initPetals() {
    petals.length = 0;
    sparkles.length = 0;
    const currentTheme = recipientsData[currentRecipient].particleTheme;
    const petalCount = Math.floor(width / 32);
    const sparkleCount = Math.floor(width / 20);

    for (let i = 0; i < petalCount; i++) petals.push(new Petal(currentTheme.petals));
    for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle(currentTheme.sparkles));
  }

  function updateParticlesPalette(theme) {
    petals.forEach(p => p.setColors(theme.petals));
    sparkles.forEach(s => s.setColors(theme.sparkles));
  }

  function animate() {
    petalCtx.clearRect(0, 0, width, height);

    for (const s of sparkles) {
      s.update();
      s.draw(petalCtx);
    }

    for (const p of petals) {
      p.update();
      p.draw(petalCtx);
    }

    requestAnimationFrame(animate);
  }

  // --- CELEBRATION CHIME (CELESTA / HARP ARPEGGIO) ---
  function playCelebrationChime() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const now = audioCtx.currentTime;
      // Dreamy celebratory harp arpeggio (C5, E5, G5, B5, C6, E6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        
        gain.gain.setValueAtTime(0.0001, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.09 + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 1.2);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 1.25);
      });
    } catch (e) {}
  }

  // --- CELEBRATION CONFETTI & STARDUST BURST ---
  const confettiParticles = [];
  let confettiAnimId = null;

  class ConfettiParticle {
    constructor(themeColors) {
      this.reset(themeColors);
    }
    reset(themeColors) {
      this.x = confettiWidth / 2 + (Math.random() - 0.5) * 80;
      this.y = confettiHeight * 0.45 + (Math.random() - 0.5) * 60;
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 11;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 3;
      this.gravity = 0.22;
      this.friction = 0.96;
      this.size = 5 + Math.random() * 8;
      this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
      this.alpha = 1;
      this.decay = 0.012 + Math.random() * 0.014;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 12;
      this.shape = Math.random() < 0.35 ? 'heart' : (Math.random() < 0.6 ? 'star' : 'circle');
    }
    update() {
      this.vx *= this.friction;
      this.vy = (this.vy + this.gravity) * this.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.alpha -= this.decay;
    }
    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;

      if (this.shape === 'heart') {
        const s = this.size * 0.7;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.5, -s, 0, -s * 0.4);
        ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.5, 0, s * 0.3);
        ctx.fill();
      } else if (this.shape === 'star') {
        const r = this.size * 0.9;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, -Math.sin((18 + i * 72) * Math.PI / 180) * r);
          ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r * 0.45), -Math.sin((54 + i * 72) * Math.PI / 180) * (r * 0.45));
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function launchConfettiBurst() {
    confettiParticles.length = 0;
    const theme = recipientsData[currentRecipient].particleTheme;
    const colors = [...theme.petals, ...theme.sparkles, '#ffd700', '#ffffff'];
    for (let i = 0; i < 85; i++) {
      confettiParticles.push(new ConfettiParticle(colors));
    }
    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    animateConfetti();
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiWidth, confettiHeight);
    let activeCount = 0;
    for (const p of confettiParticles) {
      if (p.alpha > 0) {
        p.update();
        p.draw(confettiCtx);
        activeCount++;
      }
    }
    if (activeCount > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiWidth, confettiHeight);
    }
  }

  // --- MODAL POPUP LOGIC ---
  function openModal() {
    playCelebrationChime();
    launchConfettiBurst();
    if (modalEnvelope) modalEnvelope.style.transform = '';
    if (letterModal) letterModal.classList.add('active');
  }

  function closeModal() {
    if (letterModal) letterModal.classList.remove('active');
    if (modalEnvelope) modalEnvelope.style.transform = '';
  }

  if (letterBtn) {
    letterBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (enjoyLetterBtn) {
    enjoyLetterBtn.addEventListener('click', closeModal);
  }

  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        closeModal();
      }
    });

    // 3D Parallax Tilt Effect on the luxury letter envelope
    letterModal.addEventListener('mousemove', (e) => {
      if (!modalEnvelope || !letterModal.classList.contains('active')) return;
      const rect = modalEnvelope.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX = Math.max(-8, Math.min(8, -dy * 6));
      const tiltY = Math.max(-8, Math.min(8, dx * 6));
      modalEnvelope.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1)`;
    });

    letterModal.addEventListener('mouseleave', () => {
      if (modalEnvelope && letterModal.classList.contains('active')) {
        modalEnvelope.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });
  }

  // Init sequence
  initMist();
  initPetals();
  animate();

  // URL query parameter support (?to=me, ?to=thuthuy, ?to=thuhuong)
  const urlParams = new URLSearchParams(window.location.search);
  const targetParam = urlParams.get('to');
  if (targetParam && recipientsData[targetParam.toLowerCase()]) {
    applyRecipient(targetParam.toLowerCase());
  } else {
    applyRecipient('me');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
