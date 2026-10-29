# CHANGELOG · Guofeng Typesetter 国风高档图文排版设计器

> 语义化版本：`MAJOR.MINOR.PATCH`
> - `MAJOR` 架构级重构 / 不兼容变更
> - `MINOR` 新增能力（新风格、新布局、新工具）
> - `PATCH` 修复 / 文案 / 文档

---

## [3.3.0] - 2026-10-29

### Added
- **灵感库（Inspiration Library）**：联网抓取 Awwwards 2026 趋势、时尚杂志排版（Vogue/BAZAAR/Elle）、高端品牌静奢趋势、2026 字体趋势等公开来源，沉淀为结构化、可更新的灵感库。
- **`references/inspiration.json`**：灵感库唯一数据源，含 6 个来源 + 16 条灵感条目（设计语言 / 配色色板 / 推荐字体 / 可复用 CSS 片段 / 适用布局 / 标签），并带来源 URL 与抓取时间。
- **`scripts/sync_inspiration.js`**：把 `inspiration.json` 同步进引擎 `INSPIRATIONS` 块（与 `sync_themes.js` 同架构），离线 Studio 也能浏览灵感。
- **`scripts/update_inspiration.js`**：命令行追加灵感/来源（`add-entry` / `add-source` / `list`），自动生成 id、更新时间戳与计数——实现「灵感能更新、可增量」。
- **Studio「灵感库」面板**：顶部栏新增「灵感库」按钮，弹出浮层，支持分类筛选、卡片式浏览（色板/字体/标签）、一键复制 CSS 片段，灵感即取即用。
- 引擎暴露 `GuofengCard.inspirations`（同 `GuofengCard.INSPIRATIONS`）。

### Changed
- SKILL.md：新增「九、灵感库」专章（数据源 / Studio 用法 / 更新流程 / 字段规范 / 目录），文件结构补充 `inspiration.json` 与两个脚本。
- `references/inspiration-notes.md`：重构为人类可读的灵感库使用指南 + 设计语言提炼，明确以 `inspiration.json` 为机器可读数据源。
- README.md / 引擎注释：版本同步至 v3.3.0，补充灵感库特性与文件结构。

---

## [3.2.0] - 2026-10-29

### Added
- **poster 招募海报布局**（第 6 个通用布局模板）：9:16 竖版社群/课程招募海报，设计语言来自「道术双群」实战并已泛化——大字主标题（`<br>` 换行 + `<em>` 高亮）+ 印章、壹/贰/叁 日课、可选路径条（空格分隔自动加箭头）、CTA 色块 + 二维码（支持 url/base64，无码时显示占位框）、背景水印字、裱框细线 + 纸纹。配色全主题驱动（`--cta-bg/--cta-text/--gold-line` 等 CSS 变量）。
- **两套 poster 主题**：`poster_dao`（宋韵禅意·招募海报，墨绿 CTA）与 `poster_shu`（朱砂·招募海报，朱砂渐变 CTA + 路径条），sample 即道术双群实战文案，直接改字段即可生成同类海报。
- 引擎 `GuofengCard.buildCard('poster_dao'|'poster_shu', data, {ratio:'9:16'})` 直接可用；studio 表单自动出现 12 个海报字段。

### Fixed
- poster 路径条箭头改用 class 选择器（`.poster-path .ar`）而非内联 `style="color:var(--gold)"`——内联转换器不解析元素已有 style 中的 `var()`，原写法会导致 `var(--` 泄漏、公众号校验报错。
- 印章定位从卡片级移入 `.poster-hero`，还原实战稿中「印章贴标题右下」的版式。

### Changed
- SKILL.md：设计系统表新增「招募海报 Poster」行、决策树新增招募海报分支、布局说明同步。
- README.md：设计系统一览与快速开始补充 poster。

---

## [3.1.0] - 2026-10-29

### Added
- **CHANGELOG.md**：建立版本化更新日志（本文件）。
- **实战产出示例** `examples/`：收录「道术双群」系列 9:16 海报（道·宋韵禅意 / 术·朱砂版）及共修群二维码，作为 skill 可直接复用的产出样例。
- **竖版招募海报范式**：在 `references/layout-patterns.md` 沉淀「9:16 竖屏海报」设计要点（视觉主角、壹贰叁日课、CTA 色块 + 二维码、裱框 / 水印 / 纸纹三件套），后续可泛化为布局模板。

