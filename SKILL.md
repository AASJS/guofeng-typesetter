---
name: guofeng-typesetter
description: "国风高档图文排版设计器 —— 输入一段文案，自动匹配最高级的版式系统，输出可直接浏览器打开的单文件 HTML 图文卡片。融合赫蹏(heti)、Han.css、typography.js、Gutenberg、tailwindcss-typography 等 GitHub 热门开源排版项目的最佳实践，以及 doocs/md、mdnice、gzh-design-skill 的公众号内联适配经验。适用于金句卡、干货卡、课程营销卡、禅意卡、中医/东方美学卡、杂志叙事卡。关键词：排版、图文卡片、国风、单文件HTML、公众号配图、金句卡、视觉设计、卡片生成"
version: "3.1.0"
author: "静心知识库 · @圣为Ai设计（整合 GitHub 开源排版项目）"
created: "2026-10-29"
updated: "2026-10-29"
---

# Guofeng Typesetter · 国风高档图文排版设计器 v3.1

> 输入一段文案，自动匹配最高级的版式系统，输出可直接浏览器打开的单文件 HTML 图文卡片。
> v2.0 在 v1.0 六套设计系统之上，**整合 GitHub 热门开源排版项目的最佳实践**，把"能看"升级为"专业级中文排版"。
> v3.0 进一步把 6 套骨架收敛为 **`数据(themes.json)` + `模板(5 个通用布局)`** 架构：新增风格只改 JSON，不动 HTML。

## 一、它解决什么问题

创作者产出内容后，需要高级感/时尚感的配图，但不会设计；现有模板固定，无法匹配不同文案气质（金句 vs 干货 vs 商业 vs 禅意）；且公众号等平台会过滤样式，粘贴即塌。

v2.0 的突破（均来自真实开源项目，见 `references/typography-best-practices.md`）：

| 能力 | 吸收自 | 效果 |
|------|--------|------|
| 自动匹配版式 | v1.0 决策树 | 按内容气质选系统，不靠模板 |
| 中文混排/标点挤压/竖排/着重号 | **sivan/heti**（6741⭐）、**ethantw/Han**（2527⭐） | 专业级中文排版质感 |
| 模块化字号/垂直韵律/行长控制 | **typography.js**（3857⭐）、**Gutenberg**（2847⭐）、**tailwindcss-typography**（6484⭐） | 版面有节奏、不杂乱 |
| 克制用色/灰阶承重 | **isjiamu/gzh-design-skill**（4187⭐） | 主色锚点、不花哨 |
| 跨平台不掉格式 | **doocs/md**（13476⭐）、**mdnice**（4676⭐）、**wechat-format**（4558⭐） | 公众号内嵌模式可粘贴 |

## 二、六套设计系统（决策树）

| 文案气质 | 系统 | 核心配色 | 标志元素 |
|----------|------|----------|----------|
| 佛学/禅/金句/修行/古人说 | **宋韵禅意 Song Zen** | 墨黑#222 朱砂棕#8C4A38 青墨绿#3A5A48 泥金#C8B89E 宣纸#F7F4EB | 朱砂印章、宣纸纹理、细金竖线引文、竖排 |
| 叙事/散文/生活方式/阅读感悟/长文 | **杂志编辑 Editorial** | 近黑#1a1a1a 锚点#B8442C 暖米#FAF8F4 发丝线#D5D0C8 | 首字下沉、Pull Quote、5级字体层级 |
| 方法论/干货/步骤/数据对比/清单 | **瑞士网格 Swiss Grid** | 纯黑#0A0A0A 锚点#C8202A 纯白#FFF 浅灰#F5F5F5 | 严格网格、超大数字序号、直角无圆角、红底结论条 |
| 课程/知识付费/产品/营销/带二维码 | **朱砂商务 Crimson Business** | 朱砂#C8202A 深红#8A1F24 亮红#D43A3A 白#FFF | 红封边、页码水印、深红footer渐变、红色高亮 |
| 高端品牌/年度总结/珍藏版金句 | **暗色鎏金 Dark Gold** | 深墨#0D0D0D 鎏金#C9A962 亮金#E0C88A 暖白#E8E0D0 | 金线画框、烫金标题、菱形分隔、朱砂印 |
| 自然/疗愈/中医/东方美学品牌/画册 | **草木绿东方极简 Sage Oriental** | 鼠尾草绿#7D855A 深绿#5A6340 暖米#EAEAE2 暖炭#2A2A28 | 不对称色块、四角元数据、直角引号、水墨圆框、竖排水印 |

