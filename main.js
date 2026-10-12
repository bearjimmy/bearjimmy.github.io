(() => {
  const CARDS = window.CARDS || [];
  const KIND = { research: '研究', project: '專案', experience: '經歷', skill: '技能・證照' };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const serial = i => 'No.' + String(i + 1).padStart(4, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const plain = t => String(t).replace(/\|/g, '');               // 標題裡的 | 是斷行提示
  const wrapHint = t => esc(t).replace(/\|/g, '<wbr>');
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const stage = document.getElementById('stage');
  const cloud = document.getElementById('cloud');
  const sheet = document.getElementById('sheet');

  // ---------- 車票，平均分布在球面上（費氏螺旋） ----------
  const nodes = CARDS.map((d, i) => {
    const el = document.createElement('button');
    el.className = 'ticket';
    el.type = 'button';
    el.dataset.type = d.type;
    el.innerHTML =
      `<span class="t-inner">
         <span class="t-top"><span>${serial(i)}</span><span>${esc(d.when || '')}</span></span>
         <span class="t-title">${wrapHint(d.title)}</span>
         <span class="t-foot"><span class="t-sub">${esc(d.short || d.sub)}</span><span class="t-kind">${esc(d.tag)}</span></span>
       </span><span class="t-hole"></span>`;
    el.setAttribute('aria-label', `${plain(d.title)}，${d.sub}`);
    cloud.appendChild(el);

    const n = CARDS.length;
    const y = 1 - (i + 0.5) / n * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    return { d, i, el, ux: Math.cos(th) * r, uy: y, uz: Math.sin(th) * r, phase: Math.random() * Math.PI * 2, dim: false, near: 0, sx: 0, sy: 0 };
  });

  // ---------- 狀態 ----------
  let R = 300, RX = 300, RY = 300, F = 700, BASE = 0.86, OX = 0, OY = 0;
  // 開場角度：研究與專案票的重心朝向正前方（先讓人看到做出來的東西）
  const front = nodes.filter(n => n.d.type === 'research' || n.d.type === 'project')
    .reduce((a, n) => ({ x: a.x + n.ux, y: a.y + n.uy, z: a.z + n.uz }), { x: 0, y: 0, z: 0 });
  let rotY = Math.atan2(-front.x, front.z);
  let rotX = Math.max(-0.6, Math.min(0.6, Math.atan2(front.y, Math.hypot(front.x, front.z))));
  const restX = rotX;
  let vX = 0, vY = 0;
  let lastInput = performance.now();
  let anim = null, running = true;
  let px = -9999, py = -9999;   // 游標在舞台內的位置

  const route = document.querySelector('.route');
  function resize() {
    document.documentElement.style.setProperty('--route-h', route.offsetHeight + 'px');
    const w = stage.clientWidth, h = stage.clientHeight;
    const wide = w >= 900;
    RX = Math.min(w * (wide ? 0.29 : 0.37), 450);
    RY = Math.min(h * (wide ? 0.33 : 0.38), 300);
    R = Math.max(RX, RY);
    F = R * 2.4;
    BASE = w < 600 ? 0.66 : (w < 900 ? 0.76 : 0.86);
    OX = wide ? w * 0.13 : 0;        // 寬螢幕把票雲往右推，讓出站名牌
    OY = wide ? -h * 0.03 : 0;
  }
  resize();
  addEventListener('resize', resize);
  // 手機上路線列放不下：捲到最後，讓「下一站」先被看到
  if (route.scrollWidth > route.clientWidth) route.scrollLeft = route.scrollWidth;

  // ---------- 繪製 ----------
  function render(t) {
    const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
    const half = stage.clientWidth / 2, halfH = stage.clientHeight / 2;
    for (const n of nodes) {
      const x1u = n.ux * cy + n.uz * sy;
      const z1u = -n.ux * sy + n.uz * cy;
      const y1u = n.uy * cx - z1u * sx;
      const z2u = n.uy * sx + z1u * cx;
      const z2 = z2u * R;
      let y1 = y1u * RY;
      if (!reduceMotion) y1 += Math.sin(t * 0.001 + n.phase) * 6;

      const s = F / (F - z2) * BASE;
      const depth = (z2u + 1) / 2;
      const X = x1u * RX * s + OX, Y = y1 * s + OY;
      n.sx = half + X; n.sy = halfH + Y;

      // 靠近即光源：游標附近的票微微抬起
      const d = Math.hypot(px - n.sx, py - n.sy);
      const target = !n.dim && depth > 0.45 ? Math.max(0, 1 - d / 170) : 0;
      n.near += (target - n.near) * 0.18;

      let k = 0.18 + Math.pow(depth, 1.25) * 0.82;
      if (n.dim) k = 0.06 + depth * 0.1;
      k = Math.min(1, k + n.near * 0.3);       // 靠近時墨色加深
      const lift = 1 + n.near * 0.07;
      n.el.style.transform = `translate(${X}px, ${Y - n.near * 8}px) translate(-50%, -50%) scale(${s * lift * (n.dim ? 0.85 : 1)})`;
      n.el.style.setProperty('--k', k.toFixed(3));
      n.el.style.zIndex = Math.round(depth * 1000) + (n.dim ? 0 : 1000) + Math.round(n.near * 500);
      n.el.style.pointerEvents = n.dim || depth < 0.3 ? 'none' : 'auto';
      n.el.classList.toggle('is-near', n.near > 0.35);
    }
  }

  // ---------- 動畫迴圈（有阻尼，不瞬移） ----------
  let prev = performance.now();
  function loop(t) {
    const dt = Math.min(48, t - prev); prev = t;
    if (anim) {
      const k = Math.min(1, (t - anim.start) / anim.dur);
      const e = 1 - Math.pow(1 - k, 4);
      rotY = anim.fromY + (anim.toY - anim.fromY) * e;
      rotX = anim.fromX + (anim.toX - anim.fromX) * e;
      if (k >= 1) { const done = anim.done; anim = null; done && done(); }
    } else if (!dragging) {
      rotY += vY * dt; rotX += vX * dt;
      const damp = Math.pow(0.935, dt / 16);
      vY *= damp; vX *= damp;
      const idle = t - lastInput > 2500;
      if (!reduceMotion && idle && sheet.hidden && px < -999) rotY += 0.00011 * dt;
      if (idle) rotX += (restX - rotX) * 0.0015 * dt;
    }
    rotX = Math.max(-1.1, Math.min(1.1, rotX));
    render(t);
    if (running) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const wake = () => { if (!running) { running = true; prev = performance.now(); requestAnimationFrame(loop); } };
  new IntersectionObserver(([en]) => { if (en.isIntersecting && !document.hidden) wake(); else running = false; }).observe(stage);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });

  // ---------- 拖曳 ----------
  let dragging = false, moved = false, downX = 0, downY = 0, lastX = 0, lastY = 0, lastT = 0;
  stage.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    dragging = true; moved = false; anim = null; vX = vY = 0;
    downX = lastX = e.clientX; downY = lastY = e.clientY; lastT = lastInput = performance.now();
  });
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    if (e.pointerType === 'mouse') { px = e.clientX - r.left; py = e.clientY - r.top; }
  });
  stage.addEventListener('pointerleave', () => { px = py = -9999; lastInput = performance.now(); });
  addEventListener('pointermove', e => {
    if (!dragging) return;
    if (!moved && Math.hypot(e.clientX - downX, e.clientY - downY) > 5) {
      moved = true; stage.classList.add('is-dragging');
    }
    if (!moved) return;
    const now = performance.now(), dt = Math.max(1, now - lastT), k = 0.005;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    rotY += dx * k; rotX -= dy * k;
    vY = dx * k / dt; vX = -dy * k / dt;
    lastX = e.clientX; lastY = e.clientY; lastT = lastInput = now;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false; stage.classList.remove('is-dragging');
    if (performance.now() - lastT > 80) vX = vY = 0;
    lastInput = performance.now();
    setTimeout(() => { moved = false; }, 0);   // 讓 click 先判斷完
  };
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', () => { endDrag(); moved = false; });

  stage.addEventListener('keydown', e => {
    const k = { ArrowLeft: [0, -0.3], ArrowRight: [0, 0.3], ArrowUp: [0.2, 0], ArrowDown: [-0.2, 0] }[e.key];
    if (!k) return;
    e.preventDefault();
    animateTo(rotX + k[0], rotY + k[1], 420);
    lastInput = performance.now();
  });

  // ---------- 剪票 ----------
  for (const n of nodes) {
    n.el.addEventListener('click', e => {
      if (moved) { e.preventDefault(); return; }
      punch(n);
    });
  }

  function animateTo(toX, toY, dur, done) {
    while (toY - rotY > Math.PI) toY -= Math.PI * 2;
    while (toY - rotY < -Math.PI) toY += Math.PI * 2;
    if (reduceMotion) { rotX = toX; rotY = toY; done && done(); return; }
    anim = { fromX: rotX, fromY: rotY, toX, toY, start: performance.now(), dur, done };
  }

  function punch(n) {
    vX = vY = 0;
    n.el.classList.add('is-punched');
    const toY = Math.atan2(-n.ux, n.uz);
    const toX = Math.atan2(n.uy, Math.hypot(n.ux, n.uz));
    animateTo(toX, toY, 700, () => openSheet(n.d, n.i, n.el));
  }

  // ---------- 票種篩選 ----------
  document.querySelectorAll('.stub').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.stub').forEach(b => {
      b.classList.toggle('is-on', b === btn);
      b.setAttribute('aria-pressed', b === btn);
    });
    const f = btn.dataset.filter;
    nodes.forEach(n => {
      n.dim = f !== 'all' && n.d.type !== f;
      n.el.classList.toggle('is-dim', n.dim);
      n.el.tabIndex = n.dim ? -1 : 0;
    });
    lastInput = performance.now();
  }));

  // ---------- 大票根 ----------
  let returnFocus = null;
  const today = new Date();
  const stampDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  function openSheet(d, i, from) {
    returnFocus = from || document.activeElement;
    const card = sheet.querySelector('.ticket-large');
    card.style.setProperty('--c', `var(--${d.type})`);
    card.style.setProperty('--ci', `var(--${d.type}-ink)`);
    sheet.querySelector('#sheet-tag').textContent = `${KIND[d.type]}・${d.tag}`;
    sheet.querySelector('#sheet-serial').textContent = serial(i);
    sheet.querySelector('#sheet-title').innerHTML = wrapHint(d.title);
    // sub 裡已經有年份就不重複顯示日期
    const showWhen = d.when && !d.sub.includes(d.when.slice(0, 4));
    sheet.querySelector('#sheet-sub').textContent = [showWhen && d.when, d.sub].filter(Boolean).join('　');
    sheet.querySelector('#sheet-body').innerHTML = d.body.map(p => `<p>${esc(p)}</p>`).join('');
    const via = sheet.querySelector('#sheet-via');
    via.hidden = !(d.stack && d.stack.length);
    sheet.querySelector('#sheet-stack').innerHTML = (d.stack || []).map(s => `<li>${esc(s)}</li>`).join('');
    sheet.querySelector('#sheet-links').innerHTML = (d.links || [])
      .map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}${ARROW}</a>`).join('');
    sheet.querySelector('#sheet-date').textContent = stampDate;
    // 重新播放鋼印動畫
    const st = sheet.querySelector('.stamp'); st.style.animation = 'none'; void st.offsetWidth; st.style.animation = '';
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
    sheet.querySelector('.tl-close').focus();
  }
  function closeSheet() {
    sheet.hidden = true;
    document.body.style.overflow = '';
    lastInput = performance.now();
    returnFocus && returnFocus.focus({ preventScroll: true });
  }
  sheet.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

  // ---------- 時刻表 ----------
  const list = document.getElementById('list');
  for (const type of ['research', 'project', 'experience', 'skill']) {
    const items = CARDS.map((c, i) => ({ c, i })).filter(x => x.c.type === type);
    const g = document.createElement('section');
    g.className = 'tt-group';
    g.style.setProperty('--c', `var(--${type})`);
    g.innerHTML = `<h3>${KIND[type]}</h3><ul class="tt-rows">${items.map(({ c, i }) =>
      `<li class="tt-row" tabindex="0" role="button" data-i="${i}" aria-label="${esc(plain(c.title))}，查看詳細">
         <span class="tt-when">${esc(c.when || serial(i))}</span>
         <span class="tt-name">${wrapHint(c.title)}</span>
         <span class="tt-desc">${esc(c.sub)}</span>
         <span class="tt-go"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
       </li>`).join('')}</ul>`;
    list.appendChild(g);
  }
  const openRow = row => { const i = +row.dataset.i; openSheet(CARDS[i], i, row); };
  list.addEventListener('click', e => { const row = e.target.closest('.tt-row'); if (row) openRow(row); });
  list.addEventListener('keydown', e => {
    const row = e.target.closest('.tt-row');
    if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openRow(row); }
  });
})();
