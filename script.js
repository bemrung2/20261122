/* ============================================================
   script.js — 우리의 이야기 💕

   ✏️ 커스터마이징 가이드
   ─────────────────────────────────────────────────────────
   ANSWER: 비밀번호(사귄 날짜)를 여기서 수정하세요.

   각 SCENE의 medias 배열에 사진/영상을 여러 개 넣을 수 있어요.
   좌우 스와이프로 사진/영상을 넘길 수 있고,
   아래 점(dot)으로 몇 번째 미디어인지 표시됩니다.

   mediaType: 'photo' | 'video'
   src: 파일 경로 (예: 'images/01.jpg', 'videos/trip.mp4')
   src를 비워두면 placeholder가 표시됩니다.

   챕터 이동은 하단 "이전 / 다음" 버튼, 또는 텍스트 카드 영역 스와이프.
   미디어 슬라이드는 미디어 영역 스와이프.
   ─────────────────────────────────────────────────────────
============================================================ */

/* ════════════════════════════════════════
   잠금 화면
════════════════════════════════════════ */
const ANSWER = '20221030'; // ✏️ 비밀번호 (사귄 날짜 YYYYMMDD)

const lockInput = document.getElementById('lockInput');
const lockError = document.getElementById('lockError');

// 엔터키로도 확인 가능
lockInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});

// 8자리 입력되면 자동 확인
lockInput.addEventListener('input', () => {
  lockError.classList.remove('show');
  lockInput.classList.remove('shake');
  if (lockInput.value.length === 8) checkPassword();
});

function checkPassword() {
  const val = lockInput.value.trim();
  if (val === ANSWER) {
    // 정답 — 잠금 해제
    lockInput.blur();
    const lock = document.getElementById('lockScreen');
    lock.classList.add('fade-out');
    setTimeout(() => {
      lock.style.display = 'none';
      document.getElementById('intro').classList.remove('hidden');
    }, 800);
  } else {
    // 오답 — 흔들기 + 에러 메시지
    lockInput.classList.remove('shake');
    void lockInput.offsetWidth; // reflow
    lockInput.classList.add('shake');
    lockError.classList.add('show');
    lockInput.value = '';
    lockInput.focus();
  }
}

/* 인트로는 처음에 숨김 */
document.getElementById('intro').classList.add('hidden');

const SCENES = [
  {
    chip:  "Chapter 1 · 입사 첫날",
    date:  "2021년 8월",
    title: "같은 날, 같은 곳에서\n우리가 시작됐어",
    body:  "수백 명의 신입사원 중에\n처음 눈이 마주쳤던 그 순간,\n이상하게 계속 네가 눈에 띄었어.",
    medias: [
      { src: "", mediaType: "photo" },  // 예) { src: "images/01.jpg", mediaType: "photo" }
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 2 · 교육 기간",
    date:  "2021년 9월",
    title: "같이 공부하다\n정이 들어버렸어",
    body:  "연수원에서 밤새 같이 공부하고,\n쉬는 시간마다 커피 마시러 갔던 거 기억나?\n그때부터 이미 좋아하고 있었던 것 같아.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 3 · 첫 데이트",
    date:  "2021년 겨울",
    title: "첫 데이트날,\n심장이 터질 것 같았어",
    body:  "무슨 말을 했는지도 기억 안 날 만큼\n너무 떨리고 설렜던 날.\n집에 돌아와서 혼자 한참을 웃었어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 4 · 사계절을 함께",
    date:  "2022년",
    title: "어느 계절이든\n네가 있으면 좋았어",
    body:  "봄엔 벚꽃 구경, 여름엔 바다,\n가을엔 드라이브, 겨울엔 따뜻한 카페.\n뭘 해도 네가 옆에 있으니까 행복했어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 5 · 소소한 일상",
    date:  "2022년 — 2023년",
    title: "아무것도 안 해도\n좋은 사람",
    body:  "퇴근하고 같이 편의점 가던 날들,\n아무 말 없이 나란히 앉아 있던 시간들,\n그런 평범한 순간이 제일 소중해.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "video" },
    ],
  },
  {
    chip:  "Chapter 6 · 첫 여행",
    date:  "2023년",
    title: "여행지에서 더\n확신했어",
    body:  "처음으로 함께 떠난 여행에서\n길을 잃어도, 비가 와도 웃었던 우리.\n이 사람이랑 평생 다니고 싶다 생각했어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "video" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 7 · 지금 이 순간",
    date:  "2025년",
    title: "4년이 지났고\n나는 확신해",
    body:  "함께한 모든 순간들이\n내 인생에서 가장 빛나는 페이지야.\n이제 마지막 장을 넘길게. 💕",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
];

/* ════════════════════════════════════════
   내부 상태
════════════════════════════════════════ */
let sceneIdx    = 0;   // 현재 챕터
let mediaIdx    = 0;   // 현재 챕터 내 미디어 인덱스
let navVisible  = false;
let isAnimating = false;

// 미디어 영역 스와이프 vs 카드 영역 스와이프 구분용
let touchStartX = 0;
let touchStartY = 0;
let touchTarget = null; // 'media' | 'card'

/* ════════════════════════════════════════
   인트로
════════════════════════════════════════ */
document.getElementById('startBtn').addEventListener('click', () => {
  const intro = document.getElementById('intro');
  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    document.getElementById('storyApp').classList.remove('hidden');
    buildChapterDots();
    showScene(0);
  }, 900);
});

