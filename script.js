/* ============================================================
   script.js — 우리의 이야기 💕
   ✏️  ANSWER: 비밀번호(사귄 날짜 YYYYMMDD)
   ✏️  SCENES: 각 챕터 내용과 미디어 파일 경로
============================================================ */

const ANSWER = '20221030';

/* ════════════════════════════════════════
   챕터 데이터
════════════════════════════════════════ */
const SCENES = [
  {
    chip:  "Chapter 1 · 입사",
    date:  "2021년",
    tags:  "#KB국민은행  #37기  #동기",
    title: "단순히 취업의 기쁨만이\n아니었을 줄이야",
    body:  "평생 함께할 사람까지 만날 줄은\n몰랐었지.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 2 · 발견",
    date:  "2022년",
    tags:  "#탑건  #방탈출  #연애",
    title: "같은 부서의 너한테\n눈길이 갔어",
    body:  "조용하고 착한 소영이가 자꾸 눈에 밟혔어.\n같이 여행도 다니고,\n시간을 함께 보내고 싶어졌어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 3 · 함께",
    date:  "2023년 — 2024년",
    tags:  "#신길역  #넷플릭스  #여행",
    title: "가장 가까이에서\n함께한 시간들",
    body:  "3분 거리에 살면서\n같이 넷플릭스 보고, 여행도 많이 다녔던 나날들.\n그 일상이 참 좋았어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 4 · 결심",
    date:  "2025년 — 2026년",
    tags:  "#결혼  #웨딩  #우리",
    title: "결심하고,\n바로 움직였어",
    body:  "결혼을 결심하고,\n지금 우리는 그 준비를 하고 있지.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
];

/* 편지 문구 */
const LETTER_TEXT = "다음 챕터에서\n우린 어떤 페이지를\n채워나갈까?";

/* ════════════════════════════════════════
   잠금 화면
════════════════════════════════════════ */
const lockInput = document.getElementById('lockInput');
const lockError = document.getElementById('lockError');

lockInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});
lockInput.addEventListener('input', () => {
  lockError.classList.remove('show');
  lockInput.classList.remove('shake');
  if (lockInput.value.length === 8) checkPassword();
});

function checkPassword() {
  const val = lockInput.value.trim();
  if (val === ANSWER) {
    lockInput.blur();
    const lock = document.getElementById('lockScreen');
    lock.classList.add('fade-out');
    setTimeout(() => {
      lock.style.display = 'none';
      document.getElementById('intro').classList.remove('hidden');
    }, 800);
  } else {
    lockInput.classList.remove('shake');
    void lockInput.offsetWidth;
    lockInput.classList.add('shake');
    lockError.classList.add('show');
    lockInput.value = '';
    lockInput.focus();
  }
}

document.getElementById('intro').classList.add('hidden');

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
   상태
════════════════════════════════════════ */
let sceneIdx    = 0;
let mediaIdx    = 0;
let navVisible  = false;
let isAnimating = false;
let touchStartX = 0;
let touchStartY = 0;
let touchTarget = null;

/* ════════════════════════════════════════
   챕터 도트
════════════════════════════════════════ */
function buildChapterDots() {
  const row = document.getElementById('chapterDots');
  row.innerHTML = '';
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
   씬 표시
════════════════════════════════════════ */
function showScene(i) {
  if (isAnimating) return;
  isAnimating = true;
  sceneIdx = i;
  mediaIdx = 0;

  const s      = SCENES[i];
  const card   = document.getElementById('storyCard');
  const navBar = document.getElementById('navBar');

  card.classList.remove('revealed');
  navBar.classList.remove('visible');
  navVisible = false;

  document.getElementById('progressFill').style.width =
    ((i + 1) / SCENES.length * 100) + '%';

  document.getElementById('cardChip').textContent  = s.chip;
  document.getElementById('cardDate').textContent  = s.date;
  document.getElementById('cardTags').textContent  = s.tags || '';
  document.getElementById('cardTitle').textContent = s.title;
  document.getElementById('cardBody').textContent  = s.body;

  updateChapterDots(i);
  document.getElementById('prevBtn').disabled = (i === 0);

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.textContent = '다음 →';

  buildMediaSlider(s.medias);

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
  const track  = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('mediaDots');
  track.innerHTML  = '';
  dotsEl.innerHTML = '';

  medias.forEach((m, i) => {
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

    if (medias.length > 1) {
      const dot = document.createElement('div');
      dot.className = 'media-dot' + (i === 0 ? ' active' : '');
      dotsEl.appendChild(dot);
    }
  });

  setSliderPos(0, false);
}

function setSliderPos(idx, animate = true) {
  const track = document.getElementById('sliderTrack');
  if (!animate) track.style.transition = 'none';
  track.style.transform = `translateX(${-idx * 100}%)`;
  if (!animate) requestAnimationFrame(() => { track.style.transition = ''; });
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
   터치 이벤트
════════════════════════════════════════ */
const storyApp     = document.getElementById('storyApp');
const mediaSection = document.getElementById('mediaSection');

mediaSection.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchTarget = 'media';
}, { passive: true });

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
  if (sceneIdx < SCENES.length - 1) {
    showScene(sceneIdx + 1);
  } else {
    showLetter();
  }
}

