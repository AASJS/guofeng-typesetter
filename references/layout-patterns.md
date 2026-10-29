# 六套设计系统 · 完整 HTML 骨架（v3.0 参考档）

> ⚠️ **v3.0 起，卡片由 `引擎(guofeng-card-engine.js)` 的 `数据(themes.json) + 5 个通用布局模板` 生成**，不再手写完整 HTML。
> 本文件保留为**结构与 CSS 参考**：配色变量、装饰元素、布局骨架均可在 `references/themes.json` 与引擎 `LAYOUTS` 中找到对应。
> 新增风格优先改 `themes.json`；需新布局结构时再扩展引擎模板。

> 排版质量基线（已默认应用）：`text-rendering: optimizeLegibility`、`font-feature-settings`、`line-height` 韵律、`8px` 间距网格、`max-width` 行长、CJK 混排空格。
> 默认 900px 宽竖版 9:16；改 `aspect-ratio` 即可换画幅（3:4 / 1:1 / 2.35:1）。

---

## 1. 宋韵禅意 Song Zen

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 宋韵禅意</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap">
<style>
:root{
  --ink:#222; --seal:#8C4A38; --seal-bright:#B8442C; --jade:#3A5A48;
  --gold:#C8B89E; --paper:#F7F4EB; --line:#DDD8CF; --muted:#999;
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#e8e4dc;padding:40px 16px;
  font-family:"Noto Serif SC","Songti SC","SimSun",serif;
  text-rendering:optimizeLegibility;font-feature-settings:"kern" 1,"liga" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--paper);
  position:relative;overflow:hidden;padding:100px 80px 80px;color:var(--ink);
  box-shadow:0 8px 40px rgba(0,0,0,.12)}
.card::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;
  background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(180,170,150,.03) 2px,rgba(180,170,150,.03) 3px),
    repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(180,170,150,.02) 2px,rgba(180,170,150,.02) 3px)}
.content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column}
.tag{display:inline-block;border:1px solid var(--seal);color:var(--seal);
  padding:6px 20px;font-size:28px;letter-spacing:4px;align-self:flex-start}
