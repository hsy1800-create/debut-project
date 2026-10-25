/* 웨일클래스 수업 편집 화면에서 실행: 차시 내용(SE 글, 영상, PDF, 링크)을 채우고 비공개로 저장 */
(function () {
  const BASE = 'https://raw.githubusercontent.com/hsy1800-create/debut-project/module-assets/';
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const u = () => 'SE-' + crypto.randomUUID();
  const prog = (m) => { window.__prog = (window.__prog || []); window.__prog.push(m); };

  function tn(v, st) { return { '@ctype': 'textNode', id: u(), value: v, style: Object.assign({ '@ctype': 'nodeStyle' }, st || {}) }; }
  function para(nodes, ps) { return { '@ctype': 'paragraph', id: u(), nodes: nodes, style: Object.assign({ '@ctype': 'paragraphStyle' }, ps || {}) }; }
  function rich(text, base) {
    const parts = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean);
    return parts.map((p) => p.startsWith('**') ? tn(p.slice(2, -2), Object.assign({}, base, { bold: true })) : tn(p, base));
  }
  function buildDoc(title, blocks) {
    const comps = [{ '@ctype': 'documentTitle', id: u(), title: [para([tn(title)])], layout: 'default' }];
    let cur = null;
    const flush = () => { if (cur && cur.value.length) comps.push(cur); cur = null; };
    const ensure = () => { if (!cur) cur = { '@ctype': 'text', id: u(), layout: 'default', value: [] }; return cur; };
    blocks.forEach((b) => {
      const k = b[0], t = b[1];
      if (k === 'hr') { flush(); comps.push({ '@ctype': 'horizontalLine', id: u(), layout: 'line1' }); return; }
      const c = ensure();
      if (k === 't') c.value.push(para([tn(t, { bold: true, fontSizeCode: 'fs24', fontColor: '#d33159' })]));
      else if (k === 'h') { if (c.value.length) c.value.push(para([tn('', { fontSizeCode: 'fs16' })])); c.value.push(para([tn('■ ' + t, { bold: true, fontSizeCode: 'fs19' })])); }
      else if (k === 'p') c.value.push(para(rich(t, { fontSizeCode: 'fs16' })));
      else if (k === 'li') { const pre = /^[①-⑳]/.test(t) ? '' : '• '; c.value.push(para(rich(pre + t, { fontSizeCode: 'fs16' }))); }
      else if (k === 'n') c.value.push(para([tn(t, { fontSizeCode: 'fs15', fontColor: '#6b6470' })]));
    });
    flush();
    return { documentId: '', document: { language: 'ko-KR', theme: 'default', version: '2.9.0', components: comps } };
  }

  async function waitFor(fn, ms, step) {
    const end = Date.now() + (ms || 20000);
    while (Date.now() < end) { try { const v = fn(); if (v) return v; } catch (e) {} await sleep(step || 400); }
    return null;
  }

  async function addUrl(link) {
    const before = document.querySelectorAll('._url_input').length;
    document.querySelector('[data-selector=toolbarMoreGroup] [data-type=Url]').click();
    await waitFor(() => document.querySelectorAll('._url_input').length > before, 8000);
    const inp = [...document.querySelectorAll('._url_input')].pop();
    $(inp).val(link).trigger('input').trigger('change').trigger('keyup');
    const box = $(inp).closest('[data-id]');
    (box.find('[data-input-url-btn]')[0] || [...document.querySelectorAll('[data-input-url-btn]')].pop()).click();
    const ok = await waitFor(() => { const t = (box[0] || document.body).innerText; return /URL변경|URL 변경/.test(t); }, 20000);
    await sleep(1500);
    return !!ok;
  }

  async function addPdf(name) {
    const r = await fetch(BASE + 'ws/' + encodeURIComponent(name));
    const b = await r.blob();
    const f = new File([b], name, { type: 'application/pdf' });
    const before = document.querySelectorAll('.material_doc').length;
    const inp = [...document.querySelectorAll('input._upload_input')].find((e) => e.dataset.type === 'Doc');
    const dt = new DataTransfer(); dt.items.add(f); inp.files = dt.files;
    inp.dispatchEvent(new Event('change', { bubbles: true }));
    const ok = await waitFor(() => { const d = document.querySelectorAll('.material_doc'); return d.length > before && d[d.length - 1].innerText.indexOf(name.replace(/\.pdf$/, '')) >= 0; }, 60000, 800);
    await sleep(1500);
    return !!ok;
  }

  window.__fill = async function (key) {
    window.__prog = [];
    try {
      const C = window.__C || (window.__C = await fetch(BASE + 'content.json?' + Date.now()).then((r) => r.json()));
      const L = C[key];
      window.alert = (m) => prog('ALERT ' + m);
      window.confirm = (m) => { prog('CONFIRM ' + m); return true; };
      // 1 제목
      const ta = document.querySelector('textarea[name=title]');
      $(ta).val(L.title).trigger('input').trigger('change').trigger('keyup');
      prog('title');
      // 2 스마트에디터
      document.querySelector('[data-selector=toolbarBtnGroup] [data-type=SmartEditor]').click();
      const ed = await waitFor(() => window.SmartEditor && SmartEditor._editors && Object.values(SmartEditor._editors).pop(), 15000);
      await sleep(1500);
      ed.setDocumentData(buildDoc(L.title, L.blocks));
      prog('se');
      // 3 영상
      for (const v of L.videos) prog('video ' + (await addUrl(v)));
      // 4 PDF
      for (const p of L.pdfs) prog('pdf ' + (await addPdf(p)));
      // 5 링크 카드
      for (const l of L.links) prog('link ' + (await addUrl(l)));
      // 6 교과
      const sel = [...document.querySelectorAll('select')].find((e) => [...e.options].some((o) => o.value === '사회'));
      $(sel).val('사회').trigger('change').trigger('chosen:updated');
      await sleep(800);
      // 7 저장(비공개)
      if (!window.__origAjax) window.__origAjax = $.ajax;
      $.ajax = function (o) {
        if (o && o.type === 'PUT' && /\/lecture\/\d+$/.test(o.url)) {
          const d = JSON.parse(o.data);
          d.aMaterials = d.aMaterials.filter((m) => !(m.type === 'SmartEditor' && !m.json));
          d.openLevel = 'manager';
          o.data = JSON.stringify(d);
          localStorage.setItem('__fill_' + key, JSON.stringify({ n: d.aMaterials.length, types: d.aMaterials.map((m) => m.type), at: Date.now() }));
          return window.__origAjax.call(this, o).done((res) => { localStorage.setItem('__fillres_' + key, JSON.stringify({ status: res.status, msg: res.msg || '' })); });
        }
        return window.__origAjax.apply(this, arguments);
      };
      document.getElementById('_save_btn_with_private').click();
      prog('saveclicked');
    } catch (e) { prog('ERR ' + e.message); }
  };
})();
