/* ===== 게임 진행 ===== */
const SAVE_KEY = 'debut-project-v1';
const $app = document.getElementById('app');
const $modal = document.getElementById('modal');
const $toast = document.getElementById('toast');

/* ---------- 저장 ---------- */
function freshState() { return { ceo: '', group: '', cur: null, res: {}, flags: {}, stories: [], done: [], ending: null }; }
function loadState() {
  try { const t = localStorage.getItem(SAVE_KEY); if (!t) return null; const s = JSON.parse(t); return Object.assign(freshState(), s); } catch (e) { return null; }
}
function saveState() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* 저장이 막혀도 게임은 계속 */ } }
let S = loadState() || freshState();

/* ---------- 미션 찾아보기 ---------- */
const MISSIONS = {};
CHAPTERS.forEach(ch => ch.nodes.forEach((n, i) => { if (n.type === 'mission') MISSIONS[n.id] = Object.assign({ ch: ch.no, idx: i }, n); }));
const TOTAL_MISSIONS = Object.keys(MISSIONS).length;
const POCA_IDS = Object.keys(POCAS);

/* ---------- 글자 다듬기 ---------- */
function esc(t) { return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function hasBatchim(w) {
  const ch = w.trim().slice(-1); if (!ch) return false; const c = ch.charCodeAt(0);
  if (c >= 0xAC00 && c <= 0xD7A3) return (c - 0xAC00) % 28 !== 0;
  if (/[0-9]/.test(ch)) return '013678'.includes(ch);
  if (/[a-zA-Z]/.test(ch)) return /(l|m|n|ng)$/i.test(w.trim());
  return false;
}
function isRieul(w) { const c = w.trim().slice(-1).charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 === 8; }
function josa(w, j) {
  const b = hasBatchim(w);
  switch (j) {
    case '은': return b ? '은' : '는';
    case '이': return b ? '이' : '가';
    case '을': return b ? '을' : '를';
    case '과': return b ? '과' : '와';
    case '으로': return (b && !isRieul(w)) ? '으로' : '로';
    default: return '';
  }
}
function T(str) {
  return esc(str).replace(/\{(ceo|group)(?::(은|이|을|과|으로))?\}/g, (m, k, j) => {
    const w = (k === 'ceo' ? S.ceo : S.group) || (k === 'ceo' ? '새' : '우리 그룹');
    return esc(w) + (j ? josa(w, j) : '');
  });
}
function won(n) { if (!n) return '0원'; return n >= 10000 ? (n % 10000 === 0 ? `${n / 10000}만 원` : `${Math.floor(n / 10000)}만 ${String(n % 10000).replace(/000$/, '천')} 원`) : `${n / 1000}천 원`; }
function manwon(n) { return n >= 1000 ? `${Math.floor(n / 1000)}천${n % 1000 ? ` ${n % 1000}` : ''}만 원` : `${n}만 원`; }

/* ---------- 점수 계산 ---------- */
function gaugeVals() {
  const g = { money: 30, fans: 30, trust: 30, rep: 30 };
  for (const id in S.res) {
    const r = S.res[id], m = MISSIONS[id]; if (!m) continue;
    let v = 0; if (r.done) v += r.wrongs === 0 ? 14 : 6; v -= 3 * (r.wrongs || 0);
    g[m.gauge] += v;
    if (r.pen) for (const k in r.pen) g[k] += r.pen[k];
  }
  for (const k in g) g[k] = Math.max(0, Math.min(100, g[k]));
  return g;
}
function ownedPocas() {
  const set = new Set();
  for (const id in S.res) if (S.res[id].done && MISSIONS[id]) MISSIONS[id].pocas.forEach(p => set.add(p));
  return set;
}
function firstTryCount() { let n = 0; for (const id in S.res) if (S.res[id].done && S.res[id].wrongs === 0) n++; return n; }
function chapterWrongs(no) { let n = 0; for (const id in S.res) if (MISSIONS[id] && MISSIONS[id].ch === no) n += S.res[id].wrongs || 0; return n; }
function res(id) { if (!S.res[id]) S.res[id] = { wrongs: 0, done: false }; return S.res[id]; }

/* ---------- 그림 ---------- */
function avatarHTML(id, mood, cls = '') {
  const c = CAST[id] || {};
  if (faceImg(id)) return `<div class="avatar-c ${cls}" style="--ac:${c.color || '#ffffff'}22"><img src="${faceImg(id)}" alt=""${IMG['face_' + id] ? '' : ' class="top"'}></div>`;
  if (c.skin) return `<div class="avatar-c ${cls}" style="--ac:${c.color}22">${portraitSVG(id, mood)}</div>`;
  if (id === 'phone') return `<div class="avatar-c ${cls}" style="--ac:#E3ECFF"><span class="emo">📞</span></div>`;
  if (id === 'uncle' || id === 'letter') return `<div class="avatar-c ${cls}" style="--ac:#FFF6CC"><span class="emo">✉️</span></div>`;
  return '';
}
function speakerName(id) { const c = CAST[id] || {}; return c.name || ''; }

/* ---------- 위쪽 막대 ---------- */
let lastG = null;
function hudHTML(ch) {
  const g = gaugeVals();
  return `<header class="hud">
    <div class="hud-ch"><b>${ch ? ch.no + '장' : ''}</b><span>${ch ? esc(ch.title) : ''}</span></div>
    <div class="gauges">${GAUGES.map(x => `<div class="gauge" data-g="${x.key}" style="--c:${x.color}" title="${x.name}">
      <span class="gi">${x.icon}</span><span class="gn"><span>${x.name}</span><b>${g[x.key]}</b></span>
      <span class="bar"><i style="width:${g[x.key]}%"></i></span></div>`).join('')}</div>
    <div class="hud-btns"><button class="icon-btn" data-act="dex" aria-label="포카 도감">📒</button><button class="icon-btn" data-act="menu" aria-label="메뉴">☰</button></div>
  </header>`;
}
function refreshHud() {
  const g = gaugeVals();
  document.querySelectorAll('.gauge').forEach(el => {
    const k = el.dataset.g; el.querySelector('.bar i').style.width = g[k] + '%'; el.querySelector('.gn b').textContent = g[k];
    if (lastG && lastG[k] !== g[k]) {
      const d = g[k] - lastG[k]; const s = document.createElement('span');
      s.className = 'delta ' + (d > 0 ? 'up' : 'down'); s.textContent = (d > 0 ? '+' : '') + d; el.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    }
  });
  lastG = g;
}
function bindHud() {
  $app.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    if (b.dataset.act === 'dex') openDexModal();
    if (b.dataset.act === 'menu') openMenu();
  }));
}

