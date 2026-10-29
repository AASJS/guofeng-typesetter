/*!
 * Guofeng Card Engine v3.0  —  数据 + 模板 架构
 * 6 套设计系统收敛为：themes.json（数据） + 5 个通用布局模板（结构）。
 * 新增风格 = 在 themes.json 加一条（layout + colors + decor + sample），无需改 HTML。
 *
 * 用法一（UI 挂载）：
 *   <script src="guofeng-card-engine.js"></script>
 *   GuofengCard.mount(document.getElementById('mount-here'), { defaultStyle:'songzen' });
 * 用法二（只要 HTML）：
 *   const html = GuofengCard.buildCard('swiss', { title:'...' }, { ratio:'9:16', sign:'xxx' });
 *   const wechat = GuofengCard.inlineStyles(html);
 *   const v = GuofengCard.validate(wechat, true);
 *
 * 编辑数据源：改 references/themes.json，再跑 `node scripts/sync_themes.js` 同步到本文件。
 */
(function (global) {
  'use strict';

  const FONT_BASE = "https://miaoda.feishu.cn/fonts/css2?family=";
  const SIGN_DEFAULT = "静心知识库 · @圣为Ai设计";

  /* —— 字体令牌：token -> 实际 font-family —— */
  const FAMILY = {
    serif: '"Noto Serif SC","Songti SC","SimSun",serif',
    sans: '"Noto Sans SC",sans-serif',
    display: '"Playfair Display",serif',
    mono: '"JetBrains Mono",monospace'
  };

  /* ============ 主题数据（由 scripts/sync_themes.js 从 themes.json 同步） ============ */
  /*__THEMES_DATA_START__*/
  const DATA = {
  "version": "3.0.0",
  "signDefault": "静心知识库 · @圣为Ai设计",
  "fontFamilies": {
    "serif": "\"Noto Serif SC\",\"Songti SC\",\"SimSun\",serif",
    "sans": "\"Noto Sans SC\",sans-serif",
    "display": "\"Playfair Display\",serif",
    "mono": "\"JetBrains Mono\",monospace"
  },
  "fontLink": {
    "serif": "Noto+Serif+SC:wght@400;600;700;900",
    "sans": "Noto+Sans+SC:wght@300;400;500;700;800",
    "display": "Playfair+Display:wght@700;900",
    "mono": "JetBrains+Mono:wght@400;700"
  },
  "layouts": {
    "single": {
      "desc": "单列叙事：标签→主标题→竖线引文→小节→收尾金句→印章。宋韵禅意/暗色鎏金共用",
      "fields": [
        {"k": "tag", "l": "标签", "t": "text"},
        {"k": "subTag", "l": "副标签", "t": "text"},
        {"k": "title", "l": "主标题", "t": "text"},
        {"k": "quote", "l": "竖线引文", "t": "text"},
        {"k": "s1t", "l": "小节标题一", "t": "text"},
        {"k": "s1b", "l": "小节正文一", "t": "area"},
        {"k": "s2t", "l": "小节标题二", "t": "text"},
        {"k": "s2b", "l": "小节正文二", "t": "area"},
        {"k": "golden", "l": "收尾金句", "t": "text"},
        {"k": "seal", "l": "印章字", "t": "text"}
      ]
    },
    "editorial": {
      "desc": "杂志叙事：栏目标签→主标题→导语→首字下沉→金句引文→第二段",
      "fields": [
        {"k": "kicker", "l": "栏目标签", "t": "text"},
        {"k": "title", "l": "主标题", "t": "text"},
        {"k": "dek", "l": "导语/摘要", "t": "area"},
        {"k": "lead", "l": "首段（首字下沉）", "t": "area"},
        {"k": "pull", "l": "金句引文", "t": "text"},
        {"k": "lead2", "l": "第二段", "t": "area"}
      ]
    },
    "grid": {
      "desc": "瑞士网格：顶栏→主标题→编号步骤→结论条",
      "fields": [
        {"k": "topL", "l": "分类标签", "t": "text"},
        {"k": "topR", "l": "日期/编号", "t": "text"},
        {"k": "title", "l": "主标题", "t": "text"},
        {"k": "s1t", "l": "阶段一标题", "t": "text"},
        {"k": "s1b", "l": "阶段一说明", "t": "area"},
        {"k": "s2t", "l": "阶段二标题", "t": "text"},
        {"k": "s2b", "l": "阶段二说明", "t": "area"},
        {"k": "s3t", "l": "阶段三标题", "t": "text"},
        {"k": "s3b", "l": "阶段三说明", "t": "area"},
        {"k": "conclusion", "l": "结论条", "t": "text"}
      ]
    },
    "asymmetric": {
      "desc": "不对称色块：左侧色块+竖排水印+四角元数据→内容区",
      "fields": [
        {"k": "metaTL", "l": "编号", "t": "text"},
        {"k": "metaTR", "l": "期次", "t": "text"},
        {"k": "series", "l": "系列名", "t": "text"},
        {"k": "title", "l": "主标题", "t": "text"},
        {"k": "subtitle", "l": "副标题", "t": "area"},
        {"k": "s1t", "l": "小节标签一", "t": "text"},
        {"k": "s1b", "l": "小节正文一", "t": "area"},
        {"k": "s2t", "l": "小节标签二", "t": "text"},
        {"k": "s2b", "l": "小节正文二", "t": "area"},
        {"k": "circle", "l": "圆心字", "t": "text"},
        {"k": "golden", "l": "收尾金句", "t": "text"},
        {"k": "water", "l": "水印字", "t": "text"}
      ]
    },
    "business": {
      "desc": "商务营销：红封边→页码水印→卖点列表→渐变页脚",
      "fields": [
        {"k": "kicker", "l": "课程/产品标签", "t": "text"},
        {"k": "title", "l": "主标题", "t": "text"},
        {"k": "subtitle", "l": "副标题/价值", "t": "area"},
        {"k": "f1t", "l": "卖点一标题", "t": "text"},
        {"k": "f1b", "l": "卖点一说明（含*高亮*）", "t": "area"},
        {"k": "f2t", "l": "卖点二标题", "t": "text"},
        {"k": "f2b", "l": "卖点二说明", "t": "area"}
      ]
    }
  },
  "themes": {
    "songzen": {
      "label": "宋韵禅意",
      "layout": "single",
      "bodyBg": "#e8e4dc",
      "fonts": {"base": "serif", "display": "serif"},
      "fontTokens": ["serif"],
      "decor": {"seal": true, "paperTexture": true, "gradientText": false},
      "colors": {
        "--ink": "#222",
        "--accent": "#8C4A38",
        "--accent-bright": "#B8442C",
        "--gold": "#C8B89E",
        "--jade": "#3A5A48",
        "--paper": "#F7F4EB",
        "--line": "#DDD8CF",
        "--muted": "#999"
      },
      "sample": {
        "tag": "一人公司笔记",
        "subTag": "反完美主义 · 持续输出",
        "title": "烂泥哲学",
        "quote": "允许自己先烂着，但别允许自己不动。",
        "s1t": "什么是烂泥",
        "s1b": "不是摆烂，是接受当下不够好的状态。像烂泥一样，先摊在地上，再慢慢长出根来。",
        "s2t": "怎么用",
        "s2b": "别等准备好了再开始。先发十条烂内容，再发一百条还行的，最后那条爆款自然会来。",
        "golden": "完成比完美重要，活着比活着好。",
        "seal": "禅"
      }
    },
    "editorial": {
      "label": "杂志编辑",
      "layout": "editorial",
      "bodyBg": "#e4e0d8",
      "fonts": {"base": "sans", "display": "serif"},
      "fontTokens": ["serif", "sans", "display"],
      "decor": {"hairline": true, "pullquote": true, "dropcap": true},
      "colors": {
        "--ink": "#1a1a1a",
        "--accent": "#B8442C",
        "--paper": "#FAF8F4",
        "--line": "#D5D0C8",
        "--muted": "#8a8580"
      },
      "sample": {
        "kicker": "COLUMN · 阅读",
        "title": "读书的意义",
        "dek": "读书不是为了记住什么，是为了在某个瞬间，你突然懂了某个人说的某句话。",
        "lead": "我们总以为阅读是一场记忆的搬运，把别人的思想装进自己的脑子。可大多数书，读过就忘了。",
        "pull": "记不住没关系，那一瞬间的懂，已经改变了你。",
        "lead2": "真正留下的，是你看世界时悄悄多出的那一层滤镜。"
      }
    },
    "swiss": {
      "label": "瑞士网格",
      "layout": "grid",
      "bodyBg": "#dadada",
      "fonts": {"base": "sans", "accent": "mono"},
      "fontTokens": ["sans", "mono"],
      "decor": {"topbar": true, "stepNumbers": true, "conclusionBar": true},
      "colors": {
        "--ink": "#0A0A0A",
        "--accent": "#C8202A",
        "--paper": "#FFFFFF",
        "--line": "#E0E0E0",
        "--muted": "#999"
      },
      "sample": {
        "topL": "内容方法论 / METHOD",
        "topR": "2026.10",
        "title": "做内容的三个阶段",
        "s1t": "发自己想发的",
        "s1b": "自嗨期。先让自己舒服，把表达欲释放出来，不必急着讨好任何人。",
        "s2t": "发用户想看的",
        "s2b": "流量期。开始读评论、看数据，用别人的需求校准自己的表达。",
        "s3t": "发用户说不出但需要的",
        "s3b": "壁垒期。你替他们说出了那句一直卡在喉咙里的话，这就成了你的护城河。",
        "conclusion": "从自嗨到壁垒，差的是一百条还不完美的练习。"
      }
    },
    "crimson": {
      "label": "朱砂商务",
      "layout": "business",
      "bodyBg": "#d8d8d8",
      "fonts": {"base": "sans"},
      "fontTokens": ["sans"],
      "decor": {"redBorder": true, "pageno": true, "footerGradient": true, "highlight": true},
      "colors": {
        "--ink": "#1a1a1a",
        "--accent": "#C8202A",
        "--accent-bright": "#D43A3A",
        "--accent-deep": "#8A1F24",
        "--paper": "#FFFFFF",
        "--muted": "#9a9a9a"
      },
      "sample": {
        "kicker": "课程首发",
        "title": "一人公司实战营",
        "subtitle": "不投流、纯靠内容驱动，一个人也能跑通的商业闭环。",
        "f1t": "21 天陪跑",
        "f1b": "从 0 到 1 搭起你的*内容资产*，每天 30 分钟，不焦虑。",
        "f2t": "可复用 SOP",
        "f2b": "排版、选题、标题、数据看板，全部*模板化*，复制即用。"
      }
    },
    "darkgold": {
      "label": "暗色鎏金",
      "layout": "single",
      "bodyBg": "#000",
      "fonts": {"base": "serif", "display": "serif"},
      "fontTokens": ["serif"],
      "decor": {"seal": true, "frame": true, "gradientText": true},
      "colors": {
        "--ink": "#0D0D0D",
        "--text": "#E8E0D0",
        "--accent": "#C9A962",
        "--accent-bright": "#E0C88A",
        "--gold": "#C9A962",
        "--gold-bright": "#E0C88A",
        "--gold-line": "rgba(201,169,98,.25)",
        "--paper": "#0D0D0D",
        "--line": "rgba(201,169,98,.25)",
        "--muted": "#C9A962"
      },
      "sample": {
        "kicker": "珍藏版金句",
        "title": "善友如镜",
        "quote": "善友如镜，照见自己。",
        "golden": "你靠近谁，就会成为谁。",
        "seal": "鏡"
      }
    },
    "sage": {
      "label": "草木绿东方极简",
      "layout": "asymmetric",
      "bodyBg": "#d8d4c8",
      "fonts": {"base": "serif", "meta": "sans"},
      "fontTokens": ["serif", "sans"],
      "decor": {"sageBlock": true, "watermark": true, "cornerMeta": true, "seriesQuote": true, "circle": true},
      "colors": {
        "--sage": "#7D855A",
        "--sage-deep": "#5A6340",
        "--paper": "#EAEAE2",
        "--charcoal": "#2A2A28",
        "--charcoal-soft": "#4a4a46",
        "--muted": "#9a958a",
        "--line": "#D5D0C8"
      },
      "sample": {
        "metaTL": "NO. 03",
        "metaTR": "AUTUMN 2026",
        "series": "中医本草",
        "title": "君臣佐使",
        "subtitle": "一张方子的秩序，就是一个人做事的秩序。",
        "s1t": "君 · 主药",
        "s1b": "针对主证的核心药材，力量最大。做任何事，先找到那个必须解决的主问题。",
        "s2t": "臣 · 辅药",
        "s2b": "辅助君药，加强疗效。核心之外，配两三个得力帮手，不贪多。",
        "circle": "和",
        "golden": "药有君臣佐使，人有主次缓急。",
        "water": "藥"
      }
    }
  }
};
  /*__THEMES_DATA_END__*/

  /* ============ 通用布局模板（结构 + 装饰由 theme.colors/decor 注入） ============ */
  const LAYOUTS = {
    single: {
      css: (t, o) => `
.card{width:900px;max-width:100%;aspect-ratio:${o.ratio};background:var(--paper);position:relative;overflow:hidden;padding:100px 80px 80px;color:var(--ink);box-shadow:0 8px 40px rgba(0,0,0,.12)}
.content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column}
.tag{display:inline-block;border:1px solid var(--accent);color:var(--accent);padding:6px 20px;font-size:28px;letter-spacing:4px;align-self:flex-start}
.sub-tag{margin-top:14px;font-size:26px;color:var(--muted);letter-spacing:3px}
.main-title{margin-top:56px;font-size:88px;font-weight:700;color:var(--ink);letter-spacing:8px;line-height:1.2}
.quote{margin-top:52px;padding-left:24px;border-left:3px solid var(--gold);font-size:40px;line-height:1.8;letter-spacing:2px}
.section{margin-top:48px}
.section-title{font-size:34px;color:var(--accent);font-weight:700;margin-bottom:14px;letter-spacing:2px}
.section-text{font-size:32px;color:#333;line-height:1.9;letter-spacing:1px;max-width:32em}
.divider{width:100%;height:1px;background:var(--line);margin:36px 0}
.golden{margin-top:auto;padding-top:60px;text-align:center;font-size:48px;color:var(--jade,var(--accent));line-height:1.8;font-weight:600;letter-spacing:3px}
.footer{margin-top:40px;text-align:center;font-size:24px;color:var(--muted);letter-spacing:2px}`,
      html: (t, d, o) => {
        const p = [];
        if (d.tag) p.push(`<div class="tag">${d.tag}</div>`);
        if (d.subTag) p.push(`<div class="sub-tag">${d.subTag}</div>`);
        if (d.title) p.push(`<h1 class="main-title">${d.title}</h1>`);
        if (d.quote) p.push(`<div class="quote">${d.quote}</div>`);
        if (d.s1t || d.s1b) p.push(`<div class="section"><div class="section-title">${d.s1t || ''}</div><div class="section-text">${d.s1b || ''}</div></div>`);
        if (d.s2t || d.s2b) p.push(`<div class="divider"></div><div class="section"><div class="section-title">${d.s2t || ''}</div><div class="section-text">${d.s2b || ''}</div></div>`);
        if (d.golden) p.push(`<div class="golden">${d.golden}</div>`);
        const seal = (t.decor && t.decor.seal) ? `<div class="seal">${d.seal || '印'}</div>` : '';
        const cls = 'card' + ((t.decor && t.decor.gradientText) ? ' decor-gradient' : '');
        return `<div class="${cls}">${seal}<div class="content">${p.join('')}<div class="footer">${o.sign}</div></div></div>`;
      }
    },
    editorial: {
      css: (t, o) => `
.card{width:900px;max-width:100%;aspect-ratio:${o.ratio};background:var(--paper);position:relative;overflow:hidden;padding:96px 84px 72px;color:var(--ink);box-shadow:0 8px 40px rgba(0,0,0,.1)}
.content{position:relative;height:100%;display:flex;flex-direction:column}
.kicker{font-family:${FAMILY.display};font-size:18px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:24px}
.main-title{font-family:${FAMILY.serif};font-size:84px;font-weight:900;line-height:1.15;letter-spacing:2px;margin-bottom:24px}
.dek{font-size:26px;line-height:1.7;color:#4a4a46;font-weight:300;max-width:30em;margin-bottom:40px}
.hairline{width:56px;height:2px;background:var(--accent);margin-bottom:32px}
.lead{font-size:22px;line-height:2;color:#333;max-width:32em}
.lead::first-letter{float:left;font-family:${FAMILY.display};font-size:88px;line-height:.78;padding:6px 14px 0 0;color:var(--accent)}
.pullquote{margin:48px 0;padding:28px 0;border-top:2px solid var(--accent);border-bottom:2px solid var(--accent);font-family:${FAMILY.serif};font-size:34px;line-height:1.6;font-style:italic;color:var(--ink)}
.pullquote::before{content:"\\201C";font-family:${FAMILY.display};color:var(--accent);font-size:60px;line-height:0;vertical-align:-12px;margin-right:8px}
.footer{margin-top:auto;padding-top:40px;font-size:20px;color:var(--muted);letter-spacing:2px;display:flex;justify-content:space-between;border-top:1px solid var(--line)}`,
      html: (t, d, o) => {
        const p = [];
        if (d.kicker) p.push(`<div class="kicker">${d.kicker}</div>`);
        if (d.title) p.push(`<h1 class="main-title">${d.title}</h1>`);
        if (d.dek) p.push(`<p class="dek">${d.dek}</p><div class="hairline"></div>`);
        if (d.lead) p.push(`<p class="lead">${d.lead}</p>`);
        if (d.pull) p.push(`<div class="pullquote">${d.pull}</div>`);
        if (d.lead2) p.push(`<p class="lead">${d.lead2}</p>`);
        return `<div class="card"><div class="content">${p.join('')}<div class="footer"><span>${o.sign}</span></div></div></div>`;
      }
    },
    grid: {
      css: (t, o) => `
.card{width:900px;max-width:100%;aspect-ratio:${o.ratio};background:var(--paper);position:relative;overflow:hidden;padding:80px 72px;color:var(--ink);box-shadow:0 8px 40px rgba(0,0,0,.12)}
.content{height:100%;display:flex;flex-direction:column}
.topbar{display:flex;justify-content:space-between;font-family:${FAMILY.mono};font-size:14px;letter-spacing:1px;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:16px}
.main-title{font-size:72px;font-weight:900;line-height:1.05;letter-spacing:-1px;margin:40px 0}
.step{display:flex;gap:28px;align-items:flex-start;margin-top:40px;border-top:1px solid var(--line);padding-top:32px}
.step-no{flex:0 0 120px;font-family:${FAMILY.mono};font-size:88px;font-weight:700;color:var(--accent);line-height:1}
.step-body{flex:1;min-width:0}
.step-body h3{font-size:32px;font-weight:700;margin-bottom:12px}
.step-body p{font-size:22px;line-height:1.8;color:#333;max-width:32em}
.conclusion{margin-top:auto;background:var(--accent);color:#fff;padding:24px 32px;font-size:28px;font-weight:700;letter-spacing:1px}
.footer{margin-top:24px;font-family:${FAMILY.mono};font-size:13px;color:var(--muted);letter-spacing:1px}`,
      html: (t, d, o) => {
        const steps = [['01', d.s1t, d.s1b], ['02', d.s2t, d.s2b], ['03', d.s3t, d.s3b]].filter(s => s[1] || s[2]);
        const sh = steps.map(s => `<div class="step"><div class="step-no">${s[0]}</div><div class="step-body"><h3>${s[1] || ''}</h3><p>${s[2] || ''}</p></div></div>`).join('');
        return `<div class="card"><div class="content">
<div class="topbar"><span>${d.topL || ''}</span><span>${d.topR || ''}</span></div>
<h1 class="main-title">${d.title || ''}</h1>
${sh}
<div class="conclusion">${d.conclusion || ''}</div>
<div class="footer">${o.sign}</div></div></div>`;
      }
    },
    asymmetric: {
      css: (t, o) => `
.card{width:900px;max-width:100%;aspect-ratio:${o.ratio};background:var(--paper);position:relative;overflow:hidden;color:var(--charcoal);box-shadow:0 8px 40px rgba(0,0,0,.1)}
.sage-block{position:absolute;left:0;top:0;bottom:0;width:33%;background:var(--sage-deep);z-index:1}
.sage-block .watermark{position:absolute;bottom:40px;left:20px;font-size:140px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;writing-mode:vertical-rl}
.meta{position:absolute;font-family:${FAMILY.sans};font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);z-index:3}
.meta-tl{top:28px;left:40px}.meta-tr{top:28px;right:40px}.meta-bl{bottom:28px;left:40px}.meta-br{bottom:28px;right:40px}
.content{position:relative;z-index:2;margin-left:33%;padding:90px 60px 80px;height:100%;display:flex;flex-direction:column}
.series-tag{display:inline-block;font-family:${FAMILY.sans};font-size:13px;letter-spacing:3px;color:var(--sage);align-self:flex-start;margin-bottom:30px}
.series-tag::before{content:"\\300C";color:var(--sage)}.series-tag::after{content:"\\300D";color:var(--sage)}
h1{font-size:80px;font-weight:900;color:var(--charcoal);line-height:1.1;letter-spacing:4px;margin-bottom:20px}
.subtitle{font-size:18px;color:var(--charcoal-soft);line-height:1.7;margin-bottom:40px;font-family:${FAMILY.sans};font-weight:300}
.hairline{width:40px;height:1px;background:var(--sage);margin:0 0 36px}
.section{margin-bottom:36px}
.section-label{font-family:${FAMILY.sans};font-size:12px;letter-spacing:3px;color:var(--sage);text-transform:uppercase;margin-bottom:10px}
.section p{font-size:20px;line-height:2;color:var(--charcoal-soft);letter-spacing:1px;max-width:30em}
.circle{width:120px;height:120px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;margin:20px 0;position:relative}
.circle::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:1px solid var(--line);opacity:.4}
.circle span{font-size:28px;color:var(--sage);font-weight:700}
.closing{margin-top:auto;padding-top:40px;font-size:26px;color:var(--charcoal);letter-spacing:3px;line-height:1.8;font-weight:600}
.footer{margin-top:24px;font-family:${FAMILY.sans};font-size:12px;color:var(--muted);letter-spacing:2px}`,
      html: (t, d, o) => {
        const block = `<div class="sage-block"><div class="watermark">${d.water || '藥'}</div></div>`;
        const meta = `<div class="meta meta-tl">${d.metaTL || ''}</div><div class="meta meta-tr">${d.metaTR || ''}</div><div class="meta meta-bl">静心知识库</div><div class="meta meta-br">@圣为Ai设计</div>`;
        const s1 = (d.s1t || d.s1b) ? `<div class="section"><div class="section-label">${d.s1t || ''}</div><p>${d.s1b || ''}</p></div>` : '';
        const s2 = (d.s2t || d.s2b) ? `<div class="section"><div class="section-label">${d.s2t || ''}</div><p>${d.s2b || ''}</p></div>` : '';
        const circle = d.circle ? `<div class="circle"><span>${d.circle}</span></div>` : '';
        const closing = d.golden ? `<div class="closing">${d.golden}</div>` : '';
        return `<div class="card">${block}${meta}<div class="content">
<div class="series-tag">${d.series || ''}</div>
<h1>${d.title || ''}</h1><p class="subtitle">${d.subtitle || ''}</p><div class="hairline"></div>
${s1}${s2}${circle}${closing}
<div class="footer">${o.sign}</div></div></div>`;
      }
    },
    business: {
      css: (t, o) => `
.card{width:900px;max-width:100%;aspect-ratio:${o.ratio};background:var(--paper);position:relative;overflow:hidden;padding:88px 76px 0;color:var(--ink);border-left:12px solid var(--accent);box-shadow:0 8px 40px rgba(0,0,0,.12)}
.pageno{position:absolute;right:24px;top:40px;font-size:200px;font-weight:900;color:rgba(200,32,42,.06);line-height:1;z-index:0}
.content{position:relative;z-index:1;height:100%;display:flex;flex-direction:column}
.kicker{font-size:18px;letter-spacing:4px;color:var(--accent);font-weight:700;margin-bottom:20px}
.main-title{font-size:76px;font-weight:800;line-height:1.2;letter-spacing:1px;margin-bottom:28px}
.subtitle{font-size:26px;font-weight:300;color:#555;line-height:1.7;max-width:30em;margin-bottom:40px}
.feature{display:flex;gap:16px;align-items:flex-start;margin-top:28px}
.feature .bar{width:6px;background:var(--accent);align-self:stretch;border-radius:3px}
.feature h3{font-size:30px;font-weight:700;margin-bottom:8px}
.feature p{font-size:22px;line-height:1.8;color:#444;max-width:30em}
.hl{color:var(--accent-bright);font-weight:700}
.footer{margin-top:auto;background:linear-gradient(180deg,var(--accent),var(--accent-deep));color:#fff;padding:28px 76px;margin:0 -76px;font-size:20px;letter-spacing:2px;display:flex;justify-content:space-between}`,
      html: (t, d, o) => {
        const hl = s => (s || '').replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');
        const f1 = (d.f1t || d.f1b) ? `<div class="feature"><div class="bar"></div><div><h3>${d.f1t || ''}</h3><p>${hl(d.f1b)}</p></div></div>` : '';
        const f2 = (d.f2t || d.f2b) ? `<div class="feature"><div class="bar"></div><div><h3>${d.f2t || ''}</h3><p>${hl(d.f2b)}</p></div></div>` : '';
        return `<div class="card"><div class="pageno">01</div><div class="content">
<div class="kicker">${d.kicker || ''}</div><h1 class="main-title">${d.title || ''}</h1>
<p class="subtitle">${d.subtitle || ''}</p>
${f1}${f2}
<div class="footer"><span>${o.sign}</span><span>@圣为Ai设计</span></div></div></div>`;
      }
    }
  };

  /* ============ 工具 ============ */
  function buildFontLink(theme) {
    const toks = Array.from(new Set(theme.fontTokens || []));
    if (!toks.length && theme.fonts && theme.fonts.base) toks.push(theme.fonts.base);
    const parts = toks.map(t => DATA.fontLink[t]).filter(Boolean);
    return FONT_BASE + parts.join('&family=');
  }
  function baseCSS(theme) {
    const c = theme.colors || {};
    const rootVars = Object.entries(c).map(([k, v]) => `${k.startsWith('--') ? k : '--' + k}:${v}`).join(';');
    const baseFamily = FAMILY[theme.fonts && theme.fonts.base] || FAMILY.serif;
    let css = `:root{${rootVars}}\n*{margin:0;padding:0;box-sizing:border-box}\n`;
    css += `body{display:flex;justify-content:center;background:${theme.bodyBg || '#e8e4dc'};padding:40px 16px;font-family:${baseFamily};text-rendering:optimizeLegibility;font-feature-settings:"kern" 1,"liga" 1}\n`;
    const d = theme.decor || {};
    if (d.paperTexture) css += `.card::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(180,170,150,.03) 2px,rgba(180,170,150,.03) 3px),repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(180,170,150,.02) 2px,rgba(180,170,150,.02) 3px)}\n`;
    if (d.seal) css += `.seal{position:absolute;top:100px;right:80px;width:56px;height:56px;border:2px solid var(--accent-bright);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--accent-bright);font-size:22px;font-weight:700;writing-mode:vertical-rl;z-index:3;opacity:.7}\n`;
    if (d.frame) css += `.frame{position:absolute;inset:28px;border:1px solid var(--gold-line,var(--line));pointer-events:none}\n`;
    if (d.gradientText) css += `.decor-gradient .main-title,.decor-gradient .golden{background:linear-gradient(180deg,var(--gold-bright,var(--accent-bright)),var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent}\n`;
    return css;
  }

  /* ============ 纯函数 API ============ */
  function buildCard(styleKey, data, opts) {
    const theme = DATA.themes[styleKey];
    if (!theme) throw new Error('未知风格: ' + styleKey);
    opts = Object.assign({ ratio: '9:16', sign: SIGN_DEFAULT }, opts || {});
    const lay = LAYOUTS[theme.layout];
    if (!lay) throw new Error('未知布局: ' + theme.layout);
    const css = baseCSS(theme) + lay.css(theme, opts);
    const html = lay.html(theme, data || {}, opts);
    const link = buildFontLink(theme);
    return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${(data && data.title) || '卡片'} · ${theme.label}</title>
<link rel="stylesheet" href="${link}">
<style>${css}</style></head><body>${html}</body></html>`;
  }

  function resolveVarExpr(inner, vars) {
    const m = inner.match(/^--[\w-]+/);
    if (!m) return '';
    const name = m[0];
    if (vars[name]) return vars[name];
    const comma = inner.indexOf(',');
    if (comma >= 0) {
      let fb = inner.slice(comma + 1).trim();
      if (fb.startsWith('var(')) fb = resolveVarExpr(fb.slice(4, -1), vars);
      return fb;
    }
    return '';
  }
  function inlineStyles(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const styleEls = Array.from(doc.querySelectorAll('style'));
    let css = styleEls.map(s => s.textContent).join('\n');
    const vars = {};
    const rootMatch = css.match(/:root\s*\{([^}]*)\}/);
    if (rootMatch) {
      rootMatch[1].split(';').forEach(decl => {
        const i = decl.indexOf(':');
        if (i > 0) { const k = decl.slice(0, i).trim(); const v = decl.slice(i + 1).trim(); if (k) vars[k] = v; }
      });
    }
    const rules = [];
    css.replace(/:root\s*\{[^}]*\}/, '').split('}').forEach(block => {
      const ci = block.indexOf('{');
      if (ci < 0) return;
      const sel = block.slice(0, ci).trim();
      const body = block.slice(ci + 1);
      if (!sel || sel.includes('::') || sel === '') return;
      const props = {};
      body.split(';').forEach(dl => {
        const i = dl.indexOf(':');
        if (i > 0) {
          const k = dl.slice(0, i).trim();
          let v = dl.slice(i + 1).trim().replace(/var\(([^)]*)\)/g, (_, inner) => resolveVarExpr(inner, vars));
          if (k) props[k] = v;
        }
      });
      if (Object.keys(props).length) rules.push({ sel, props });
    });
    rules.forEach(({ sel, props }) => {
      let els = [];
      try { els = Array.from(doc.querySelectorAll(sel)); } catch (e) { return; }
      els.forEach(el => {
        const cur = el.getAttribute('style') || '';
        const add = Object.entries(props).map(([k, v]) => `${k}:${v}`).join(';');
        el.setAttribute('style', (cur ? cur + ';' : '') + add);
      });
    });
    styleEls.forEach(s => s.remove());
    Array.from(doc.querySelectorAll('[class]')).forEach(el => el.removeAttribute('class'));
    return '<!DOCTYPE html>' + doc.documentElement.outerHTML;
  }

  function validate(html, wechat) {
    const errs = [], warns = [];
    if (!wechat) {
      if (!html.toLowerCase().includes('<!doctype html>')) errs.push('缺少 <!DOCTYPE html>');
      if (!/静心知识库/.test(html)) errs.push('缺失统一落款');
      if (/ai生成|ai-generated|generated by ai/i.test(html)) errs.push('出现禁止的 AI 水印');
      if (!/line-height/.test(html)) warns.push('建议设置 line-height 垂直韵律');
      if (!/font-feature-settings|text-rendering/.test(html)) warns.push('建议设置文字渲染质感');
    } else {
      // 微信已发布文章支持 position:absolute（装饰层印章/水印/色块用），仅过滤真正会被剥离的写法
      const banned = {
        '<style': '禁止使用 <style>', 'class=': '禁止使用 class', 'display:grid': '禁用 grid',
        'position:fixed': '禁用 position:fixed（absolute 微信支持）',
        '@media': '禁用 @media', '@keyframes': '禁用 @keyframes', 'var(--': '禁用 CSS 变量', '<script': '禁用 script'
      };
      Object.entries(banned).forEach(([p, m]) => {
        const n = (html.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
        if (n) errs.push(`${m}（${n} 次）`);
      });
      if (!/静心知识库/.test(html)) errs.push('缺失统一落款');
    }
    return { errs, warns };
  }

  /* ============ 可挂载 UI ============ */
  const CSS = `
.gc-studio{display:flex;flex-direction:column;height:100%;min-height:520px;background:#1c1c1e;color:#e8e8ea;font-family:"Noto Sans SC",-apple-system,"PingFang SC",sans-serif;--gc-accent:#C9A962;--gc-line:#3a3a40;--gc-panel:#262629;--gc-panel2:#2e2e32;--gc-muted:#9a9aa0;--gc-ok:#3ec97a;--gc-err:#ff6b6b}
.gc-studio *{margin:0;padding:0;box-sizing:border-box}
.gc-stylebar{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--gc-line)}
.gc-stylebar button{background:var(--gc-panel2);border:1px solid var(--gc-line);color:#e8e8ea;padding:7px 13px;border-radius:8px;font-size:13px;cursor:pointer;transition:.15s}
.gc-stylebar button:hover{border-color:var(--gc-accent)}
.gc-stylebar button.active{background:var(--gc-accent);color:#1c1c1e;border-color:var(--gc-accent);font-weight:700}
.gc-main{flex:1;display:flex;min-height:0}
.gc-left{width:380px;min-width:320px;background:var(--gc-panel);border-right:1px solid var(--gc-line);display:flex;flex-direction:column;overflow:hidden}
.gc-controls{padding:12px 16px;border-bottom:1px solid var(--gc-line);display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.gc-controls label{font-size:12px;color:var(--gc-muted);display:flex;flex-direction:column;gap:4px}
.gc-controls select,.gc-controls input[type=text]{background:var(--gc-panel2);border:1px solid var(--gc-line);color:#e8e8ea;padding:6px 8px;border-radius:6px;font-size:13px;font-family:inherit}
.gc-controls .gc-chk{display:flex;align-items:center;gap:6px;font-size:12px;color:#e8e8ea;cursor:pointer}
.gc-form{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:12px}
.gc-field{display:flex;flex-direction:column;gap:5px}
.gc-field label{font-size:12px;color:var(--gc-muted)}
.gc-field input,.gc-field textarea{background:var(--gc-panel2);border:1px solid var(--gc-line);color:#e8e8ea;padding:8px 10px;border-radius:6px;font-size:13px;font-family:inherit;resize:vertical}
.gc-field textarea{min-height:56px}
.gc-field input:focus,.gc-field textarea:focus{outline:none;border-color:var(--gc-accent)}
.gc-right{flex:1;display:flex;flex-direction:column;min-width:0;background:#161618}
.gc-bar{padding:10px 16px;border-bottom:1px solid var(--gc-line);display:flex;gap:10px;align-items:center}
.gc-bar button{background:var(--gc-panel2);border:1px solid var(--gc-line);color:#e8e8ea;padding:7px 14px;border-radius:8px;font-size:13px;cursor:pointer}
.gc-bar button:hover{border-color:var(--gc-accent)}
.gc-bar .gc-status{margin-left:auto;font-size:12px}
.gc-bar .gc-status.ok{color:var(--gc-ok)} .gc-bar .gc-status.err{color:var(--gc-err)}
.gc-preview-wrap{flex:1;overflow:auto;display:flex;justify-content:center;padding:24px;align-items:flex-start}
.gc-preview{background:#fff;border:none;transform-origin:top center;box-shadow:0 10px 40px rgba(0,0,0,.5)}
.gc-hint{font-size:11px;color:var(--gc-muted);padding:8px 16px;border-top:1px solid var(--gc-line)}
`;

  function mount(container, options) {
    options = Object.assign({ defaultStyle: 'songzen', sign: SIGN_DEFAULT, ratio: '9:16' }, options || {});
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) throw new Error('GuofengCard.mount: 容器不存在');
    if (container.__gcMounted) return container.__gcApi;

    container.classList.add('gc-studio');
    container.innerHTML = `
      <style>${CSS}</style>
      <div class="gc-stylebar"></div>
      <div class="gc-main">
        <div class="gc-left">
          <div class="gc-controls">
            <label>画幅<select class="gc-ratio">
              <option value="9:16">竖版 9:16</option>
              <option value="3:4">小红书 3:4</option>
              <option value="1:1">方图 1:1</option>
              <option value="2.35:1">公众号封面 2.35:1</option>
            </select></label>
            <label>落款<input type="text" class="gc-sign" style="width:180px"></label>
            <label class="gc-chk"><input type="checkbox" class="gc-wechat"> 公众号内嵌模式</label>
          </div>
          <div class="gc-form"></div>
        </div>
        <div class="gc-right">
          <div class="gc-bar">
            <button class="gc-download">下载 HTML</button>
            <button class="gc-copy">复制 HTML</button>
            <span class="gc-status"></span>
          </div>
          <div class="gc-preview-wrap"><iframe class="gc-preview" title="预览"></iframe></div>
          <div class="gc-hint">Guofeng Card Engine v3 · 数据(themes.json) + 模板(5 layouts) · 已接入工作站</div>
        </div>
      </div>`;

    const $ = sel => container.querySelector(sel);
    let current = options.defaultStyle;
    const filled = {};
    $('.gc-ratio').value = options.ratio;
    $('.gc-sign').value = options.sign;

    function fieldsOf(key) { return DATA.layouts[DATA.themes[key].layout].fields; }
    function sampleOf(key) { return DATA.themes[key].sample || {}; }

    function renderStylebar() {
      const bar = $('.gc-stylebar');
      bar.innerHTML = '';
      Object.entries(DATA.themes).forEach(([key, s]) => {
        const b = document.createElement('button');
        b.textContent = s.label; b.dataset.key = key;
        if (key === current) b.classList.add('active');
        b.onclick = () => { current = key; renderStylebar(); renderForm(); update(); };
        bar.appendChild(b);
      });
    }
    function renderForm() {
      const form = $('.gc-form');
      form.innerHTML = '';
      const s = DATA.themes[current];
      if (!filled[current]) {
        const d = sampleOf(current);
        Object.entries(d).forEach(([k, v]) => { const el = form.querySelector('#f_' + k); if (el) el.value = v; });
        filled[current] = true;
      }
      fieldsOf(current).forEach(f => {
        const wrap = document.createElement('div'); wrap.className = 'gc-field';
        const lab = document.createElement('label'); lab.textContent = f.l; lab.setAttribute('for', 'f_' + f.k);
        const inp = document.createElement(f.t === 'area' ? 'textarea' : 'input');
        inp.id = 'f_' + f.k; if (f.t !== 'area') inp.type = 'text';
        inp.addEventListener('input', update);
        wrap.appendChild(lab); wrap.appendChild(inp); form.appendChild(wrap);
      });
    }
    function collectData() {
      const d = {};
      fieldsOf(current).forEach(f => { d[f.k] = (container.querySelector('#f_' + f.k) || {}).value || ''; });
      return d;
    }
    function build() {
      return buildCard(current, collectData(), { ratio: $('.gc-ratio').value, sign: $('.gc-sign').value || SIGN_DEFAULT });
    }
    function update() {
      const wechat = $('.gc-wechat').checked;
      let html = build();
      if (wechat) html = inlineStyles(html);
      const iframe = $('.gc-preview');
      iframe.srcdoc = html;
      const wrap = iframe.parentElement;
      const cw = wrap.clientWidth - 48;
      const scale = Math.min(1, cw / 900);
      const [rw, rh] = $('.gc-ratio').value.split(':').map(Number);
      iframe.style.width = '900px';
      iframe.style.height = (900 * rh / rw) + 'px';
      iframe.style.transform = `scale(${scale})`;
      const v = validate(html, wechat);
      const st = $('.gc-status');
      if (v.errs.length) {
        st.className = 'gc-status err'; st.textContent = `✗ ${v.errs.length} 个错误`;
        st.title = v.errs.join('\n') + (v.warns.length ? '\n\n建议：\n' + v.warns.join('\n') : '');
      } else {
        st.className = 'gc-status ok'; st.textContent = `✓ 通过` + (v.warns.length ? ` · ${v.warns.length} 建议` : '');
        st.title = v.warns.join('\n');
      }
      container.__lastHtml = html;
    }

    $('.gc-download').onclick = () => {
      const html = container.__lastHtml || build();
      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${collectData().title || 'card'}-${DATA.themes[current].label}.html`;
      a.click();
    };
    $('.gc-copy').onclick = async () => {
      const html = container.__lastHtml || build();
      try { await navigator.clipboard.writeText(html); $('.gc-copy').textContent = '已复制 ✓'; setTimeout(() => $('.gc-copy').textContent = '复制 HTML', 1500); }
      catch (e) { alert('复制失败，请手动复制预览源码'); }
    };
    $('.gc-ratio').onchange = update;
    $('.gc-sign').oninput = update;
    $('.gc-wechat').onchange = update;

    renderStylebar(); renderForm(); update();

    const api = {
      el: container,
      setStyle(k) { current = k; renderStylebar(); renderForm(); update(); },
      getStyle() { return current; },
      getHtml(wechat) { let h = build(); return wechat ? inlineStyles(h) : h; },
      validate() { return validate(container.__lastHtml, $('.gc-wechat').checked); },
      fields: () => fieldsOf(current)
    };
    container.__gcMounted = true;
    container.__gcApi = api;
    return api;
  }

  global.GuofengCard = {
    DATA, LAYOUTS, buildCard, inlineStyles, validate, mount,
    themes: DATA.themes, layouts: DATA.layouts,
    styleKeys: Object.keys(DATA.themes),
    getSample: (k) => (DATA.themes[k] && DATA.themes[k].sample) || {},
    getFields: (k) => (DATA.themes[k] && DATA.layouts[DATA.themes[k].layout].fields) || [],
    SIGN_DEFAULT
  };
})(typeof window !== 'undefined' ? window : this);