**决策树**：

```
文案提到佛学/禅/金句/修行/古人说/偈语？
  ├─ 是 → 宋韵禅意（偏高端 → 升级暗色鎏金）
文案是方法论/干货/步骤/数据对比/清单？
  ├─ 是 → 瑞士网格
文案是课程/知识付费/产品/营销/带二维码？
  ├─ 是 → 朱砂商务
文案是叙事/散文/生活方式/阅读感悟/长文？
  ├─ 是 → 杂志编辑
文案是自然/疗愈/中医/东方美学品牌/画册？
  ├─ 是 → 草木绿东方极简
无法判断 → 默认宋韵禅意
```

> 用户指定风格时直接采用，覆盖默认判断。

## 三、排版质量基线（v2.0 核心：GitHub 最佳实践整合）

生成每一张卡片，强制遵守以下规范（完整 CSS 片段见 `references/typography-best-practices.md`）：

### A. 字号与层级（typography.js / Gutenberg）
- **模块化比例**：标题用 1.25–1.5 比率递增（如 80→100→128→160px）。
- 正文最小 18px；卡片主标题 80–100px；引文 36–44px。
- 每套系统定义清晰的 **5 级字体层级**：display / title / subtitle / body / meta。

### B. 垂直韵律（typography.js / tailwindcss-typography）
- 行高：中文正文 `1.8–2.0`，标题 `1.1–1.3`。
- 间距：所有 `margin/padding` 为 **8px 基线网格**整数倍（8/16/24/32/48/64）。
- 留白即设计：内容块之间用足够留白，而非分割线堆砌。

### C. 行长控制（tailwindcss-typography）
- 阅读类正文块限制宽度，单行 **30–40 个汉字**为宜（约 `32em` / `65ch`）。
- 卡片默认 900px 宽，内容区 padding 60–100px。

### D. 中文排版专业度（heti / Han.css）
- **中西文混排**：CJK 与拉丁字母/数字间加 1/4 字空格（用 `text-autospace: normal` 或 heti 脚本；静态卡用 `word-spacing` 或手动加）。
- **全角标点**：正文统一全角，段内不加多余空格；可用 `text-spacing-trim: space-first`。
- **竖排**：宋韵/暗色鎏金用 `writing-mode: vertical-rl` 处理引文/印章/水印。
- **着重号/边注**：禅意金句可用 CSS `text-emphasis` 着重；古籍可用旁注。

### E. 文字渲染质感（Gutenberg）
- 全局：`text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; font-feature-settings: "kern" 1, "liga" 1;`
- 中文段落可选 `text-align: justify; text-justify: inter-ideograph;`

### F. 克制用色（gzh-design-skill）
- **灰阶承重**：约 90% 文字交给中性灰阶（如 `#111→#999` 一套），色彩不承担正文阅读。
- **主色锚点**：主色（朱砂/鎏金/鼠尾草绿）只出现在锚点——印章、序号、关键分隔、高亮词，全文 **≤5 处**。
- **高亮克制**：一段内高亮 ≤2 处，用主色浅版或细下划线，不抢戏。

## 四、工作流

```
Step 1  接收文案
  └─ 通读内容，提取气质 / 信息密度 / 目标平台 / 情绪关键词

Step 2  匹配设计系统
  └─ 走决策树；用户指定风格则直接采用

Step 3  读取规范
  ├─ references/design-systems.md → 取配色 / 字体 / 装饰
  └─ references/layout-patterns.md → 取对应 HTML 骨架

Step 4  填充生成（遵守"排版质量基线"）
  ├─ 替换 {{占位符}}
  ├─ 按文案板块数增删内容块（保持留白比例）
  ├─ 嵌入 CSS 变量，应用模块化字号 / 垂直韵律 / 行长 / 混排 / 克制用色
  └─ 默认浏览器单文件模式（<style> + CSS 变量 + 装饰）

Step 5  输出交付
  ├─ 文件名：{主题关键词}-{风格名}.html
  ├─ 告知：用了哪套系统、为什么、路径
  └─ 提示可切换风格 / 调整配色 / 转公众号内嵌模式
```

## 五、输出规范