/* ---------- 알림, 창 ---------- */
function toast(msg, ms = 2200) {
  $toast.innerHTML = `<div>${msg}</div>`; clearTimeout(toast.t); toast.t = setTimeout(() => { $toast.innerHTML = ''; }, ms);
}
function closeModal() { $modal.innerHTML = ''; }
function modal(html, cls = '') {
  $modal.innerHTML = `<div class="modal-back"><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div></div>`;
  return $modal.querySelector('.modal');
}
function confirmBox(msg, yes, no = '취소') {
  return new Promise(resolve => {
    const m = modal(`<h2>잠깐만요</h2><p style="text-align:center;font-size:1.15rem;line-height:1.6">${msg}</p>
      <div class="modal-btns"><button class="btn" data-a="no">${no}</button><button class="btn primary" data-a="yes">${yes}</button></div>`);
    m.querySelector('[data-a=no]').onclick = () => { closeModal(); resolve(false); };
    m.querySelector('[data-a=yes]').onclick = () => { closeModal(); resolve(true); };
  });
}
/* 여러 줄 대사를 창에서 차례로 보여 주기 */
function talkModal({ title, cls, lines, deltas, lastBtn = '계속', onDone }) {
  let i = 0;
  const draw = () => {
    const [who, mood, text] = lines[i];
    const last = i === lines.length - 1;
    const m = modal(`${title ? `<h2>${title}</h2>` : ''}
      <div class="fb-line">${who !== 'narr' ? avatarHTML(who, mood) : ''}<div class="bubble ${who === 'narr' ? 'narr' : ''}">${who !== 'narr' && speakerName(who) ? `<b style="font-family:var(--display);font-weight:400;color:${(CAST[who] || {}).color || 'inherit'}">${esc(speakerName(who))}</b><br>` : ''}${T(text)}</div></div>
      ${last && deltas ? deltas : ''}
      <div class="modal-btns"><button class="btn ${last ? 'primary' : ''}" data-a="next">${last ? lastBtn : '다음'}</button></div>`, cls);
    m.querySelector('[data-a=next]').onclick = () => { if (last) { closeModal(); onDone && onDone(); } else { i++; draw(); } };
  };
  draw();
}

/* ===================== 화면: 처음 ===================== */
function renderTitle() {
  closeModal();
  const owned = ownedPocas().size;
  const cur = S.cur && CHAPTERS[S.cur.ch - 1];
  $app.innerHTML = `<div class="title-screen">
    <div class="title-stage">
      <img class="title-backdrop" src="${IMG.title_stage}" alt="" aria-hidden="true">
      <div class="logo"><div class="kicker">세린 · 유하 · 태오 · 이안의 데뷔 이야기</div><h1>데뷔 프로젝트</h1><div class="sub">망해 가는 기획사를 살려라!</div></div>
      <img class="title-lineup" src="${IMG.lineup}" alt="이안, 유하, 태오, 세린">
    </div>
    <nav class="title-menu">
      ${cur ? `<button class="btn primary" data-go="continue">이어 하기 · ${cur.no}장</button>` : ''}
      <button class="btn ${cur ? '' : 'primary'}" data-go="new">${S.ceo ? '처음부터 다시' : '시작하기'}</button>
      <button class="btn" data-go="select">장 고르기</button>
      <button class="btn" data-go="dex">포카 도감 ${owned}/${POCA_IDS.length}</button>
      ${S.ending ? `<button class="btn" data-go="result">내 데뷔 기록</button>` : ''}
      <div class="meta">${S.ceo ? `${esc(S.ceo)} 대표 · 그룹 ${esc(S.group)}` : '6학년 사회 · 우리나라 경제의 특징'}</div>
    </nav></div>`;
  $app.querySelectorAll('[data-go]').forEach(b => b.onclick = async () => {
    const g = b.dataset.go;
    if (g === 'continue') return playAt(S.cur.ch, S.cur.node);
    if (g === 'new') {
      if (S.ceo || Object.keys(S.res).length) {
        const ok = await confirmBox('처음부터 다시 하면 지금까지 모은 포카와 기록이 모두 지워져요.', '처음부터 하기');
        if (!ok) return;
      }
      S = freshState(); saveState(); lastG = null; return playAt(1, 0);
    }
    if (g === 'select') return renderSelect();
    if (g === 'dex') return renderDex('poca');
    if (g === 'result') return renderResult();
  });
}

/* ===================== 화면: 장 고르기 ===================== */
function chapterStatus(ch) {
  const ids = ch.nodes.filter(n => n.type === 'mission').map(n => n.id);
  const done = ids.filter(id => S.res[id] && S.res[id].done).length;
  const pocas = ch.nodes.filter(n => n.type === 'mission').reduce((a, n) => a + n.pocas.length, 0);
  const got = ch.nodes.filter(n => n.type === 'mission' && S.res[n.id] && S.res[n.id].done).reduce((a, n) => a + n.pocas.length, 0);
  return { ids, done, total: ids.length, pocas, got, finished: S.done.includes(ch.no) };
}
function renderSelect() {
  closeModal();
  $app.innerHTML = `<div class="page"><div class="page-head"><h2>장 고르기</h2><button class="btn small" data-back>처음 화면</button></div>
    <div class="chapters">${CHAPTERS.map(ch => {
      const st = chapterStatus(ch); const now = S.cur && S.cur.ch === ch.no && !st.finished;
      return `<button class="chap ${st.finished ? 'done' : now ? 'now' : ''}" data-ch="${ch.no}">
        <span class="no">${ch.no}장 · ${ch.no}차시</span><b>${esc(ch.title)}</b><small>${esc(ch.topic)}</small>
        <span class="st">${st.finished ? '✓ 다 했어요' : now ? '▶ 하는 중' : '아직 안 했어요'} · 포카 ${st.got}/${st.pocas}</span></button>`;
    }).join('')}</div></div>`;
  $app.querySelector('[data-back]').onclick = renderTitle;
  $app.querySelectorAll('[data-ch]').forEach(b => b.onclick = async () => {
    const no = +b.dataset.ch; const ch = CHAPTERS[no - 1]; const st = chapterStatus(ch);
    if (S.cur && S.cur.ch === no && !st.finished && S.cur.node > 0) {
      return playAt(no, S.cur.node);
    }
    if (st.done > 0 || st.finished) {
      const ok = await confirmBox(`${no}장을 처음부터 다시 할까요? 이 장에서 받은 포카와 점수는 새로 매겨져요.`, '다시 하기');
      if (!ok) return;
      st.ids.forEach(id => delete S.res[id]);
      if (no === 5) delete S.flags.nightShift;
      if (no === 6) delete S.flags.collusion;
      S.done = S.done.filter(x => x !== no);
    }
    if (!S.ceo) { S.cur = { ch: no, node: 0 }; return renderNames(() => playAt(no, 0)); }
    playAt(no, 0);
  });
}