.sub-tag{margin-top:14px;font-size:26px;color:#697478;letter-spacing:3px}
.main-title{margin-top:56px;font-size:88px;font-weight:700;color:var(--ink);
  letter-spacing:8px;line-height:1.2}
.quote{margin-top:52px;padding-left:24px;border-left:3px solid var(--gold);
  font-size:40px;line-height:1.8;letter-spacing:2px}
.section{margin-top:48px}
.section-title{font-size:34px;color:var(--seal);font-weight:700;margin-bottom:14px;letter-spacing:2px}
.section-text{font-size:32px;color:#333;line-height:1.9;letter-spacing:1px;max-width:32em}
.divider{width:100%;height:1px;background:var(--line);margin:36px 0}
.golden{margin-top:auto;padding-top:60px;text-align:center;font-size:48px;
  color:var(--jade);line-height:1.8;font-weight:600;letter-spacing:3px}
.footer{margin-top:40px;text-align:center;font-size:24px;color:var(--muted);letter-spacing:2px}
.seal{position:absolute;top:100px;right:80px;width:56px;height:56px;
  border:2px solid var(--seal-bright);border-radius:6px;display:flex;align-items:center;
  justify-content:center;color:var(--seal-bright);font-size:22px;font-weight:700;
  writing-mode:vertical-rl;z-index:3;opacity:.7}
</style>
</head>
<body>
<div class="card">
  <div class="seal">{{印字}}</div>
  <div class="content">
    <div class="tag">{{标签}}</div>
    <div class="sub-tag">{{副标签}}</div>
    <h1 class="main-title">{{主标题}}</h1>
    <div class="quote">{{竖线引文}}</div>
    <div class="section">
      <div class="section-title">{{小节标题一}}</div>
      <div class="section-text">{{小节正文一}}</div>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div class="section-title">{{小节标题二}}</div>
      <div class="section-text">{{小节正文二}}</div>
    </div>
    <div class="golden">{{收尾金句}}</div>
    <div class="footer">静心知识库 · @圣为Ai设计</div>
  </div>
</div>
</body>
</html>
```

---

## 2. 杂志编辑 Editorial

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 杂志编辑</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap">
<style>
:root{
  --ink:#1a1a1a; --accent:#B8442C; --paper:#FAF8F4; --panel:#F0EDE6; --line:#D5D0C8; --muted:#8a8580;
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#e4e0d8;padding:40px 16px;
  font-family:"Noto Sans SC",sans-serif;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--paper);
  position:relative;overflow:hidden;padding:96px 84px 72px;color:var(--ink);
  box-shadow:0 8px 40px rgba(0,0,0,.1)}
.content{position:relative;height:100%;display:flex;flex-direction:column}
.kicker{font-family:"Playfair Display",serif;font-size:18px;letter-spacing:3px;
  text-transform:uppercase;color:var(--accent);margin-bottom:24px}
.main-title{font-family:"Noto Serif SC",serif;font-size:84px;font-weight:900;
  line-height:1.15;letter-spacing:2px;margin-bottom:24px}
.dek{font-size:26px;line-height:1.7;color:#4a4a46;font-weight:300;max-width:30em;margin-bottom:40px}
.hairline{width:56px;height:2px;background:var(--accent);margin-bottom:32px}
.lead{font-size:22px;line-height:2;color:#333;max-width:32em}
.lead::first-letter{float:left;font-family:"Playfair Display",serif;font-size:88px;
  line-height:.78;padding:6px 14px 0 0;color:var(--accent)}
.pullquote{margin:48px 0;padding:28px 0;border-top:2px solid var(--accent);
  border-bottom:2px solid var(--accent);font-family:"Noto Serif SC",serif;
  font-size:34px;line-height:1.6;font-style:italic;color:var(--ink)}
.pullquote::before{content:"\201C";font-family:"Playfair Display",serif;color:var(--accent);
  font-size:60px;line-height:0;vertical-align:-12px;margin-right:8px}
.footer{margin-top:auto;padding-top:40px;font-size:20px;color:var(--muted);letter-spacing:2px;
  display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:24px}
</style>
</head>
<body>
<div class="card">
  <div class="content">
    <div class="kicker">{{栏目标签 · COLUMN}}</div>
    <h1 class="main-title">{{主标题}}</h1>
    <p class="dek">{{导语/摘要}}</p>
    <div class="hairline"></div>
    <p class="lead">{{首段正文（首字下沉）}}</p>
    <div class="pullquote">{{金句引文 Pull Quote}}</div>
    <p class="lead">{{第二段正文}}</p>
    <div class="footer"><span>静心知识库</span><span>@圣为Ai设计</span></div>
  </div>
</div>
</body>
</html>
```

---

## 3. 瑞士网格 Swiss Grid

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 瑞士网格</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Sans+SC:wght@300;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap">
<style>
:root{
  --ink:#0A0A0A; --accent:#C8202A; --paper:#FFFFFF; --panel:#F5F5F5; --line:#E0E0E0; --muted:#999;
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#dadada;padding:40px 16px;
  font-family:"Noto Sans SC",sans-serif;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--paper);
  position:relative;overflow:hidden;padding:80px 72px;color:var(--ink);
  box-shadow:0 8px 40px rgba(0,0,0,.12)}
.content{height:100%;display:flex;flex-direction:column}
.topbar{display:flex;justify-content:space-between;font-family:"JetBrains Mono",monospace;
  font-size:14px;letter-spacing:1px;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:16px}
.main-title{font-size:72px;font-weight:900;line-height:1.05;letter-spacing:-1px;margin:40px 0}
.step{display:grid;grid-template-columns:120px 1fr;gap:28px;align-items:start;margin-top:40px;
  border-top:1px solid var(--line);padding-top:32px}
.step-no{font-family:"JetBrains Mono",monospace;font-size:88px;font-weight:700;color:var(--accent);line-height:1}
.step-body h3{font-size:32px;font-weight:700;margin-bottom:12px}
.step-body p{font-size:22px;line-height:1.8;color:#333;max-width:32em}
.conclusion{margin-top:auto;background:var(--accent);color:#fff;padding:24px 32px;
  font-size:28px;font-weight:700;letter-spacing:1px}
.footer{margin-top:24px;font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--muted);letter-spacing:1px}
</style>
</head>
<body>
<div class="card">
  <div class="content">
    <div class="topbar"><span>{{分类标签}}</span><span>{{日期 / 编号}}</span></div>
    <h1 class="main-title">{{主标题}}</h1>
    <div class="step">
      <div class="step-no">01</div>
      <div class="step-body"><h3>{{阶段一标题}}</h3><p>{{阶段一说明}}</p></div>
    </div>
    <div class="step">
      <div class="step-no">02</div>
      <div class="step-body"><h3>{{阶段二标题}}</h3><p>{{阶段二说明}}</p></div>
    </div>
    <div class="step">
      <div class="step-no">03</div>
      <div class="step-body"><h3>{{阶段三标题}}</h3><p>{{阶段三说明}}</p></div>
    </div>
    <div class="conclusion">{{结论条：核心观点}}</div>
    <div class="footer">静心知识库 · @圣为Ai设计</div>
  </div>
</div>
</body>
</html>
```

---

## 4. 朱砂商务 Crimson Business

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 朱砂商务</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Sans+SC:wght@300;400;500;700;800&display=swap">
<style>
:root{
  --red:#C8202A; --red-deep:#8A1F24; --red-bright:#D43A3A; --ink:#1a1a1a; --paper:#FFFFFF; --muted:#9a9a9a;
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#d8d8d8;padding:40px 16px;
  font-family:"Noto Sans SC",sans-serif;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--paper);
  position:relative;overflow:hidden;padding:88px 76px 0;color:var(--ink);
  border-left:12px solid var(--red);box-shadow:0 8px 40px rgba(0,0,0,.12)}
.pageno{position:absolute;right:24px;top:40px;font-size:200px;font-weight:900;
  color:rgba(200,32,42,.06);line-height:1;z-index:0}
.content{position:relative;z-index:1;height:100%;display:flex;flex-direction:column}
.kicker{font-size:18px;letter-spacing:4px;color:var(--red);font-weight:700;margin-bottom:20px}
.main-title{font-size:76px;font-weight:800;line-height:1.2;letter-spacing:1px;margin-bottom:28px}
.subtitle{font-size:26px;font-weight:300;color:#555;line-height:1.7;max-width:30em;margin-bottom:40px}
.feature{display:flex;gap:16px;align-items:flex-start;margin-top:28px}
.feature .bar{width:6px;background:var(--red);align-self:stretch;border-radius:3px}
.feature h3{font-size:30px;font-weight:700;margin-bottom:8px}
.feature p{font-size:22px;line-height:1.8;color:#444;max-width:30em}
.hl{color:var(--red-bright);font-weight:700}
.footer{margin-top:auto;background:linear-gradient(180deg,var(--red),var(--red-deep));
  color:#fff;padding:28px 76px;margin:0 -76px;font-size:20px;letter-spacing:2px;
  display:flex;justify-content:space-between}
</style>
</head>
<body>
<div class="card">
  <div class="pageno">01</div>
  <div class="content">
    <div class="kicker">{{课程 / 产品标签}}</div>
    <h1 class="main-title">{{主标题}}</h1>
    <p class="subtitle">{{副标题 / 一句话价值}}</p>
    <div class="feature"><div class="bar"></div><div>
      <h3>{{卖点一}}</h3><p>{{卖点一说明，<span class="hl">关键词高亮</span>}}</p></div></div>
    <div class="feature"><div class="bar"></div><div>
      <h3>{{卖点二}}</h3><p>{{卖点二说明}}</p></div></div>
    <div class="footer"><span>静心知识库</span><span>@圣为Ai设计</span></div>
  </div>
</div>
</body>
</html>
```

---

## 5. 暗色鎏金 Dark Gold

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 暗色鎏金</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap">
<style>
:root{
  --ink:#0D0D0D; --gold:#C9A962; --gold-bright:#E0C88A; --text:#E8E0D0; --gold-line:rgba(201,169,98,.25);
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#000;padding:40px 16px;
  font-family:"Noto Serif SC","Songti SC",serif;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--ink);
  position:relative;overflow:hidden;padding:96px 80px;color:var(--text);
  box-shadow:0 8px 50px rgba(0,0,0,.6)}
