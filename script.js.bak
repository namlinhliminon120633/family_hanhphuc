// 20/10 - Món Quà Yêu Thương Gia Đình Script
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const introOverlay = document.getElementById('introOverlay');
  const startBtn = document.getElementById('startBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const autoWipeBtn = document.getElementById('autoWipeBtn');
  const refogBtn = document.getElementById('refogBtn');
  const letterBtn = document.getElementById('letterBtn');
  const letterModal = document.getElementById('letterModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const wipeHint = document.getElementById('wipeHint');
  const dropletsContainer = document.getElementById('dropletsContainer');
  const toast = document.getElementById('toast');

  // Dynamic Content Elements
  const greetingSubtitle = document.getElementById('greetingSubtitle');
  const sparkleTag = document.getElementById('sparkleTag');
  const poemLine1 = document.getElementById('poemLine1');
  const poemLine2 = document.getElementById('poemLine2');
  const poemLine3 = document.getElementById('poemLine3');
  const letterStamp = document.getElementById('letterStamp');
  const letterTitle = document.getElementById('letterTitle');
  const letterGreeting = document.getElementById('letterGreeting');
  const letterBodyContainer = document.getElementById('letterBodyContainer');
  const letterSign = document.getElementById('letterSign');

  const recipientChips = document.querySelectorAll('.recipient-chip');
  const switchPills = document.querySelectorAll('.switch-pill');

  // Canvas
  const mistCanvas = document.getElementById('mistCanvas');
  const mistCtx = mistCanvas.getContext('2d');

  const petalCanvas = document.getElementById('petalCanvas');
  const petalCtx = petalCanvas.getContext('2d');

  let width = (mistCanvas.width = petalCanvas.width = window.innerWidth);
  let height = (mistCanvas.height = petalCanvas.height = window.innerHeight);

  let isWiping = false;
  let lastPoint = null;
  let isAutoWiping = false;
  let hasShownLetterAuto = false;
  let currentWipedPercent = 0;
  let lastCheckTime = 0;
  let toastTimer = null;

  // --- RECIPIENTS DATA ---
  const recipientsData = {
    me: {
      name: 'Mẹ Yêu',
      shortName: 'Mẹ',
      subtitle: 'Happy Vietnamese Women\'s Day',
      sparkleTag: 'Chúc Mẹ luôn dồi dào sức khỏe, bình an và hạnh phúc ✨',
      poem: [
        'Đằng sau sương mờ là tất cả',
        'dịu dàng và sự biết ơn con muốn',
        'gửi trao cho Mẹ ❤️'
      ],
      stamp: '20/10 • Gửi Mẹ',
      title: 'Gửi Mẹ Yêu Dấu Của Con 🌹',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Con muốn gửi đến Mẹ lời chúc sức khỏe, bình an và trọn vẹn niềm vui nhất. Cảm ơn Mẹ vì cả một đời tảo tần, hy sinh thầm lặng để chăm lo cho gia đình và nuôi nấng chúng con khôn lớn.',
        'Đối với con, Mẹ luôn là người phụ nữ đẹp nhất, vĩ đại nhất và là điểm tựa bình yên nhất trong cuộc đời. Con chỉ mong Mẹ luôn bớt đi những âu lo, luôn nở nụ cười rạng rỡ và sống vui khỏe mỗi ngày.',
        'Chúc Mẹ một ngày 20/10 thật ấm áp, ngập tràn tình yêu thương và niềm tự hào từ cả gia đình! ✨'
      ],
      sign: 'Con của Mẹ, Vnamm! ❤️'
    },
    thuthuy: {
      name: 'Chị Dâu',
      shortName: 'Chị Thủy',
      subtitle: 'Happy Vietnamese Women\'s Day',
      sparkleTag: 'Chúc chị luôn tươi trẻ, rạng rỡ và hạnh phúc viên mãn ✨',
      poem: [
        'Đằng sau sương mờ là',
        'lời chúc của em muốn gửi chị',
        'nhân ngày 20/10'
        
      ],
      stamp: '20/10 • Thu Thủy',
      title: 'Gửi Chị Dâu của em 🌸',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Em chúc chị Thủy luôn ngập tràn niềm vui, nụ cười rạng rỡ và hạnh phúc trong từng khoảnh khắc.',
        'Chúc chị luôn giữ trọn nét duyên dáng, xinh đẹp, công việc luôn hanh thông, thuận lợi và gặt hái thật nhiều thành công mới.',
        'Chúc chị có một ngày 20/10 thật ngọt ngào, ý nghĩa và nhận được thật nhiều yêu thương từ gia đình! ✨'
      ],
      sign: 'Em Namm ❤️'
    },
    thuhuong: {
      name: 'Chị Gái',
      shortName: 'Chị Hương',
      subtitle: 'Happy Vietnamese Women\'s Day',
      sparkleTag: 'Chúc chị luôn xinh đẹp, tỏa sáng và ngập tràn niềm vui ✨',
      poem: [
        'Đằng sau sương mờ là',
        'lời chúc của em muốn gửi chị',
        'nhân ngày 20/10'
        
      ],
      stamp: '20/10 • Thu Hương',
      title: 'Gửi Chị Gái yêu quý 💐',
      greeting: 'Nhân ngày Phụ nữ Việt Nam 20/10,',
      paragraphs: [
        'Em chúc chị luôn xinh đẹp, trẻ trung, rạng ngời và tràn đầy năng lượng tích cực mỗi ngày.',
        'Cảm ơn chị vì đã luôn là một người chị gái tuyệt vời, luôn quan tâm, chia sẻ và đồng hành cùng em. Mong rằng mọi dự định sắp tới của chị và gia đình sẽ thuận lợi, suôn sẻ.',
        'Chúc chị hôm nay nhận được thật nhiều hoa, nhiều quà và có một ngày 20/10 thật hạnh phúc nhé! ✨'
      ],
      sign: 'Em zai Nammm! ❤️'
    }
  };

  let currentRecipient = 'me';

  // Apply recipient content
  function applyRecipient(key) {
    if (!recipientsData[key]) return;
    currentRecipient = key;
    const data = recipientsData[key];

    // Subtitle & Sparkle
    greetingSubtitle.textContent = data.subtitle;
    sparkleTag.textContent = data.sparkleTag;

    // Poem
    poemLine1.textContent = data.poem[0];
    poemLine2.textContent = data.poem[1];
    poemLine3.textContent = data.poem[2];

    // Modal Letter Content
    letterStamp.textContent = data.stamp;
    letterTitle.textContent = data.title;
    letterGreeting.textContent = data.greeting;
    letterSign.textContent = data.sign;

    letterBodyContainer.innerHTML = '';
    data.paragraphs.forEach(pText => {
      const p = document.createElement('p');
      p.classList.add('letter-body');
      p.textContent = pText;
      letterBodyContainer.appendChild(p);
    });

    // Update active states
    recipientChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.recipient === key);
    });
    switchPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === key);
    });
  }

  // URL query parameter support (?to=me, ?to=thuthuy, ?to=thuhuong)
  const urlParams = new URLSearchParams(window.location.search);
  const targetParam = urlParams.get('to');
  if (targetParam && recipientsData[targetParam.toLowerCase()]) {
    applyRecipient(targetParam.toLowerCase());
  } else {
    applyRecipient('me');
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
      showToast(`Đã chuyển lời chúc gửi đến: ${recipientsData[pill.dataset.target].name}`);
    });
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    width = mistCanvas.width = petalCanvas.width = window.innerWidth;
    height = mistCanvas.height = petalCanvas.height = window.innerHeight;
    initMist();
    initPetals();
  });

  // --- AUDIO LOGIC ---
  function playMusic() {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
    });
  }

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  startBtn.addEventListener('click', () => {
    introOverlay.classList.add('hidden');
    playMusic();
    setTimeout(() => {
      generateDroplets();
    }, 500);
  });

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
    
    const grad = mistCtx.createRadialGradient(
      width / 2, height * 0.4, 50,
      width / 2, height * 0.4, Math.max(width, height) * 0.8
    );
    grad.addColorStop(0, 'rgba(40, 20, 45, 0.94)');
    grad.addColorStop(0.5, 'rgba(30, 15, 35, 0.96)');
    grad.addColorStop(1, 'rgba(18, 5, 22, 0.98)');

    mistCtx.fillStyle = grad;
    mistCtx.fillRect(0, 0, width, height);

    addFrostTexture();
  }

  function addFrostTexture() {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 120;
    offCanvas.height = 120;
    const offCtx = offCanvas.getContext('2d');
    const imgData = offCtx.createImageData(120, 120);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 45;
      data[i] = 230 + v;
      data[i + 1] = 210 + v;
      data[i + 2] = 225 + v;
      data[i + 3] = Math.random() * 25;
    }
    offCtx.putImageData(imgData, 0, 0);

    mistCtx.globalCompositeOperation = 'source-over';
    const pattern = mistCtx.createPattern(offCanvas, 'repeat');
    mistCtx.fillStyle = pattern;
    mistCtx.fillRect(0, 0, width, height);
  }

  // Erase/Wipe mist function
  function wipeAt(x, y, radius = 40) {
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
      wipeHint.innerHTML = `<span class="hand-icon">🎉</span><span>Đã lau được <b>${currentWipedPercent}%</b>! Bức thư bí mật đang mở... ❤️</span>`;
      setTimeout(() => {
        wipeHint.style.opacity = '0';
      }, 2500);

      if (!hasShownLetterAuto) {
        hasShownLetterAuto = true;
        setTimeout(() => {
          openModal();
        }, 600);
      }
    }
  }

  function wipeLine(p1, p2, radius = 40) {
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
    wipeHint.innerHTML = `<span class="hand-icon">🪄</span><span>Đang tự động lau sương...</span>`;

    const cx = width / 2;
    const cy = height * 0.42;
    const scale = Math.min(width, height) / 450;

    const strokes = [];

    function addNum2(ox, oy, s) {
      for (let a = Math.PI * 0.8; a >= -Math.PI * 0.2; a -= 0.12) {
        strokes.push({ x: ox + Math.cos(a) * 25 * s, y: oy - 25 * s + Math.sin(a) * 22 * s, r: 28 });
      }
      strokes.push({ x: ox + 18 * s, y: oy - 10 * s, r: 28 });
      strokes.push({ x: ox - 18 * s, y: oy + 25 * s, r: 28 });
      strokes.push({ x: ox + 22 * s, y: oy + 25 * s, r: 28 });
    }

    function addNum0(ox, oy, s) {
      for (let a = 0; a <= Math.PI * 2; a += 0.12) {
        strokes.push({ x: ox + Math.cos(a) * 18 * s, y: oy + Math.sin(a) * 28 * s, r: 28 });
      }
    }

    function addDot(ox, oy, s) {
      strokes.push({ x: ox, y: oy + 22 * s, r: 22 });
    }

    function addNum1(ox, oy, s) {
      strokes.push({ x: ox - 10 * s, y: oy - 15 * s, r: 28 });
      strokes.push({ x: ox, y: oy - 25 * s, r: 28 });
      for (let y = -25; y <= 25; y += 5) {
        strokes.push({ x: ox, y: oy + y * s, r: 28 });
      }
    }

    function addHeart(ox, oy, s) {
      for (let t = 0; t <= Math.PI * 2; t += 0.04) {
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        strokes.push({ x: ox + hx * 9.5 * s, y: oy + hy * 9.5 * s, r: 42 });
      }
    }

    function addWideClearing(ox, oy, maxRadius) {
      for (let r = 0; r <= maxRadius; r += 16) {
        for (let a = 0; a < Math.PI * 2; a += 0.25) {
          strokes.push({ x: ox + Math.cos(a) * r, y: oy + Math.sin(a) * (r * 0.95), r: 45 });
        }
      }
    }

    addWideClearing(cx, cy, Math.min(width, height) * 0.48);
    addHeart(cx, cy, scale);
    addNum2(cx - 80 * scale, cy - 90 * scale, scale);
    addNum0(cx - 32 * scale, cy - 90 * scale, scale);
    addDot(cx, cy - 90 * scale, scale);
    addNum1(cx + 32 * scale, cy - 90 * scale, scale);
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

  // --- FLOATING PETALS & GLOWING PARTICLES CANVAS ---
  const petals = [];
  const sparkles = [];

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.size = 10 + Math.random() * 14;
      this.speedY = 0.8 + Math.random() * 1.6;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.angle = Math.random() * 360;
      this.spinSpeed = (Math.random() - 0.5) * 2;
      this.color = Math.random() > 0.4 ? '#ff758c' : '#ff4b72';
      this.opacity = 0.6 + Math.random() * 0.35;
      this.sway = Math.random() * 2;
      this.swaySpeed = 0.02 + Math.random() * 0.02;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * this.swaySpeed) * 0.8;
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
      ctx.shadowColor = 'rgba(255, 117, 140, 0.4)';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size * 0.7, -this.size * 0.5, this.size, 0);
      ctx.quadraticCurveTo(this.size * 0.7, this.size * 0.5, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 1 + Math.random() * 2.2;
      this.alpha = Math.random();
      this.speed = 0.01 + Math.random() * 0.02;
      this.color = Math.random() > 0.5 ? '#ffeaa7' : '#ffccd5';
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
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initPetals() {
    petals.length = 0;
    sparkles.length = 0;
    const petalCount = Math.floor(width / 35);
    const sparkleCount = Math.floor(width / 22);

    for (let i = 0; i < petalCount; i++) petals.push(new Petal());
    for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());
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

  // --- MODAL POPUP LOGIC ---
  function openModal() {
    letterModal.classList.add('active');
  }

  function closeModal() {
    letterModal.classList.remove('active');
  }

  letterBtn.addEventListener('click', () => {
    if (currentWipedPercent >= 60 || hasShownLetterAuto) {
      openModal();
    } else {
      showToast(`Nàng hãy lau sương thêm chút nữa nhé! (${currentWipedPercent}% / 60%) ✨`);
    }
  });

  closeModalBtn.addEventListener('click', closeModal);
  letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) {
      closeModal();
    }
  });

  // Init sequence
  initMist();
  initPetals();
  animate();
});