/* ===================== 진행 ===================== */
let CUR = { ch: 1, node: 0 };
function playAt(chNo, nodeIdx) {
  closeModal();
  CUR = { ch: chNo, node: nodeIdx };
  S.cur = { ch: chNo, node: nodeIdx }; saveState();
  const ch = CHAPTERS[chNo - 1]; const node = ch.nodes[nodeIdx];
  if (!node) return renderTitle();
  if (node.type === 'scene' || node.type === 'cut') return renderScene(ch, node);
  if (node.type === 'names') {
    if (S.ceo && S.group) return next();
    return renderNames(() => next());
  }
  if (node.type === 'mission') {
    if (S.res[node.id] && S.res[node.id].done) return next();
    return renderMission(ch, node);
  }
  if (node.type === 'end') return renderChapterEnd(ch, node);
  if (node.type === 'ending') return renderEnding();
}
function next() { playAt(CUR.ch, CUR.node + 1); }

/* ---------- 대화 장면 ---------- */
function renderScene(ch, node, onEnd) {
  const bg = node.type === 'cut' ? 'bg-' + (node.bg || 'night') : 'bg-' + (node.bg || 'office');
  $app.innerHTML = hudHTML(ch) + `<main class="stage ${bg}" id="stage">
      <div class="cast" id="cast"></div>
      ${node.type === 'cut' ? `<div class="cutpanel"><img src="${IMG[node.img]}" alt=""></div>` : ''}
      ${node.preview ? '<div class="ribbon">다음 화 예고</div>' : node.label ? `<div class="ribbon">${esc(node.label)}</div>` : ''}
      <div class="dialog" id="dlg" role="button" tabindex="0" aria-label="눌러서 다음 대사 보기">
        <div class="nametag" id="nt"></div><div class="avatar" id="av"></div><div class="text" id="tx" aria-live="polite"></div>
        <div class="dlg-ctrl"><button class="prev" id="prev">◀ 이전</button><span class="next">▼</span></div>
      </div></main>`;
  bindHud(); refreshHud();
  const dlg = document.getElementById('dlg');
  let i = 0, typing = null, full = '', shown = 0, lastMember = null, mainMember = null;
  const showLine = () => {
    const [who, mood, text] = node.lines[i];
    const c = CAST[who] || {};
    full = T(text);
    dlg.className = 'dialog' + (who === 'narr' ? ' narr' : '') + (who === 'uncle' || who === 'letter' ? ' paper' : '');
    const nt = document.getElementById('nt');
    if (who === 'narr') nt.style.display = 'none';
    else { nt.style.display = ''; nt.textContent = c.name || ''; nt.style.setProperty('--c', c.color || 'var(--ink)'); }
    const av = document.getElementById('av');
    const staged = hasArt(who) || c.skin;
    const onStage = staged && node.type !== 'cut';
    av.innerHTML = (!onStage && who !== 'narr') ? avatarHTML(who, mood) : '';
    if (node.type !== 'cut') {
      const cast = document.getElementById('cast');
      if (staged) {
        if (mainMember && mainMember !== who) lastMember = mainMember;
        const changed = mainMember !== who;
        mainMember = who;
        cast.innerHTML = stageCard(who, mood, 'main' + (changed ? ' enter' : '')) + (lastMember && lastMember !== who ? stageCard(lastMember, 'normal', 'side') : '');
      } else if (mainMember) {
        cast.querySelectorAll('.mcard').forEach(e => e.classList.add('dimmed'));
      }
    }
    // 글자가 하나씩 나오기
    const plain = full.replace(/&[^;]+;/g, 'x');
    shown = 0; clearInterval(typing);
    const tx = document.getElementById('tx');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { tx.innerHTML = full; typing = null; return; }
    tx.innerHTML = '';
    typing = setInterval(() => {
      shown += 2;
      if (shown >= plain.length) { tx.innerHTML = full; clearInterval(typing); typing = null; return; }
      tx.innerHTML = cutHTML(full, shown);
    }, 32);
    document.getElementById('prev').style.visibility = i > 0 ? 'visible' : 'hidden';
  };
  const advance = () => {
    if (typing) { clearInterval(typing); typing = null; document.getElementById('tx').innerHTML = full; return; }
    if (i < node.lines.length - 1) { i++; showLine(); } else { clearInterval(typing); (onEnd || next)(); }
  };
  let lastTap = 0;
  const onTap = e => {
    if (e.target.closest('button')) return;
    const now = Date.now(); if (now - lastTap < 180) return; lastTap = now;
    advance();
  };
  document.getElementById('stage').addEventListener('click', onTap);
  dlg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); } });
  document.getElementById('prev').onclick = e => { e.stopPropagation(); if (i > 0) { i--; clearInterval(typing); typing = null; showLine(); } };
  showLine();
  dlg.focus({ preventScroll: true });
}
function cutHTML(html, n) { // 태그 없는 글자 n개까지 자르기 (& 기호는 한 글자)
  let out = '', count = 0, k = 0;
  while (k < html.length && count < n) {
    if (html[k] === '&') { const e = html.indexOf(';', k); out += html.slice(k, e + 1); k = e + 1; count++; }
    else { out += html[k]; k++; count++; }
  }
  return out;
}
function stageCard(id, mood, cls) {
  const c = CAST[id];
  if (hasArt(id)) return `<figure class="mcard ${cls}" style="--mc:${c.color}26"><span class="tag">${esc(c.name)}</span><img src="${charImg(id, mood)}" alt="${esc(c.name)}"></figure>`;
  return `<figure class="mcard npc ${cls}" style="--mc:${c.color}22"><span class="tag">${esc(c.name)}</span>${portraitSVG(id, mood)}</figure>`;
}

/* ---------- 이름 정하기 ---------- */
function renderNames(done) {
  closeModal();
  $app.innerHTML = `<main class="stage bg-paper"><div class="mission-wrap"><section class="sheet">
    <div class="m-head"><div><div class="mno">대표 등록</div><h2>이름을 정해 주세요</h2></div></div>
    <div class="m-who">${avatarHTML('oh', 'smile')}<p class="bubble">대표님 이름과 데뷔할 그룹 이름을 적어 주세요. 이야기 속 대사에 그대로 나와요.</p></div>
    <div class="names">
      <label>대표 이름 (내 이름)<input id="ceo" maxlength="8" autocomplete="off" placeholder="내 이름" value="${esc(S.ceo)}"></label>
      <label>그룹 이름<input id="grp" maxlength="10" autocomplete="off" placeholder="예: 해온" value="${esc(S.group)}"></label>
      <div class="sugg">이런 이름은 어때요? <button data-s="해온">해온</button><button data-s="별하나">별하나</button><button data-s="새벽빛">새벽빛</button><button data-s="다온">다온</button></div>
      <div class="hint-line" id="nh"></div>
    </div>
    <div class="m-foot"><button class="btn primary" id="go">이 이름으로 시작하기</button></div>
  </section></div></main>`;
  $app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { document.getElementById('grp').value = b.dataset.s; });
  document.getElementById('go').onclick = () => {
    const c = document.getElementById('ceo').value.trim(), g = document.getElementById('grp').value.trim();
    if (!c || !g) { document.getElementById('nh').textContent = !c ? '대표 이름을 적어 주세요.' : '그룹 이름을 적어 주세요.'; return; }
    S.ceo = c; S.group = g; saveState(); done();
  };
}

