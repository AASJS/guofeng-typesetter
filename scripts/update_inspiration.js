#!/usr/bin/env node
/**
 * update_inspiration.js — 给灵感库追加新来源 / 新灵感条目（可更新、可增量）。
 *
 * 设计意图：灵感库 references/inspiration.json 是「唯一可编辑数据源」，本脚本让你不必手改 JSON，
 *           用命令行即可追加条目；追加后跑 sync_inspiration.js 同步进引擎即可在 Studio 浏览。
 *
 * 用法：
 *   # 追加一个来源（灵感出处，如某站/某书）
 *   node scripts/update_inspiration.js add-source \
 *     --title "Awwwards Trends" --url "https://..." --tags "trend,editorial" --summary "..."
 *
 *   # 追加一条灵感（直接给 JSON，字段见 inspiration.json 的 entries 结构）
 *   node scripts/update_inspiration.js add-entry --json '{ "title":"...", "category":"trend", "source":"awwwards-2026", "designLanguage":"...", "palette":{"bg":"#111","ink":"#fff","accent":"#E94F37"}, "fonts":["Inter"], "cssSnippet":"...", "applicableTo":["poster"], "tags":["minimal"], "note":"..." }'
 *
 *   # 也可把条目写进文件再导入（避免命令行转义问题）
 *   node scripts/update_inspiration.js add-entry --file ./my-insp.json
 *
 *   # 查看当前库统计
 *   node scripts/update_inspiration.js list
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jsonPath = path.join(root, 'references', 'inspiration.json');

function today() { return new Date().toISOString().slice(0, 10); }
function read() { return JSON.parse(fs.readFileSync(jsonPath, 'utf-8')); }
function write(obj) { fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2) + '\n', 'utf-8'); }

// 极简参数解析：--key value（value 支持引号）
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      let v = argv[i + 1];
      if (v === undefined || v.startsWith('--')) { out[k] = true; continue; }
      // 去掉首尾引号
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      out[k] = v;
      i++;
    }
  }
  return out;
}

function slugify(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function loadJsonArg(args) {
  if (args.file) return JSON.parse(fs.readFileSync(path.resolve(args.file), 'utf-8'));
  if (args.json) return JSON.parse(args.json);
  return null;
}

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd) { console.error('用法: node scripts/update_inspiration.js <add-source|add-entry|list> [选项]'); process.exit(1); }

  if (cmd === 'list') {
    const d = read();
    console.log(`灵感库 v${d.version} · 更新于 ${d.updated}`);
    console.log(`来源 ${d.sources.length} 个 · 灵感条目 ${d.entries.length} 条`);
    d.entries.forEach((e, i) => console.log(`  ${i + 1}. [${e.category}] ${e.title}  →  适用: ${(e.applicableTo || []).join('/')}`));
    return;
  }

  const d = read();
  const args = parseArgs(rest);

  if (cmd === 'add-source') {
    if (!args.title || !args.url) { console.error('✗ add-source 需要 --title 与 --url'); process.exit(1); }
    const id = args.id || (slugify(args.title) || ('src-' + (d.sources.length + 1)));
    if (d.sources.some(s => s.id === id)) { console.error('✗ 来源 id 已存在: ' + id); process.exit(1); }
    d.sources.push({
      id,
      title: args.title,
      url: args.url,
      fetchedAt: today(),
      tags: (args.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      summary: args.summary || ''
    });
    d.updated = today();
    write(d);
    console.log(`✓ 已追加来源「${args.title}」(id=${id})，当前共 ${d.sources.length} 个来源`);
    console.log('  记得跑: node scripts/sync_inspiration.js');
    return;
  }

  if (cmd === 'add-entry') {
    const entry = loadJsonArg(args);
    if (!entry) { console.error('✗ add-entry 需要 --json \'{...}\' 或 --file ./x.json'); process.exit(1); }
    if (!entry.title) { console.error('✗ 条目缺少 title'); process.exit(1); }
    const id = entry.id || (slugify(entry.title) || ('insp-' + (d.entries.length + 1)));
    if (d.entries.some(e => e.id === id)) { console.error('✗ 灵感 id 已存在: ' + id); process.exit(1); }
    entry.id = id;
    if (!entry.source && d.sources[0]) entry.source = d.sources[0].id;
    d.entries.push(entry);
    d.updated = today();
    write(d);
    console.log(`✓ 已追加灵感「${entry.title}」(id=${id})，当前共 ${d.entries.length} 条`);
    console.log('  记得跑: node scripts/sync_inspiration.js');
    return;
  }

  console.error('未知命令: ' + cmd + '（支持 add-source / add-entry / list）');
  process.exit(1);
}

main();
