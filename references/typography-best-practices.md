# GitHub 开源排版项目整合 · 最佳实践

> v2.0 的"排版质量基线"不是凭空制定的，而是吸收了一批 GitHub 热门开源排版项目的成熟经验。
> 本文逐项目列出**吸收点 + 可落地的 CSS/JS 片段**，供生成卡片时直接复用。
> 检索时间：2026-10-29，star 数为检索时近似值。

---

## 项目清单（按 star 排序，与排版相关）

| 项目 | Star | 我们吸收的核心 |
|------|------|----------------|
| doocs/md | 13.4k | 公众号编辑器的主题化、格式归一化思路 |
| ubuwaits/beautiful-web-type | 7.3k | 最佳开源字体选型（衬线/无衬线搭配） |
| tailwindlabs/tailwindcss-typography | 6.5k | `prose` 垂直韵律、行长控制、间距比例 |
| sivan/heti（赫蹏） | 6.7k | 中文混排、标点挤压、贴合网格、古文样式 |
| ethantw/Han（漢字標準格式） | 2.5k | 竖排、着重号、边注、标点处理 |
| KyleAMathews/typography.js | 3.9k | 模块化字号比例、垂直韵律基线 |
| isjiamu/gzh-design-skill | 4.2k | 约束优于自由、克制用色、内联适配、双关卡校验 |
| matejlatin/Gutenberg | 2.8k | 文字渲染质感、响应式字号、font-feature |
| mdnice/markdown-nice | 4.7k | 主题设计、Markdown→富文本 |
| lyricat/wechat-format | 4.6k | Markdown→微信特制 HTML |

---

## 1. sivan/heti · 赫蹏（中文排版增强）

**项目定位**：专为中文内容展示设计的排版样式增强，基于通行中文排版规范。

**吸收点**：
- 中西文混排美化（auto-spacing）
- 全角标点挤压（punctuation compression）
- 贴合网格的排版（grid-aligned）
- 预置古文 / 诗词样式、自适应黑暗模式

**可落地片段**：
```css
/* 中西文混排：CJK 与拉丁字母/数字间自动留白（CSS Text 4） */
.entry{ text-autospace: normal; text-spacing-trim: space-first; }

/* 静态卡无 JS 时的降级：用半角空格或 word-spacing 手动控制 */
.mixed{ word-spacing: .05em; }
```
```html
<!-- 增强脚本（浏览器单文件模式可用；公众号内嵌模式禁用 JS，改手动加空格） -->
<script src="//unpkg.com/heti/umd/heti-addon.min.js"></script>
<script> new Heti('.heti').autoSpacing(); </script>
```
> 原则：生成静态卡片时，CJK 与英文/数字之间**手动插入 1/4 字空格**，不依赖运行时脚本。

---

## 2. ethantw/Han · 漢字標準格式

**项目定位**：集语义样式标准化、文字设计、高阶排版功能的 CJK 网页排版框架，支持繁/简/日。

**吸收点**：
- 竖排（`writing-mode: vertical-rl`）→ 宋韵禅意 / 暗色鎏金的引文、印章、水印
- 着重号（`text-emphasis`）→ 禅意金句强调
- 边注 / 旁注（marginal notes）→ 古籍/批注式排版
- 标点处理、标音

**可落地片段**：
```css
/* 竖排引文/水印 */
.vertical{ writing-mode: vertical-rl; text-orientation: upright; }

/* 着重号（中文强调，比加粗更雅致） */
.emphasis{ text-emphasis: dot; text-emphasis-position: under; }

/* 旁注 */
.annotation{ font-size:.7em; color:var(--muted); vertical-align: super; }
```

---

## 3. KyleAMathews/typography.js · 模块化字号比例

**项目定位**：用模块化比例（modular scale）和垂直韵律构建美观排版的 toolkit。

**吸收点 → 排版质量基线 A**：
- 字号按**比率递增**（常用 1.25 major third / 1.333 perfect fourth）
- 定义一套 base + ratio，标题层级自动推导

**可落地片段**：
```css
:root{
  --base-size: 18px;
  --ratio: 1.333;            /* perfect fourth */
  --fs-body: var(--base-size);          /* 18 */
  --fs-h3: calc(var(--base-size) * var(--ratio));        /* ~24 */
  --fs-h2: calc(var(--fs-h3) * var(--ratio));            /* ~32 */
  --fs-h1: calc(var(--fs-h2) * var(--ratio));            /* ~43 */
  --fs-display: calc(var(--fs-h1) * var(--ratio));        /* ~57 */
}
```