/* ===================== 미션 ===================== */
const KIND = {};
function renderMission(ch, node) {
  const steps = node.kind === 'steps' ? node.steps : [node];
  let si = 0;
  const r = res(node.id); saveState();
  const draw = () => {
    const st = steps[si];
    const who = st.who || node.who, mood = st.mood || node.mood;
    $app.innerHTML = hudHTML(ch) + `<main class="stage bg-paper"><div class="mission-wrap"><section class="sheet">
      <div class="m-head"><img class="mascot" src="${IMG.chibi_quiz}" alt=""><div><div class="mno">미션 ${node.id}</div><h2>${esc(node.title)}</h2></div>
        ${steps.length > 1 ? `<span class="steps">${si + 1} / ${steps.length}단계</span>` : ''}</div>
      <div class="m-who">${avatarHTML(who, mood)}<p class="bubble">${T(st.prompt)}</p></div>
      <div class="m-body" id="mb"></div>
      <div class="hint-line" id="hl"></div>
      <div class="m-foot" id="mf"></div>
    </section></div></main>`;
    bindHud(); refreshHud();
    const api = {
      wrong(lines, opts = {}) {
        r.wrongs++; if (opts.pen) { r.pen = r.pen || {}; for (const k in opts.pen) r.pen[k] = (r.pen[k] || 0) + opts.pen[k]; }
        if (opts.flag) S.flags[opts.flag] = true;
        saveState(); refreshHud();
        talkModal({ title: '다시 생각해 볼까요?', cls: 'no', lines, lastBtn: '다시 해 보기', onDone: opts.after });
      },
      pass() {
        if (si < steps.length - 1) { si++; toast('좋아요! 다음 단계로 가요.'); draw(); return; }
        finishMission(ch, node);
      },
      who, mood, node
    };
    KIND[st.kind](st, document.getElementById('mb'), document.getElementById('mf'), document.getElementById('hl'), api);
  };
  draw();
}
function finishMission(ch, node) {
  const r = res(node.id); r.done = true; saveState();
  const before = lastG; refreshHud();
  const g = gaugeVals(); const gi = GAUGES.find(x => x.key === node.gauge);
  const d = before ? g[node.gauge] - before[node.gauge] : 0;
  const deltas = `<div class="deltas"><span class="${d >= 0 ? 'up' : 'down'}">${gi.icon} ${gi.name} ${d >= 0 ? '+' : ''}${d}</span>${r.wrongs === 0 ? '<span class="up">⭐ 한 번에 성공!</span>' : ''}</div>`;
  talkModal({ title: '정답!', cls: 'ok', lines: node.ok || [['oh', 'smile', '잘했어요!']], deltas, lastBtn: node.pocas.length ? '포카 받기' : '계속', onDone: () => showPocas(node.pocas, () => next()) });
}
function pocaHTML(id, flip = false) {
  const p = POCAS[id]; const n = POCA_IDS.indexOf(id) + 1;
  return `<div class="poca ${flip ? 'flip' : ''}" data-p="${id}" role="button" tabindex="0" aria-label="${esc(p.word)} 포카, 눌러서 뒤집기">
    <div class="face front"><span class="no">No.${n}</span><div class="ph"><img src="${faceImg(p.who)}" alt=""></div><div class="word">${esc(p.word)}</div></div>
    <div class="face back"><b>${esc(p.word)}</b><p>${esc(p.def)}</p></div></div>`;
}
function bindFlip(root) { root.querySelectorAll('.poca').forEach(el => el.onclick = () => el.classList.toggle('flip')); }
function showPocas(list, done) {
  if (!list.length) return done();
  let i = 0;
  const draw = () => {
    const m = modal(`<h2>개념 포카 획득! ${list.length > 1 ? `(${i + 1}/${list.length})` : ''}</h2>
      <div class="poca-stage">${pocaHTML(list[i])}</div><div class="flip-hint">카드를 누르면 뒷면의 뜻을 볼 수 있어요</div>
      <div class="modal-btns"><button class="btn primary" data-a="n">${i < list.length - 1 ? '다음 포카' : '도감에 넣기'}</button></div>`, 'ok');
    bindFlip(m);
    m.querySelector('[data-a=n]').onclick = () => { if (i < list.length - 1) { i++; draw(); } else { closeModal(); done(); } };
  };
  draw();
}

/* --- 고르기 --- */
KIND.choice = (st, mb, mf, hl, api) => {
  let sel = -1;
  mb.innerHTML = `<div class="opts">${st.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="mark"></span><span>${T(o.text)}</span></button>`).join('')}</div>`;
  mf.innerHTML = `<button class="btn primary" id="ck" disabled>이걸로 정하기</button>`;
  const ck = mf.querySelector('#ck');
  mb.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    sel = +b.dataset.i; mb.querySelectorAll('.opt').forEach(x => x.classList.toggle('sel', x === b)); ck.disabled = false;
  });
  ck.onclick = () => {
    const o = st.options[sel]; if (!o) return;
    if (o.correct) return api.pass();
    if (o.branch === 'collusion') return api.wrong(o.why, { pen: { rep: -25, money: -5 }, flag: 'collusion' });
    api.wrong(o.why || [[api.who, 'normal', '다시 한번 생각해 볼까요?']]);
  };
};

/* --- 여러 개 고르기 --- */
KIND.multi = (st, mb, mf, hl, api) => {
  const sel = new Set();
  const opts = st.options || api.node.options;
  mb.innerHTML = `<div class="opts multi">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="mark"></span><span>${T(o.text)}</span></button>`).join('')}</div>`;
  mf.innerHTML = `<button class="btn primary" id="ck" disabled>다 골랐어요</button>`;
  hl.textContent = '맞는 것을 모두 골라요. 하나만 정답이 아닐 수도 있어요.';
  const ck = mf.querySelector('#ck');
  mb.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); b.classList.toggle('sel', sel.has(i)); ck.disabled = sel.size === 0;
  });
  ck.onclick = () => {
    const bad = [...sel].map(i => opts[i]).find(o => !o.correct);
    if (bad) return api.wrong(bad.why || [[api.who, 'normal', '정답이 아닌 것이 섞여 있어요.']]);
    const miss = opts.some((o, i) => o.correct && !sel.has(i));
    if (miss) return api.wrong(st.missing || api.node.missing || [[api.who, 'normal', '맞는 것이 더 있어요.']]);
    api.pass();
  };
};

