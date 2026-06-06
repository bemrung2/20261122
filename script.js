/* ============================================================
   script.js — 우리의 이야기 💕

   ✏️ 커스터마이징 가이드:
   ─────────────────────────────────────────────────────────
   1. SCENES 배열의 각 항목을 수정하세요 (최대 10개 권장)
   2. media 필드에 파일 경로를 넣으세요
      - 사진: 'images/photo1.jpg'
      - 영상: 'videos/clip1.mp4'
      - 비워두면 핑크 placeholder 표시
   3. mediaType: 'photo' 또는 'video' 로 지정하세요
   4. 프로포즈 메시지 → index.html 의 .propose-body 수정
   ─────────────────────────────────────────────────────────
============================================================ */

const SCENES = [
  {
    chip:      "Chapter 1 · 입사 첫날",
    date:      "2021년 8월",
    title:     "같은 날, 같은 곳에서\n우리가 시작됐어",
    body:      "수백 명의 신입사원 중에\n처음 눈이 마주쳤던 그 순간,\n이상하게 계속 네가 눈에 띄었어.",
    media:     "",          // 예) 'images/01_first_day.jpg'
    mediaType: "photo",
  },
  {
    chip:      "Chapter 2 · 교육 기간",
    date:      "2021년 9월",
    title:     "같이 공부하다\n정이 들어버렸어",
    body:      "연수원에서 밤새 같이 공부하고,\n쉬는 시간마다 커피 마시러 갔던 거 기억나?\n그때부터 이미 좋아하고 있었던 것 같아.",
    media:     "",
    mediaType: "photo",
  },
  {
    chip:      "Chapter 3 · 처음으로 단둘이",
    date:      "2021년 겨울",
    title:     "첫 데이트날,\n심장이 터질 것 같았어",
    body:      "무슨 말을 했는지도 기억 안 날 만큼\n너무 떨리고 설렜던 날.\n집에 돌아와서 혼자 한참을 웃었어.",
    media:     "",
    mediaType: "photo",
  },
  {
    chip:      "Chapter 4 · 사계절을 함께",
    date:      "2022년",
    title:     "어느 계절이든\n네가 있으면 좋았어",
    body:      "봄엔 벚꽃 구경, 여름엔 바다,\n가을엔 드라이브, 겨울엔 따뜻한 카페.\n뭘 해도 네가 옆에 있으니까 행복했어.",
    media:     "",
    mediaType: "photo",
  },
  {
    chip:      "Chapter 5 · 소소한 일상",
    date:      "2022년 — 2023년",
    title:     "아무것도 안 해도\n좋은 사람",
    body:      "퇴근하고 같이 편의점 가던 날들,\n아무 말 없이 나란히 앉아 있던 시간들,\n그런 평범한 순간이 제일 소중해.",
    media:     "",
    mediaType: "photo",
  },
  {
    chip:      "Chapter 6 · 첫 여행",
    date:      "2023년",
    title:     "여행지에서 더\n확신했어",
    body:      "처음으로 함께 떠난 여행에서\n길을 잃어도, 비가 와도 웃었던 우리.\n이 사람이랑 평생 다니고 싶다 생각했어.",
    media:     "",
    mediaType: "video",   // 영상으로 지정한 예시
  },
  {
    chip:      "Chapter 7 · 지금 이 순간",
    date:      "2025년",
    title:     "4년이 지났고\n나는 확신해",
    body:      "입사동기로 만나 연인이 된 우리,\n이제 마지막 챕터를 넘길 차례야.\n조금만 더 읽어봐 💕",
    media:     "",
    mediaType: "photo",
  },
];

/* ──────────────────────────────────────────
   내부 로직 (수정 불필요)
────────────────────────────────────────── */
let idx         = 0;
let navVisible  = false;
let isAnimating = false;

// 인트로
document.getElementById('startBtn').addEventListener('click', () => {
  const intro = document.getElementById('intro');
  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    document.getElementById('storyApp').classList.remove('hidden');
    buildDots();
    showScene(0);
  }, 800);
});

// 도트 생성
function buildDots() {
  const row = document.getElementById('dotRow');
  SCENES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    row.appendChild(d);
  });
}