function prevScene() {
  if (!navVisible || isAnimating || sceneIdx === 0) return;
  showScene(sceneIdx - 1);
}

/* ════════════════════════════════════════
   편지 화면 — 타이핑 효과
════════════════════════════════════════ */
function showLetter() {
  const story  = document.getElementById('storyApp');
  const letter = document.getElementById('letterScreen');

  story.style.transition = 'opacity 0.9s ease';
  story.style.opacity    = '0';

  setTimeout(() => {
    story.classList.add('hidden');
    story.style.opacity   = '';
    story.style.transition = '';

    letter.style.opacity = '0';
    letter.classList.remove('hidden');

    // 편지 화면 페이드인
    requestAnimationFrame(() => {
      letter.style.transition = 'opacity 1s ease';
      letter.style.opacity    = '1';
      setTimeout(() => {
        letter.style.transition = '';
        startTypewriter();
      }, 1000);
    });
  }, 900);
}

function startTypewriter() {
  const el     = document.getElementById('letterText');
  const cursor = document.getElementById('letterCursor');
  const chars  = [...LETTER_TEXT];

  // 총 ~8초에 걸쳐 타이핑
  const totalDuration = 8000;
  const perChar       = totalDuration / chars.length;

  // 커서만 남기고 텍스트 초기화
  el.innerHTML = '';
  el.appendChild(cursor);
  cursor.style.opacity = '1';

  let i = 0;

  function typeNext() {
    if (i >= chars.length) {
      // 완성 → 1.2초 유지 후 커서 페이드아웃 → 프로포즈 전환
      setTimeout(() => {
        cursor.style.transition = 'opacity 0.8s ease';
        cursor.style.opacity    = '0';
        setTimeout(() => transitionToPropose(), 900);
      }, 1200);
      return;
    }

    const ch = chars[i];
    if (ch === '\n') {
      // 줄바꿈: br 삽입 후 커서를 다시 맨 뒤로
      el.insertBefore(document.createElement('br'), cursor);
    } else {
      // 텍스트 노드를 커서 바로 앞에 삽입
      el.insertBefore(document.createTextNode(ch), cursor);
    }
    i++;

    // 문장 부호 뒤에 자연스러운 쉼
    let pause = perChar;
    if (ch === '?' || ch === '.' || ch === '!') pause = perChar * 4;
    else if (ch === ',') pause = perChar * 2.5;

    setTimeout(typeNext, pause);
  }

  // 편지 화면 페이드인 완료 후 0.5초 여유를 두고 타이핑 시작
  setTimeout(typeNext, 500);
}

/* ════════════════════════════════════════
   프로포즈 전환 — 서서히, 우아하게
════════════════════════════════════════ */
function transitionToPropose() {
  const letter  = document.getElementById('letterScreen');
  const propose = document.getElementById('proposeScreen');

  // 1) 편지 화면 페이드아웃 (1.2s)
  letter.style.transition = 'opacity 1.2s ease';
  letter.style.opacity    = '0';

  setTimeout(() => {
    letter.classList.add('hidden');
    letter.style.opacity   = '';
    letter.style.transition = '';

    // 2) 프로포즈 화면: opacity 0 으로 먼저 삽입
    propose.style.opacity    = '0';
    propose.style.transform  = 'scale(1.03)';
    propose.style.transition = 'none';
    propose.classList.remove('hidden');

    // 3) 꽃잎·버튼 준비 (보이기 전에)
    spawnPetals();
    placeNoBtn();

    // 4) 한 프레임 뒤에 페이드인 + 살짝 줌아웃 (1.6s)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        propose.style.transition = 'opacity 1.6s ease, transform 1.6s cubic-bezier(0.22,1,0.36,1)';
        propose.style.opacity    = '1';
        propose.style.transform  = 'scale(1)';
      });
    });

    // 5) 전환 완료 후 transition 정리
    setTimeout(() => {
      propose.style.transition = '';
      propose.style.transform  = '';
    }, 1700);

  }, 1200);
}

/* ════════════════════════════════════════
   프로포즈 화면
════════════════════════════════════════ */
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
  c.innerHTML = '';
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
  const propose = document.getElementById('proposeScreen');
  const celeb   = document.getElementById('celebScreen');

  propose.style.transition = 'opacity 0.8s ease';
  propose.style.opacity    = '0';

  setTimeout(() => {
    propose.classList.add('hidden');
    propose.style.opacity   = '';
    propose.style.transition = '';

    celeb.style.opacity    = '0';
    celeb.style.transition = 'none';
    celeb.classList.remove('hidden');

    const hh = document.getElementById('celebHearts');
    if (!hh.hasChildNodes()) {
      ['💕','💗','💖','💝','💓'].forEach(h => {
        const s = document.createElement('span'); s.textContent = h; hh.appendChild(s);
      });
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        celeb.style.transition = 'opacity 1.2s ease';
        celeb.style.opacity    = '1';
        spawnConfetti();
      });
    });
  }, 800);
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
    c.style.animationDelay    = (Math.random() * 2) + 's';
    wrap.appendChild(c);
  }
}