/* --- 나눠 담기 (카드 → 상자) --- */
KIND.sort = (st, mb, mf, hl, api) => {
  const place = {}; const locked = new Set(); let selected = null;
  const capped = st.bins.every(b => b.cap);
  const cardById = id => st.cards.find(c => c.id === id);
  const chip = c => `<button class="chip ${locked.has(c.id) ? 'ok' : ''} ${selected === c.id ? 'sel' : ''}" data-c="${c.id}">${T(c.text)}</button>`;
  const draw = () => {
    const pool = st.cards.filter(c => !place[c.id]);
    mb.innerHTML = `<div class="pool" id="pool">${pool.map(c => chip(c)).join('')}</div>
      <div class="bins ${st.layout || 'bins3'}">${st.bins.map(b => {
        const inside = st.cards.filter(c => place[c.id] === b.id);
        return `<section class="bin ${selected ? 'target' : ''}" data-b="${b.id}" aria-labelledby="bin-${b.id}"><h3 id="bin-${b.id}"><button type="button" class="bin-label">${esc(b.label)}</button></h3><div class="bin-contents">${inside.length ? inside.map(c => chip(c)).join('') : '<span class="slot">여기에 카드를 담아 주세요</span>'}</div></section>`;
      }).join('')}</div>`;
    const full = capped ? st.bins.every(b => st.cards.some(c => place[c.id] === b.id)) : pool.length === 0;
    mf.innerHTML = `<button class="btn primary" id="ck" ${full ? '' : 'disabled'}>다 담았어요</button>`;
    hl.textContent = selected ? '이제 넣을 상자를 눌러 주세요.' : (full ? '' : '카드를 먼저 눌러 고르세요. 담은 카드를 다시 누르면 빼낼 수 있어요.');
    mb.querySelectorAll('.chip').forEach(el => el.onclick = e => {
      e.stopPropagation(); const id = el.dataset.c; if (locked.has(id)) return;
      if (place[id]) { delete place[id]; selected = id; } else selected = selected === id ? null : id;
      draw();
    });
    mb.querySelectorAll('.bin').forEach(el => el.onclick = () => {
      if (!selected) { hl.textContent = '먼저 카드를 하나 눌러 주세요.'; return; }
      const b = st.bins.find(x => x.id === el.dataset.b);
      if (b.cap) { const occ = st.cards.find(c => place[c.id] === b.id); if (occ) { if (locked.has(occ.id)) { hl.textContent = '이 칸은 이미 맞혔어요.'; return; } delete place[occ.id]; } }
      place[selected] = b.id; selected = null; draw();
    });
    mf.querySelector('#ck').onclick = check;
  };
  const check = () => {
    const wrong = st.cards.filter(c => place[c.id] && place[c.id] !== c.ans);
    if (!wrong.length) { st.cards.forEach(c => { if (place[c.id]) locked.add(c.id); }); draw(); return api.pass(); }
    st.cards.forEach(c => { if (place[c.id] && place[c.id] === c.ans) locked.add(c.id); });
    wrong.forEach(c => delete place[c.id]);
    draw();
    wrong.forEach(c => { const el = mb.querySelector(`[data-c="${c.id}"]`); if (el) el.classList.add('shake'); });
    const lines = wrong.slice(0, 2).map(c => [api.who, 'normal', `"${c.text.replace(/^봉투 [①②③] |^오실장 메모: /, '').slice(0, 24)}${c.text.length > 24 ? '…' : ''}" 카드는 다시 생각해 봐요. ${c.hint}`]);
    if (wrong.length > 2) lines.push([api.who, 'normal', `틀린 카드가 ${wrong.length - 2}장 더 있어요. 맞힌 카드는 초록색으로 남겨 둘게요.`]);
    api.wrong(lines);
  };
  draw();
};

/* --- 티켓값 --- */
KIND.price = (st, mb, mf, hl, api) => {
  let price = null; const tried = new Map();
  const draw = () => {
    const buyers = price ? st.fans.filter(f => f >= price).length : 0;
    mb.innerHTML = `<div class="fans">${st.fans.map(f => `<div class="fan ${price && f >= price ? 'buy' : ''}"><div class="will">${won(f)}</div>${fanSVG(price && f >= price)}</div>`).join('')}</div>
      <div class="prices">${st.prices.map(p => `<button class="price-btn ${p === price ? 'sel' : ''} ${tried.has(p) ? 'tried' : ''}" data-p="${p}">${won(p)}</button>`).join('')}</div>
      <div class="readout"><div class="box"><small>사는 팬</small><b>${price ? buyers + '명' : '-'}</b></div><div class="box"><small>수입 (티켓값 × 사는 팬)</small><b>${price ? won(price * buyers) : '-'}</b></div></div>
      <div class="history">${[...tried.entries()].sort((a, b) => a[0] - b[0]).map(([p, v]) => `<span>${won(p)} → ${won(v)}</span>`).join('')}</div>`;
    mf.innerHTML = `<button class="btn primary" id="ck" ${price ? '' : 'disabled'}>이 값으로 정하기</button>`;
    hl.textContent = price ? '불이 켜진 팬만 티켓을 사요. 다른 값도 눌러 비교해 보세요.' : '아래 티켓값 버튼을 눌러 보세요.';
    mb.querySelectorAll('.price-btn').forEach(b => b.onclick = () => { price = +b.dataset.p; tried.set(price, price * st.fans.filter(f => f >= price).length); draw(); });
    mf.querySelector('#ck').onclick = () => {
      if (price === st.answer) return api.pass();
      api.wrong([[api.who, 'worried', `${won(price)}이면 수입이 ${won(tried.get(price))}이에요. 수입이 더 큰 값이 있어요. 아직 안 눌러 본 값도 눌러 보세요.`]]);
    };
  };
  draw();
};

