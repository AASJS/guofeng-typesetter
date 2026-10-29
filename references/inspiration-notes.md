# 灵感库 · 使用指南与设计语言提炼

> 高级质感的来源不是凭空想象，而是从获奖站、时尚杂志、高端品牌、2026 字体趋势等公开来源中提炼可复用的设计语言。
> **本文件是人类可读的指南与设计语言提炼；机器可读的结构化数据在 `inspiration.json`，新增灵感优先写进 JSON。**

---

## 一、灵感从哪来（已沉淀的来源）

| 来源 id | 贡献的设计语言 |
|---------|----------------|
| `awwwards-2026` | 2026 趋势：排版即主角、电影感英雄区、自然提炼色、噪点+色度混搭 |
| `award-ref` | 获奖站八大原型（极简/编辑/静奢）的字体、配色、网格、间距与可复用 CSS |
| `luxury-andor` | 静奢趋势：bold yet understated 衬线、大地色/摩卡慕斯/香槟金、数字触感纹理 |
| `fashion-mags` | 时尚杂志密码：Vogue=Didot 高对比、BAZAAR=Bodoni 戏剧感、Elle=Futura 都市感 |
| `bigbigwork-2026` | 2026 八大字体趋势：曲线衬线、新颖斜体、安静无衬线、文字图形化等 |
| `purplehill-2025` | 当红字体清单：Neue Montreal / Canela / Söhne / Inter 等 |

> 完整条目（16 条）见 `inspiration.json` 的 `entries[]`，或在 Studio 点「灵感库」浏览。

---

## 二、怎么用（Studio 内）

1. 顶部栏点 **「灵感库」** → 弹出浮层。
2. 顶部**分类筛选**（trend / brand / magazine / typography / archetype）一键过滤。
3. 每张卡片展示：设计语言、配色色板（bg/ink/accent 三色块）、推荐字体、标签。
4. 点 **「复制 CSS 片段」** 即可把可复用片段贴进卡片或主题，直接复用获奖站/杂志的版式密码。

---

## 三、怎么更新（灵感能更新）

改完都跑一次 `node scripts/sync_inspiration.js` 同步进引擎。

| 方式 | 命令 |
|------|------|
| 追加灵感（免手改 JSON） | `node scripts/update_inspiration.js add-entry --json '{...}'`（或 `--file ./x.json`） |
| 追加来源 | `node scripts/update_inspiration.js add-source --title "..." --url "..." --tags "..."` |
| 直接编辑 JSON | 打开 `references/inspiration.json` 手写条目 |
| 查看统计 | `node scripts/update_inspiration.js list` |

脚本会自动生成 id、写 `fetchedAt/updated` 为当天、重排计数。

---

## 四、Awwwards / 时尚杂志 / 高端品牌 · 版式密码（通用原则）

- **衬线复兴**：大标题用 Playfair Display / Didot / Bodoni，正文用无衬线，形成张力（Vogue/BAZAAR 同款逻辑）。
- **留白即奢侈**：高端感来自留白，而非填满；内容块间距 48–64px，宏观留白 120–200px+。
- **单一强调色**：全篇一个品牌色，只在锚点出现（印章/序号/关键词），主色 ≤5 处。
- **超大字号对比**：标题 80–160px，与 18–20px 正文形成戏剧化层级。
- **微噪点纹理**：宣纸/纸张质感用 `repeating-linear-gradient` 微噪点模拟，不依赖图片。
- **静奢定制衬线**：字脚锐利、字形修长的高对比衬线（Didot/Bodoni/GT Sectra）+ 极精致元信息无衬线，于克制中显贵气。
- **60-30-10 配色**：60% 中性基底 + 30% 次级（文字/边框）+ 10% 强调色；强调色因稀有而有效。
- **东方美学构图**：马一角/夏半边（主体偏置、大面积留白）、竖排呼吸（引文/水印/印章 `writing-mode: vertical-rl`）、金线画框、出水芙蓉（水墨圆框/出格大图）。

---

## 五、可复用 CSS 片段（精选）

> 更多实时片段见 `inspiration.json` 各条目的 `cssSnippet` 字段（Studio 内可一键复制）。

### 1. 不对称双栏（东方极简）
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
