/* ============================================================
   script.js — 민소커플의 이야기 💕
   ✏️  ANSWER       : 비밀번호 (YYYYMMDD)
   ✏️  SCENES       : 챕터별 사진/영상 및 텍스트
   ✏️  GALLERY_MEDIA: 갤러리 사진/영상 목록
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
    body:  "평생 함께할 사람을 직장에서 만날 줄은 몰랐어.",
    medias: [
      { src: "images/IMG_7502.png",  mediaType: "photo" },
      { src: "images/IMG_1596.jpeg", mediaType: "photo" },
      { src: "videos/vllo.mov",      mediaType: "video" },
      { src: "videos/vllo.mov",      mediaType: "video" },
    ],
  },
  {
    chip:  "Chapter 2 · 발견",
    date:  "2022년",
    tags:  "#탑건  #방탈출  #연애",
    title: "같은 부서의 너한테\n눈길이 갔어",
    body:  "조용하고 착한 너에게 자꾸 눈길이 갔고,\n너와 함께 시간을 보내고 싶다는\n욕심이 생겼어.",
    medias: [
      { src: "images/IMG_6151.jpeg", mediaType: "photo" },
      { src: "images/IMG_6751.jpeg", mediaType: "photo" },
      { src: "images/IMG_8152.jpeg", mediaType: "photo" },
      { src: "images/IMG_8343.jpeg", mediaType: "photo" },
      { src: "images/IMG_9246.jpeg", mediaType: "photo" },
      { src: "images/IMG_9650.jpeg", mediaType: "photo" },
      { src: "images/IMG_9673.jpeg", mediaType: "photo" },
      { src: "images/IMG_9680.jpeg", mediaType: "photo" },
      { src: "videos/IMG_9125.mov",  mediaType: "video" },
    ],
  },
  {
    chip:  "Chapter 3 · 함께",
    date:  "2023년 — 2024년",
    tags:  "#신길역  #넷플릭스  #여행",
    title: "가장 가까이에서\n함께한 시간들",
    body:  "같이 넷플릭스 보고, 여행도 많이 다녔던 나날들.\n그 일상이 참 좋았어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
  {
    chip:  "Chapter 4 · 결심",
    date:  "2025년 — 2026년",
    tags:  "#결혼준비  #용산  #D-Day",
    title: "자연스럽게 결혼까지\n결심하게 되었어",
    body:  "오랜 시간 동안 연애를 하며\n너에 대한 믿음이 커져갔어.",
    medias: [
      { src: "", mediaType: "photo" },
      { src: "", mediaType: "photo" },
    ],
  },
];

/* ════════════════════════════════════════
   갤러리 미디어
   ✏️  src에 파일 경로를 넣어주세요
   예) { src: 'images/gallery01.jpg', mediaType: 'photo' }
════════════════════════════════════════ */
// ✏️  사진/영상 경로를 채워주세요. src가 비어있으면 샘플 색상 placeholder가 표시됩니다.
const GALLERY_MEDIA = [
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
  { src: "", mediaType: "photo" },
];

// placeholder 색상 (src 없을 때 인스타 느낌으로)
const SAMPLE_COLORS = [
  '#e8d5c0','#d4c4b0','#c8b8a8','#ddd0c0','#e0cfc0',
  '#ccc0b0','#d8cabb','#e4d4c4','#d0c0b0','#dccdbf',
  '#c4b8ac','#d8cec4','#e0d4c8','#ccbfb4','#d4c8bc',
  '#e8ddd2','#c8bdb2','#dcd2c8'
];

