# 六套设计系统 · 完整规范

> 本文件是 `SKILL.md` 的渐进式披露补充：生成时按需读取对应系统的配色 / 字体 / 装饰参数。
> 配色全部以 CSS 变量集中在 `:root`，**禁止跨系统混色**。

---

## 1. 宋韵禅意 Song Zen

| 角色 | 色值 | 用途 |
|------|------|------|
| 墨黑 `--ink` | `#222222` | 主文字 |
| 朱砂棕 `--seal` | `#8C4A38` | 印章、细线引文、章节标题 |
| 朱砂亮 `--seal-bright` | `#B8442C` | 印章描边、点睛 |
| 青墨绿 `--jade` | `#3A5A48` | 收尾金句、水印 |
| 泥金 `--gold` | `#C8B89E` | 竖线引文装饰、分隔 |
| 宣纸米白 `--paper` | `#F7F4EB` | 卡片底 |
| 分隔线 `--line` | `#DDD8CF` | 发丝分割 |

- **字体**：全宋体 `Noto Serif SC` / `Songti SC` / `SimSun`
- **标志元素**：朱砂印章（`writing-mode: vertical-rl`）、宣纸纹理（`repeating-linear-gradient` 微噪点）、左侧泥金竖线引文、竖排水印
- **适用**：佛学金句、文化哲思、禅意内容
- **装饰片段**：

```css
.seal{position:absolute;width:56px;height:56px;border:2px solid var(--seal-bright);
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  writing-mode:vertical-rl;color:var(--seal-bright);opacity:.7}
.quote{padding-left:24px;border-left:3px solid var(--gold);font-size:40px;
  line-height:1.8;letter-spacing:2px}
```

---

## 2. 杂志编辑 Editorial

| 角色 | 色值 | 用途 |
|------|------|------|
| 近黑 `--ink` | `#1a1a1a` | 正文 |
| 朱砂锚点 `--accent` | `#B8442C` | 首字、Pull Quote、页码 |
| 暖米白 `--paper` | `#FAF8F4` | 卡片底 |
| 面板灰 `--panel` | `#F0EDE6` | 引文块底 |
| 发丝线 `--line` | `#D5D0C8` | 分隔 |

- **字体**：标题 `Playfair Display`（衬线）+ 正文 `Noto Sans SC` / 系统无衬线
- **标志元素**：首字下沉（`::first-letter` float）、Pull Quote 双线、5 级字体层级、栏间发丝线
- **适用**：深度叙事、生活方式、阅读感悟

```css
.lead::first-letter{float:left;font-family:"Playfair Display",serif;font-size:84px;
  line-height:.8;padding:6px 12px 0 0;color:var(--accent)}
.pullquote{border-top:2px solid var(--accent);border-bottom:2px solid var(--accent);
  padding:24px 0;font-size:30px;line-height:1.6;font-style:italic}
```

---

## 3. 瑞士网格 Swiss Grid

| 角色 | 色值 | 用途 |
|------|------|------|
| 纯黑 `--ink` | `#0A0A0A` | 标题/正文 |
| 朱砂锚点 `--accent` | `#C8202A` | 数字序号、结论条、关键词 |
| 纯白 `--paper` | `#FFFFFF` | 卡片底 |
| 浅灰底 `--panel` | `#F5F5F5` | 区块底 |
| 分隔线 `--line` | `#E0E0E0` | 网格线 |

- **字体**：无衬线极粗标题（`Noto Sans SC` 900）+ 数字 `JetBrains Mono`
- **标志元素**：严格网格、超大数字序号（01/02/03）、直角无圆角、红底结论条、左对齐强制
- **适用**：干货方法论、数据观点、教程拆解

```css
.step-no{font-family:"JetBrains Mono",monospace;font-size:120px;font-weight:700;
  color:var(--accent);line-height:1}
.conclusion{background:var(--accent);color:#fff;padding:20px 28px;
  font-size:28px;font-weight:700}
```

---

## 4. 朱砂商务 Crimson Business

| 角色 | 色值 | 用途 |
|------|------|------|
| 朱砂红 `--red` | `#C8202A` | 封边、标题强调 |
| 深红 `--red-deep` | `#8A1F24` | footer 渐变 |
| 亮红 `--red-bright` | `#D43A3A` | 高亮关键词 |
| 标题黑 `--ink` | `#1a1a1a` | 正文 |
| 白卡 `--paper` | `#FFFFFF` | 卡片底 |

- **字体**：无衬线 800 标题（`Noto Sans SC`）+ 常规正文
- **标志元素**：红封边（顶部/左侧色条）、页码水印（超大半透明数字）、深红 footer 渐变、红色高亮关键词
- **适用**：课程营销、知识付费、商业方案

```css
.edge{border-left:10px solid var(--red)}
.pageno{position:absolute;font-size:200px;font-weight:900;color:rgba(200,32,42,.06)}
.footer{background:linear-gradient(180deg,var(--red),var(--red-deep));color:#fff}
.hl{color:var(--red-bright);font-weight:700}
```

---

## 5. 暗色鎏金 Dark Gold

| 角色 | 色值 | 用途 |
|------|------|------|
| 深墨黑 `--ink` | `#0D0D0D` | 卡片底 |
| 鎏金 `--gold` | `#C9A962` | 画框、分隔 |
| 亮金 `--gold-bright` | `#E0C88A` | 烫金标题 |
| 暖白文字 `--text` | `#E8E0D0` | 正文 |
| 金线 `--gold-line` | `rgba(201,169,98,.25)` | 画框线 |

- **字体**：全宋体 `Noto Serif SC`
- **标志元素**：金线画框（`inset` border）、烫金标题（`background-clip:text` 渐变金）、菱形分隔、朱砂印
- **适用**：高端品牌、年度总结、珍藏版金句

```css
.frame{position:absolute;inset:28px;border:1px solid var(--gold-line)}
.title{background:linear-gradient(180deg,var(--gold-bright),var(--gold));
  -webkit-background-clip:text;background-clip:text;color:transparent;font-weight:900}
.diamond{width:10px;height:10px;background:var(--gold);transform:rotate(45deg)}
```

---

## 6. 草木绿东方极简 Sage Oriental

| 角色 | 色值 | 用途 |
|------|------|------|
| 鼠尾草绿 `--sage` | `#7D855A` | 色块、标签、序号 |
| 深鼠尾草 `--sage-deep` | `#5A6340` | 左色块底、水印 |
| 暖米白 `--paper` | `#EAEAE2` | 卡片底 |
| 暖炭黑 `--ink` | `#2A2A28` | 正文 |
| 柔灰线 `--line` | `#D5D0C8` | 分隔 |

- **字体**：超大宋体 900 标题 + 细宋正文
- **标志元素**：不对称色块（左侧 33% 深绿）、四角元数据、直角引号、水墨圆框、竖排水印
- **适用**：东方美学品牌、中医养生、自然疗愈、产品画册

```css
.sage-block{position:absolute;left:0;top:0;bottom:0;width:33%;background:var(--sage-deep)}
.meta{position:absolute;font-family:"Noto Sans SC",sans-serif;font-size:11px;
  letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}
.circle{width:120px;height:120px;border-radius:50%;border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center}
```
