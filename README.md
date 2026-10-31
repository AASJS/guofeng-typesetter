# Guofeng Typesetter · 国风高档图文排版设计器

> 输入一段文案，自动匹配最高级的版式系统，输出可直接浏览器打开的单文件 HTML 图文卡片。
> 整合 GitHub 热门开源排版项目（heti / Han.css / tailwindcss-typography / Gutenberg 等）的中文排版最佳实践。

**版本**：v3.10.0 · **许可**：MIT · **作者**：静心知识库 · @圣为Ai设计

---

## ✨ 特性

- **6 套设计系统**：宋韵禅意 / 杂志编辑 / 瑞士网格 / 朱砂商务 / 暗色鎏金 / 草木绿东方极简
- **poster 招募海报布局**：9:16 竖版社群/课程招募海报（大字标题+印章+壹贰叁日课+CTA二维码+水印裱框），改字段即出图，配色主题驱动
- **数据 + 模板架构**：配色、字体、装饰全部配置化（见 `references/themes.json`），6 套骨架收敛为 5 个通用布局模板 → 加新风格 = 填一条 JSON
- **中文排版专业度**：CJK 与英文/数字强制 1/4 字空格、全角标点、竖排引文/印章、着重号
- **网格与韵律**：模块化字号比例 + 8px 基线网格 + 行长控制（`max-width`）
- **克制用色**：主色只做锚点（印章/序号/关键词），约 90% 文字交给灰阶
- **跨平台不掉格式**：内置「公众号内嵌模式」——全内联 + span 包裹 + CSS 变量解析 + `grid→flex` 降级，可直接粘进公众号编辑器
- **确定性质量门**：生成后跑校验脚本，ERROR 清零才交付（普通模式 + 公众号模式双关卡）
- **离线可用**：纯原生 JS，无任何外部框架依赖；字体走 CDN，断网也能渲染（回退系统字体）
- **AI 排版 · 发布（v3.8.0）**：复制预制提示词喂给 AI → 返回 JSON 一键导入 → 卡片组 + 发布物料（标题/摘要/封面提示词/每卡配图提示词）全部一键复制到公众号助手；无 AI 时有本地兜底提示词，且**配图提示词按文案内容自适应视觉域**（v3.8.1，不写死水墨）
- **正文排版强化（v3.10.0，参考 raphael-publish）**：④ 正文排版支持标准 Markdown 全要素 + 6 套风格预设 + 魔法粘贴（Word/飞书/Notion 富文本自动净化为 Markdown）+ 微信兼容引擎（字体强制分发 / 列表防塌陷 / 中文标点防断行 / 外链图转 Base64）+ 多端预览
- **长文拆卡（v3.7.0）**：工作站新 Tab——粘贴 1000+ 字公众号全文，自动拆成风格统一的卡片组（识别五种小标题写法 / 无标题按段落分组），每卡 3 要点 + 1 金句可微调；逐卡「载入排版」走现有导出链路，或一键导出带「逐卡下载 PNG」的离线 HTML 画册
- **灵感库（联网可更新）**：Awwwards / 时尚杂志 / 高端品牌 / 2026 字体趋势 / 中文版式网格等「美观高级时尚感」排版范式，现收录 **20 条 / 7 来源**；Studio 内点「灵感库」按分类浏览、复制可复用 CSS 片段、**「应用此灵感」一键把色板+字体气质写入当前风格主题**（v3.8.2，带还原点）；`update_inspiration.js` 命令行追加或让 AI 助手联网抓取提炼后入库，`sync_inspiration.js` 同步进引擎
- **工作站工程化（v3.4.0–v3.6.0）**：可读多文件工程 + 构建链；工作台单实例化（4 份 iframe 合并为 1 份，内存约 1/4，状态跨 Tab 共享）；预览增量更新（文本原位 patch，无闪烁/滚动复位）；配图上传自动压缩（canvas 降采样，实测 5.4MB→32KB）；外壳语义令牌 + 🌗 三态主题切换（跟随系统/浅/暗，仅外壳层，工作台纸面色不变）；键盘可达 + 超时重试 + 移动端 44px 触达

---

## 🚀 快速开始

### 方式一：直接用（零配置）
浏览器打开 `guofeng-card-studio.html` —— 选风格、填文案、实时预览、下载/复制 HTML，或切到「公众号内嵌模式」拿内联版本。

### 方式二：用多 Tab 工作站（推荐）
工作站已提供**双交付**：可读多文件工程（`index.html` + `style.css` + `main.js` + `workbench.html`，日常改这个）+ `python3 build_single.py` 一键构建自包含单文件 `workstation-integration.html`（离线分发用）。