.frame{position:absolute;inset:28px;border:1px solid var(--gold-line);pointer-events:none}
.content{position:relative;z-index:1;height:100%;display:flex;flex-direction:column}
.kicker{font-size:20px;letter-spacing:6px;color:var(--gold);text-align:center;margin-bottom:32px}
.main-title{font-size:80px;font-weight:900;line-height:1.25;text-align:center;letter-spacing:4px;
  background:linear-gradient(180deg,var(--gold-bright),var(--gold));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.diamond{width:10px;height:10px;background:var(--gold);transform:rotate(45deg);margin:40px auto}
.quote{font-size:38px;line-height:1.9;text-align:center;color:var(--text);max-width:24em;margin:0 auto;letter-spacing:2px}
.golden{margin-top:auto;text-align:center;font-size:42px;line-height:1.8;font-weight:600;
  background:linear-gradient(180deg,var(--gold-bright),var(--gold));
  -webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:3px}
.footer{margin-top:36px;text-align:center;font-size:20px;color:var(--gold);letter-spacing:3px;opacity:.8}
.seal{position:absolute;top:56px;right:56px;width:52px;height:52px;border:2px solid var(--gold);
  border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--gold);
  font-size:20px;font-weight:700;writing-mode:vertical-rl;z-index:2}
</style>
</head>
<body>
<div class="card">
  <div class="frame"></div>
  <div class="seal">{{印字}}</div>
  <div class="content">
    <div class="kicker">{{系列标签}}</div>
    <h1 class="main-title">{{主标题}}</h1>
    <div class="diamond"></div>
    <div class="quote">{{中心金句}}</div>
    <div class="golden">{{收尾金句}}</div>
    <div class="footer">静心知识库 · @圣为Ai设计</div>
  </div>
