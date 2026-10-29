# Guofeng Typesetter · 国风高档图文排版设计器

> 输入一段文案，自动匹配最高级的版式系统，输出可直接浏览器打开的单文件 HTML 图文卡片。
> 整合 GitHub 热门开源排版项目（heti / Han.css / tailwindcss-typography / Gutenberg 等）的中文排版最佳实践。

**版本**：v3.1.0 · **许可**：MIT · **作者**：静心知识库 · @圣为Ai设计

---

## ✨ 特性

- **6 套设计系统**：宋韵禅意 / 杂志编辑 / 瑞士网格 / 朱砂商务 / 暗色鎏金 / 草木绿东方极简
- **数据 + 模板架构**：配色、字体、装饰全部配置化（见 `references/themes.json`），6 套骨架收敛为 5 个通用布局模板 → 加新风格 = 填一条 JSON
- **中文排版专业度**：CJK 与英文/数字强制 1/4 字空格、全角标点、竖排引文/印章、着重号
- **网格与韵律**：模块化字号比例 + 8px 基线网格 + 行长控制（`max-width`）
- **克制用色**：主色只做锚点（印章/序号/关键词），约 90% 文字交给灰阶
- **跨平台不掉格式**：内置「公众号内嵌模式」——全内联 + span 包裹 + CSS 变量解析 + `grid→flex` 降级，可直接粘进公众号编辑器
- **确定性质量门**：生成后跑校验脚本，ERROR 清零才交付（普通模式 + 公众号模式双关卡）
- **离线可用**：纯原生 JS，无任何外部框架依赖；字体走 CDN，断网也能渲染（回退系统字体）

---

## 🚀 快速开始

### 方式一：直接用（零配置）
浏览器打开 `guofeng-card-studio.html` —— 选风格、填文案、实时预览、下载/复制 HTML，或切到「公众号内嵌模式」拿内联版本。

### 方式二：嵌进你的多 Tab 工作站
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
python3 scripts/validate_card.py <卡片.html>            # 普通模式校验
python3 scripts/validate_card.py --wechat <卡片.html>   # 公众号模式校验
```

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
├── CHANGELOG.md                      # v1.0.0 → v3.1.0 全量版本记录
├── guofeng-card-engine.js            # 可挂载引擎（数据 + 5 模板 + API）
├── guofeng-card-studio.html          # 独立单文件版（加载引擎 + 挂载）
├── workstation-integration.html      # 多 Tab 工作站接入 demo
├── references/
│   ├── themes.json                   # ★ 唯一可编辑数据源（配色/字体/装饰/字段/示例）
│   ├── design-systems.md             # 6 套系统完整规范
│   ├── layout-patterns.md            # 布局模板说明（数据驱动）
│   ├── typography-best-practices.md  # GitHub 开源项目整合 + 可复用 CSS 片段
│   └── inspiration-notes.md          # 灵感库
├── scripts/
│   ├── sync_themes.js                # themes.json → 引擎 DATA 同步
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

---

## 📌 迭代路线（见 CHANGELOG.md）

- **v1.0.0** 六套设计系统 + 决策树 + 基础 HTML 骨架
- **v2.0.0** 整合 GitHub 开源排版最佳实践（heti / Han / typography.js / Gutenberg / tailwindcss-typography）
- **v2.1.0** 接入公众号排版助手工具（国风卡片生成模块）
- **v2.2.0** 多 Tab 工作站适配（可挂载引擎 `guofeng-card-engine.js`）
- **v3.0.0** 数据 + 模板重构（`themes.json` + 5 通用布局，加风格 = 填表）
- **v3.1.0** 加入更新日志与道术双群实战海报示例

## 🤝 后续可扩展
- 接历史数据看板做「风格→阅读量」加权推荐（P1 数据反哺）
- 生成后自动截图 → 视觉评分（对比度/留白/层级）不达标打回重生成
- 自定义风格持久化沉淀进 ima 知识库