/* --- 예산 나누기 --- */
KIND.budget = (st, mb, mf, hl, api) => {
  const lv = {}; st.items.forEach(it => lv[it.id] = 0);
  const names = ['적게', '보통', '많이'];
  const draw = () => {
    const total = st.items.reduce((a, it) => a + it.costs[lv[it.id]], 0);
    const over = total > st.budget;
    mb.innerHTML = `<div class="budget-rows">${st.items.map(it => `<div class="brow"><div class="bname"><span>${it.icon}</span>${esc(it.text)}${it.min ? '<em>꼭 필요</em>' : ''}</div>
      <div class="seg">${it.costs.map((c, i) => `<button class="${lv[it.id] === i ? 'sel' : ''}" data-it="${it.id}" data-l="${i}">${names[i]}<small>${manwon(c)}</small></button>`).join('')}</div></div>`).join('')}</div>
`;
    mf.innerHTML = `<div class="total"><div class="row"><span>쓴 돈 / 예산</span><span><b class="${over ? 'over' : ''}">${manwon(total)}</b> / ${manwon(st.budget)}</span></div>
      <div class="tbar"><i class="${over ? 'over' : ''}" style="width:${Math.min(100, total / st.budget * 100)}%"></i></div>
      <div class="row" style="font-size:.95rem;margin-top:6px;font-weight:500"><span>${over ? '예산을 넘었어요!' : '남는 돈'}</span><span>${over ? manwon(total - st.budget) + ' 넘음' : manwon(st.budget - total)}</span></div></div><button class="btn primary" id="ck">이렇게 나눌게요</button>`;
    hl.textContent = '처음엔 모두 "적게"로 되어 있어요.';
    mb.querySelectorAll('.seg button').forEach(b => b.onclick = () => { lv[b.dataset.it] = +b.dataset.l; draw(); });
    mf.querySelector('#ck').onclick = () => {
      if (over) return api.wrong(st.over);
      const low = st.items.find(it => it.min && lv[it.id] < it.min);
      if (low) return api.wrong(low.why);
      if (total < st.budget) toast(`남은 ${manwon(st.budget - total)}은 비상금으로 둘게요.`);
      api.pass();
    };
  };
  draw();
};

/* --- 선택 기준표 (하늘이 쇼핑) --- */
KIND.shop = (st, mb, mf, hl, api) => {
  const crit = new Set(), items = new Set(); let reason = -1;
  const draw = () => {
    const total = [...items].reduce((a, id) => a + st.items.find(x => x.id === id).price, 0);
    const over = total > st.budget;
    mb.innerHTML = `<div class="shop-sec"><h4>① 나에게 중요한 기준 2개</h4><div class="crit">${st.criteria.map(c => `<button class="${crit.has(c.id) ? 'sel' : ''}" data-cr="${c.id}">${esc(c.text)}</button>`).join('')}</div></div>
      <div class="shop-sec"><h4>② 3만 원 안에서 살 것 고르기</h4><div class="items">${st.items.map(it => `<button class="item ${items.has(it.id) ? 'sel' : ''}" data-it="${it.id}"><div class="ic">${it.icon}</div><b>${esc(it.text)}</b><div class="pr">${won(it.price)}</div><small>"${esc(it.note)}"</small></button>`).join('')}</div>
        <div class="wallet">👛 <span>${won(total)} / 3만 원</span><div class="tbar"><i class="${over ? 'over' : ''}" style="width:${Math.min(100, total / st.budget * 100)}%"></i></div></div></div>
      <div class="shop-sec"><h4>③ 이렇게 고른 까닭</h4><div class="opts">${st.reasons.map((r, i) => `<button class="opt ${reason === i ? 'sel' : ''}" data-r="${i}"><span class="mark"></span><span>${esc(r.text)}</span></button>`).join('')}</div></div>`;
    const ready = crit.size === 2 && items.size > 0 && reason >= 0;
    mf.innerHTML = `<button class="btn primary" id="ck" ${ready ? '' : 'disabled'}>이렇게 살래요</button>`;
    hl.textContent = crit.size !== 2 ? '기준을 꼭 2개 골라 주세요.' : items.size === 0 ? '살 것을 하나 이상 골라 주세요.' : reason < 0 ? '고른 까닭을 골라 주세요.' : '';
    mb.querySelectorAll('[data-cr]').forEach(b => b.onclick = () => {
      const id = b.dataset.cr;
      if (crit.has(id)) crit.delete(id); else { if (crit.size >= 2) { toast('기준은 2개까지 고를 수 있어요.'); return; } crit.add(id); }
      draw();
    });
    mb.querySelectorAll('[data-it]').forEach(b => b.onclick = () => { const id = b.dataset.it; items.has(id) ? items.delete(id) : items.add(id); draw(); });
    mb.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { reason = +b.dataset.r; draw(); });
    mf.querySelector('#ck').onclick = () => {
      if (over) return api.wrong([[api.who, 'worried', `지금 고른 것을 다 더하면 ${won(total)}이야. 3만 원을 넘어서 지갑이 닫히지 않아!`]]);
      const r = st.reasons[reason];
      if (!r.crit) return api.wrong(r.why);
      if (!crit.has(r.crit)) {
        const names = [...crit].map(id => `"${st.criteria.find(c => c.id === id).text}"`).join(', ');
        return api.wrong([[api.who, 'serious', `네가 고른 기준은 ${names}였잖아. 그 기준에 맞는 까닭을 골라 볼까?`]]);
      }
      const left = st.budget - total;
      if (left > 0) toast(`남은 ${won(left)}은 저금통에 저축!`);
      api.pass();
    };
  };
  draw();
};

/* --- 근로계약서 --- */
KIND.contract = (st, mb, mf, hl, api) => {
  const marked = new Set(); let filled = false;
  const draw = () => {
    mb.innerHTML = `<div class="contract"><h3>근 로 계 약 서</h3>${st.fields.map(f => {
      const blank = !f.value;
      const v = blank ? (filled && f.need ? `<span class="filled">${esc(f.fill)}</span>` : '<span class="blank"></span>') : `<span class="cv">${esc(f.value)}</span>`;
      return `<button class="crow ${marked.has(f.id) && !filled ? 'mark' : ''}" data-f="${f.id}" ${blank ? '' : 'tabindex="-1"'}><span class="cl">${esc(f.label)}</span>${v}</button>`;
    }).join('')}</div>`;
    mf.innerHTML = filled ? '' : `<button class="btn primary" id="ck" ${marked.size ? '' : 'disabled'}>빠진 칸을 다 찾았어요</button>`;
    hl.textContent = filled ? '' : '비어 있는 칸을 누르면 "빠졌어요!" 도장이 찍혀요. 다시 누르면 지워져요.';
    mb.querySelectorAll('.crow').forEach(b => b.onclick = () => {
      if (filled) return; const f = st.fields.find(x => x.id === b.dataset.f); if (f.value) return;
      marked.has(f.id) ? marked.delete(f.id) : marked.add(f.id); draw();
    });
    const ck = mf.querySelector('#ck'); if (ck) ck.onclick = () => {
      const extra = st.fields.find(f => marked.has(f.id) && !f.need);
      if (extra) { marked.delete(extra.id); draw(); return api.wrong(extra.why); }
      const miss = st.fields.some(f => f.need && !marked.has(f.id));
      if (miss) return api.wrong(st.missing || api.node.missing);
      filled = true; draw(); setTimeout(() => api.pass(), 900);
    };
  };
  draw();
};