</div>
</body>
</html>
```

---

## 6. 草木绿东方极简 Sage Oriental

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{主题}} · 草木绿</title>
<link rel="stylesheet" href="https://miaoda.feishu.cn/fonts/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap">
<style>
:root{
  --sage:#7D855A; --sage-deep:#5A6340; --paper:#EAEAE2; --paper-card:#F2F0E8;
  --charcoal:#2A2A28; --charcoal-soft:#4a4a46; --muted:#9a958a; --line:#D5D0C8;
}
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;justify-content:center;background:#d8d4c8;padding:40px 16px;
  font-family:"Noto Serif SC","Songti SC",serif;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1}
.card{width:900px;max-width:100%;aspect-ratio:9/16;background:var(--paper);
  position:relative;overflow:hidden;color:var(--charcoal);box-shadow:0 8px 40px rgba(0,0,0,.1)}
.sage-block{position:absolute;left:0;top:0;bottom:0;width:33%;background:var(--sage-deep);z-index:1}
.sage-block .watermark{position:absolute;bottom:40px;left:20px;font-size:140px;font-weight:900;
  color:rgba(255,255,255,.06);line-height:1;writing-mode:vertical-rl}
.meta{position:absolute;font-family:"Noto Sans SC",sans-serif;font-size:11px;
  letter-spacing:.15em;text-transform:uppercase;color:var(--muted);z-index:3}
.meta-tl{top:28px;left:40px}.meta-tr{top:28px;right:40px}
.meta-bl{bottom:28px;left:40px}.meta-br{bottom:28px;right:40px}
.content{position:relative;z-index:2;margin-left:33%;padding:90px 60px 80px;
  height:100%;display:flex;flex-direction:column}
.series-tag{display:inline-block;font-family:"Noto Sans SC",sans-serif;font-size:13px;
  letter-spacing:3px;color:var(--sage);align-self:flex-start;margin-bottom:30px}
.series-tag::before{content:"「";color:var(--sage)}.series-tag::after{content:"」";color:var(--sage)}
h1{font-size:80px;font-weight:900;color:var(--charcoal);line-height:1.1;letter-spacing:4px;margin-bottom:20px}
.subtitle{font-size:18px;color:var(--charcoal-soft);line-height:1.7;margin-bottom:40px;
  font-family:"Noto Sans SC",sans-serif;font-weight:300}
.hairline{width:40px;height:1px;background:var(--sage);margin:0 0 36px}
.section{margin-bottom:36px}
.section-label{font-family:"Noto Sans SC",sans-serif;font-size:12px;letter-spacing:3px;
  color:var(--sage);text-transform:uppercase;margin-bottom:10px}
.section p{font-size:20px;line-height:2;color:var(--charcoal-soft);letter-spacing:1px;max-width:30em}
.circle{width:120px;height:120px;border-radius:50%;border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;margin:20px 0;position:relative}
.circle::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:1px solid var(--line);opacity:.4}
.circle span{font-size:28px;color:var(--sage);font-weight:700}
.closing{margin-top:auto;padding-top:40px;font-size:26px;color:var(--charcoal);letter-spacing:3px;line-height:1.8;font-weight:600}
.footer{margin-top:24px;font-family:"Noto Sans SC",sans-serif;font-size:12px;color:var(--muted);letter-spacing:2px}
</style>
</head>
<body>
<div class="card">
  <div class="sage-block"><div class="watermark">{{水印字}}</div></div>
  <div class="meta meta-tl">{{编号}}</div>
  <div class="meta meta-tr">{{期次}}</div>
  <div class="meta meta-bl">静心知识库</div>
  <div class="meta meta-br">@圣为Ai设计</div>
  <div class="content">
    <div class="series-tag">{{系列名}}</div>
    <h1>{{主标题}}</h1>
    <p class="subtitle">{{副标题/一句话}}</p>
    <div class="hairline"></div>
    <div class="section"><div class="section-label">{{小节标签一}}</div><p>{{小节正文一}}</p></div>
    <div class="section"><div class="section-label">{{小节标签二}}</div><p>{{小节正文二}}</p></div>
    <div class="circle"><span>{{圆心字}}</span></div>
    <div class="closing">{{收尾金句}}</div>
    <div class="footer">静心知识库 · @圣为Ai设计</div>
  </div>
</div>
</body>
</html>
```