/* ════════════════════════════════════════
   챕터 도트 (하단 네비)
════════════════════════════════════════ */
function buildChapterDots() {
  const row = document.getElementById('chapterDots');
  SCENES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'chapter-dot' + (i === 0 ? ' active' : '');
    row.appendChild(d);
  });
}

function updateChapterDots(i) {
  document.querySelectorAll('.chapter-dot').forEach((d, j) =>
    d.classList.toggle('active', j === i));
}

/* ════════════════════════════════════════
   씬(챕터) 표시
════════════════════════════════════════ */
function showScene(i) {
  if (isAnimating) return;
  isAnimating = true;
  sceneIdx = i;
  mediaIdx = 0;

  const s      = SCENES[i];
  const card   = document.getElementById('storyCard');
  const navBar = document.getElementById('navBar');

  // 텍스트 카드 리셋
  card.classList.remove('revealed');
  navBar.classList.remove('visible');
  navVisible = false;

  // 진행 바
  document.getElementById('progressFill').style.width =
    ((i + 1) / SCENES.length * 100) + '%';

  // 텍스트 채우기
  document.getElementById('cardChip').textContent  = s.chip;
  document.getElementById('cardDate').textContent  = s.date;
  document.getElementById('cardTitle').textContent = s.title;
  document.getElementById('cardBody').textContent  = s.body;

  // 챕터 도트
  updateChapterDots(i);

  // 다음 버튼 스타일
  const nextBtn = document.getElementById('nextBtn');
  if (i === SCENES.length - 1) {
    nextBtn.textContent = '💍 마지막';
  } else {
    nextBtn.textContent = '다음 →';
  }
  document.getElementById('prevBtn').disabled = (i === 0);

  // 미디어 슬라이더 빌드
  buildMediaSlider(s.medias);

  // 애니메이션 시퀀스
  requestAnimationFrame(() => {
    setTimeout(() => card.classList.add('revealed'), 150);
    setTimeout(() => {
      navBar.classList.add('visible');
      navVisible  = true;
      isAnimating = false;
    }, 1300);
  });
}

/* ════════════════════════════════════════
   미디어 슬라이더
════════════════════════════════════════ */
function buildMediaSlider(medias) {
  const track = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('mediaDots');
  track.innerHTML = '';
  dotsEl.innerHTML = '';

  medias.forEach((m, i) => {
    // 슬라이드 생성
    const slide = document.createElement('div');
    slide.className = 'slide';

    if (m.src) {
      if (m.mediaType === 'video') {
        const vid = document.createElement('video');
        vid.src = m.src; vid.autoplay = true; vid.muted = true;
        vid.loop = true; vid.playsInline = true;
        slide.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src = m.src; img.alt = '';
        slide.appendChild(img);
      }
    } else {
      const ph = document.createElement('div');
      ph.className = 'slide-placeholder';
      ph.innerHTML = `<span class="ph-icon">📷</span><span class="ph-text">사진 / 영상을 넣어주세요</span>`;
      slide.appendChild(ph);
    }
    track.appendChild(slide);

    // 미디어 도트 (2개 이상일 때만)
    if (medias.length > 1) {
      const dot = document.createElement('div');
      dot.className = 'media-dot' + (i === 0 ? ' active' : '');
      dotsEl.appendChild(dot);
    }
  });

  // 슬라이더 초기 위치
  setSliderPos(0, false);
}