// 씬 표시
function showScene(i) {
  if (isAnimating) return;
  isAnimating = true;

  const s       = SCENES[i];
  const wrap    = document.getElementById('mediaWrap');
  const card    = document.getElementById('storyCard');
  const navBar  = document.getElementById('navBar');
  const img     = document.getElementById('sceneImg');
  const vid     = document.getElementById('sceneVid');
  const ph      = document.getElementById('mediaPlaceholder');

  // 리셋 애니메이션
  wrap.classList.remove('revealed');
  card.classList.remove('revealed');
  navBar.classList.remove('visible');
  navVisible  = false;

  // 진행 바
  document.getElementById('progressFill').style.width =
    ((i + 1) / SCENES.length * 100) + '%';

  // 텍스트
  document.getElementById('cardChip').textContent  = s.chip;
  document.getElementById('cardDate').textContent  = s.date;
  document.getElementById('cardTitle').textContent = s.title;
  document.getElementById('cardBody').textContent  = s.body;

  // 미디어
  img.classList.add('hidden');
  vid.classList.add('hidden');
  ph.style.display = 'none';

  if (s.media) {
    if (s.mediaType === 'video') {
      vid.src = s.media;
      vid.classList.remove('hidden');
    } else {
      img.src = s.media;
      img.classList.remove('hidden');
    }
  } else {
    ph.style.display = 'flex';
  }

  // 도트
  document.querySelectorAll('.dot').forEach((d, j) =>
    d.classList.toggle('active', j === i));

  // 버튼
  document.getElementById('prevBtn').disabled = i === 0;
  const nextBtn = document.getElementById('nextBtn');
  if (i === SCENES.length - 1) {
    nextBtn.textContent = '💍 마지막';
    nextBtn.style.background = 'linear-gradient(135deg,#ffc0d0,#f472b6)';
  } else {
    nextBtn.textContent = '다음 →';
    nextBtn.style.background = '';
  }

  // 애니메이션
  requestAnimationFrame(() => {
    setTimeout(() => wrap.classList.add('revealed'), 60);
    setTimeout(() => card.classList.add('revealed'), 220);
    setTimeout(() => {
      navBar.classList.add('visible');
      navVisible  = true;
      isAnimating = false;
    }, 1400);
  });
}

function nextScene() {
  if (!navVisible || isAnimating) return;
  if (idx < SCENES.length - 1) { idx++; showScene(idx); }
  else showPropose();
}
function prevScene() {
  if (!navVisible || isAnimating || idx === 0) return;
  idx--; showScene(idx);
}

// 스와이프
let tx = 0, ty = 0;
document.getElementById('storyApp').addEventListener('touchstart', e => {
  tx = e.touches[0].clientX; ty = e.touches[0].clientY;
}, { passive: true });
document.getElementById('storyApp').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
    dx < 0 ? nextScene() : prevScene();
  }
}, { passive: true });

/* ── 프로포즈 ─────────────────────────────── */
function showPropose() {
  document.getElementById('storyApp').classList.add('hidden');
  document.getElementById('proposeScreen').classList.remove('hidden');
  spawnPetals();
  placeNoBtn();
}

function placeNoBtn() {
  const btn = document.getElementById('noBtn');
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  btn.style.left = (vw / 2 - 90) + 'px';
  btn.style.top  = (vh * 0.84) + 'px';
}

function escapeBtn() {
  const btn = document.getElementById('noBtn');
  const maxX = window.innerWidth  - 190;
  const maxY = window.innerHeight - 70;
  btn.style.left = (20 + Math.random() * maxX) + 'px';
  btn.style.top  = (20 + Math.random() * maxY) + 'px';
}

function spawnPetals() {
  const c = document.getElementById('petals');
  const items = ['🌸','🌺','🌷','💮','✨','🩷'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = items[Math.floor(Math.random() * items.length)];
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.fontSize          = (0.8 + Math.random() * 0.8) + 'rem';
    p.style.animationDuration = (5 + Math.random() * 5) + 's';
    p.style.animationDelay    = (Math.random() * 5) + 's';
    c.appendChild(p);
  }
}

/* ── 축하 ─────────────────────────────────── */
function onYes() {
  document.getElementById('proposeScreen').classList.add('hidden');
  const cs = document.getElementById('celebScreen');
  cs.classList.remove('hidden');
  // 하트 이모지 추가
  const hh = document.getElementById('celebHearts');
  ['💕','💗','💖','💝','💓'].forEach(h => {
    const s = document.createElement('span'); s.textContent = h; hh.appendChild(s);
  });
  spawnConfetti();
}

function spawnConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  const colors = ['#f9a8c9','#f472b6','#ffcba4','#fde68a','#a5f3fc','#ffffff','#ffc0cb'];
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left              = Math.random() * 100 + 'vw';
    c.style.background        = colors[Math.floor(Math.random() * colors.length)];
    c.style.width             = (5 + Math.random() * 8) + 'px';
    c.style.height            = (5 + Math.random() * 8) + 'px';
    c.style.animationDuration = (2 + Math.random() * 3) + 's';
    c.style.animationDelay    = (Math.random() * 2) + 's';
    wrap.appendChild(c);
  }
}