/* --- 일주일 일정 --- */
KIND.schedule = (st, mb, mf, hl, api) => {
  let h = st.start.hours, d = st.start.days;
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const draw = () => {
    const total = h * d;
    mb.innerHTML = `<div class="sched-ctrl"><div><h4>하루 일하는 시간</h4><div class="seg four">${st.hours.map(x => `<button class="${x === h ? 'sel' : ''}" data-h="${x}">${x}시간</button>`).join('')}</div></div>
      <div><h4>일주일에 일하는 날</h4><div class="seg four">${st.days.map(x => `<button class="${x === d ? 'sel' : ''}" data-d="${x}">${x}일</button>`).join('')}</div></div></div>
      <div class="week">${days.map((n, i) => `<div class="day ${i < d ? 'work' : 'rest'}"><b>${n}</b><span>${i < d ? h + '시간' : '쉬는 날'}</span></div>`).join('')}</div>
      <div class="week-total">일주일에 <b>${total}시간</b> 일하고, <b>${7 - d}일</b> 쉬어요</div>`;
    mf.innerHTML = `<button class="btn danger" id="night">🔥 데뷔가 급하니 이번만 밤샘!</button><button class="btn primary" id="ck">이 일정으로 정하기</button>`;
    mb.querySelectorAll('[data-h]').forEach(b => b.onclick = () => { h = +b.dataset.h; draw(); });
    mb.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { d = +b.dataset.d; draw(); });
    mf.querySelector('#night').onclick = () => api.wrong([
      ['narr', '', '밤샘 연습을 밀어붙인 다음 날 아침…'],
      ['yuha', 'tired', '콜록콜록… 대표님, 저 또 어지러워요…'],
      ['jisu', 'sad', '저도 이틀째 집에 못 갔어요…'],
      ['oh', 'worried', '대표님, 쉬지 않고 일하면 몸도 마음도 무너져요. 근로 시간과 쉬는 날은 꼭 지켜야 해요.']
    ], { pen: { trust: -15 }, flag: 'nightShift' });
    mf.querySelector('#ck').onclick = () => {
      if (h > 8) return api.wrong([['oh', 'normal', `하루 ${h}시간은 너무 길어요. 근로기준법은 쉬는 시간을 빼고 하루 8시간이 기준이에요.`]]);
      if (d >= 7) return api.wrong([['oh', 'normal', '쉬는 날이 하루도 없어요. 일주일에 하루 이상은 꼭 쉬어야 해요.']]);
      if (h * d > 40) return api.wrong([['oh', 'normal', `일주일에 ${h * d}시간이에요. 일주일 40시간을 넘었어요.`]]);
      api.pass();
    };
  };
  draw();
};

/* --- 순서 맞추기 --- */
KIND.order = (st, mb, mf, hl, api) => {
  const shuffled = [2, 0, 3, 1].map(i => i < st.items.length ? i : 0);
  let seq = [];
  const draw = () => {
    const left = shuffled.filter(i => !seq.includes(i));
    mb.innerHTML = `<div class="order-slots">${[0, 1, 2, 3].map(k => `<button class="oslot ${seq[k] !== undefined ? 'full' : ''}" data-k="${k}"><span class="n">${k + 1}</span>${seq[k] !== undefined ? esc(st.items[seq[k]]) : ''}</button>`).join('')}</div>
      <div class="pool order-pool">${left.map(i => `<button class="chip" data-i="${i}">${esc(st.items[i])}</button>`).join('')}</div>`;
    mf.innerHTML = `<button class="btn" id="rs" ${seq.length ? '' : 'disabled'}>다시 놓기</button><button class="btn primary" id="ck" ${seq.length === 4 ? '' : 'disabled'}>이 순서가 맞아요</button>`;
    hl.textContent = seq.length < 4 ? `아래 카드를 ${seq.length + 1}번째로 올 차례대로 눌러 주세요. 놓은 카드를 누르면 그 뒤가 지워져요.` : '';
    mb.querySelectorAll('.chip').forEach(b => b.onclick = () => { seq.push(+b.dataset.i); draw(); });
    mb.querySelectorAll('.oslot').forEach(b => b.onclick = () => { const k = +b.dataset.k; if (seq[k] !== undefined) { seq = seq.slice(0, k); draw(); } });
    mf.querySelector('#rs').onclick = () => { seq = []; draw(); };
    mf.querySelector('#ck').onclick = () => {
      if (seq.every((v, k) => v === k)) return api.pass();
      seq = []; draw();
      api.wrong([['oh', 'normal', '처음은 "더 많이 만든다"에서 시작해요. 무엇이 늘어나야 그다음 것이 늘어날지 차례로 생각해 봐요.']]);
    };
  };
  draw();
};

/* ===================== 장 끝 ===================== */
const STORY_RULES = {
  taeo: () => chapterWrongs(2) <= 1,
  haneul: () => chapterWrongs(3) <= 1,
  ian: () => S.res['4-1'] && S.res['4-1'].wrongs === 0,
  yuha: () => S.res['5-2'] && S.res['5-2'].wrongs === 0,
  serin: () => S.res['6-1'] && S.res['6-1'].wrongs === 0 && S.res['6-2'] && S.res['6-2'].wrongs === 0,
  oh: () => true
};
function renderChapterEnd(ch, node) {
  if (!S.done.includes(ch.no)) S.done.push(ch.no);
  let unlocked = null;
  if (node.story && STORY_RULES[node.story]()) { if (!S.stories.includes(node.story)) S.stories.push(node.story); unlocked = node.story; }
  const nextCh = CHAPTERS[ch.no];
  S.cur = nextCh ? { ch: nextCh.no, node: 0 } : null; saveState();
  const got = ch.nodes.filter(n => n.type === 'mission').flatMap(n => (S.res[n.id] && S.res[n.id].done) ? n.pocas : []);
  $app.innerHTML = hudHTML(ch) + `<main class="stage bg-stage"><div class="mission-wrap"><section class="sheet endcard">
    <div class="mno" style="font-family:var(--display);color:var(--pink);font-size:1.1rem">${ch.no}차시 · ${esc(ch.topic)}</div>
    <h2>${ch.no}장 끝!</h2>
    <p style="font-size:1.1rem">이번 장에서 모은 개념 포카 ${got.length}장. 카드를 눌러 뜻을 다시 확인해 보세요.</p>
    <div class="mini-pocas">${got.map(p => pocaHTML(p)).join('')}</div>
    ${node.story ? (unlocked ? `<div class="unlock">🔓 숨은 이야기가 열렸어요: ${esc(STORIES[unlocked].title)} <button class="btn small blue" id="rd">지금 보기</button></div>`
      : `<div class="unlock" style="background:#F3F5FA;font-weight:500">🔒 숨은 이야기 「${esc(STORIES[node.story].title)}」는 아직 잠겨 있어요. ${esc(STORIES[node.story].cond)}</div>`) : ''}
    <div class="m-foot">${nextCh ? `<button class="btn" id="rest">저장하고 쉬기</button><button class="btn primary" id="nx">${nextCh.no}장으로 가기</button>` : ''}</div>
  </section></div></main>`;
  bindHud(); refreshHud(); bindFlip($app);
  const rd = document.getElementById('rd'); if (rd) rd.onclick = () => playStory(unlocked);
  const rest = document.getElementById('rest'); if (rest) rest.onclick = () => { toast('저장했어요. 다음 시간에 이어 해요!'); renderTitle(); };
  const nx = document.getElementById('nx'); if (nx) nx.onclick = () => playAt(nextCh.no, 0);
}
function playStory(id) {
  const st = STORIES[id];
  talkModal({ title: '숨은 이야기 · ' + esc(st.title), lines: st.lines, lastBtn: '닫기' });
}

