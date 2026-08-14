// 8개 미니게임을 봇이 실제로 플레이해 클리어 가능성과 타이머 누수를 검증한다.
//
//   npm install && npm test
//
// 브라우저에서는 탭이 비활성이면 requestAnimationFrame 이 거의 멈춰서
// 실시간 조작 검증이 불가능하다. 그래서 jsdom 위에 가상 시계를 깔고
// setTimeout / setInterval / rAF / performance.now 를 전부 갈아끼운 뒤
// 시간을 직접 밀어 가며 플레이한다.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace('<script src="./script.js"></script>', '');
const source = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously' });
const win = dom.window;

// ── 가상 시계 ──────────────────────────────────────────────
let vnow = 0, tid = 1, rid = 1;
let timers = [], rafQ = [];
win.setTimeout = (fn, ms) => { const id = tid++; timers.push({ id, fn, due: vnow + (ms || 0), every: null }); return id };
win.setInterval = (fn, ms) => { const id = tid++; const p = Math.max(1, ms || 1); timers.push({ id, fn, due: vnow + p, every: p }); return id };
win.clearTimeout = win.clearInterval = id => { const i = timers.findIndex(t => t.id === id); if (i >= 0) timers.splice(i, 1) };
win.requestAnimationFrame = fn => { const id = rid++; rafQ.push({ id, fn }); return id };
win.cancelAnimationFrame = id => { rafQ = rafQ.filter(r => r.id !== id) };
Object.defineProperty(win.performance, 'now', { value: () => vnow, configurable: true });
win.Date.now = () => vnow;

function step(ms) {
  const FRAME = 16;
  let left = ms;
  while (left > 0) {
    const dt = Math.min(FRAME, left); left -= dt; vnow += dt;
    for (let guard = 0; guard < 500; guard++) {
      let due = null;
      for (const t of timers) if (t.due <= vnow && (!due || t.due < due.due)) due = t;
      if (!due) break;
      if (due.every) due.due = vnow + due.every; else win.clearTimeout(due.id);
      try { due.fn() } catch (e) { throw new Error('timer: ' + e.message) }
    }
    const q = rafQ; rafQ = [];
    for (const r of q) { try { r.fn(vnow) } catch (e) { throw new Error('raf: ' + e.message) } }
  }
}
win.__step = step;

// ── 레이아웃 스텁 (jsdom 은 전부 0 을 돌려준다) ──────────────
const geoProp = (name, key) => Object.defineProperty(win.HTMLElement.prototype, name, {
  get() { return (this.__geo && this.__geo[key]) || 0 }, configurable: true,
});
geoProp('offsetWidth', 'w'); geoProp('offsetHeight', 'h');
geoProp('offsetLeft', 'x'); geoProp('offsetTop', 'y');
geoProp('clientWidth', 'w'); geoProp('clientHeight', 'h');
geoProp('clientLeft', 'bl'); geoProp('clientTop', 'bt');
win.Element.prototype.getBoundingClientRect = function () {
  const g = this.__geo || {};
  const x = g.rx || 0, y = g.ry || 0, w = g.w || 0, h = g.h || 0;
  return { x, y, left: x, top: y, width: w, height: h, right: x + w, bottom: y + h };
};
win.Element.prototype.setPointerCapture = function () {};
win.Element.prototype.releasePointerCapture = function () {};

// ── script.js 주입 ─────────────────────────────────────────
const s = win.document.createElement('script');
s.textContent = source;
win.document.body.appendChild(s);

