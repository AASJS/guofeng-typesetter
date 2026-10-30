/* ============================================================
 * 公众号排版工作站 · 外壳逻辑（仅 Tab 管理 + 工作台 iframe 装载）
 * 引擎（GuofengCard）在 guofeng-card-engine.js，本文件不含引擎。
 * 单文件版由 build_single.py 生成：本文件内联、loadWb 改 srcdoc。
 * ============================================================ */
(function () {
  'use strict';

  /* ===== 1) Tab 切换（ARIA + roving tabindex + 键盘可达） ===== */
  const tabs = document.querySelectorAll('#tabs button');
  const panels = document.querySelectorAll('.panel');

  function activateTab(btn, focus) {
    const t = btn.dataset.tab;
    tabs.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + t));
    // 切到新 Tab 后重算卡片预览缩放（引擎监听 window.resize 刷新预览）
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    const wbf = document.querySelector('#tab-' + t + ' .wb-frame');
    if (wbf) loadWb(wbf);
    if (focus) btn.focus();
  }

  tabs.forEach(btn => btn.addEventListener('click', () => activateTab(btn)));

  // 键盘可达性：左/右方向键、Home/End 在 Tab 间切换（roving tabindex）
  const tablist = document.getElementById('tabs');
  if (tablist) tablist.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
    const arr = Array.from(tabs);
    const cur = arr.indexOf(document.activeElement);
    if (cur < 0) return;
    e.preventDefault();
    let n = cur;
    if (e.key === 'ArrowRight') n = (cur + 1) % arr.length;
    if (e.key === 'ArrowLeft') n = (cur - 1 + arr.length) % arr.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = arr.length - 1;
    activateTab(arr[n], true);
  });

  /* ===== 2) 挂载国风卡片引擎（引擎缺失也不影响工作站外壳，故加 try/catch 兜底） ===== */
  try {
    // 独立「国风卡片」Tab；引擎也可能被其他场景再挂载，互不污染
    window.__gc2 = GuofengCard.mount('#guofeng-mount-2', { defaultStyle: 'swiss' });
  } catch (e) {
    console.warn('国风卡片引擎未加载，仅渲染工作站外壳：', e);
  }

  /* ===== 3) 嵌入「国风排版工作台」：懒加载 iframe，默认打开对应内部 Tab ===== */
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  const WB_TIMEOUT = 15000; // iframe 加载超时阈值（ms）

  function loadWb(frame) {
    if (!frame || frame.dataset.ready === "1") return;
    const dt = frame.dataset.tab || "1";
    frame.dataset.ready = "1";
    frame.dataset.loaded = "0";
    frame.src = "workbench.html?tab=" + encodeURIComponent(dt);
    const panel = frame.closest(".wb-panel");
    const tip = panel ? panel.querySelector(".wb-loading") : null;
    let timer = null;
    const armTimeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (frame.dataset.loaded === "1" || !tip || tip.querySelector(".retry")) return;
        tip.classList.add("timeout");
        tip.innerHTML = "加载超时，请检查文件是否完整 <button class=\"retry\" type=\"button\">重试</button>";
        const btn = tip.querySelector(".retry");
        if (btn) btn.addEventListener("click", () => {
          tip.classList.remove("timeout");
          tip.innerHTML = "加载国风排版工作台…";
          frame.dataset.loaded = "0";
          frame.src = "workbench.html?tab=" + encodeURIComponent(dt);
          armTimeout();
        });
      }, WB_TIMEOUT);
    };
    armTimeout();
    if (frame.dataset.bound === "1") return;
    frame.dataset.bound = "1";
    frame.addEventListener("load", () => {
      clearTimeout(timer);
      frame.dataset.loaded = "1";
      try { frame.contentWindow.dispatchEvent(new Event("resize")); } catch (e) {}
      try { frame.closest(".wb-panel").classList.add("ready"); } catch (e) {}
      // 胜出标题桥接：把 gf_ab_winner 派发给刚加载好的工作台（跨 Tab 同步）
      try {
        var w = safeGet("gf_ab_winner");
        if (w) frame.contentWindow.dispatchEvent(new StorageEvent("storage", { key: "gf_ab_winner", newValue: w }));
      } catch (e) {}
    });
  }

  // 初始激活的 Tab 立即加载
  loadWb(document.querySelector("#tab-paiban .wb-frame"));
})();