外壳 7 个主 Tab：**排版 / 配色 / 标题·AB / 历史数据看板 / 长文拆卡 / AI 排版·发布 / 国风卡片**——前 6 个共用一份常驻工作台实例（postMessage 定位内层 Tab，状态跨 Tab 共享），第 7 个是独立挂载的国风卡片引擎。特性：键盘可达（方向键切 Tab）、15s 加载超时可重试、移动端 44px 触达、胜出标题跨 Tab 桥接、🌗 主题切换（仅外壳层）。
```html
<!-- 1) 引入引擎 -->
<script src="guofeng-card-engine.js"></script>

<!-- 2) 在目标容器挂载（支持挂多处、互不污染） -->
<script>
  GuofengCard.mount('#guofeng-mount',   { defaultStyle:'songzen' });  // 塞进「排版」Tab
  GuofengCard.mount('#guofeng-mount-2', { defaultStyle:'swiss'   });  // 或独立成一个 Tab
</script>
```
可运行模板见 `workstation-integration.html`（已把国风卡片接进「排版」Tab，并留了一个独立「国风卡片」Tab 演示双挂载）。

### 方式三：命令行生成
```bash
node scripts/sync_themes.js          # 把 themes.json 同步进引擎（离线数据源）
node scripts/sync_inspiration.js     # 把 inspiration.json 同步进引擎（灵感库数据源）
node scripts/update_inspiration.js list   # 查看当前灵感库统计
python3 scripts/validate_card.py <卡片.html>            # 普通模式校验
python3 scripts/validate_card.py --wechat <卡片.html>   # 公众号模式校验
```

---

## 🤖 AI 排版 · 发布工作流（v3.8.0）

「AI 排版 · 发布」Tab 的标准用法（**素材 → AI → 生图 → 发表** 四步闭环）：

1. **拆卡**：在「长文拆卡」Tab 粘贴全文 → ✂️ 拆成卡片草案（可逐项微调）
2. **AI 精修**：切到「AI 排版 · 发布」→ 📋 复制 AI 提示词（素材 + 严格 JSON 协议）→ 喂给 AI → 把返回 JSON 粘进输入框 → ⬇️ 导入（卡片草案自动同步，配色建议一并返回；没有 AI 也能用 🪄 本地兜底生成提示词）
3. **生图**：从物料区逐条复制**配图提示词**（9:16 国风宣纸水墨、画面无文字）交给生图工具，图片经工作台「配图」上传回卡片（自动 canvas 压缩）；**封面提示词**（3.35:1 横版）同理生成公众号封面
4. **发表**：一键复制**文章标题 / 摘要 / 全部物料**，连同卡片 PNG 粘贴到公众号助手发表

> 灵感库里的 CSS 片段可直接贴进公众号文章源码；想把灵感变成卡片风格，把参数抄进 `themes.json` → `node scripts/sync_themes.js` 即可。

---

## 📝 正文排版 · 一键出公众号 HTML（v3.10.0）