/* ===================== 엔딩 ===================== */
function endingKey() {
  const g = gaugeVals(); const vals = Object.values(g); const avg = vals.reduce((a, b) => a + b, 0) / 4;
  const clean = !S.flags.nightShift && !S.flags.collusion && S.res['5-2'] && S.res['5-2'].wrongs === 0 && S.res['6-1'] && S.res['6-1'].wrongs === 0 && S.res['6-2'] && S.res['6-2'].wrongs === 0;
  if (clean && vals.every(v => v >= 80)) return 'hidden';
  if (avg >= 85) return 'big';
  if (avg >= 58) return 'ok';
  return 'low';
}
function renderEnding() {
  const key = endingKey(); const e = ENDINGS[key];
  S.ending = { key, date: new Date().toISOString() };
  if (!S.done.includes(7)) S.done.push(7);
  if (!S.stories.includes('oh')) S.stories.push('oh');
  S.cur = null; saveState();
  const ch = CHAPTERS[6];
  renderScene(ch, { type: 'scene', bg: e.bg, label: e.title, lines: e.lines }, () => renderResult(true));
}
function renderResult(fresh) {
  closeModal();
  if (!S.ending) return renderTitle();
  const e = ENDINGS[S.ending.key]; const g = gaugeVals();
  const d = new Date(S.ending.date); const ds = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  $app.innerHTML = `<div class="page"><div class="page-head"><h2>데뷔 기록 카드</h2><button class="btn small" data-back>처음 화면</button></div>
    <div class="result">
      <div class="top"><small>엔딩</small><h2>${esc(e.title)}</h2><div class="grp">그룹 「${esc(S.group)}」 · ${esc(S.ceo)} 대표</div><img class="lineup" src="${IMG.lineup}" alt=""></div>
      <dl><dt>모은 개념 포카</dt><dd>${ownedPocas().size} / ${POCA_IDS.length}장</dd>
        <dt>한 번에 맞힌 미션</dt><dd>${firstTryCount()} / ${TOTAL_MISSIONS}개</dd>
        <dt>열린 숨은 이야기</dt><dd>${S.stories.length} / ${Object.keys(STORIES).length}편</dd>
        <dt>날짜</dt><dd>${ds}</dd></dl>
      <div class="gsum">${GAUGES.map(x => `<div><span>${x.icon} ${x.name}</span><b>${g[x.key]}</b></div>`).join('')}</div>
    </div>
    <p style="text-align:center;color:var(--ink2)">이 화면을 선생님께 보여 주세요.</p>
    <div class="m-foot"><button class="btn" data-dex>포카 도감 보기</button><button class="btn primary" data-back2>처음 화면으로</button></div></div>`;
  $app.querySelector('[data-back]').onclick = renderTitle;
  $app.querySelector('[data-back2]').onclick = renderTitle;
  $app.querySelector('[data-dex]').onclick = () => renderDex('poca');
  if (fresh) setTimeout(() => toast('🔓 숨은 이야기 「오실장과 삼촌의 첫 사무실」이 열렸어요!', 3000), 400);
}

/* ===================== 도감 ===================== */
function dexBody(tab) {
  const owned = ownedPocas();
  if (tab === 'poca') return `<div class="dex">${POCA_IDS.map(id => owned.has(id) ? pocaHTML(id) : `<div class="locked"><div><big>?</big>${POCAS[id].ch}장에서 얻어요</div></div>`).join('')}</div>`;
  return `<div class="stories">${Object.entries(STORIES).map(([id, st]) => S.stories.includes(id)
    ? `<button class="story" data-st="${id}">${avatarHTML(id, 'smile', 'sm')}<span><b>${esc(st.title)}</b><small>${st.ch}장 · 눌러서 읽기</small></span></button>`
    : `<div class="story off"><span style="font-size:2rem">🔒</span><span><b>${esc(st.title)}</b><small>${esc(st.cond)}</small></span></div>`).join('')}</div>`;
}
function renderDex(tab) {
  closeModal();
  const owned = ownedPocas();
  $app.innerHTML = `<div class="page"><div class="page-head"><h2>포카 도감 ${owned.size}/${POCA_IDS.length}</h2>
    <div class="tabs"><button class="${tab === 'poca' ? 'sel' : ''}" data-t="poca">개념 포카</button><button class="${tab === 'story' ? 'sel' : ''}" data-t="story">숨은 이야기 ${S.stories.length}/${Object.keys(STORIES).length}</button></div>
    <button class="btn small" data-back>처음 화면</button></div>${dexBody(tab)}</div>`;
  $app.querySelector('[data-back]').onclick = renderTitle;
  $app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => renderDex(b.dataset.t));
  bindFlip($app);
  $app.querySelectorAll('[data-st]').forEach(b => b.onclick = () => playStory(b.dataset.st));
}
function openDexModal() {
  const owned = ownedPocas();
  const m = modal(`<h2>포카 도감 ${owned.size}/${POCA_IDS.length}</h2><div class="dex" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr))">${POCA_IDS.filter(id => owned.has(id)).map(id => pocaHTML(id)).join('') || '<p style="text-align:center;grid-column:1/-1">아직 모은 포카가 없어요. 미션을 풀면 생겨요!</p>'}</div>
    <div class="modal-btns"><button class="btn primary" data-a="c">닫기</button></div>`);
  bindFlip(m); m.querySelector('[data-a=c]').onclick = closeModal;
}
function openMenu() {
  const m = modal(`<h2>메뉴</h2><div class="menu-list">
    <button class="btn" data-m="resume">계속하기</button>
    <button class="btn" data-m="select">장 고르기</button>
    <button class="btn" data-m="dex">포카 도감 · 숨은 이야기</button>
    <button class="btn" data-m="title">처음 화면 (저장돼요)</button></div>`);
  m.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    const a = b.dataset.m; closeModal();
    if (a === 'select') renderSelect(); if (a === 'dex') renderDex('poca'); if (a === 'title') renderTitle();
  });
}

/* ---------- 시작 ---------- */
renderTitle();