// ── 봇 (페이지 컨텍스트에서 실행) ──────────────────────────
const bot = String.raw`
const $$ = id => document.getElementById(id);
const setGeo = (el, g) => { if (el) el.__geo = g };

// on* 프로퍼티 핸들러와 addEventListener 를 모두 태우는 포인터 이벤트 발사기
function fire(el, type, props) {
  const p = Object.assign({ pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 0, clientY: 0 }, props || {});
  const ev = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(ev, p);
  const on = el['on' + type];
  if (typeof on === 'function') on.call(el, Object.assign({ preventDefault(){}, stopPropagation(){}, target: el, currentTarget: el }, p));
  el.dispatchEvent(ev);
}
function key(code, k) {
  const ev = new Event('keydown', { bubbles: true, cancelable: true });
  Object.assign(ev, { code, key: k || code, repeat: false });
  document.dispatchEvent(ev);
}
const pctOf = v => parseFloat(v);
const R = {};

function play(i, fn, budgetMs) {
  goStage(i);
  if (briefOpen) startGame(); // 브리핑 팝업을 닫고 미션 시작
  if (!$$('gameArea').children.length || $$('idleStart')) startGame();
  const t0 = __clock();
  let err = null;
  try { fn() } catch (e) { err = e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join('\n') }
  R[stages[i].type] = {
    cleared: states[i],
    virtualSec: +((__clock() - t0) / 1000).toFixed(1),
    err,
    feedback: $$('feedback').textContent.slice(0, 90),
  };
}

// 1. slice — 톱날이 규격 구간에 들어오면 절단
play(0, () => {
  const btn = $$('wfCut');
  for (let n = 0; n < 4000 && !states[0]; n++) {
    __step(16);
    const b = $$('wfBlade'), t = $$('wfTarget');
    const bp = pctOf(b.style.left), tl = pctOf(t.style.left), tw = pctOf(t.style.width);
    if (bp >= tl + tw * 0.25 && bp <= tl + tw * 0.75) { btn.onclick(); __step(460) }
  }
}, 0);

// 2. oxide — 두 가스를 동시에 목표 구간에 유지
play(1, () => {
  const btns = {};
  document.querySelectorAll('.ox-btn').forEach(b => { btns[b.dataset.g + b.dataset.d] = b });
  const press = b => { fire(b, 'pointerdown'); if (typeof b.onpointerup === 'function') b.onpointerup(); };
  for (let n = 0; n < 3000 && !states[1]; n++) {
    for (const g of ['O', 'V']) {
      const cur = +$$('oxCur' + g).textContent, tgt = +$$('oxTgt' + g).textContent, d = tgt - cur;
      if (Math.abs(d) > 2) press(btns[g.toLowerCase() + (d > 0 ? '1' : '-1')]);
    }
    __step(100);
  }
}, 0);

// 3. photo — RPM 을 초록 구간에 올린 뒤 정중앙에 PR 투하
play(2, () => {
  setGeo($$('phStage'), { w: 360, h: 220, rx: 0, ry: 0, bl: 0, bt: 0 });
  setGeo($$('phWafer'), { w: 160, h: 160, x: 100, y: 20 });
  setGeo($$('phDropper'), { w: 26, h: 34 });
  const spin = $$('phSpinBtn'), drop = $$('phDropper');
  for (let n = 0; n < 400 && !states[2]; n++) {
    const rpm = +$$('phRpm').textContent;
    if (rpm < 2400) { spin.onpointerdown(); __step(16); continue }
    if (rpm > 3400) { __step(48); continue }
    const e = { pointerId: 1, pointerType: 'mouse', clientX: 180, clientY: 100, preventDefault(){} };
    drop.onpointerdown(e); drop.onpointermove(e); drop.onpointerup(e);
    __step(16);
  }
}, 0);

// 4. etch — 목표 깊이 구간에서 손 떼기, 3회
play(3, () => {
  const hold = $$('etHold');
  for (let n = 0; n < 400 && !states[3]; n++) {
    fire(hold, 'pointerdown');
    const [lo, hi] = $$('etTarget').textContent.split('~').map(x => parseInt(x));
    for (let m = 0; m < 400; m++) {
      __step(16);
      const d = parseInt($$('etDepth').textContent);
      if (d >= lo && d <= hi) { fire(hold, 'pointerup'); break }
      if (d > hi) { fire(hold, 'pointerup'); break }
    }
    __step(32);
  }
}, 0);

// 5. deposit — 가장 낮은 열로 옮겨 3층을 빈칸 없이 채우기
play(4, () => {
  const COLS = 6, ROWS = 7;
  const board = $$('dpBoard');
  const heights = () => {
    const c = board.children, h = new Array(COLS).fill(0);
    for (let r = ROWS - 1; r >= 0; r--) for (let x = 0; x < COLS; x++) {
      const el = c[r * COLS + x];
      if (el.classList.contains('dp-atom') || el.classList.contains('dp-ion')) h[x] = ROWS - r;
    }
    return h;
  };
  const liveCol = () => {
    const c = board.children;
    for (let i = 0; i < c.length; i++) if (c[i].classList.contains('dp-fall')) return i % COLS;
    return -1;
  };
  for (let n = 0; n < 600 && !states[4]; n++) {
    const h = heights();
    let tgt = 0;
    for (let x = 1; x < COLS; x++) if (h[x] < h[tgt]) tgt = x;
    if (h[tgt] >= 3) break;
    let fx = liveCol(), guard = 0;
    while (fx >= 0 && fx !== tgt && guard++ < 12) { key(fx < tgt ? 'ArrowRight' : 'ArrowLeft'); fx = liveCol() }
    key('Space', ' ');
    __step(32);
  }
}, 0);

// 6. connect — SVG 에서 배선 마스크를 복원해 경로를 풀고 타일 회전
play(5, () => {
  const N = 1, E = 2, S = 4, W = 8, DR = [-1, 0, 1, 0], DC = [0, 1, 0, -1];
  const ENDS = [[32, 0], [64, 32], [32, 64], [0, 32]];
  const board = $$('miBoard');
  const tiles = [...board.querySelectorAll('.mi-tile')];
  const base = tiles.map(t => {
    const d = t.querySelector('.mi-pipe').getAttribute('d');
    let m = 0;
    for (let i = 0; i < 4; i++) if (d.includes('L' + ENDS[i][0] + ' ' + ENDS[i][1])) m |= 1 << i;
    return m;
  });
  const rot = tiles.map(t => {
    const m = /rotate\(([-\d.]+)deg\)/.exec(t.querySelector('.mi-rot').getAttribute('style') || '');
    return ((Math.round((m ? +m[1] : 0) / 90) % 4) + 4) % 4;
  });
  const rotN = (m, n) => { let x = m; for (let i = ((n % 4) + 4) % 4; i > 0; i--) x = ((x << 1) | (x >> 3)) & 15; return x };
  const ports = [...board.querySelectorAll('.mi-port')];
  let pr = -1, tr = -1, ri = 0;
  ports.forEach(p => {
    const isSrc = p.classList.contains('mi-src');
    if (isSrc) { if (p.classList.contains('mi-live')) pr = ri } else { if (p.classList.contains('mi-goal')) tr = ri; ri++ }
  });
  // 진입 방향이 주어졌을 때 가능한 회전 찾기
  const rotsWith = (k, need) => { const out = []; for (let r = 0; r < 4; r++) if ((rotN(base[k], r) & need) === need) out.push(r); return out };
  const target = new Array(16).fill(null);
  const seen = new Array(16).fill(false);
  const walk = (r, c, entry) => {
    const k = r * 4 + c; seen[k] = true;
    if (r === tr && c === 3) { const rs = rotsWith(k, entry | E); if (rs.length) { target[k] = rs[0]; return true } seen[k] = false; return false }
    for (let d = 0; d < 4; d++) {
      const nr = r + DR[d], nc = c + DC[d];
      if (nr < 0 || nr > 3 || nc < 0 || nc > 3 || seen[nr * 4 + nc]) continue;
      const exit = 1 << d, back = 1 << ((d + 2) % 4);
      const rs = rotsWith(k, entry | exit);
      if (!rs.length) continue;
      if (!rotsWith(nr * 4 + nc, back).length) continue;
      target[k] = rs[0];
      if (walk(nr, nc, back)) return true;
      target[k] = null;
    }
    seen[k] = false; return false;
  };
  if (!walk(pr, 0, W)) throw new Error('풀이 경로 탐색 실패 (pr=' + pr + ' tr=' + tr + ')');
  for (let k = 0; k < 16; k++) {
    if (target[k] === null) continue;
    let turns = ((target[k] - rot[k]) % 4 + 4) % 4;
    for (let i = 0; i < turns; i++) fire(tiles[k], 'pointerdown');
  }
  __step(16);
}, 0);

// 7. eds — 켜진 불량 다이를 즉시 마킹
play(6, () => {
  $$('edStart').onclick();
  for (let n = 0; n < 400 && !states[6]; n++) {
    __step(100);
    [...$$('edGrid').querySelectorAll('.ed-bad')].forEach(el => fire(el, 'pointerdown'));
  }
}, 0);

// 8. pack — 스크라이브 통로를 따라 레이저 완주 4회
play(7, () => {
  const board = $$('pkBoard');
  setGeo(board, { w: 400, h: 400, rx: 0, ry: 0 });
  const at = (x, y, type) => fire(board, type, { clientX: x * 400, clientY: y * 400 });
  for (let line = 0; line < 6 && !states[7]; line++) {
    const st = $$('pkStart');
    const sx = pctOf(st.style.left) / 100, sy = pctOf(st.style.top) / 100;
    const vertical = sy < 0.2;
    const before = +$$('pkLeft').textContent;
    at(sx, sy, 'pointerdown');
    for (let t = 1; t <= 40 && !states[7]; t++) {
      const p = 0.05 + (0.96 - 0.05) * (t / 40);
      if (vertical) at(sx, p, 'pointermove'); else at(p, sy, 'pointermove');
      __step(16);
      if (+$$('pkLeft').textContent !== before) break; // winCut 이 다음 라인으로 넘어감
    }
    at(sx, sy, 'pointerup');
    __step(16);
  }
}, 0);

JSON.stringify(R, null, 1);
`;

