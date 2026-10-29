# 灵感库 · 设计依据与可复用片段

> 高级质感的来源不是凭空想象，而是从获奖站、时尚杂志、东方美学资产中提炼可复用的设计语言。

---

## 一、灵感来源清单

| 来源 | 贡献的设计语言 |
|------|----------------|
| **赫蹏 heti**（sivan/heti） | 中文排版规范、中西文混排、标点挤压 |
| **归藏 guizang-social-card-skill** | Editorial + Swiss 双视觉系统 |
| **visual-note-card** | 杂志级信息卡 CSS 变量设计 |
| **Awwwards Typography Honors 2024-2025** | 衬线复兴趋势、获奖站排版节奏 |
| **草木帖 folio_sage（tosea.ai）** | 鼠尾草绿东方极简、四角元数据 |
| **慢宋香薰画册** | 马一角构图、水墨圆框、出格大图 |
| **Vogue / Harper's Bazaar** | Didot 衬线、时尚杂志版式密码 |
| **用户自有资产** | 宋韵禅意卡片模板、朱砂红课程卡片 |

---

## 二、可复用 CSS 片段（模块4 灵感库）

### 1. 不对称双栏
```css
.sage-block{position:absolute;left:0;top:0;bottom:0;width:33%;background:var(--sage-deep)}
.content{margin-left:33%;padding:90px 60px}
```

### 2. 巨型水印字
```css
.watermark{position:absolute;bottom:40px;left:20px;font-size:140px;font-weight:900;
  color:rgba(255,255,255,.06);line-height:1;writing-mode:vertical-rl}
```

### 3. 四角元数据
```css
.meta{position:absolute;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}
.meta-tl{top:28px;left:40px}.meta-tr{top:28px;right:40px}
.meta-bl{bottom:28px;left:40px}.meta-br{bottom:28px;right:40px}
```

### 4. 直角引号
```css
.quote-mark{font-family:"Playfair Display",serif;font-size:80px;color:var(--accent);line-height:.5}
```

### 5. 水墨圆框
```css
.circle{width:120px;height:120px;border-radius:50%;border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;position:relative}
.circle::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:1px solid var(--line);opacity:.4}
```

### 6. 朱砂印章
```css
.seal{position:absolute;width:56px;height:56px;border:2px solid var(--seal-bright);
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  writing-mode:vertical-rl;color:var(--seal-bright);opacity:.7}
```

---

## 三、Awwwards / 时尚杂志版式密码

- **衬线复兴**：大标题用 Playfair Display / Didot，正文用无衬线，形成张力。
- **留白即奢侈**：高端感来自留白，而非填满；内容块间距 48–64px。
- **单一强调色**：全篇一个品牌色，只在锚点出现（印章/序号/关键词）。
- **超大字号对比**：标题 80–160px，与 18–20px 正文形成戏剧化层级。
- **微噪点纹理**：宣纸/纸张质感用 `repeating-linear-gradient` 微噪点模拟，不依赖图片。

---

## 四、东方美学构图法则

- **马一角 / 夏半边**：主体偏置，大面积留白，不对称平衡。
- **竖排呼吸**：引文/水印/印章用 `writing-mode: vertical-rl`，制造时间感。
- **金线画框**：深色底用 1px 低透明度金线 `inset` 画框，克制而贵重。
- **出水芙蓉**：水墨圆框、出格大图，打破网格的有机感。
