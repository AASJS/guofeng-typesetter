# CHANGELOG · Guofeng Typesetter 国风高档图文排版设计器

> 语义化版本：`MAJOR.MINOR.PATCH`
> - `MAJOR` 架构级重构 / 不兼容变更
> - `MINOR` 新增能力（新风格、新布局、新工具）
> - `PATCH` 修复 / 文案 / 文档

---

## [3.10.0] - 2026-10-31

### Added
- **④ 正文排版强化（参考 [raphael-publish](https://github.com/liuxiaopai-ai/raphael-publish)）**
  - **标准 Markdown 全支持**：行内 `**粗**` / `*斜*` / `~~删~~` / `[链接](url)` / `` `code` ``（code 段占位符防二次解析）；块级无序/有序列表（`1.` 进有序列表，`1、`/`一、` 仍识别为小标题）、`|` 表格（thead/tbody 全内联样式）、``` 代码块（pre 白名单转义）、`---`/`***` 分隔线
  - **配图进正文**：`![说明](url)` 独立行单图居中 + 图注；连续多图自动并排 table 网格（微信 flex 不支持 → table 兼容方案）
  - **6 套风格预设**：跟随配色（联动②）/ 纯净白 / 燕麦 / 水墨（衬线+居中标题）/ 羊皮纸（衬线+米黄底）/ 杂志（衬线+深红强调）；chips 切换 + localStorage 持久化
  - **微信兼容引擎 `wpWechatCompat`**（复制时自动执行）：容器字体/字号/颜色/行距强制分发到 p/li/h*/blockquote/td（防微信编辑器劫持继承）；`li` 内 P/DIV/BLOCKQUOTE 降级为 span（防列表塌陷）；strong/em/a/code 后的中文标点挂入标签内 + `U+2060` 零宽连接符（防强调后标点被断行）；外链图片 fetch → Base64（失败保留 URL 不阻塞）
  - **魔法粘贴**：`lfText` / `aiSrc` 粘贴事件拦截——富文本 HTML 自动净化为 Markdown（自研 wpHtmlToMd，h1-h6/p/strong/em/del/a/img/ul/ol/嵌套列表/table/blockquote/pre 全规则，离线无依赖）；剪贴板图片文件直接转 Base64 插入；「📥 魔法粘贴」按钮主动读取剪贴板（自动落 ⑤ 全文或素材框）
  - **多端预览**：预览区 375 / 520 / 全宽三档宽度切换
- 调试/回归钩子 `window.WPTEST`（wpBuild / wpWechatCompat / wpHtmlToMd / isMdText 只读工具函数）

### Fixed
- 表格行缓冲被 `flushAll` 误清空（表头分隔行无法识别 → 表格永远无 thead）
- `1. xxx` 短行被「数字小标题」规则吞掉导致有序列表永不触发（现 `1.` 进列表、`1、` 才是小标题）

### Verified
- 无头回归 49 项全绿：wpBuild 全要素（h2/h3/strong/em/del/a/code/pre/quote/ul/ol/table/hr/图注/多图网格/转义/6 风格）✓、微信兼容（字体分发/li 降级/标点吸附 U+2060/section 保持）✓、HTML→MD（标题/行内/列表/表格/引文/图/代码）✓、UI 交互流（生成/预览/风格切换/宽度切换）✓、6 Tab + 390px 无横向溢出 ✓
- 单文件版（455KB）冒烟 6/6：WPTEST 挂载、wpBuild paper 风格、wpWechatCompat、wpHtmlToMd、6 Tab ✓

---

## [3.9.0] - 2026-10-31

### Added
- **④ 正文排版（AI 排版 · 发布 Tab 内）**：1000+ 字文章全文 → 公众号内联 HTML——行距 1.75 / 标题收紧字距 + 强调色竖线 / 引文与金句行转底色块 / 列表 / `**加粗**` 转强调色 strong / 段落两端对齐；全部内联样式（section/p/h2/h3/blockquote/ul/li/strong），公众号编辑器粘贴不掉格式
- 轻量标记解析：`##/###` 标题、`【】`、`一、`、短数字行识别为标题层级；`>` 与 `「…」` 独立行转引文块；`-/*` 转列表；空行分段
- 风格跟随「②配色」当前配色（强调色/底色块自动联动）；👁 预览（白底手机宽度）、📋 复制正文 HTML、生成结果进物料区（可「复制全部物料」一并带走）、localStorage 持久化
- fix: aiRender 物料守卫未计入 wpHtml，导致仅有正文排版时物料区不渲染

### Verified
- 无头回归全绿：h2/blockquote/strong/ul 内联样式 ✓、`**` 不残留、HTML 注入转义 ✓、预览切换 ✓、复制 ✓、空素材防护 ✓、持久化 ✓、前批功能 + 7 Tab 390px 保持 ✓

## [3.8.2] - 2026-10-31

### Added
- **灵感库「应用此灵感」按钮**：位于「复制 CSS 片段」上方——把该条灵感的色板（bg/ink/accent）与字体气质（衬线/无衬线判定）写入当前风格主题，预览即时生效；再次点击「↩ 还原配色」恢复原配色；切换应用另一条时自动替换并保留唯一还原点；挂载容器派发 `gc:insp-applied` 事件供外部联动。对 Studio 与工作站「国风卡片」Tab 同时生效

## [3.8.1] - 2026-10-31

### Changed
- **配图提示词按文案内容自适应风格**：本地兜底生成不再写死「宣纸水墨」，改为按全文主题自动识别 6+1 个视觉域（认知破局→水墨山水 / 长期主义→浅绛古意 / 内心治愈→禅意留白 / 职场事业→文人书斋 / 家庭养育→温暖工笔 / 方法干货→界画工整 / 通用国风兜底），特征词不足 2 次时退通用域
- **配色联动**：提示词融入当前配色色调词（朱砂→朱红点染 / 黛青→黛蓝青灰 / 赭石→赭褐暖调 / 黛绿 / 黛紫 / 胭脂）
- **逐卡意象差异化**：每卡意象按卡片文字重合度择优、按卡序轮转兜底，组内不重复
- **AI 协议升级**：提示词协议要求 AI 的封面/配图风格必须与主题匹配（不要默认全是山水）、逐卡意象差异化
- **AI 导入兜底**：AI 未返回 imgPrompt 的卡自动按文案风格本地补齐
- **物料刷新**：本地生成改为每次显式点击都刷新标题/摘要/封面（旧值覆盖为最新拆卡结果；AI 导入仍整体覆盖）

### Verified
- 无头回归：治愈文→禅意极简（茶/花影意象、无界画）✅；干货文→界画工整 ✅；切「黛青」配色→提示词含「黛蓝青灰」✅；意象组内不重复 ✅；AI 往返/导入/物料/持久化/7 Tab 390px 全保持 ✅

---

## [3.8.0] - 2026-10-31

### Added
- **AI 排版 · 发布（新 Tab）**：主 Tab 新增「AI 排版 · 发布」（外壳 7 Tab / 工作台内层 ⑥）。①复制预制 AI 提示词（含素材全文 + 严格 JSON 输出协议：article{title,digest,coverPrompt} + cards[]{points,golden,imgPrompt} + style.palette）→ 喂给任意 AI；②粘贴返回 JSON 自动导入 → 卡片草案同步到⑤逐卡载入排版；③发布物料区：文章标题 / 摘要 / 封面提示词 / 每卡配图提示词，全部一键复制（clipboard API + execCommand 兜底）。
- **本地兜底提示词**：无 AI 时基于⑤拆卡结果用模板直接生成封面/配图提示词。
- **灵感库联网更新（Agent 通路验证）**：新来源 cn-grid-2026，新增 4 条灵感（中文网格五法则 / 中文文字排印三件套 / 知识卡片九宫格深蓝金 / 解构轻量化+F 型动线），灵感库 16→20 条 / 7 来源。

## [3.7.0] - 2026-10-31

### Added
- **长文拆卡（新 Tab）**：主 Tab 新增「长文拆卡」（外壳 6 Tab / 工作台内层 ⑤）。粘贴公众号全文（1000+ 字）→ 自动拆成风格统一的卡片组：识别 `## 标题` /`【标题】`/`一、标题`/`1. 标题`/独立短行五种小标题写法，无小标题按空行段落每 2 段一卡；每卡取 3 条要点（在逗号处拆上下行）+ 1 条金句（优先「不是…而是 / 真正的 / 所谓 / 本质上」句式，自动避开已选要点）。单次上限 12 张。
- **逐卡微调**：卡片草案每张可编辑标题 / 3 要点 / 金句；「载入排版 ▶」把该卡填入 Tab1（02 上下分栏卡，沿用当前配色与尺寸），用现有导出链路出图。
- **批量导出**：一键导出自包含「长文拆卡」HTML 画册——全部卡片按序排列（01/0N 连号），每张卡带独立「下载 PNG」按钮（SVG foreignObject 2x 高清），也可整页打印存 PDF。
- **草稿持久化**：长文原文 + 拆分结果自动存 localStorage（gf_longform），刷新不丢。

## [3.6.0] - 2026-10-31

### Added
- **外壳语义令牌**：`style.css` 全部硬编码颜色抽取为 `--c-*` 语义令牌（bg / surface / elev / border / text / dim / faint / accent），工作台纸面色单独走 `--paper`（不随主题变）。改主题只动令牌定义，不碰具体规则。
- **外壳主题切换**：顶栏 🌗 按钮，三态循环「跟随系统 → 浅色 → 暗色」，持久化到 `localStorage`（gf_shell_theme）；auto 态经 `prefers-color-scheme` 自动适配。**只影响外壳层**——工作台 iframe 与国风卡片保持纸面色卡设计，不受主题影响。

## [3.5.0] - 2026-10-31

### Added
- **预览增量更新**：预览 iframe 首次全量构建（srcdoc）后，文本/配色/尺寸变化改为**原位 patch**（替换 `:root` 变量 + `.content` innerHTML + `.seal`），不再触发 iframe 导航——无闪烁、无滚动复位；patch 异常自动回退全量重建，输出与 `buildPoster` 完全一致。
- **配图上传压缩**：上传配图经 canvas 降采样（最长边 1600px · JPEG q0.82 · 白底填充防透明 PNG 变黑），toast 提示压缩前后体积；实测 5.4MB PNG → 32KB；极端纹理图压缩后反而变大时保留原图；上传上限放宽至 20MB（压缩后落盘）。
- **单实例化**：外壳 4 份工作台 iframe 合并为 1 份常驻实例（absolute 定位避免移动 DOM 触发重载），主 Tab 切换 = 切可见性 + `postMessage(wb-switch-tab)` 内层定位；内存占用约降至 1/4，AB 胜出标题等状态跨主 Tab 天然共享（桥接保留作幂等兜底）。

### Fixed
- 单实例结构下加载遮罩不消失（`.wb-holder.ready` 选择器缺失导致遮罩盖住工作台）。

### Verified
- 无头 Chromium 回归（单文件 + 多文件双版本）：单实例切换 iframe 不重载（标记存活）、postMessage 精准定位 ②/①、增量预览原位生效且 srcdoc 不变、压缩 5583KB→32KB、引擎挂载、390px 全 Tab 无横向溢出、localStorage 读写。

---

## [3.4.0] - 2026-10-30

### Added
- **双交付工程结构**：工作站拆分为可读多文件工程（`index.html` + `style.css` + `main.js` + `workbench.html` + `guofeng-card-engine.js`）+ 构建脚本 `build_single.py`（产出自包含单文件版）。加新功能改多文件，发布跑一次构建，不再手改单文件。
- **外壳第一批改造**（移植自本地工作站版本）：
  - 键盘可达性：`role=tablist/tab/tabpanel` + `aria-selected` + roving tabindex + ←/→/Home/End 切换 + `:focus-visible` 焦点描边
  - iframe 加载超时保护：15s 超时提示 + 一键重试
  - 移动端：Tab `nowrap` 横滑 + 44px 最小触达高度
  - 胜出标题桥接：Tab3「应用胜出标题 ▶ 工作台」一键把 AB 胜出标题写回 Tab1 并跨 Tab 同步（`gf_ab_winner` + StorageEvent）
- **工作台增量合并**：未压缩 `workbench.html` 合入「应用胜出标题」按钮 + 跨 Tab 标题同步监听；Tab2 新增「配色 · 字体搭配参考卡（定稿 6 组）」折叠面板。

### Changed
- `workstation-integration.html` 改为 `build_single.py` 构建产物（含 srcdoc 注入 + 内层导航隐藏），体积 346K。
- 单文件构建自动转义引擎注释中的 `</script>`，避免内联截断。

### Verified
- 无头 Chromium 全量回归：5 Tab 切换 / ARIA 翻转 / 方向键 / `?tab` 精准定位 / srcdoc 注入定位 / 胜出标题桥接回填 / 国风卡片挂载 / localStorage 读写 / 390px 全 Tab 无横向溢出。

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
