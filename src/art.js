/* ===== 캐릭터 그림 (직접 그린 단순한 그림체) ===== */
const CAST = {
  oh:       { name: '오실장', color: '#7B61FF', skin: '#F6D2B8', hair: '#3B3340', style: 'bun', glasses: true, outfit: '#5B6B8C', collar: 'blazer' },
  serin:    { name: '세린', color: '#7C4DFF', member: true },
  yuha:     { name: '유하', color: '#F0556E', member: true },
  taeo:     { name: '태오', color: '#0FA389', member: true },
  ian:      { name: '이안', color: '#2C4A8C', member: true },
  haneul:   { name: '하늘', color: '#1C9AD6', skin: '#F8D9C6', hair: '#4A3428', style: 'ponytail', outfit: '#9AD9F5', collar: 'tee', kid: true },
  kang:     { name: '강태산 대표', color: '#3A3A48', skin: '#E9C3A6', hair: '#141418', style: 'slick', outfit: '#2B2B35', collar: 'suit', tie: '#C81E4A' },
  jisu:     { name: '지수', color: '#8A5CF6', skin: '#F4D0B6', hair: '#3A2A22', style: 'short', headset: true, outfit: '#B9A3FF', collar: 'tee' },
  na:       { name: '나과장', color: '#E25822', skin: '#F1C9A9', hair: '#2C2522', style: 'side', outfit: '#8C6B4F', collar: 'suit', tie: '#E25822', mustache: true },
  inspector:{ name: '공정위 조사관', color: '#4B5563', skin: '#EBC8AC', hair: '#222222', style: 'short', outfit: '#374151', collar: 'suit', tie: '#1F3A8A', badge: true },
  phone:    { name: '투자자(전화)', color: '#1C2B4A' },
  narr:     { name: '' },
  uncle:    { name: '삼촌의 편지', color: '#8C6B4F' },
  letter:   { name: '하늘이의 손편지', color: '#1C9AD6' }
};

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const HAIR = {
  short: {
    back: '',
    front: 'M46 106 C42 60 70 36 100 36 C132 36 158 58 154 104 C148 88 140 78 128 72 C116 84 94 90 70 84 C60 88 52 96 46 106 Z'
  },
  long: {
    back: 'M44 98 C38 150 44 196 58 214 L142 214 C156 196 162 150 156 98 Z',
    front: 'M46 106 C42 58 72 34 100 34 C128 34 158 58 154 106 C146 86 134 74 118 70 C112 80 104 84 100 84 C96 80 88 72 82 70 C66 74 54 86 46 106 Z'
  },
  fluffy: {
    back: '',
    front: 'M44 108 C36 72 48 46 70 40 C78 28 96 28 104 34 C118 26 138 32 144 46 C160 56 162 84 156 108 C150 94 142 88 134 86 C126 94 112 92 104 86 C96 94 80 94 72 88 C62 90 52 98 44 108 Z'
  },
  bob: {
    back: 'M42 98 C38 140 42 162 56 170 L144 170 C158 162 162 140 158 98 Z',
    front: 'M44 104 C40 58 70 36 100 36 C130 36 160 58 156 104 L156 96 C152 92 148 90 144 90 L56 90 C52 90 48 92 44 96 Z'
  },
  ponytail: {
    back: 'M132 60 C176 58 182 108 164 150 C156 128 150 104 140 88 Z',
    front: 'M46 106 C42 60 70 38 100 38 C130 38 158 60 154 106 C150 90 142 80 132 76 C118 86 92 90 66 84 C58 90 50 98 46 106 Z'
  },
  bun: {
    back: '',
    front: 'M46 104 C42 58 72 40 100 40 C128 40 158 58 154 104 C150 82 136 68 100 66 C68 68 52 82 46 104 Z',
    extra: '<circle cx="100" cy="34" r="17"/>'
  },
  slick: {
    back: '',
    front: 'M46 100 C42 58 70 38 100 38 C132 38 158 58 154 100 C150 78 136 62 100 60 C66 62 50 78 46 100 Z'
  },
  side: {
    back: '',
    front: 'M46 104 C42 62 70 40 100 40 C130 40 158 62 154 104 C152 90 148 80 140 74 C120 78 96 74 82 66 C70 78 56 88 46 104 Z'
  }
};