let out;
try {
  win.eval('window.__clock = () => performance.now();');
  out = win.eval(bot);
} catch (e) {
  console.error('하네스 실패:', e.message);
  console.error((e.stack || '').split('\n').slice(0, 6).join('\n'));
  process.exit(1);
}

const res = JSON.parse(out);
const order = ['slice', 'oxide', 'photo', 'etch', 'deposit', 'connect', 'eds', 'pack'];
const label = { slice: '1 웨이퍼 제조', oxide: '2 산화', photo: '3 포토', etch: '4 식각', deposit: '5 증착·이온주입', connect: '6 금속 배선', eds: '7 EDS', pack: '8 패키징' };
let pass = 0;
console.log('');
for (const k of order) {
  const r = res[k] || {};
  const mark = r.cleared ? 'PASS' : 'FAIL';
  if (r.cleared) pass++;
  console.log(`${mark}  ${label[k].padEnd(16)} 가상 ${String(r.virtualSec).padStart(5)}초  ${r.err ? '오류: ' + r.err.split('\n')[0] : (r.feedback || '').replace(/\s+/g, ' ')}`);
}
// 스테이지를 떠난 뒤 타이머·rAF 가 실제로 정리되는지
win.eval('finish()');
step(2000);
const leaked = { timers: timers.length, raf: rafQ.length, cleanups: win.eval('cleanups.length') };
const clean = leaked.timers === 0 && leaked.raf === 0 && leaked.cleanups === 0;

console.log(`\n${pass} / 8 클리어  ·  최종 점수 ${win.eval('score')}`);
console.log(`정리 검증: ${clean ? 'PASS' : 'FAIL'}  (잔여 타이머 ${leaked.timers} · rAF ${leaked.raf} · 미실행 cleanup ${leaked.cleanups})`);
process.exit(pass === 8 && clean ? 0 : 1);