- **单文件 HTML**：默认所有 CSS 内联于 `<style>`，不依赖外部 JS。
- **字体**：CDN 引入 `Noto Serif SC` / `Noto Sans SC` / `Playfair Display` / `JetBrains Mono`。
- **画幅**：默认 900px 宽竖版 9:16；支持 `3:4`（小红书）、`1:1`（方图）、`2.35:1`（公众号横版封面）。
- **落款**：统一 `静心知识库 · @圣为Ai设计`，不加"AI生成"水印，不加 emoji 堆砌。
- **质量校验**：生成后必须跑 `scripts/validate_card.py <file>` 确认 0 ERROR。

## 六、公众号内嵌模式（doocs/md / mdnice / gzh-design 经验）

当用户要求"可直接粘进公众号编辑器"时，切换到**内联模式**：

- **所有样式内联**到每个元素 `style="..."`，不使用 `<style>`、`<script>`、`<div class>`、`display:grid`、`position:absolute/fixed`、`@media`、`@keyframes`、CSS 变量、外部字体。
- 文字节点用 `<span>` 包裹，规避公众号过滤。
- 装饰降级：复杂装饰（网格/绝对定位）降级为简单色块/边框/inline-flex。
- 跑 `scripts/validate_card.py --wechat <file>` 校验合规。

## 七、文件结构（v3.0 数据 + 模板 架构）

```
guofeng-typesetter/
├── SKILL.md                          # 本文件：工作流 + 决策树 + 排版质量基线
├── references/
│   ├── themes.json                   # 【唯一可编辑数据源】配色/字体/装饰/字段/示例，按风格罗列
│   ├── design-systems.md             # 6套系统完整配色/字体/装饰规范
│   ├── layout-patterns.md            # 5 个通用布局模板说明（由 themes.json 的 colors/decor 注入）
│   ├── typography-best-practices.md  # GitHub开源项目整合：heti/Han/typography.js/Gutenberg/tailwindcss-typography + 可复用CSS片段
│   └── inspiration-notes.md          # 灵感库（Awwwards/Editorial/草木帖/时尚杂志）
├── guofeng-card-engine.js            # 引擎：嵌入 THEMES 数据 + 5 个通用布局模板 + inlineStyles/validate/mount
├── guofeng-card-studio.html          # 独立单文件版（加载引擎并挂载）
├── workstation-integration.html      # 多 Tab 工作站接入示例
├── scripts/
│   ├── validate_card.py              # 产物合规校验（普通模式 + 公众号模式）
│   └── sync_themes.js                # 把 themes.json 同步进 guofeng-card-engine.js 的 DATA 块
└── assets/
    ├── 烂泥哲学-宋韵禅意.html          # 示例
    └── 君臣佐使-草木绿.html            # 示例
```

### v3.0 新增风格（侘寂/暗黑杂志等）= 填表
1. 在 `references/themes.json` 的 `themes` 下加一条：`{ "label", "layout"(single/editorial/grid/asymmetric/business), "bodyBg", "fonts", "fontTokens", "decor", "colors"(CSS 变量), "sample" }`。
2. 跑 `node scripts/sync_themes.js`，数据即同步进离线引擎。
3. 无需改动任何 HTML 模板；若现成 5 种布局都不够，再在引擎 `LAYOUTS` 加一个模板函数（仍由 themes 的 colors/decor 注入配色）。

## 八、验收标准（v3.0 增补）

- [ ] `references/themes.json` 是 6+ 套风格的单一数据源；改配色只动 JSON。
- [ ] `node scripts/sync_themes.js` 可把 JSON 同步进引擎 DATA 块且无语法错误。
- [ ] 新增一条 theme（如 wabi）后，无需改模板即可 `buildCard('wabi', sample)` 出图。
- [ ] 其余验收同 v2.0（匹配/落款/校验/公众号内联）。

## 八、验收标准

- [ ] 目录含 `SKILL.md` + `references/` 四份文件 + `scripts/` 校验脚本
- [ ] 丢入金句/干货/课程/禅意/中医五种文案，各自动匹配正确风格
- [ ] 指定风格时正确覆盖默认判断
- [ ] 生成的 HTML 单文件浏览器可直接打开，文字可辨、对比度达标
- [ ] 无跨系统混色；主色锚点 ≤5 处；遵守垂直韵律与行长
- [ ] 落款统一"静心知识库·@圣为Ai设计"，无 AI 水印
- [ ] `validate_card.py` 校验通过
- [ ] 公众号内嵌模式产物可被编辑器粘贴且不掉格式