function eyesFor(mood, kid) {
  const ink = '#2A2230';
  const ey = 110, lx = 80, rx = 120;
  const big = kid ? 1.15 : 1;
  const open = (x, s = 1) => `<ellipse cx="${x}" cy="${ey}" rx="${6 * s * big}" ry="${8 * s * big}" fill="${ink}"/><circle cx="${x + 2}" cy="${ey - 3}" r="${2.2 * big}" fill="#fff"/>`;
  const arc = x => `<path d="M${x - 7} ${ey + 2} Q${x} ${ey - 7} ${x + 7} ${ey + 2}" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const lid = x => `<path d="M${x - 7} ${ey} L${x + 7} ${ey}" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/><path d="M${x - 5} ${ey + 3} Q${x} ${ey + 7} ${x + 5} ${ey + 3}" stroke="${ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  let e = '';
  if (mood === 'happy') e = arc(lx) + arc(rx);
  else if (mood === 'tired') e = lid(lx) + lid(rx);
  else if (mood === 'surprised') e = open(lx, 1.2) + open(rx, 1.2);
  else if (mood === 'smirk') e = open(lx, 0.9) + lid(rx);
  else e = open(lx) + open(rx);
  let b = '';
  const bs = `stroke="${ink}" stroke-width="3" stroke-linecap="round" fill="none"`;
  if (mood === 'worried' || mood === 'sad' || mood === 'tired') b = `<path d="M71 97 L86 92" ${bs}/><path d="M114 92 L129 97" ${bs}/>`;
  else if (mood === 'angry') b = `<path d="M71 91 L87 98" ${bs}/><path d="M113 98 L129 91" ${bs}/>`;
  else if (mood === 'surprised') b = `<path d="M72 90 Q79 85 86 90" ${bs}/><path d="M114 90 Q121 85 128 90" ${bs}/>`;
  else if (mood === 'smirk') b = `<path d="M72 95 L86 94" ${bs}/><path d="M114 92 L128 96" ${bs}/>`;
  else b = `<path d="M72 95 Q79 92 86 95" ${bs}/><path d="M114 95 Q121 92 128 95" ${bs}/>`;
  return b + e;
}