「AI 排版 · 发布」Tab 的 **④ 正文排版**，参考 [raphael-publish](https://github.com/liuxiaopai-ai/raphael-publish) 强化：

- **标准 Markdown 全支持**：`##/###` 标题、`**粗**` `*斜*` `~~删~~`、`[链接](url)`、`` `code` ``、无序/有序列表、`|` 表格、``` 代码块、`---` 分隔线；旧轻量标记（`【】`、`一、`、`「」`、短数字行）继续兼容
- **配图进正文**：`![说明](url)` 单图居中 + 图注自动生成；连续多图自动并排 table 网格（微信不塌陷）
- **6 套风格预设**：跟随配色（默认，联动「②配色」）/ 纯净白 / 燕麦 / 水墨 / 羊皮纸 / 杂志，一键切换
- **微信兼容引擎**（复制时自动执行）：字体/字号/颜色/行距强制分发到每个文本节点（防微信编辑器劫持继承）、`li` 内块级元素降级为 `span`（防列表塌陷）、强调标签后的中文标点挂入标签 + `U+2060` 零宽连接符防断行、外链图片自动转 Base64（免「第三方图片」报错）
- **魔法粘贴**：在输入框直接 Ctrl+V 粘贴 Word / 飞书 / Notion 富文本 → 自动净化为纯净 Markdown；剪贴板截图直接插入为 Base64 图片；「📥 魔法粘贴」按钮可主动读取剪贴板
- **多端预览**：📱 375px / 📲 520px / 🖥 全宽三档宽度切换，所见即所得

---

## 🎨 设计系统一览

| key | 风格 | 布局 | 主色 | 气质 |
|-----|------|------|------|------|
| `songzen` | 宋韵禅意 | single 单列叙事 | 赭石朱砂 `#8C4A38` | 道德经 / 禅意 / 留白 |
| `editorial` | 杂志编辑 | editorial 杂志 | 黑白 + 品红 `#E0245E` | 锐利观点 / 反共识 |
| `swiss` | 瑞士网格 | grid 网格 | 国际红 `#FF3B30` | 理性 / 步骤化 / 干货 |
| `crimson` | 朱砂商务 | asymmetric 不对称 | 朱砂红 `#C0392B` | 正式 / 汇报 / 路演 |
| `darkgold` | 暗色鎏金 | single 暗底 | 鎏金 `#C9A962` | 高端 / 暗黑 / 质感 |
| `sage` | 草木绿东方极简 | asymmetric 东方 | 草木绿 `#5B7553` | 自然 / 松弛 / 治愈 |
| `poster_dao` | 宋韵禅意·招募海报 | poster 招募海报 | 赭石 + 墨绿 CTA | 社群招募 / 9:16 竖版 |
| `poster_shu` | 朱砂·招募海报 | poster 招募海报 | 朱砂渐变 CTA | 实修营招募 / 行动感 |

---

## 🧱 架构：数据 + 模板

```
themes.json (数据)  ──┐
                      ├─→  guofeng-card-engine.js  ──→  buildCard(style, data, opts)
5 个布局模板 (结构) ──┘         • single / editorial / grid / asymmetric / business
                                 • buildCard 由 theme.layout 路由到模板
                                 • 颜色由 CSS 变量从 themes 注入
```

**加一套新风格 = 纯填表**（零 HTML 改动）。在 `references/themes.json` 加一条：
```json
"wabi": {
  "label": "侘寂", "layout": "single", "bodyBg": "#cfc9bd",
  "fonts": { "base": "serif" }, "fontTokens": ["serif"],
  "decor": { "seal": false, "paperTexture": false },
  "colors": { "--ink":"#3a352c", "--accent":"#7a6f5a", "--paper":"#e8e2d4", "--muted":"#8a8070" },
  "sample": { "title":"侘寂", "quote":"不完美，才是恰好的圆满。", "golden":"少即是多，慢即是快。" }
}
```
跑 `node scripts/sync_themes.js` 即生效。

### 引擎 API
| 函数 | 用途 |
|------|------|
| `GuofengCard.buildCard(style, data, opts)` | 生成单文件卡片 HTML，`opts={ratio:'9:16'\|'3:4'\|'1:1'\|'2.35:1', sign:'落款'}` |
| `GuofengCard.inlineStyles(html)` | 转公众号内联 HTML（解析 CSS 变量、去 `<style>`/`class`、`grid→flex`） |
| `GuofengCard.validate(html, wechat)` | 合规校验，返回 `{errs, warns}` |
| `GuofengCard.mount(container, opts)` | 挂载 UI 到容器，返回 API 对象（可多次挂载） |
| `GuofengCard.styleKeys / STYLES / SAMPLE_DATA` | 注册表 |

---

## 📁 文件结构

```
guofeng-typesetter/
├── README.md                         # 本文件
├── SKILL.md                          # 工作流 + 决策树 + 排版质量基线
├── CHANGELOG.md                      # v1.0.0 → v3.10.0 全量版本记录
├── guofeng-card-engine.js            # 可挂载引擎（数据 + 5 模板 + API）
├── guofeng-card-studio.html          # 独立单文件版（加载引擎 + 挂载）
├── workstation-integration.html      # 多 Tab 工作站（build_single.py 产出的自包含单文件）
├── index.html / style.css / main.js  # 工作站外壳多文件工程（可读源码，7 主 Tab + 主题切换）
├── workbench.html                    # 国风排版工作台（未压缩源码：排版/配色/AB/看板/长文拆卡/AI排版发布）
├── build_single.py                   # 单文件构建脚本（python3 build_single.py）
├── references/
│   ├── themes.json                   # ★ 唯一可编辑数据源（配色/字体/装饰/字段/示例）
│   ├── inspiration.json              # ★ 灵感库数据源（来源 + 灵感条目，可更新）
│   ├── design-systems.md             # 6 套系统完整规范
│   ├── layout-patterns.md            # 布局模板说明（数据驱动）
│   ├── typography-best-practices.md  # GitHub 开源项目整合 + 可复用 CSS 片段
│   └── inspiration-notes.md          # 灵感库使用指南 + 设计语言提炼
├── scripts/
│   ├── sync_themes.js                # themes.json → 引擎 DATA 同步
│   ├── sync_inspiration.js           # inspiration.json → 引擎 INSPIRATIONS 同步
│   ├── update_inspiration.js         # 命令行追加灵感/来源（可增量更新）
│   └── validate_card.py              # 产物合规校验（普通 + 公众号）
├── assets/                           # 2 张示例卡
└── examples/                         # 道·宋韵禅意 + 术·朱砂版 9:16 海报（PNG+HTML）+ 共修群二维码
```

---

## 🖼 实战示例

`examples/` 收录了一组同系列内容招募海报（9:16）：
- **道·宋韵禅意**：`道术双群_道_9x16.png`（墨绿禅意）+ 源文件
- **术·朱砂版**：`道术双群_术_9x16.png`（朱砂行动）+ 源文件
- 背景水印、印章「福宝」、壹/贰/叁 日课、CTA 色块 + 二维码一应俱全，可直接作朋友圈/视频号封面。

这套版式已沉淀为引擎的 **poster 布局**（v3.2.0）：`GuofengCard.buildCard('poster_dao', data, {ratio:'9:16'})`，或打开 studio 选「宋韵禅意·招募海报 / 朱砂·招募海报」直接填文案——标题支持 `<br>` 换行与 `<em>字</em>` 朱砂高亮，路径条用空格分隔（如 `读经 明理 践行 养成`）自动加箭头，二维码贴 url 或 base64 即可。

---

## 📌 迭代路线（见 CHANGELOG.md）

- **v1.0.0** 六套设计系统 + 决策树 + 基础 HTML 骨架
- **v2.0.0** 整合 GitHub 开源排版最佳实践（heti / Han / typography.js / Gutenberg / tailwindcss-typography）
- **v2.1.0** 接入公众号排版助手工具（国风卡片生成模块）
- **v2.2.0** 多 Tab 工作站适配（可挂载引擎 `guofeng-card-engine.js`）
- **v3.0.0** 数据 + 模板重构（`themes.json` + 5 通用布局，加风格 = 填表）
- **v3.1.0** 加入更新日志与道术双群实战海报示例
- **v3.2.0** poster 招募海报布局（9:16 竖版，实战泛化）+ poster_dao / poster_shu 两套主题
- **v3.3.0** 灵感库（联网沉淀，结构化可更新）+ Studio「灵感库」面板 + sync/update_inspiration 脚本
- **v3.4.0** 双向合并：多文件可读工程 + 外壳第一批改造（ARIA 键盘导航/超时重试/移动端优化/胜出标题桥接）+ build_single.py 双交付
- **v3.5.0** 预览增量更新（原位 patch 无闪烁）+ 配图上传 canvas 压缩（5.4MB→32KB）+ 工作台单实例化（4 iframe→1，postMessage 切 Tab）
- **v3.6.0** 外壳 CSS 语义令牌 + 🌗 三态主题切换（跟随系统/浅/暗，仅外壳层，持久化）
- **v3.7.0** 长文拆卡：1000+ 字全文自动拆统一风格卡片组 + 逐卡载入排版 + 离线 HTML 画册（逐卡下载 PNG）
- **v3.8.0** AI 排版·发布：提示词往返协议 + JSON 导入 + 发布物料（标题/摘要/封面提示词/每卡配图提示词）一键复制；灵感库联网更新入库（20 条/7 来源）
- **v3.8.1** 配图提示词按文案内容自适应 6+1 视觉域（水墨山水/浅绛古意/禅意留白/文人书斋/温暖工笔/界画工整/通用兜底）+ 配色色调词联动 + 逐卡意象差异化
- **v3.8.2** 灵感库「应用此灵感」按钮：色板 + 字体气质一键写入当前风格主题（带还原点），Studio 与工作站同时生效
- **v3.9.0** ④ 正文排版：1000+ 字全文 → 公众号内联 HTML（轻量标记解析，风格跟随②配色），补上「排版好的文章在哪看」缺口
- **v3.10.0** 正文排版强化（参考 raphael-publish）：标准 Markdown 全要素 + 6 套风格预设 + 微信兼容引擎（字体强制分发/列表防塌陷/中文标点防断行/外链图转 Base64）+ 魔法粘贴（富文本自动净化为 Markdown）+ 多端预览

## 🤝 后续可扩展
- ✅ ~~文章正文排版~~ 已实现（v3.9.0 起，v3.10.0 参考 [raphael-publish](https://github.com/liuxiaopai-ai/raphael-publish) 强化：标准 Markdown + 风格预设 + 微信兼容引擎 + 魔法粘贴，见「④ 正文排版」）
- 配图提示词 → AI 生图 → 自动回填卡片配图位（当前手动上传，已有压缩链路）
- 接历史数据看板做「风格→阅读量」加权推荐（P1 数据反哺）
- 生成后自动截图 → 视觉评分（对比度/留白/层级）不达标打回重生成
- 自定义风格持久化沉淀进 ima 知识库