---

## 4. matejlatin/Gutenberg · Web Typography 起步套件

**项目定位**：开箱即用的网页排版 starter kit，设定合理的默认排版基线。

**吸收点 → 排版质量基线 E**：
- 文字渲染质感：`text-rendering: optimizeLegibility`
- 字距特性：`font-feature-settings`
- 响应式字号（按视口微调）

**可落地片段**：
```css
html{ text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
body{
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  font-kerning: normal;
}
/* 中文两端对齐（卡片正文可用） */
.justify{ text-align: justify; text-justify: inter-ideograph; }
```

---

## 5. tailwindlabs/tailwindcss-typography · prose 原则

**项目定位**：为"你控制不了的 HTML"提供漂亮的排版默认（`prose` 类）。

**吸收点 → 排版质量基线 B/C**：
- **垂直韵律**：所有间距为统一基线的倍数
- **行长控制**：正文 `max-width: 65ch`（约 32em），单行 30–40 汉字
- **一致的间距比例**与链接/标题样式系统

**可落地片段**：
```css
.reading{ max-width: 32em; line-height: 1.9; }
/* 8px 基线网格：所有 margin/padding 取 8 的倍数 */
.flow > * + *{ margin-top: 24px; }   /* 相邻块统一间距 */
.flow-lg > * + *{ margin-top: 48px; }
```

---

## 6. isjiamu/gzh-design-skill · 约束与校验

**项目定位**：把 Markdown 一键排成可粘贴进公众号的精致 HTML，6 套主题 + 双关卡校验。

**吸收点 → 排版质量基线 F + 公众号内嵌模式 + 校验脚本**：
- **约束优于自由**：预设设计系统（我们的 6 套）保住输出下限，不让模型每次现场发挥
- **克制用色**：主色只在锚点出现（≤5 处），约 90% 文字交给中性灰阶，一段高亮 ≤2
- **灰阶承重**：色彩不承担正文阅读
- **确定性下沉脚本**：平台限制交给校验脚本，不靠模型记忆
- **公众号限制**：禁 `<style>/<script>/<div class>/grid/position/外部字体/CSS变量`，样式全内联，文字 `<span>` 包裹

**可落地片段（公众号内嵌模式）**：
```html
<!-- 错误：公众号会过滤 -->
<style>.x{color:red}</style><div class="x">文字</div>

<!-- 正确：全内联 + span 包裹 -->
<span style="display:block;color:#C8202A;font-size:28px;font-weight:700;">文字</span>
```

---

## 7. doocs/md · mdnice · wechat-format（公众号编辑器思路）

**项目定位**：高度简洁的微信 Markdown 编辑器 / 支持主题设计的 Markdown 编辑器 / Markdown→微信 HTML 转换。

**吸收点**：
- 主题化样式（预设多套主题，用户切换而非从零设计）
- 复制即得富文本（inline style 确保粘贴不掉）
- 格式归一化（docx/pdf/纯文本 → 统一 Markdown 再排）

---

## 8. ubuwaits/beautiful-web-type（字体选型）

**吸收点 → 字体搭配原则**：
- 衬线标题（Playfair Display / Noto Serif SC）配无衬线正文，制造张力
- 数字用等宽（JetBrains Mono）提升数据感（瑞士网格序号）
- 通过 CDN 引入，避免本地字体依赖

---

## 整合速查：生成任意卡片时的强制清单

1. `:root` 集中配色变量，**禁止跨系统混色**
2. 字号走模块化比例（基线 18px，ratio 1.25–1.333）
3. 行高正文 1.8–2.0，标题 1.1–1.3；间距取 8 倍数
4. 阅读块 `max-width: 32em`
5. CJK 与英文/数字间加 1/4 字空格，正文统一全角标点
6. 全局 `text-rendering: optimizeLegibility; font-feature-settings: "kern" 1`
7. 主色只做锚点（印章/序号/关键词），全文 ≤5 处；其余灰阶
8. 落款统一 `静心知识库 · @圣为Ai设计`，无 AI 水印
9. 公众号场景 → 全内联 + span 包裹 + 跑 `validate_card.py --wechat`