function mouthFor(mood) {
  const ink = '#7A2E3A';
  switch (mood) {
    case 'happy': return `<path d="M87 129 Q100 146 113 129 Z" fill="#C2475A" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>`;
    case 'smile': return `<path d="M89 131 Q100 140 111 131" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'worried': case 'sad': return `<path d="M90 137 Q100 129 110 137" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'angry': return `<path d="M91 136 L109 133" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`;
    case 'surprised': return `<ellipse cx="100" cy="134" rx="5" ry="6.5" fill="#C2475A" stroke="${ink}" stroke-width="2"/>`;
    case 'tired': return `<path d="M93 135 Q100 132 107 135" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'smirk': return `<path d="M90 134 Q103 137 111 127" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    default: return `<path d="M92 132 Q100 136 108 132" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
}

function collarFor(c) {
  const o = c.outfit;
  let s = `<path d="M34 240 C34 194 62 172 100 172 C138 172 166 194 166 240 Z" fill="${o}" stroke="#1C2B4A" stroke-width="3"/>`;
  if (c.collar === 'tee') s += `<path d="M84 174 Q100 190 116 174" fill="none" stroke="${shade(o, -50)}" stroke-width="3"/>`;
  if (c.collar === 'hoodie') s += `<path d="M70 176 Q100 204 130 176" fill="${shade(o, -20)}" stroke="#1C2B4A" stroke-width="3"/><path d="M92 196 L90 220 M108 196 L110 220" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
  if (c.collar === 'blazer') s += `<path d="M86 174 L100 210 L114 174" fill="#fff" stroke="#1C2B4A" stroke-width="2.5"/><path d="M78 176 L100 226 L76 236 M122 176 L100 226 L124 236" fill="none" stroke="${shade(o, -40)}" stroke-width="3"/>`;
  if (c.collar === 'suit') s += `<path d="M84 174 L100 206 L116 174" fill="#fff" stroke="#1C2B4A" stroke-width="2.5"/><path d="M76 176 L100 230 M124 176 L100 230" fill="none" stroke="${shade(o, 40)}" stroke-width="3"/>`;
  if (c.tie) s += `<path d="M96 186 L104 186 L107 220 L100 230 L93 220 Z" fill="${c.tie}" stroke="#1C2B4A" stroke-width="2"/>`;
  if (c.badge) s += `<rect x="122" y="200" width="22" height="14" rx="3" fill="#FFD23F" stroke="#1C2B4A" stroke-width="2"/>`;
  return s;
}

function portraitSVG(id, mood = 'normal') {
  const c = CAST[id];
  if (!c || !c.skin) return '';
  const h = HAIR[c.style] || HAIR.short;
  const hair = c.hair, hs = shade(hair, -25);
  let s = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
  if (h.back) s += `<path d="${h.back}" fill="${hair}" stroke="#1C2B4A" stroke-width="3" stroke-linejoin="round"/>`;
  s += collarFor(c);
  s += `<rect x="88" y="146" width="24" height="34" fill="${shade(c.skin, -18)}"/>`;
  s += `<circle cx="48" cy="112" r="10" fill="${c.skin}" stroke="#1C2B4A" stroke-width="3"/><circle cx="152" cy="112" r="10" fill="${c.skin}" stroke="#1C2B4A" stroke-width="3"/>`;
  s += `<ellipse cx="100" cy="104" rx="53" ry="57" fill="${c.skin}" stroke="#1C2B4A" stroke-width="3"/>`;
  s += `<ellipse cx="72" cy="126" rx="9" ry="4.5" fill="#FF8FA8" opacity=".5"/><ellipse cx="128" cy="126" rx="9" ry="4.5" fill="#FF8FA8" opacity=".5"/>`;
  s += eyesFor(mood, c.kid);
  s += `<path d="M101 116 Q97 122 102 123" stroke="${shade(c.skin, -60)}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  if (c.mustache) s += `<path d="M86 126 Q93 120 100 125 Q107 120 114 126 Q107 129 100 127 Q93 129 86 126 Z" fill="${hair}"/>`;
  s += mouthFor(mood);
  if (h.extra) s += `<g fill="${hair}" stroke="#1C2B4A" stroke-width="3">${h.extra}</g>`;
  s += `<path d="${h.front}" fill="${hair}" stroke="#1C2B4A" stroke-width="3" stroke-linejoin="round"/>`;
  if (c.style === 'slick') s += `<path d="M70 52 Q100 44 132 54 M64 62 Q100 52 140 64" stroke="${hs}" stroke-width="3" fill="none"/>`;
  if (c.style === 'ponytail') s += `<circle cx="140" cy="66" r="7" fill="#FF3D7F" stroke="#1C2B4A" stroke-width="2.5"/>`;
  if (c.pin) s += `<path d="M132 72 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#FFD23F" stroke="#1C2B4A" stroke-width="2"/>`;
  if (c.glasses) s += `<g fill="none" stroke="#1C2B4A" stroke-width="3"><rect x="66" y="99" width="28" height="22" rx="8"/><rect x="106" y="99" width="28" height="22" rx="8"/><path d="M94 108 L106 108"/></g>`;
  if (c.earring) s += `<circle cx="152" cy="126" r="4" fill="#FFD23F" stroke="#1C2B4A" stroke-width="2"/>`;
  if (c.headset) s += `<path d="M44 112 C40 40 160 40 156 112" fill="none" stroke="#2A2230" stroke-width="7"/><rect x="38" y="102" width="14" height="24" rx="6" fill="#2A2230"/><rect x="148" y="102" width="14" height="24" rx="6" fill="#2A2230"/><path d="M45 124 Q52 142 76 140" stroke="#2A2230" stroke-width="4" fill="none"/><circle cx="78" cy="140" r="4" fill="#2A2230"/>`;
  s += `</svg>`;
  return s;
}

/* 인물 그림 찾기
   assets 폴더의 그림 이름은 "인물_표정" (예: serin_happy, oh_worried).
   그 표정 그림이 없으면 비슷한 표정 → normal 순서로 찾는다.
   인물 그림이 하나도 없으면 직접 그린 단순한 그림(portraitSVG)을 쓴다. */
const MOOD_CHAIN = {
  normal: ['normal'],
  happy: ['happy', 'normal', 'smile'],
  smile: ['smile', 'happy', 'normal'],
  angry: ['angry', 'serious', 'normal'],
  worried: ['worried', 'think', 'shy', 'sad', 'normal'],
  surprised: ['surprised', 'worried', 'shy', 'normal'],
  sad: ['sad', 'tired', 'worried', 'normal'],
  tired: ['tired', 'sad', 'worried', 'normal'],
  think: ['think', 'worried', 'normal'],
  serious: ['serious', 'normal'],
  shy: ['shy', 'worried', 'normal'],
  smirk: ['smirk', 'normal']
};
function charImg(id, mood) {
  for (const m of (MOOD_CHAIN[mood] || [mood, 'normal'])) if (IMG[id + '_' + m]) return IMG[id + '_' + m];
  return IMG[id + '_normal'] || null;
}
function hasArt(id) { return !!IMG[id + '_normal']; }
function faceImg(id) { return IMG['face_' + id] || IMG[id + '_normal'] || null; }

/* 작은 팬 아이콘 (2장 티켓값) */
function fanSVG(lit) {
  const glow = lit ? '#FFD23F' : '#C9D3E6';
  return `<svg viewBox="0 0 60 80" aria-hidden="true"><path d="M10 80 C10 60 20 52 30 52 C40 52 50 60 50 80 Z" fill="${lit ? '#FF8FB5' : '#D7DEEB'}" stroke="#1C2B4A" stroke-width="2.5"/><circle cx="30" cy="36" r="16" fill="${lit ? '#F8D7C2' : '#E7EBF2'}" stroke="#1C2B4A" stroke-width="2.5"/><path d="M48 50 L54 18" stroke="#1C2B4A" stroke-width="3"/><circle cx="54" cy="14" r="7" fill="${glow}" stroke="#1C2B4A" stroke-width="2.5"/>${lit ? '<circle cx="54" cy="14" r="12" fill="#FFD23F" opacity=".35"/>' : ''}<circle cx="25" cy="36" r="2" fill="#1C2B4A"/><circle cx="35" cy="36" r="2" fill="#1C2B4A"/></svg>`;
}

/* 전화 아이콘 */
function phoneSVG() {
  return `<svg viewBox="0 0 200 240" aria-hidden="true"><rect x="58" y="30" width="84" height="170" rx="16" fill="#1C2B4A"/><rect x="66" y="46" width="68" height="132" rx="6" fill="#9AD9F5"/><circle cx="100" cy="190" r="5" fill="#fff"/><path d="M84 96 q16 -18 32 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M76 86 q24 -28 48 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/><text x="100" y="140" text-anchor="middle" font-size="22" fill="#1C2B4A" font-family="Jua, sans-serif">통화 중</text></svg>`;
}