function setSliderPos(idx, animate = true) {
  const track = document.getElementById('sliderTrack');
  if (!animate) track.style.transition = 'none';
  track.style.transform = `translateX(${-idx * 100}%)`;
  if (!animate) requestAnimationFrame(() => track.style.transition = '');

  // 미디어 도트 갱신
  document.querySelectorAll('.media-dot').forEach((d, j) =>
    d.classList.toggle('active', j === idx));
}

function goMedia(dir) {
  const total = SCENES[sceneIdx].medias.length;
  const next  = mediaIdx + dir;
  if (next < 0 || next >= total) return;
  mediaIdx = next;
  setSliderPos(mediaIdx);
}

/* ════════════════════════════════════════
   터치 이벤트 — 미디어 vs 카드 분리
════════════════════════════════════════ */
const storyApp    = document.getElementById('storyApp');
const mediaSection = document.getElementById('mediaSection');

// 미디어 영역 터치 → 미디어 슬라이드
mediaSection.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchTarget = 'media';
}, { passive: true });

// 카드/앱 영역 터치 → 챕터 이동
storyApp.addEventListener('touchstart', e => {
  if (!e.target.closest('#mediaSection')) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchTarget = 'card';
  }
}, { passive: true });

storyApp.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 42) return;

  if (touchTarget === 'media') {
    goMedia(dx < 0 ? 1 : -1);
  } else if (touchTarget === 'card') {
    if (dx < 0) nextScene(); else prevScene();
  }
}, { passive: true });

/* ════════════════════════════════════════
   챕터 네비게이션
════════════════════════════════════════ */
function nextScene() {
  if (!navVisible || isAnimating) return;
  if (sceneIdx < SCENES.length - 1) showScene(sceneIdx + 1);
  else showPropose();
}
function prevScene() {
  if (!navVisible || isAnimating || sceneIdx === 0) return;
  showScene(sceneIdx - 1);
}

/* ════════════════════════════════════════
   프로포즈 화면
════════════════════════════════════════ */
function showPropose() {
  document.getElementById('storyApp').classList.add('hidden');
  document.getElementById('proposeScreen').classList.remove('hidden');
  spawnPetals();
  placeNoBtn();
}

function placeNoBtn() {
  const btn = document.getElementById('noBtn');
  btn.style.left = (window.innerWidth  / 2 - 95) + 'px';
  btn.style.top  = (window.innerHeight * 0.84) + 'px';
}

function escapeBtn() {
  const btn  = document.getElementById('noBtn');
  const maxX = window.innerWidth  - 200;
  const maxY = window.innerHeight - 80;
  btn.style.left = (20 + Math.random() * maxX) + 'px';
  btn.style.top  = (20 + Math.random() * maxY) + 'px';
}

function spawnPetals() {
  const c = document.getElementById('petals');
  const items = ['🌸','🌺','🌷','✨','🍀','🤍'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = items[Math.floor(Math.random() * items.length)];
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.fontSize          = (0.7 + Math.random() * 0.8) + 'rem';
    p.style.animationDuration = (5 + Math.random() * 5) + 's';
    p.style.animationDelay    = (Math.random() * 5) + 's';
    c.appendChild(p);
  }
}

/* ════════════════════════════════════════
   축하 화면
════════════════════════════════════════ */
function onYes() {
  document.getElementById('proposeScreen').classList.add('hidden');
  document.getElementById('celebScreen').classList.remove('hidden');
  const hh = document.getElementById('celebHearts');
  ['💕','💗','💖','💝','💓'].forEach(h => {
    const s = document.createElement('span'); s.textContent = h; hh.appendChild(s);
  });
  spawnConfetti();
}

function spawnConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  const colors = ['#e8d5b7','#c8a0a8','#a07880','#f5ede3','#d4b8a0','#c4a882','#fffdf9'];
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left              = Math.random() * 100 + 'vw';
    c.style.background        = colors[Math.floor(Math.random() * colors.length)];
    c.style.width             = (5 + Math.random() * 8) + 'px';
    c.style.height            = (5 + Math.random() * 8) + 'px';
    c.style.animationDuration = (2 + Math.random() * 3) + 's';
    c.style.animationDelay    = (Math.random() * 2) + 'px';
    wrap.appendChild(c);
  }
}