/* 편지 문구 */
const LETTER_TEXT = "앞으로도 너와 함께\n수많은 추억을 만들어 가겠지?\n\n기쁜 순간에는 행복이 두 배가 되고,\n힘든 순간에는 서로의 무게를 나누며,\n\n세상 누구보다 멋진 가정을\n너와 함께 이루고 싶어.\n\n평범한 하루도,\n특별한 순간도,\n\n모든 시간을\n너와 함께하고 싶어.";

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
  if (lockInput.value.trim() === ANSWER) {
    lockInput.blur();
    const lock  = document.getElementById('lockScreen');
    const intro = document.getElementById('intro');

    // 1) 인트로 미리 hidden 제거 + opacity 0 으로 준비
    intro.classList.remove('hidden');
    intro.style.opacity    = '0';
    intro.style.transition = 'none';

    // 2) 잠금화면 페이드아웃
    lock.style.transition = 'opacity 0.8s ease';
    lock.style.opacity    = '0';

    setTimeout(() => {
      // 3) 잠금화면 완전히 숨김
      lock.classList.add('hidden');
      lock.style.opacity    = '';
      lock.style.transition = '';

      // 4) 인트로 페이드인
      requestAnimationFrame(() => {
        intro.style.transition = 'opacity 0.6s ease';
        intro.style.opacity    = '1';
        setTimeout(() => {
          intro.style.transition = '';
          intro.style.opacity    = '';
        }, 600);
      });
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
/* 인트로는 처음에 숨김 — hidden 클래스로 */
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
  sceneIdx = i; mediaIdx = 0;

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
  document.getElementById('nextBtn').textContent = '다음 →';

  buildMediaSlider(s.medias);

  requestAnimationFrame(() => {
    setTimeout(() => card.classList.add('revealed'), 150);
    setTimeout(() => {
      navBar.classList.add('visible');
      navVisible = true; isAnimating = false;
    }, 1300);
  });
}

/* ════════════════════════════════════════
   미디어 슬라이더
════════════════════════════════════════ */
function buildMediaSlider(medias) {
  const track   = document.getElementById('sliderTrack');
  const dotsEl  = document.getElementById('mediaDots');
  const section = document.getElementById('mediaSection');
  track.innerHTML = ''; dotsEl.innerHTML = '';

  // 섹션 높이 초기화 (첫 미디어 로드 전)
  section.style.height = '';

  medias.forEach((m, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    if (m.src) {
      if (m.mediaType === 'video') {
        const v = document.createElement('video');
        v.src = m.src; v.muted = true; v.playsInline = true;
        v.autoplay = true; v.loop = true;
        // 비디오 메타 로드 후 비율 계산
        v.addEventListener('loadedmetadata', () => {
          if (i === 0) applyMediaHeight(v.videoWidth, v.videoHeight);
        }, { once: true });
        slide.appendChild(v);
      } else {
        const img = document.createElement('img');
        img.src = m.src; img.alt = '';
        // 이미지 로드 후 비율 계산 (첫 번째 슬라이드만 높이 결정)
        img.addEventListener('load', () => {
          if (i === 0) applyMediaHeight(img.naturalWidth, img.naturalHeight);
        }, { once: true });
        // 이미 캐시된 경우
        if (img.complete && img.naturalWidth) {
          if (i === 0) applyMediaHeight(img.naturalWidth, img.naturalHeight);
        }
        slide.appendChild(img);
      }
    } else {
      const ph = document.createElement('div');
      ph.className = 'slide-placeholder';
      ph.innerHTML = '<span class="ph-icon">📷</span><span class="ph-text">사진 / 영상을 넣어주세요</span>';
      slide.appendChild(ph);
      if (i === 0) section.style.height = '56vw'; // placeholder 기본 높이
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

/* 첫 미디어의 실제 비율로 섹션 높이 설정 */
function applyMediaHeight(w, h) {
  if (!w || !h) return;
  const section   = document.getElementById('mediaSection');
  const vw        = window.innerWidth;
  const maxHeight = window.innerHeight * 0.72; // 최대 72vh
  const minHeight = 160;

  let targetH = (vw * h) / w;
  targetH = Math.min(targetH, maxHeight);
  targetH = Math.max(targetH, minHeight);

  section.style.height = targetH + 'px';
  // slider-track, slide 높이 동기화
  document.getElementById('sliderTrack').style.height = targetH + 'px';
  document.querySelectorAll('.slide').forEach(s => s.style.height = targetH + 'px');
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
  mediaIdx = next; setSliderPos(mediaIdx);
}

/* ════════════════════════════════════════
   터치
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
  if (touchTarget === 'media') goMedia(dx < 0 ? 1 : -1);
  else if (touchTarget === 'card') { if (dx < 0) nextScene(); else prevScene(); }
}, { passive: true });

/* ════════════════════════════════════════
   챕터 네비게이션
════════════════════════════════════════ */
function nextScene() {
  if (!navVisible || isAnimating) return;
  if (sceneIdx < SCENES.length - 1) showScene(sceneIdx + 1);
  else showGallery();
}
function prevScene() {
  if (!navVisible || isAnimating || sceneIdx === 0) return;
  showScene(sceneIdx - 1);
}

/* ════════════════════════════════════════
   갤러리 화면
════════════════════════════════════════ */
function showGallery() {
  const story   = document.getElementById('storyApp');
  const gallery = document.getElementById('galleryScreen');

  story.style.transition = 'opacity 0.7s ease';
  story.style.opacity    = '0';

  setTimeout(() => {
    story.classList.add('hidden');
    story.style.opacity = ''; story.style.transition = '';

    // 그리드 빌드
    buildGalleryGrid();

    gallery.style.opacity = '0';
    gallery.classList.remove('hidden');

    requestAnimationFrame(() => {
      gallery.style.transition = 'opacity 0.7s ease';
      gallery.style.opacity    = '1';
      setTimeout(() => {
        gallery.style.transition = '';
        gallery.classList.add('revealed');
      }, 700);
    });
  }, 700);
}

function buildGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  GALLERY_MEDIA.forEach((m, i) => {
    const cell = document.createElement('div');
    cell.className = 'gallery-cell';

    if (m.src) {
      if (m.mediaType === 'video') {
        const v = document.createElement('video');
        v.src = m.src; v.muted = true; v.playsInline = true;
        v.autoplay = true; v.loop = true;
        cell.appendChild(v);
        cell.addEventListener('click', () => openLightbox(m.src, 'video'));
      } else {
        const img = document.createElement('img');
        img.src = m.src; img.alt = '';
        cell.appendChild(img);
        cell.addEventListener('click', () => openLightbox(m.src, 'photo'));
      }
    } else {
      // 샘플 placeholder — 색상 블록
      const ph = document.createElement('div');
      ph.className = 'gallery-cell-ph';
      ph.style.background = SAMPLE_COLORS[i % SAMPLE_COLORS.length];
      ph.style.opacity = '1';
      cell.appendChild(ph);
    }
    grid.appendChild(cell);
  });

  // 사진 수 표시
  const el = document.getElementById('galleryCount');
  if (el) el.textContent = GALLERY_MEDIA.length + '장';
}

/* ════════════════════════════════════════
   라이트박스
════════════════════════════════════════ */
function openLightbox(src, type) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const vid = document.getElementById('lightboxVid');

  img.style.display = 'none';
  vid.style.display = 'none';

  if (type === 'video') {
    vid.src = src;
    vid.style.display = 'block';
  } else {
    img.src = src;
    img.style.display = 'block';
  }

  // open 클래스 추가로 CSS transition 발동
  requestAnimationFrame(() => {
    lb.classList.add('open');
    // 스크롤 막기
    document.body.style.overflow = 'hidden';
  });
}

function closeLightbox() {
  const lb  = document.getElementById('lightbox');
  const vid = document.getElementById('lightboxVid');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  // transition 끝난 뒤 src 초기화
  setTimeout(() => {
    vid.src = '';
    document.getElementById('lightboxImg').src = '';
  }, 300);
}

/* ════════════════════════════════════════
   편지 화면
════════════════════════════════════════ */
function showLetter() {
  const gallery = document.getElementById('galleryScreen');
  const letter  = document.getElementById('letterScreen');

  gallery.style.transition = 'opacity 0.9s ease';
  gallery.style.opacity    = '0';

  setTimeout(() => {
    gallery.classList.add('hidden');
    gallery.style.opacity = ''; gallery.style.transition = '';

    letter.style.opacity = '0';
    letter.classList.remove('hidden');

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

  // 11초 (글자 수 증가에 맞게 조정)
  const totalDuration = 11000;
  const perChar       = totalDuration / chars.length;

  el.innerHTML = '';
  el.appendChild(cursor);
  cursor.style.opacity = '1';

  let i = 0;
  function typeNext() {
    if (i >= chars.length) {
      setTimeout(() => {
        cursor.style.transition = 'opacity 0.8s ease';
        cursor.style.opacity    = '0';
        setTimeout(() => transitionToPropose(), 900);
      }, 1200);
      return;
    }
    const ch = chars[i];
    const prevCh = i > 0 ? chars[i - 1] : '';

    if (ch === '\n') {
      // 연속 줄바꿈(

)이면 단락 구분 — br 하나만 (앞의 br과 합쳐져 공백단락)
      el.insertBefore(document.createElement('br'), cursor);
    } else {
      el.insertBefore(document.createTextNode(ch), cursor);
    }
    i++;

    let pause = perChar;
    if (ch === '\n' && prevCh === '\n') {
      // 단락 사이 — 가장 길게 쉬기 (600ms 고정)
      pause = 620;
    } else if (ch === '\n') {
      // 줄바꿈 — 살짝 쉬기
      pause = perChar * 2.2;
    } else if (ch === '?' || ch === '.' || ch === '!') {
      pause = perChar * 3.8;
    } else if (ch === ',') {
      pause = perChar * 2;
    }
    setTimeout(typeNext, pause);
  }
  setTimeout(typeNext, 500);
}

/* ════════════════════════════════════════
   프로포즈 전환
════════════════════════════════════════ */
function transitionToPropose() {
  const letter  = document.getElementById('letterScreen');
  const propose = document.getElementById('proposeScreen');

  letter.style.transition = 'opacity 1.2s ease';
  letter.style.opacity    = '0';

  setTimeout(() => {
    letter.classList.add('hidden');
    letter.style.opacity = ''; letter.style.transition = '';

    propose.style.opacity   = '0';
    propose.style.transform = 'scale(1.03)';
    propose.style.transition = 'none';
    propose.classList.remove('hidden');

    spawnPetals();
    placeNoBtn();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        propose.style.transition = 'opacity 1.6s ease, transform 1.6s cubic-bezier(0.22,1,0.36,1)';
        propose.style.opacity    = '1';
        propose.style.transform  = 'scale(1)';
      });
    });
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
  const btn    = document.getElementById('noBtn');
  const yesBtn = document.querySelector('.yes-btn');
  const rect   = yesBtn.getBoundingClientRect();

  // yes 버튼 아래 충분한 간격 (최소 60px)
  const safeTop = rect.bottom + 60;
  btn.style.position = 'fixed';
  btn.style.left = (window.innerWidth / 2 - 95) + 'px';
  btn.style.top  = safeTop + 'px';
}

function escapeBtn() {
  const btn    = document.getElementById('noBtn');
  const yesBtn = document.querySelector('.yes-btn');
  const rect   = yesBtn.getBoundingClientRect();

  let rx, ry;
  // yes 버튼 영역과 겹치지 않게 랜덤 위치
  do {
    rx = 20 + Math.random() * (window.innerWidth  - 200);
    ry = 20 + Math.random() * (window.innerHeight - 80);
  } while (
    rx < rect.right + 10 && rx + 190 > rect.left - 10 &&
    ry < rect.bottom + 10 && ry + 46 > rect.top - 10
  );

  btn.style.left = rx + 'px';
  btn.style.top  = ry + 'px';
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
    propose.style.opacity = ''; propose.style.transition = '';

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
