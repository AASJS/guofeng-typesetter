# CHANGELOG · Guofeng Typesetter 国风高档图文排版设计器

> 语义化版本：`MAJOR.MINOR.PATCH`
> - `MAJOR` 架构级重构 / 不兼容变更
> - `MINOR` 新增能力（新风格、新布局、新工具）
> - `PATCH` 修复 / 文案 / 文档

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