### Changed
- SKILL.md 版本号与标题同步至 v3.1。

---

## [3.0.0] - 2026-10-29

### Added
- **数据 + 模板架构**：`references/themes.json` 成为唯一可编辑数据源（配色 / 字体 / 装饰 / 字段 / 示例全部配置化）。
- **5 个通用布局模板**：`single` / `editorial` / `grid` / `asymmetric` / `business`，由 `theme.layout` 路由，替代原先 6 套硬编码 HTML 骨架。
- **同步脚本** `scripts/sync_themes.js`：把 `themes.json` 注入引擎 `DATA` 块，保证 JSON 为单一数据源，离线可用。
- **新风格零代码接入**：新增风格只需在 `themes.json` 加一条（复用现有布局），无需改写 HTML（已验证注入「侘寂」风格可正常出图）。

### Changed
- 引擎 `guofeng-card-engine.js` 重构为「主题令牌注入 + 模板路由」，去掉固定全局 ID，支持多次挂载互不污染。

---

## [2.1.0] - 2026-10-29

### Added
- **可挂载引擎** `guofeng-card-engine.js`：把 studio 抽成纯逻辑 + UI 模块，暴露 `buildCard / inlineStyles / validate / mount` API，可 `<script>` 引入或 `import`。
- **多 Tab 工作站接入 demo** `workstation-integration.html`：照「排版 / 配色 / 标题生成与AB测试 / 历史数据看板」Tab 结构搭建，演示双挂载。
- **接入文档**：SKILL.md 增加「接入多 Tab 工作站」两段式代码（引入 + `GuofengCard.mount(container, opts)`）。

### Fixed
- **修复公众号校验误判**：移除对 `position:absolute` 的禁用（微信已发布文章支持该属性，4 套装饰卡靠它定位印章 / 水印 / 色块 / 边框），保留对 `position:fixed` 的禁用。6 套风格公众号内联模式现全部 0 错误。
- 修复 `inlineStyles` 对 `var(--a, var(--b))` 兜底写法的解析（改用递归解析器）。
- 修复杂志 / 商务布局页脚漏接 `o.sign` 导致落款丢失、校验误报。

---

## [2.0.0] - 2026-10-29

### Added
- **单文件排版模块** `guofeng-card-studio.html`：6 套设计系统落地为可运行代码，动态表单（按风格变换字段）、实时预览、画幅切换（9:16 / 3:4 / 1:1 / 2.35:1）、落款、下载 / 复制。
- **公众号内嵌模式**：`inlineStyles()` 把 `<style>` + class 转全内联 HTML（解析 CSS 变量、grid→flex 降级），可直接粘进公众号编辑器。
- **JS 版校验**：移植自 `validate_card.py`，实时显示通过 / 错误。

### Integrated（来源 GitHub 热门开源项目）
- `sivan/heti`（赫蹏）：中西文混排、全角标点挤压、贴合网格。
- `ethantw/Han`（漢字標準格式）：竖排、着重号、边注、标点处理。
- `KyleAMathews/typography.js`：模块化字号比例。
- `tailwindcss/typography`：`prose` 垂直韵律、`max-width: 65ch` 行长控制。
- `matejlatin/Gutenberg`：`text-rendering`、font-feature 文字渲染质感。
- `isjiamu/gzh-design-skill`：约束优于自由、克制用色、双关卡校验。
- `doocs/md`、`mdnice`、`wechat-format`：Markdown→微信内联 HTML。

---

## [1.0.0] - 2026-10-29

### Added
- 基于用户提供的 `Guofeng-Typesetter-完整包`，学习其 6 套设计系统（宋韵禅意 / 杂志编辑 / 瑞士网格 / 朱砂商务 / 暗色鎏金 / 草木绿）、决策树、配色规范、HTML 骨架与灵感来源。
- 生成 v1 工作流 SKILL.md + 6 套设计系统规范 + 灵感库 + 产物合规校验脚本 `validate_card.py`（普通模式 + 公众号模式）。
